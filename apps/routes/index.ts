import express, { Express, Request, Response } from "express";
import { index } from "../controllers";
import { VEHICLE } from "../controllers/vehicle";
import { USER } from "../controllers/user";
import { middleware } from "../middlewares";
import { ADMIN } from "../controllers/admin";
import { SUPER_ADMIN } from "../controllers/super_admin";

export const route = (app: Express) => {
    app.get("/", (req: Request, res: Response) => index(req, res));

    const userRouter = express.Router();
    app.use("/user", middleware.useAuthorization, userRouter);
    userRouter.post("/login", (req: Request, res: Response) => USER.login(req, res));
    userRouter.post("/signup", (req: Request, res: Response) => USER.register(req, res));
    userRouter.get("/logout", (req: Request, res: Response) => USER.logout(req, res));
    userRouter.get("/list", (req: Request, res: Response) => USER.list(req, res));

    const adminRouter = express.Router();
    app.use("/admin", middleware.useAuthorization, adminRouter);
    adminRouter.get("/info", (req: Request, res: Response) => ADMIN.info(req, res));
    adminRouter.get("/list", (req: Request, res: Response) => ADMIN.list(req, res));

    const superAdminRouter = express.Router();
    app.use("/super_admin", middleware.useAuthorization, superAdminRouter);
    superAdminRouter.patch("/permission", (req: Request, res: Response) => SUPER_ADMIN.changeUserPermission(req, res));

    const vehicleRouter = express.Router();
    app.use("/vehicle", middleware.useAuthorization, vehicleRouter);
    vehicleRouter.get("/verify", (req: Request, res: Response) => VEHICLE.verify(req, res));
    vehicleRouter.get("/list", (req: Request, res: Response) => VEHICLE.list(req, res));
    vehicleRouter.get("/", (req: Request, res: Response) => VEHICLE.single(req, res));
    vehicleRouter.post("/", (req: Request, res: Response) => VEHICLE.create(req, res));
    vehicleRouter.patch("/", (req: Request, res: Response) => VEHICLE.update(req, res));
    vehicleRouter.delete("/", (req: Request, res: Response) => VEHICLE.delete(req, res));
};
