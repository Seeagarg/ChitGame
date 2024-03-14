import React from "react";
import classes from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar";
import Lottie from "lottie-react";
import animationData from "../staticAnimations/envelope.json";
import Button from "../components/Button";
import Layout from "../components/Layout";
import Card from "../components/Card";
import PrimaryTitle from "../components/PrimaryTitle";
import { getCookie } from "../Cookie";

const HomePage = () => {
  const token = getCookie()?JSON.parse(getCookie()).token:"";
  const navigate = useNavigate();
  const navigateHandler = () => {
    if(token){
      // localStorage.removeItem('root');
      localStorage.clear()
      setTimeout(() => {
        // navigate('/game');
        window.location.href = '/game';
      }, 1000);
    }
    else{
      navigate("/login");
    }
    
  };

  return (
    <>
      <Layout>
        <Card>
          <PrimaryTitle title="Welcome to Chit Game!" />
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            className={classes.animation}
          />
          <Button
            text="Play"
            buttonStyle={5}
            onPress={navigateHandler}
          />
        </Card>
        <BottomNavbar />
      </Layout>
    </>
  );
};

export default HomePage;
