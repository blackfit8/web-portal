import React, { useEffect, useState } from 'react'
import NewsList from './NewsList'
import ChaptersList from './ChaptersList'

const UserView = ({user}) => {

  const [newsBtn, setNewsBtn] = useState(true)
  const [chaptersBtn, setChaptersBtn] = useState(false)
  const [demoBtn, setDemoBtn] = useState(false)

  const getNewsList = ()=>{
    setNewsBtn(true)
    setChaptersBtn(false)
    setDemoBtn(false)
  }
  const getChaptersList = ()=>{
    setNewsBtn(false)
    setChaptersBtn(true)
    setDemoBtn(false)
  }
  const getDemoList = ()=>{
    setNewsBtn(false)
    setChaptersBtn(false)
    setDemoBtn(true)
  }

  useEffect(()=>{
    setNewsBtn(true)
    setChaptersBtn(false)
    setDemoBtn(false)

  },[])
  return (
    <div>
      <div>
        <ul className='nav-bar'>
            <li onClick={getNewsList}>Noticias</li>|
            <li onClick={getChaptersList}>Capítulos</li>|
            <li onClick={getDemoList}>Demo: Un mundo perdido</li>
        </ul>
      </div>
      <div className='main-box'>
      
      {
          demoBtn === true ? <div className='game' >
            <h1>DEMO: Un mundo perdido</h1>
              <div className='demo-btn'>
                <a href="https://lost-world-cae850de3278.herokuapp.com/" target='_blank' rel='noreferrer'><img src="menu.png" alt="" height="500vh"/></a> 
              </div>
            </div>: ""
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

export default UserView