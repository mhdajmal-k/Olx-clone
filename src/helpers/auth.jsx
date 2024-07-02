import React, { useContext } from 'react'
import { AuthContext } from '../Store/context'
import { Navigate } from 'react-router-dom'
const AuthChecking = ({children}) => {
 const {user}=useContext(AuthContext)
 return user?children:<Navigate to={"/login"}/>
}

export default AuthChecking