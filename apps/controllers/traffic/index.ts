import { getListTraffic, getSingleTraffic } from "./get";
import { verifyVehicle } from "./verify";

export const TRAFFIC = {
	list: getListTraffic,
	single: getSingleTraffic,
	verify: verifyVehicle,
};
