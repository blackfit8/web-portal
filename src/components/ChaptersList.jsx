import React, {useState, useEffect} from 'react'
import { collection, getFirestore, getDocs } from 'firebase/firestore'
import appFirebase from '../firebaseconf'

import { Scrollbar } from 'react-scrollbars-custom'

const ChaptersList = () => {
  
  const [chaptersList, setChaptersList] = useState([])

  const [chapterTitle, setChapterTitle] = useState(null)
  const [chapterText, setChapterText] = useState(null)

  const getChapterView = (title, text) =>{
    setChapterText(text)
    setChapterTitle(title)
  }
  
  useEffect(() => {
    const firestore = getFirestore(appFirebase) 
    const chaptersCollection = collection(firestore, "chapters")
    const getChapters = async ()=>{
      const data = await getDocs(chaptersCollection)
      const dataChapters = []
      data.forEach((doc)=>{
        dataChapters.push(doc.data())
      })
      setChaptersList(dataChapters)
    }
  getChapters()
  }, [])
  
  return (
    <div className='chapterslist'>
      <h1>Un mundo perdido</h1>
      <div className='chapters-grid'>
        <div>
          <h3>Capítulos</h3>
          <div className='chapterlist-box'>
            
          {
            chaptersList.map((chapter, index)=>(
              <div key={index} className='chapter-row' onClick={e=>getChapterView(chapter.title, chapter.text)}>
                <div>{chapter.title}</div>
                <hr />
              </div>
            ))
          }
          </div>
        </div>
        <div className='chapter-view'>
          {
            chapterTitle !== null ? 
            <>
              <h2>{chapterTitle}</h2>
              <hr />
              <div>{chapterText}</div>
            </>
            : ""
          }
        </div>
      <div>
      </div>  
      </div>
    </div>
  )
}

export default ChaptersList