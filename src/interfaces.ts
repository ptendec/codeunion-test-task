export interface User {
  name: string
  email: string
  permissions: string[]
  image?: string
}

export interface ListItem {
  id: string
  value: string
}
