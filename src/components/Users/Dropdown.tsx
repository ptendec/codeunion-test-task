import { Menu } from '@headlessui/react'
import { Dropdown } from '../UI/Dropdown'

export interface Props {
  onDeleteUser: () => void
  onEditUser: () => void
}

export const UserDropdown = ({ onDeleteUser, onEditUser }: Props) => {
  return (
    <Dropdown
      button={
        <Menu.Button className='bg-transparent text-3xl text-gray-500'>
          ...
        </Menu.Button>
      }
    >
      <div className='p-2 '>
        <button
          onClick={onEditUser}
          className='text-sm font-medium cursor-pointer hover:bg-slate-200 w-full text-start px-2 py-1 rounded-lg'
        >
          Редактировать права доступа
        </button>
        <button
          onClick={onDeleteUser}
          className='text-red-500 text-sm font-medium cursor-pointer hover:bg-slate-200 w-full text-start px-2 py-1 rounded-lg'
        >
          Удалить
        </button>
      </div>
    </Dropdown>
  )
}
