import React, { useState } from 'react'
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

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [number,setNumber] = useState("");
    const [password,setPassword] = useState("");
    console.log(number,password);

   const handleLoginClick=async()=>{
    const response = await loginApi(number,password);
    console.log("clicked",response);
    dispatch(addUser(response));
    navigate('/game')
   }
  



  return (
    <Layout>
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
