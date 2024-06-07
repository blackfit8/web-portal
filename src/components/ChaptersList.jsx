import React, {useState, useEffect} from 'react'
import { collection, getFirestore, getDocs } from 'firebase/firestore'
import appFirebase from '../firebaseconf'

const ChaptersList = () => {
  
  const [chaptersList, setChaptersList] = useState([])
  
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
      {
        chaptersList.map((e,index)=>(
          <div key={index}>
            {e.title}
            

          </div>
        ))
      }
      
    </div>
  )
}

export default ChaptersList