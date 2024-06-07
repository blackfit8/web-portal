import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import appFirebase from './firebaseconf';
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';



function App() {
  const auth = getAuth(appFirebase)
  const firestore = getFirestore(appFirebase)

  const [user, setUser] = useState(null)

  const getRol = async (uid)=>{
    const docRef= doc(firestore, `users/${uid}`)
    const data = await getDoc(docRef)
    const infoRol = data.data().rol
    return infoRol
  }

  const setUserAndRol = (userFirebase) =>{
    getRol(userFirebase.uid).then((rol)=>{
      const userData = {
      uid: userFirebase.uid,
      email: userFirebase.email,
      rol:rol
      }
      setUser(userData)
    })
  }

  onAuthStateChanged(auth, (userFirebase)=>{
    if(userFirebase){
      if(!user){
        setUserAndRol(userFirebase)
      }
      
    }else{
      setUser(null)
    }
  })

  return (
    <>
    {user ? <HomePage user={user}/> : <LoginPage/>}
    </>
    
  );
}

export default App;
