import React from 'react'
import Header from '../components/Header'
import AdminView from '../components/AdminView'
import UserView from '../components/UserView'


const HomePage = ({user}) => {

  return (
    <div>
      <Header />
      <main className='home'>
        {user.rol === "admin" ?  <AdminView user={user}/> : <UserView user={user}/>}
      </main>
    </div>
  )
}

export default HomePage