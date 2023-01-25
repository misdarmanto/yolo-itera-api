import { getAdminList } from "./get";
import { login } from "./login";
import { logout } from "./logout";
import { signUp } from "./signUp";

export const ADMIN = {
	list: getAdminList,
	login: login,
	logout: logout,
	signUp: signUp,
};
