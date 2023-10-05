import { deleteAdmin } from './delete'
import { getAdminList } from './get'
import { login } from './login'
import { logout } from './logout'
import { registration } from './register'
import { updateAdmin } from './update'

export const ADMIN = {
  list: getAdminList,
  login,
  logout,
  registration,
  update: updateAdmin,
  delete: deleteAdmin
}
