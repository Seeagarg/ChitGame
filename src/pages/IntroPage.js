import React, { useEffect } from "react";
import classes from "./IntroPage.module.css";
import Lottie from "lottie-react";
import animationData from "../staticAnimations/envelope.json";
import { useNavigate } from "react-router-dom";

const IntroPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/home");
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.sub_container}>
        {/* <img src="/assets/images/text.gif" alt="" className={classes.gif} /> */}
        <h3 className={classes.title}>Welcome to Chit Game</h3>
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          className={classes.animation}
        />
      </div>
    </div>
  );
};

export default IntroPage;
