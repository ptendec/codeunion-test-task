import { Menu } from '@headlessui/react'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { getPermissions, isEmailValid } from '../../helpers/utils'
import { User } from '../../interfaces'
import { permissionsList } from '../../static'
import { Dropdown } from '../UI/Dropdown'
import { Modal } from '../UI/Modal'

interface Props {
  onClose: () => void
  onAddUser: (user: User) => void
  isOpen: boolean
  users: User[]
}

export const Add = ({ onAddUser, onClose, isOpen, users }: Props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [permissions, setPermissions] = useState<string[]>([])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isEmailValid(email)) {
      toast.warn('Некорректный email')
      return
    }
    if (users.find(filteringUser => filteringUser.email === email)) {
      toast.warn('Такой пользователь уже существует')
      return
    }

    onAddUser({
      name,
      email,
      permissions: permissions.filter(permission => permission !== 'Все'),
    })
    setName('')
    setEmail('')
    setPermissions([])
    onClose()
    toast.success('Приглашение отправлено')
  }

  return (
    <Modal
      isVisible={isOpen}
      onClose={onClose}
      className='max-w-lg p-4 rounded-xl'
    >
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <input
            className='border-2 rounded-xl w-full px-3 py-2 outline-none'
            type='email'
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder='Email'
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
          Пригласить
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
