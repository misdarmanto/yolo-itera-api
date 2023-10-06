import { createUser } from './create'
import { deleteUser } from './delete'
import { getListUsers, getSingleUser } from './get'
import { updateUser } from './update'

export const USER = {
  list: getListUsers,
  single: getSingleUser,
  create: createUser,
  update: updateUser,
  delete: deleteUser
}
