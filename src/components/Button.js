import React from "react";
import classes from "./Button.module.css";

const Button = ({ icon, text, onPress, buttonStyle }) => {
  return (
    <button
      className={`${classes.btn} ${
        buttonStyle == 1
          ? classes.style1
          : buttonStyle == 2
          ? classes.style2
          : buttonStyle == 3
          ? classes.style3
          : buttonStyle ==4 ? classes.style4 : classes.style5
      }`}
      onClick={onPress}
    >
      <span className={classes.shadow}></span>
      <span className={classes.edge}></span>
      <span className={`${classes.front} ${classes.text}`}>
        {icon}
        <div className={classes.main}>{text}</div>
      </span>
    </button>
  );
};

export default Button;
