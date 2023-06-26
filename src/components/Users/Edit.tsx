import { Menu } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getPermissions } from '../../helpers/utils'
import { User } from '../../interfaces'
import { permissionsList } from '../../static'
import { Dropdown } from '../UI/Dropdown'
import { Modal } from '../UI/Modal'

interface Props {
  user: User
  onUpdateUser: (user: User) => void
  onClose: () => void
  isOpen: boolean
}

export const Edit = ({ user, onUpdateUser, onClose, isOpen }: Props) => {
  const [name, setName] = useState(user.name)
  const [permissions, setPermissions] = useState<string[]>([])

  useEffect(() => {
    setName(user.name)
    setPermissions([
      ...(user.permissions.length === permissionsList.length - 1
        ? ['Все']
        : []),
      ...user.permissions,
    ])
  }, [user])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onUpdateUser({
      ...user,
      name,
      permissions: permissions.filter(permission => permission !== 'Все'),
    })
    toast.success('Отредактировано')
    onClose()
  }

  return (
    <Modal
      className='max-w-lg p-4 rounded-xl'
      isVisible={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <Dropdown
          button={
            <Menu.Button
              type='button'
              className='w-full text-start rounded-xl border-gray border-2 px-3 py-2 mb-2'
            >
              {Array.isArray(permissions) && permissions.length > 0
                ? permissions.join(', ')
                : 'Выбрать'}
            </Menu.Button>
          }
        >
          <div>
            {permissionsList.map(item => (
              <label
                className='rounded-xl p-2 flex items-center gap-x-2'
                key={item.id}
              >
                <input
                  type='checkbox'
                  className='w-3.5 h-3.5'
                  checked={permissions.includes(item.value)}
                  onChange={() =>
                    setPermissions(prevPermissions =>
                      getPermissions(prevPermissions, item),
                    )
                  }
                />
                {item.value}
              </label>
            ))}
          </div>
        </Dropdown>
        <button
          type='submit'
          className='mr-2 bg-green-600 text-white rounded-xl px-3 py-2 text-sm font-medium'
        >
          Редактировать
        </button>
        <button
          type='button'
          onClick={onClose}
          className='mr-2 bg-red-500 text-white rounded-xl px-3 py-2 text-sm font-medium'
        >
          Отмена
        </button>
      </form>
    </Modal>
  )
}
