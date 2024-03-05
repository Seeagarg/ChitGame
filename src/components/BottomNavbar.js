import React from "react";
import classes from "./BottomNavbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

const BottomNavbar = () => {
  const navigate = useNavigate();

  const navigateHandler = (path) => {
    navigate(path);
  };
  return (
    <div className={classes.navbar}>
      <div className={classes.navbar_items}>
        <Button
          icon={<i className={`fa-solid fa-house-chimney ${classes.icon}`}></i>}
          text="Home"
          buttonStyle={1}
          onPress={() => navigateHandler("/home")}
        />
        <Button
          icon={<i className={`fa-solid fa-info ${classes.icon}`}></i>}
          text="Instructions"
          buttonStyle={2}
          onPress={() => navigateHandler("/instructions")}
        />
        <Button
          icon={<i className={`fa-brands fa-teamspeak ${classes.icon}`}></i>}
          text="Terms"
          buttonStyle={3}
          onPress={() => navigateHandler("/terms")}
        />
        <Button
          icon={<i className={`fa-solid fa-user ${classes.icon}`}></i>}
          text="Account"
          buttonStyle={4}
          onPress={() => navigateHandler("/account")}
        />
      </div>
    </div>
  );
};

export default BottomNavbar;
