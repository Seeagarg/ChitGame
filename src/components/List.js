import React from "react";
import classes from "./List.module.css";

const List = ({ listItems }) => {
  return (
    <ul className={classes.list_container}>
      {listItems.map((dataItem, index) => {
        return (
          <li className={classes.list} key={index}>
            {dataItem}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
