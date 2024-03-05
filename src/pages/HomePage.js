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

const HomePage = () => {
  const navigate = useNavigate();
  const navigateHandler = (path) => {
    navigate(path);
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
            onPress={() => navigateHandler("/game")}
          />
        </Card>

        <BottomNavbar />
      </Layout>
    </>
  );
};

export default HomePage;
