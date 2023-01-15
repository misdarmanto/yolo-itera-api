import { getListTraffics, getSingleTrafic } from "./get";
import { verifyVehicle } from "./verify";

export const TRAFFICS = {
	list: getListTraffics,
	single: getSingleTrafic,
	verify: verifyVehicle,
};
