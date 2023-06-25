import noAvatar from '../../assets/no_avatar.png'
import { User } from '../../interfaces'
import { UserDropdown } from './Dropdown'

interface Props {
  users: User[]
  onDeleteUser: (email: string) => void
  showAddModal: () => void
  showEditModal: (user: User) => void
}

export const UsersList = ({
  users,
  onDeleteUser,
  showAddModal,
  showEditModal,
}: Props) => {
  console.log(users[users.length - 1].image || noAvatar)

  return (
    <div className='my-4 bg-white p-4 rounded-xl'>
      <div className='flex justify-between mb-8'>
        <p className='text-xl font-semibold'>Команда</p>
        <input
          type='text'
          placeholder='Поиск по email'
          className='border rounded-xl w-64 px-3 py-1 outline-none text-sm'
        />
        <button
          onClick={showAddModal}
          className='bg-green-600 text-white rounded-xl px-3 py-0.5 text-sm font-semibold '
        >
          Добавить пользователя
        </button>
      </div>
      <div>
        {users.map(user => (
          <div key={user.email} className='flex gap-x-2 mb-2 relative'>
            <img
              src={user.image || noAvatar}
              className='w-16 h-16 rounded-full object-cover'
              alt='User avatar'
            />
            <div>
              <div className='flex gap-x-2 mb-2 items-center'>
                <p>{user.name}</p>
                <p className='text-gray-500 text-sm font-semibold'>
                  {user.email}
                </p>
              </div>
              {user.permissions.map(permission => (
                <span
                  key={`${user.email}-${permission}`}
                  className='rounded-xl border-2 px-2 py-0.5 text-sm font-medium mr-2 text-gray-500'
                >
                  {permission}
                </span>
              ))}
            </div>
            <div className='absolute right-0 top-0'>
              <UserDropdown
                onEditUser={() => showEditModal(user)}
                onDeleteUser={() => onDeleteUser(user.email)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}