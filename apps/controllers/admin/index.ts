import { register } from "ts-node";
import { getAdminList } from "./get";
import { login } from "./login";
import { logout } from "./logout";

export const ADMIN = {
	list: getAdminList,
	login: login,
	logout: logout,
	register: register,
};
