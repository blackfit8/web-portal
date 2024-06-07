import React, {useState} from 'react'
import appFirebase from '../firebaseconf'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import {getFirestore, doc, setDoc } from 'firebase/firestore'


const LoginPage = () => {

  const auth = getAuth(appFirebase)
  const firestore = getFirestore(appFirebase)

  const [register, setRegister] = useState(false)

  const userAuthentication = async (e) =>{
    e.preventDefault()
    const email = e.target.email.value
    const pass = e.target.password.value

    if (register){
      try {
        const infoUser = await createUserWithEmailAndPassword(auth,email,pass).then((userFirebase)=>{
          return userFirebase;
        });

        console.log(infoUser.user.uid);
        const docRef= doc(firestore, `users/${infoUser.user.uid}`)
        setDoc(docRef, { email: email, rol: "user" })

      } catch (error) {
        alert("No se ha podido crear su cuenta")
      }
      
    }else{
      try {
        await signInWithEmailAndPassword(auth,email,pass)
      }catch (error) {
        alert("credenciales invalidas")
      }
      
    }
  }

  return (
    <div className='landingpage-background'>
      <div className='login-box'>
        <div className='image'><img className='login-logo' src="/logo_trial.png" alt='' height="120px" width="120px"/></div>
        {register ?
        <form onSubmit={userAuthentication}>
          <label className='label'>Email: </label><br /><input id="email" className='input' type="email" placeholder='Enter your email'/><br />
          <label className='label'>Contraseña: </label><br /><input id='password' className='input' type="password" placeholder='Enter your password'/><br />
          <label className='label'>Confirmar contraseña: </label><br /><input id='confirm' className='input' type="password" placeholder='Confirm your password'/><br />
          <button className='register-btn'>Registrarse</button>
        </form>
        :
        
        <form onSubmit={userAuthentication}>
          <label className='label'>Email: </label><br /><input id="email" className='input' type="email" placeholder='Enter your email'/><br />
          <label className='label'>Contraseña: </label><br /><input id='password' className='input' type="password" placeholder='Enter your password'/><br />
          <button className='register-btn'>Iniciar sesión</button>
        </form> 
        }
        <p >{register ? "Si ya tienes cuenta ": "¿No tienes cuenta? "}<b className='to-reg-log' onClick={()=>setRegister(!register)}>{register ? "¡Inicia sesión!":"¡Registrate ahora!"}</b></p>
      </div>
    </div>
  )
}

export default LoginPage