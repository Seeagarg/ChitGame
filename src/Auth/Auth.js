import React, { useEffect } from 'react'
import { getCookie } from '../Cookie'
import { useNavigate } from 'react-router-dom';

const Auth = ({children}) => {

    const navigate = useNavigate();
    const token = getCookie()?JSON.parse(getCookie()).token:"";
    useEffect(()=>{
        if(!token){
            navigate('/login')
        }
        
    },[])
  return (
    <div>
      {children}
    </div>
  )
}

export default Auth
