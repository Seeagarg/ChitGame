import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import BottomNavbar from "../components/BottomNavbar";
import Card from "../components/Card";
import PrimaryTitle from "../components/PrimaryTitle";
import classes from "./AccountPage.module.css";
import Button from "../components/Button";
import { getCookie, removeCookie } from "../Cookie";
import { accountApi } from "../api/Http";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAccount } from "../Slices/accountSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AccountPage = () => {

  // const [data,setData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state)=>state.accountSlice)

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

  const logoutHandler = () => {
    removeCookie();
    navigate('/login')
    console.log("logout");
  };


  return (
    <Layout>
      <Card>
        <PrimaryTitle title="Account" />
        <div className={classes.card_padding}>
          <img
            src="/assets/images/panda.png"
            alt="avatar"
            className={classes.avatar}
          />

          <h3 className={classes.number}>{data?.msisdn}</h3>

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
                <h3 className={classes.card_title}>Buy Tries!</h3>
              </div>
              <div className={classes.card_content}>
                <img
                  src="/assets/images/cart.png"
                  alt="cart"
                  className={classes.svg}
                />
                <button type="button" className={classes.btn}>
                  Buy Tries
                </button>
                {/* <p className={classes.p}>Buy Tries</p> */}
              </div>
            </div>
          </div>
          <Button text="Logout" buttonStyle={5} onPress={logoutHandler} />
        </div>
      </Card>
      <BottomNavbar />
      <ToastContainer/>
    </Layout>
  );
};

export default AccountPage;
