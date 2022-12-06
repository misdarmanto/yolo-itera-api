// import { Response } from "express";
// import { StatusCodes } from "http-status-codes";
// import { Op } from "sequelize";
// import { UserAttributes, UserModel } from "../models/mysql/user/user";
// import { ResponseData, ResponseDataAttributes } from "../utilities/response";

// const changeUserPermission = async (req: any, res: Response) => {
//     const body = <UserAttributes>req.body;
//     const acount = body.email || body.userName;
//     if (!acount || !body.role) {
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
//         const message = "User tidak ditemukan";
//         const response = <ResponseDataAttributes>ResponseData.error(message);
//         return res.status(StatusCodes.BAD_REQUEST).json(response);
//     }

//     try {
//         await UserModel.update(
//             { role: body.role },
//             {
//                 where: {
//                     deleted: { [Op.eq]: 0 },
//                     [Op.or]: [{ userName: { [Op.eq]: body.userName } }, { email: { [Op.eq]: body.email } }],
//                 },
//             }
//         );
//         const response = <ResponseDataAttributes>ResponseData.default;
//         response.data = "user permission berhasil dirubah";
//         return res.status(StatusCodes.OK).json(response);
//     } catch (error) {
//         console.log(error);
//         const message = "Tidak dapat memproses. Laporkan kendala ini.";
//         const response = <ResponseDataAttributes>ResponseData.error(message);
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
//     }
// };

// export const SUPER_ADMIN = { changeUserPermission };
