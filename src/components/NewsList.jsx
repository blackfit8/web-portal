import React, { useState, useEffect } from 'react'
import { collection, getFirestore, getDocs, addDoc, Timestamp, query, orderBy, deleteDoc, doc, where } from 'firebase/firestore'
import appFirebase from '../firebaseconf'

const NewsList = ({user}) => {

  const firestore = getFirestore(appFirebase)

  const [newsList, setNewsList] = useState([])
  const [createNew, setCreateNew] = useState(false)

  const [newTitle, setNewTitle] = useState("")
  const [newDesc, setNewDesc] = useState("")

  const [confirmDel, setConfirmDel] = useState(false)
  const [delTitle, setDelTitle] = useState("")
  const [delDesc, setDelDesc] = useState("")

  const addNew = async ()=>{
    try {
      await addDoc(collection(firestore,"news"),{
        title: newTitle,
        description: newDesc,
        date: Timestamp.now()
      })
      setCreateNew(false)
    } catch (error) {
      alert(error)
    }
  }

  const toDelete = (title, desc) =>{
    setConfirmDel(true)
    setDelTitle(title)
    setDelDesc(desc)
  }

  const deleteNew = async ()=>{
    try {
      const getFireUser = await query(collection(firestore, "news"), where("title","==", delTitle))
      const qSnap = await getDocs(getFireUser)
      let newId = ""
      qSnap.forEach((e)=>{
        newId=e.id
      })
      await deleteDoc(doc(firestore, "news", newId))
      setConfirmDel(false)
      
    } catch (error) {
      alert(error)
    }
  }

  
  useEffect(() => {
    setNewDesc("")
    setNewTitle("")
    const firestore = getFirestore(appFirebase) 
    const newsCollection = query(collection(firestore, "news"), orderBy("date", "desc"))
    const getNews = async ()=>{
      const data = await getDocs(newsCollection)
      const dataNews = []
      data.forEach((doc)=>{
        dataNews.push(doc.data())
      })
      setNewsList(dataNews)
      console.log(newsList);
    }
    getNews()
  }, [createNew])
  

  return (
    <div>
      <h1>Noticias</h1>
      <div>
      {
        createNew === true ? 
        <div className='create-new-box'>
          <div>
            <input className='create-new-title' placeholder='Titulo' onChange={e=>setNewTitle(e.target.value)}></input><br />
            <textarea className='create-new-text' placeholder='Empieza a escribir tu noticia...' rows="10" cols="50" onChange={e=>setNewDesc(e.target.value)}></textarea>
            <div><span className='cancel-new-btn' onClick={e=>setCreateNew(false)}>Cancelar</span><span className='create-new-btn' onClick={addNew}>Publicar</span></div>
          </div>
        </div>:""
      }
      {
        confirmDel === true ?
        <div className='confirm-delete-box'>
          <div>
            <p>¿Estas seguro de que quieres eliminar esta noticia?</p>
            <div><span className='cancel-new-btn' onClick={e=>setConfirmDel(false)}>Cancelar</span><span className='create-new-btn' onClick={deleteNew}>Eliminar</span></div>
          </div>
        </div>:""
      }
      </div>
      {
        user.rol ==="admin" ? 
        <div className='add-new-btn' onClick={e=>setCreateNew(true)}>
          +Añadir Noticia
        </div>:""
      }
      <div className='newslist'>
      
      <div>
      {
        newsList.map((enew, index) => (
          <div key={index} className='new-card'>
          <h2>{enew.title}</h2>
          <p className='date'> Publicado: {enew.date.toDate().toLocaleString('es-ES')}</p>
          <p>{enew.description}</p>
          {
            user.rol === "admin" ? <div className='delete-new-btn' onClick={e=>toDelete(enew.title, enew.description)}>Eliminar</div>:""
          }
          </div>
        ))
      }</div>    
      </div>
    </div>
  )
}

export default NewsList