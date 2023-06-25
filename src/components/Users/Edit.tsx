import { Menu } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import { User } from '../../interfaces'
import { permissionsList } from '../../statis'
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
  const [email, setEmail] = useState(user.email)
  const [permissions, setPermissions] = useState<string[]>([])

  useEffect(() => {
    setName(user.name)
    setEmail(user.email)
    setPermissions(user.permissions)
  }, [user])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onUpdateUser({
      ...user,
      name,
      email,
      permissions,
    })
    onClose()
  }

  if (!isOpen) return <></>

  return (
    <Modal
      className='max-w-lg p-4 rounded-xl'
      isVisible={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Name'
            className='w-full p-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Email'
            className='w-full p-2 border rounded'
          />
        </div>
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
                  onChange={() => {
                    if (item.value === 'Все')
                      setPermissions(
                        permissions.includes('Все')
                          ? []
                          : permissionsList.map(permission => permission.value),
                      )
                    else if (permissions.includes(item.value))
                      setPermissions(prevPermissions =>
                        prevPermissions.filter(
                          prevPermission => prevPermission !== item.value,
                        ),
                      )
                    else
                      setPermissions(prevPermissions => [
                        ...prevPermissions,
                        item.value,
                      ])
                  }}
                />{' '}
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
