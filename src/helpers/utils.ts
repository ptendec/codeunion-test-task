import { ListItem, User } from '../interfaces'
import { permissionsList } from '../static'

export const doSearch = (search: string, users: User[]) => {
  if (!search.trim()) {
    return users
  } else {
    const filteredUsers = users.filter(user =>
      user.email
        .split('@')[0]
        .toLowerCase()
        .includes(search.trim().toLowerCase().split('@')[0]),
    )
    return filteredUsers
  }
}

export const getPermissions = (prevPermissions: string[], chosen: ListItem) => {
  if (chosen.value === 'Все')
    return prevPermissions.includes('Все')
      ? []
      : permissionsList.map(permission => permission.value)
  else if (prevPermissions.includes(chosen.value))
    return prevPermissions.filter(
      prevPermission =>
        prevPermission !== chosen.value && prevPermission !== 'Все',
    )
  else return [...prevPermissions, chosen.value]
}
