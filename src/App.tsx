import { useState } from 'react'
import './App.css'
import { Add } from './components/Users/Add'
import { Edit } from './components/Users/Edit'
import { UsersList } from './components/Users/List'
import { User } from './interfaces'
import existingUsers from './users.json'

function App() {
  const [isAdd, setIsAdd] = useState(false)
  const [users, setUsers] = useState<User[]>(existingUsers)
  const [editingUser, setEditingUser] = useState<User>()

  const handleAddUser = (user: User) => {
    setUsers(prevUsers => [...prevUsers, user])
  }

  const handleDeleteUser = (email: string) => {
    setUsers(prevUsers => prevUsers.filter(user => user.email !== email))
  }

  const handleUpdateUser = (editedUser: User) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        editedUser.email === user.email ? editedUser : user,
      ),
    )
  }

  return (
    <div className='max-w-[1200px] mx-auto '>
      <Add
        isOpen={isAdd}
        onAddUser={handleAddUser}
        onClose={() => setIsAdd(false)}
      />
      {editingUser && (
        <Edit
          user={editingUser}
          onUpdateUser={handleUpdateUser}
          onClose={() => setEditingUser(undefined)}
          isOpen={!!editingUser}
        />
      )}
      <UsersList
        showAddModal={() => setIsAdd(true)}
        showEditModal={user => setEditingUser(user)}
        users={users}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  )
}

export default App
