import { getListVehicle, getSingleVehicle } from "./get";
import { createVehicle } from "./create";
import { updateVehicle } from "./update";
import { deleteVehicle } from "./delete";

export const VEHICLE = {
	list: getListVehicle,
	single: getSingleVehicle,
	create: createVehicle,
	update: updateVehicle,
	delete: deleteVehicle,
};
