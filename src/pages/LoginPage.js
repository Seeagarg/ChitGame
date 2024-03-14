import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import classes from './LoginPage.module.css'
import Card from "../components/Card";
import PrimaryTitle from "../components/PrimaryTitle";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import TextField from '@mui/material/TextField';
import { loginApi } from '../api/Http';
import { useDispatch } from 'react-redux';
import { addUser } from '../Slices/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from '../Cookie';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = getCookie()? JSON.parse(getCookie()):""

    useEffect(()=>{
      if(token !== ""){
        navigate('/')
      }
    },[])

    const [number,setNumber] = useState("");
    const [password,setPassword] = useState("");
    console.log(number,password);

   const handleLoginClick=async()=>{
  
    const response = await loginApi(number,password);
    localStorage.clear();
    console.log(response)
    if(response.status == 200){
      console.log("clicked",response.data);
      dispatch(addUser(response.data));
      setTimeout(()=>{
        navigate('/game')
      },1000)
    }
    else{
      console.log(response.err)
    }

   }
  



  return (
    <Layout>
    <ToastContainer/>
    <Card>
          <PrimaryTitle title="Login to play!!" />
         
         <form action="submit" className={classes.form}>
         <div>
         <label htmlFor="" className={classes.label}>Number</label>
         <input type='text' placeholder='Enter Number..'   value={number} onChange={(e)=>{setNumber(e.target.value)}} className={classes.input} />
         </div>
         <div>
         <label htmlFor="" className={classes.label}>Password</label>
         <input type='password' placeholder='Enter Password..'  value={password} onChange={(e)=>{setPassword(e.target.value)}} className={classes.input}/>
         </div>
         </form>


          <Button
            text="Login"
            buttonStyle={5}
            onPress={handleLoginClick}
          />
          
        </Card>
    </Layout>
  )
}

export default LoginPage
