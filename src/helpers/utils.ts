import { ListItem, User } from '../interfaces'
import { permissionsList } from '../static'

export const doSearch = (search: string, users: User[]) => {
  if (!search.trim()) {
    return users
  } else {
    const filteredUsers = users.filter(user =>
      user.email.toLowerCase().includes(search.trim().toLowerCase()),
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

  const isAll = prevPermissions.length + 2 === permissionsList.length
  return [...(isAll ? ['Все'] : []), ...prevPermissions, chosen.value]
}
