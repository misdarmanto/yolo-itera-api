import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { UserAttributes, UserModel } from "../models/mysql/user/user";
import { UserSessionModel, UserSessionAttributes } from "../models/mysql/user/user_sessions";
import { ResponseData, ResponseDataAttributes } from "../utilities/response";
import { hashPassword } from "../utilities/scure_password";
import { v4 as uuidv4 } from "uuid";
import { VehicleModel } from "../models/mysql/vehicle/vehicle";
import { Pagination } from "../utilities/pagination";

const login = async (req: any, res: Response) => {
  const body = <UserAttributes>req.body;
  const account = body.email || body.userName;
  if (!account || !body.password) {
    const message = "Permintaan tidak lengkap.";
    const response = <ResponseDataAttributes>ResponseData.error(message);
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }

  const user = await UserModel.findOne({
    raw: true,
    where: {
      deleted: { [Op.eq]: 0 },
      [Op.or]: [{ userName: { [Op.eq]: body.userName } }, { email: { [Op.eq]: body.email } }],
    },
  });

  if (!user) {
    const message = "Akun tidak ditemukan. Silahkan lakukan pendaftaran terlebih dahulu.";
    const response = <ResponseDataAttributes>ResponseData.error(message);
    return res.status(StatusCodes.NOT_FOUND).json(response);
  }

  if (hashPassword(body.password) !== user?.password) {
    const message = "kombinasi email dan password tidak ditemukan";
    const response = <ResponseDataAttributes>ResponseData.error(message);
    return res.status(StatusCodes.UNAUTHORIZED).json(response);
  }

  let expired = new Date();
  expired.setHours(expired.getDate() + 10);
  const userSession = <UserSessionAttributes>{
    userId: user.id,
    session: uuidv4(),
    expiredOn: expired.getTime(),
  };
  const checkSession = await UserSessionModel.findOne({
    raw: true,
    where: {
      userId: { [Op.eq]: user.id },
      deleted: { [Op.eq]: 0 },
    },
  });
  if (!checkSession) {
    UserSessionModel.create(userSession);
  } else {
    UserSessionModel.update(userSession, {
      where: {
        userId: { [Op.eq]: user.id },
        deleted: { [Op.eq]: 0 },
      },
    });
  }

  try {
    const responseData = <{ user: UserAttributes; session: UserSessionAttributes }>{
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
        photo: user.photo,
        role: user.role,
      },
      session: {
        session: userSession.session,
        expiredOn: userSession.expiredOn,
      },
    };
    const response = <ResponseDataAttributes>ResponseData.default;
    response.data = responseData;
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.log(error);
    const message = "Tidak dapat memproses. Laporkan kendala ini.";
    const response = <ResponseDataAttributes>ResponseData.error(message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

const register = async (req: any, res: Response) => {
  const body = <UserAttributes>req.body;
  if (!body.userName || !body.password || !body.email) {
    const message = "Permintaan tidak lengkap.";
    const response = <ResponseDataAttributes>ResponseData.error(message);
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }
  try {
    const user = await UserModel.findOne({
      raw: true,
      where: {
        deleted: { [Op.eq]: 0 },
        [Op.or]: [{ userName: { [Op.eq]: body.userName } }, { email: { [Op.eq]: body.email } }],
      },
    });

    if (user && user.email === body.email) {
      const message = "Email telah terdaftar. Silahkan gunakan email lain.";
      const response = <ResponseDataAttributes>ResponseData.error(message);
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (user && user.userName === body.userName) {
      const message = "Username telah terdaftar. Silahkan gunakan email lain.";
      const response = <ResponseDataAttributes>ResponseData.error(message);
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    body.password = hashPassword(body.password);
    body.role = "guest";
    body.rfid = Math.floor(Math.random() * 10000000).toString();
    body.photo = body.photo || "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png";

    await UserModel.create(body);
    const response = <ResponseDataAttributes>ResponseData.default;
    response.data = "registration sucsess";
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.log(error);
    const message = "Tidak dapat memproses. Laporkan kendala ini.";
    const response = <ResponseDataAttributes>ResponseData.error(message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

const logout = async (req: any, res: Response) => {
  try {
    res.clearCookie("access_token");
    const response = <ResponseDataAttributes>ResponseData.default;
    response.data = "logout sucsess";
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.log(error);
    const message = "Tidak dapat memproses. Laporkan kendala ini.";
    const response = <ResponseDataAttributes>ResponseData.error(message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

const list = async (req: any, res: Response) => {
  try {
    const page = new Pagination(+req.query.page || 0, +req.query.size || 10);
    const users = await UserModel.findAndCountAll({
      attributes: ["id", "user_name", "email", "photo", "rfid", "role"],
      where: {
        deleted: { [Op.eq]: 0 },
        ...(req.query.role && {
          role: { [Op.eq]: req.query.role },
        }),
        ...(req.query.search && {
          [Op.or]: [
            { name: { [Op.like]: `%${req.query.search}%` } },
            { userName: { [Op.like]: `%${req.query.search}%` } },
          ],
        }),
      },
      order: [["id", "desc"]],
      ...(req.query.pagination == "true" && {
        limit: page.limit,
        offset: page.offset,
      }),
      include: VehicleModel,
    });
    const response = <ResponseDataAttributes>ResponseData.default;
    response.data = page.data(users);
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.log(error);
    const message = "Tidak dapat memproses permintaan. Laporkan kendala ini.";
    const response = <ResponseDataAttributes>ResponseData.error(message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

export const USER = { list, register, login, logout };
