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
  app.use("/user", userRouter);
  userRouter.post("/login", (req: Request, res: Response) => USER.login(req, res));
  userRouter.post("/signup", (req: Request, res: Response) => USER.register(req, res));
  userRouter.get("/logout", middleware.useAuthorization, (req: Request, res: Response) => USER.logout(req, res));
  userRouter.get("/list", middleware.useAuthorization, (req: Request, res: Response) => USER.list(req, res));

  const adminRouter = express.Router();
  app.use("/admin", adminRouter);
  adminRouter.get("/info", middleware.useAuthorization, (req: Request, res: Response) => ADMIN.info(req, res));
  adminRouter.get("/list", middleware.useAuthorization, (req: Request, res: Response) => ADMIN.list(req, res));

  const superAdminRouter = express.Router();
  app.use("/super_admin", superAdminRouter);
  superAdminRouter.patch("/permission", middleware.useAuthorization, (req: Request, res: Response) =>
    SUPER_ADMIN.changeUserPermission(req, res),
  );

  const vehicleRouter = express.Router();
  app.use("/vehicle", vehicleRouter);
  vehicleRouter.get("/verify", (req: Request, res: Response) => VEHICLE.verifyVehicle(req, res));
  vehicleRouter.get("/list", (req: Request, res: Response) => VEHICLE.getListVehicle(req, res));
  vehicleRouter.get("/", middleware.useAuthorization, (req: Request, res: Response) => VEHICLE.getSingleVehicle(req, res));
  vehicleRouter.post("/", middleware.useAuthorization, (req: Request, res: Response) => VEHICLE.createVehicle(req, res));
  vehicleRouter.patch("/", middleware.useAuthorization, (req: Request, res: Response) => VEHICLE.updateVehicle(req, res));
  vehicleRouter.delete("/", middleware.useAuthorization, (req: Request, res: Response) => VEHICLE.deleteVehicle(req, res));
};
