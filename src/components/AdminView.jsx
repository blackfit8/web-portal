import React, { useEffect, useState } from 'react'
import UsersList from './UsersList'
import appFirebase from '../firebaseconf'
import {getFirestore, collection, getDocs} from 'firebase/firestore'
import NewsList from './NewsList'
import ChaptersList from './ChaptersList'

const AdminView = ({user}) => {

  const firestore = getFirestore(appFirebase)
  const usersCollection = collection(firestore, 'users')

  const [userList, setUserList] = useState([])

  const [usersBtn, setUsersBtn] = useState(false)
  const [chaptersBtn, setChaptersBtn] = useState(false)
  const [newsBtn, setNewsBtn] = useState(true)

  const getUserList = async ()=>{
    const data = await getDocs(usersCollection)
    const dataUsers = []
    data.forEach((doc)=>{
      dataUsers.push(doc.data())
    })
    setUserList(dataUsers)
    setUsersBtn(true)
    setNewsBtn(false)
    setChaptersBtn(false)
  }

  const getChapterList = async ()=>{
    setChaptersBtn(true)
    setUsersBtn(false)
    setNewsBtn(false)
  }
  const getNewsList = async ()=>{
    setChaptersBtn(false)
    setUsersBtn(false)
    setNewsBtn(true)
  }

  useEffect(() => {
    setUsersBtn(false)
    setNewsBtn(true)
    setChaptersBtn(false)
  }, [])
  

  return (
    <div>
        <div>
        <ul className='nav-bar'>
            <li onClick={getNewsList}>Noticias</li>|
            <li onClick={getChapterList}>Capítulos</li>|
            <li onClick={getUserList}>Usuarios</li>
        </ul>
        </div>
        <div className='main-box'>
       
        {
          usersBtn === true ? <UsersList users={userList} getUserList={getUserList}/> : ""
        }
        {
          newsBtn === true ? <NewsList user={user}/> : ""
        }
        {
          chaptersBtn === true ? <ChaptersList user={user}/> : ""
        }
         </div>
    </div>
  )
}

export default AdminView