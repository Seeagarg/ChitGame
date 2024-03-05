import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import BottomNavbar from "../components/BottomNavbar";
import classes from "./GamePage.module.css";
import { motion, useAnimation } from "framer-motion";
import Badge from '@mui/material/Badge';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DeletedItemModal from "../components/DeletedItemModal";
import InfoIcon from '@mui/icons-material/Info';
import DraftsIcon from '@mui/icons-material/Drafts';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';

const GamePage = () => {

  const [count,setCount] = useState(0);
  const [showModal,setShowModal] = useState(false);

function notificationsLabel(num) {
  if (num == 0) {
    return 'no notifications';
  }
  if (num > 99) {
    return 'more than 99 notifications';
  }
  // console.log(num,"??")
  return `${num} notifications`;
}

  const animationControls = useAnimation();
  
  const [data, setData] = useState([
    {
      id: "1",
      value: "Rs.10",
    },
    {
      id: "2",
      value: "Empty!",
    },
    {
      id: "3",
      value: "Empty!",
    },
    {
      id: "4",
      value: "Rs.10",
    },
    {
      id: "5",
      value: "Empty!",
    },
    {
      id: "6",
      value: "Empty!",
    },
    {
      id: "7",
      value: "Empty!",
    },
  ]);

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const shuffledData = shuffleArray([...data]);

    setData(shuffledData);
  }, []);

  const [showItem, setShowItem] = useState([]);
  const [moveItem,setMoveItem]=useState("");
  const [deletedItems,setDeletedItems] = useState([]);

  const handleClick = (id,value) => {
    setTimeout(()=>{
      if(!showItem.includes(id)){
        setCount(count+1);
      }
    },1000)
   
    setShowItem(id);
    // const obj = data.filter((item)=>item.id == id)
    setDeletedItems([...deletedItems,{id:id,value:value}])
  };

  console.log(showItem, "showItem");

  return (
    <Layout>
    
      <div className={classes.grid}>
     
        {filteredData?.map((dataItem, i) => {
          return (
            <motion.div
            animate={
              showItem.includes(dataItem?.id)
               &&
              {rotate: 360 ,x:360,transitionDelay:"3s",transitionDuration:"3s",transition:{ease:"easeInOut"}}
            }
              className={classes.wrapper}
              onClick={() => handleClick(dataItem?.id,dataItem.value)}
              key={dataItem?.id}
            >
              <div
                className={`${classes.lid} ${classes.one} ${
                  showItem.includes(dataItem?.id) && classes.open_lid_one
                }`}
              ></div>
              <div
                className={`${classes.lid} ${classes.two} ${
                  showItem.includes(dataItem?.id) && classes.open_lid_two
                }`}
              ></div>
              <div className={classes.envelope}></div>
              <div
                className={`${classes.letter} ${
                  showItem.includes(dataItem?.id) && classes.open_letter
                }`}
              >
                <p>{dataItem?.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className={classes.delete_icon}>
      <IconButton aria-label={notificationsLabel(count)} style={{marginTop:"2rem"}}>
  <Badge badgeContent={count} color="secondary">
    <MarkAsUnreadIcon  style={{fontSize:"5rem",cursor:"pointer",color:"white"}} onClick={()=>{setShowModal(true)}}
    />
  </Badge>
</IconButton>
      </div>
      <BottomNavbar />
      <DeletedItemModal open={showModal} items = {deletedItems} close ={()=>{setShowModal(false)}} />
    </Layout>
  );
};

export default GamePage;
