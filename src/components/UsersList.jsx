import { collection,query,where, doc, updateDoc, getFirestore, getDocs, deleteDoc } from 'firebase/firestore'
import appFirebase from '../firebaseconf'
import React, { useEffect, useState } from 'react'

const UsersList = ({users, getUserList}) => {

    
    const firestore = getFirestore(appFirebase)

    const [editMail, setEditMail] = useState("")
    const [editRol, setEditRol] = useState("")
    const [changeUserRol, setChangeUserRol] = useState("")

    const [confirmDelete, setConfirmDelete] = useState(false)

    const getEditInfo = (mail, rol)=>{
        setEditMail(mail)
        setEditRol(rol)
    }
    
    const updateUser = async () =>{
        try {
            const getFireUser = await query(collection(firestore, "users"), where("email","==", editMail))
            const qSnap = await getDocs(getFireUser)
            let userId = ""
            qSnap.forEach((e)=>{
                userId=e.id
            })
            const queryUser = await doc(firestore, "users", userId)
            if (editMail === "numenportal@gmail.com") {
                throw new Error("No se permite editar la cuenta de administrador")
            }else{
                if(changeUserRol!=="admin"){
                    await updateDoc(queryUser, {
                        rol:"user"
                    })
                }else{
                    await updateDoc(queryUser, {
                    rol:changeUserRol
                })
                }
                
                alert(`Se han aplicado los cambios de ${editMail} correctamente`)
            } 
        } catch (error) {
            alert(error)
        }
    }

    const deleteUser = async () =>{
        try {
            const getFireUser = await query(collection(firestore, "users"), where("email","==", editMail))
            const qSnap = await getDocs(getFireUser)
            let userId = ""
            qSnap.forEach((e)=>{
                userId=e.id
            })
            if (editMail === "numenportal@gmail.com"){
                throw new Error("No se puede eliminar la cuenta de administrador")
            }else{
                await deleteDoc(doc(firestore, "users", userId))
                setConfirmDelete(false)
            }

        } catch (error) {
            alert(error)
        }
    }

    useEffect(()=>{
        getUserList()
    },[confirmDelete])


  return (
    <>
    <div className='userlist'>
        
        <h1>Panel de administración de usuarios</h1>
        <div className='admin-user-panel'>
            <div>
            {
                users.map((user, index)=>(
                    <div key={index}>
                        <ul className='user-row'>
                            <li className='edit-user-email'>{user.email}</li>
                            <li className='edit-user-rol'>{user.rol}</li>
                            <li className='edit-user-btn' onClick={e => getEditInfo(user.email, user.rol)}>Editar</li>
                        </ul>
                    </div>
                ))
            }
            </div>
            
                {
                    editMail ? 
                <><div className='edit-user-box'>
                <h2>Editar datos del usuario</h2>
                <div>
                    <ul>
                        <li>Email: {editMail}</li>
                        {
                            editMail === "numenportal@gmail.com" ? <span>Rol: Administrador</span>:
                            <>
                            <span>Rol: </span>
                            <select name="rol" onChange={e=>setChangeUserRol(e.target.value)}>
                                <option value="user">Usuario</option>
                                <option value="admin">Administrador</option>
                            </select>
                            </>
                        }
                        
                    </ul>
                    {
                        editMail === "numenportal@gmail.com" && editRol === "admin" ? <p className='alert'>No se puede editar la cuenta de administrador</p>
                        :
                    <>
                        <div onClick={updateUser} className='save-btn'>Guardar</div>
                        <div onClick={e=> setConfirmDelete(true)} className='delete-btn'>Eliminar</div>
                    </>
                    }
                </div></div></>:<></>}
            
        </div>
        
    </div>
    {
        confirmDelete === true ? 
    
    <div className='confirm-delete-box'>
        <div>
            <div>¿Estas seguro de que quires eliminar este usuario?</div>
            <button onClick={deleteUser}>ELIMINAR</button>
            <button onClick={e=> setConfirmDelete(false)}>CANCELAR</button>
        </div>
    </div>:<></>}</>
    
  )
}

export default UsersList