// import { Response } from "express";
// import { StatusCodes } from "http-status-codes";
// import { Op } from "sequelize";
// import { UserModel } from "../models/users";
// import { UserSessionModel } from "../models/user_sessions";
// import { VehicleModel } from "../models/vehicles";
// import { Pagination } from "../utilities/pagination";
// import { ResponseData, ResponseDataAttributes } from "../utilities/response";

// const info = async (req: any, res: Response) => {
//     try {
//         const response = <ResponseDataAttributes>ResponseData.default;
//         response.data = { message: "succses", user: req.body.user };
//         return res.status(StatusCodes.OK).json(response);
//     } catch (error) {
//         console.log(error);
//         const message = "Tidak dapat memproses. Laporkan kendala ini.";
//         const response = <ResponseDataAttributes>ResponseData.error(message);
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
//     }
// };


// const login = async (req: any, res: Response) => {
//     const body = <UserAttributes>req.body;
//     const account = body.email || body.userName;
//     if (!account || !body.password) {
//         const message = "Permintaan tidak lengkap.";
//         const response = <ResponseDataAttributes>ResponseData.error(message);
//         return res.status(StatusCodes.BAD_REQUEST).json(response);
//     }

//     const user = await UserModel.findOne({
//         raw: true,
//         where: {
//             deleted: { [Op.eq]: 0 },
//             [Op.or]: [{ userName: { [Op.eq]: body.userName } }, { email: { [Op.eq]: body.email } }],
//         },
//     });

//     if (!user) {
//         const message = "Akun tidak ditemukan. Silahkan lakukan pendaftaran terlebih dahulu.";
//         const response = <ResponseDataAttributes>ResponseData.error(message);
//         return res.status(StatusCodes.NOT_FOUND).json(response);
//     }

//     if (hashPassword(body.password) !== user?.password) {
//         const message = "kombinasi email dan password tidak ditemukan";
//         const response = <ResponseDataAttributes>ResponseData.error(message);
//         return res.status(StatusCodes.UNAUTHORIZED).json(response);
//     }

//     let expired = new Date();
//     expired.setHours(expired.getDate() + 10);
//     const userSession = <UserSessionAttributes>{
//         userId: user.id,
//         session: uuidv4(),
//         expiredOn: expired.getTime(),
//     };
//     const checkSession = await UserSessionModel.findOne({
//         raw: true,
//         where: {
//             userId: { [Op.eq]: user.id },
//             deleted: { [Op.eq]: 0 },
//         },
//     });
//     if (!checkSession) {
//         UserSessionModel.create(userSession);
//     } else {
//         UserSessionModel.update(userSession, {
//             where: {
//                 userId: { [Op.eq]: user.id },
//                 deleted: { [Op.eq]: 0 },
//             },
//         });
//     }

//     try {
//         const responseData = <{ user: UserAttributes; session: UserSessionAttributes }>{
//             user: {
//                 id: user.id,
//                 userName: user.userName,
//                 email: user.email,
//                 photo: user.photo,
//                 role: user.role,
//             },
//             session: {
//                 session: userSession.session,
//                 expiredOn: userSession.expiredOn,
//             },
//         };
//         const response = <ResponseDataAttributes>ResponseData.default;
//         response.data = responseData;
//         return res.status(StatusCodes.OK).json(response);
//     } catch (error) {
//         console.log(error);
//         const message = "Tidak dapat memproses. Laporkan kendala ini.";
//         const response = <ResponseDataAttributes>ResponseData.error(message);
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
//     }
// };

// const register = async (req: any, res: Response) => {
//     const body = <UserAttributes>req.body;
//     if (!body.userName || !body.password || !body.email) {
//         const message = "Permintaan tidak lengkap.";
//         const response = <ResponseDataAttributes>ResponseData.error(message);
//         return res.status(StatusCodes.BAD_REQUEST).json(response);
//     }
//     try {
//         const user = await UserModel.findOne({
//             raw: true,
//             where: {
//                 deleted: { [Op.eq]: 0 },
//                 [Op.or]: [{ userName: { [Op.eq]: body.userName } }, { email: { [Op.eq]: body.email } }],
//             },
//         });

//         if (user && user.email === body.email) {
//             const message = "Email telah terdaftar. Silahkan gunakan email lain.";
//             const response = <ResponseDataAttributes>ResponseData.error(message);
//             return res.status(StatusCodes.BAD_REQUEST).json(response);
//         }

//         if (user && user.userName === body.userName) {
//             const message = "Username telah terdaftar. Silahkan gunakan email lain.";
//             const response = <ResponseDataAttributes>ResponseData.error(message);
//             return res.status(StatusCodes.BAD_REQUEST).json(response);
//         }

//         body.password = hashPassword(body.password);
//         body.role = "guest";
//         body.rfid = Math.floor(Math.random() * 10000000).toString();
//         body.photo = body.photo || "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png";

//         await UserModel.create(body);
//         const response = <ResponseDataAttributes>ResponseData.default;
//         response.data = "registration sucsess";
//         return res.status(StatusCodes.OK).json(response);
//     } catch (error) {
//         console.log(error);
//         const message = "Tidak dapat memproses. Laporkan kendala ini.";
//         const response = <ResponseDataAttributes>ResponseData.error(message);
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
//     }
// };

// const logout = async (req: any, res: Response) => {
//     try {
//         res.clearCookie("access_token");
//         const response = <ResponseDataAttributes>ResponseData.default;
//         response.data = "logout sucsess";
//         return res.status(StatusCodes.OK).json(response);
//     } catch (error) {
//         console.log(error);
//         const message = "Tidak dapat memproses. Laporkan kendala ini.";
//         const response = <ResponseDataAttributes>ResponseData.error(message);
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
//     }
// };



// export const ADMIN = { login, logout, register};
