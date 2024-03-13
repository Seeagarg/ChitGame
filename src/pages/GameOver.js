import React,{useState,useEffect} from 'react'
import Layout from "../components/Layout";
import BottomNavbar from "../components/BottomNavbar";
import Card from "../components/Card";
import PrimaryTitle from "../components/PrimaryTitle";
import classes from "./AccountPage.module.css";
import Button from "../components/Button";
import { getCookie, removeCookie } from "../Cookie";
import { accountApi } from "../api/Http";
import { useNavigate } from "react-router-dom";
import Lottie from 'lottie-react';
import Gameover from '../staticAnimations/gameover.json'
import envelope from  '../staticAnimations/envelope.json'
import DeletedItemModal from '../components/DeletedItemModal';
import { useDispatch, useSelector } from 'react-redux';
import cardSlice from '../Slices/cardSlice';
import { addAccount } from '../Slices/accountSlice';
// import Lottie from 'lottie-react';

const GameOver = () => {

    // const [data,setData] = useState([]);
    const [open,setOpen] = useState(false);
    const dispatch = useDispatch();

    const items = useSelector((state)=>state.cardSlice)
    const data = useSelector((state)=>state.accountSlice);
   
  const navigate = useNavigate();

  const msisdn = getCookie()?JSON.parse(getCookie()).msisdn:"";

  useEffect(()=>{
    const fetchAccountData=async()=>{
      const response = await accountApi(msisdn);
      console.log(response);
      dispatch(addAccount(response));
      // setData(response);
    }

    fetchAccountData();
    
    
  },[])


  useEffect(()=>{
    if(data.tries !== 0){
      navigate('/')
    }
  },[])

  return (
    <Layout>
    <Card>
      <PrimaryTitle title={`User: ${data?.msisdn}`} />
      <h3 className={classes.number}></h3>
      <div className={classes.card_padding} style={{padding:"0px"}}>
        {/* <img
          src="/assets/images/panda.png"
          alt="avatar"
          className={classes.avatar}
        /> */}

        <Lottie
                animationData={Gameover}
                style={{height:"150px",width:"150px"}}
                className={classes.avatar}
            />
        

        <div className={classes.prizes_container}>
          {/* SHOW BUTTON THAT SAYS PRIZES WON AND TRIES LEFT , BUY TRIES */}
          <div className={classes.card_secondary}>
            <div className={classes.card_nav}>
              <h3 className={classes.card_title}>Prizes Won!</h3>
            </div>
            <div className={classes.card_content}>
           
              <img
                src="/assets/images/prize.png"
                alt="prize"
                className={classes.svg}
              />
              <p className={classes.p}>${data?.price}</p>
            </div>
          </div>

          <div className={classes.card_secondary}>
            <div className={classes.card_nav}>
              <h3 className={classes.card_title}>Tries Left!</h3>
            </div>
            <div className={classes.card_content}>
              <img
                src="/assets/images/undo.png"
                alt="tries"
                className={classes.svg}
              />
              <p className={classes.p}>{data?.tries}</p>
            </div>
          </div>

          <div className={classes.card_secondary}>
            <div
              className={classes.card_nav}
              style={{ backgroundColor: "#F989FF" }}
            >
              <h3 className={classes.card_title}>Items</h3>
            </div>
            <div className={classes.card_content} >
              <img
                src="/assets/images/envelop.png"
                alt="cart"
                className={classes.svg}
              />
              {/* <Lottie
                animationData={envelope}
                className={classes.svg}
                style={{height:"70px",width:"70px",padding:"0px"}}
            /> */}
        
              <button type="button" className={classes.btn} onClick={()=>{setOpen(true)}}>
                Open 
              </button>
              {/* <p className={classes.p}>Buy Tries</p> */}
            </div>
          </div>
        </div>
        {/* <Button text="Logout" buttonStyle={5} onPress={logoutHandler} /> */}
      </div>
      <button type="button" className={classes.btn} onClick={()=>{navigate('/')}}>
                Go Back 
              </button>
    </Card>
    <DeletedItemModal open={open} items = {items} close ={()=>{setOpen(false)}} />
    <BottomNavbar />
  </Layout>
  )
}

export default GameOver
