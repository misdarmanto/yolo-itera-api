import { deleteAdmin } from "./delete";
import { getAdminList } from "./get";
import { login } from "./login";
import { logout } from "./logout";
import { signUp } from "./register";
import { updateAdmin } from "./update";

export const ADMIN = {
	list: getAdminList,
	login: login,
	logout: logout,
	signUp: signUp,
	update: updateAdmin,
	delete: deleteAdmin,
};
