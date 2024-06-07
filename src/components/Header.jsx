import React from 'react'
import appFirebase from '../firebaseconf'
import { getAuth, signOut } from 'firebase/auth'

const Header = () => {

  const auth = getAuth(appFirebase)

  return (
    <header className='header'>
      <div >
        <img src="/logo_trial.png" alt="" height="94vh"/>
      </div>
      <div>
        <h1>NumenPortal</h1>
      </div>
      <div>
        <div className='logout-btn' onClick={()=>signOut(auth)}>Cerra sesión</div>
      </div>
    </header>
  )
}

export default Header