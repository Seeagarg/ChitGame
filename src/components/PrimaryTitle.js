import React from 'react'
import classes from "./PrimaryTitle.module.css";

const PrimaryTitle = ({title}) => {
  return (
    <h3 className={classes.title}>{title}</h3>
  )
}

export default PrimaryTitle