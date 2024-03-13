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
import { useDispatch, useSelector } from "react-redux";
import userSlice from "../Slices/userSlice";
import cardSlice, { addCard, removeCard } from "../Slices/cardSlice";
import { accountApi, chitApi, decreaseTries, questionApi } from "../api/Http";
import QuestionModal from "../components/QuestionModal";
import { getCookie } from "../Cookie";
import { addAccount, addTries, addprice } from "../Slices/accountSlice";
import { useNavigate } from "react-router-dom";
import { addChit, allItems, removeChit, shuffleChits } from "../Slices/allChitSlice";

const GamePage = () => {

  const navigate = useNavigate();

  const [count,setCount] = useState(0);
  const [showModal,setShowModal] = useState(false);

  const status = useSelector((state)=>state.userSlice)

  const msisdn = getCookie()?JSON.parse(getCookie()).msisdn:"";

  const [showItem, setShowItem] = useState([]);
  const [moveItem,setMoveItem]=useState("");
  const [deletedItems,setDeletedItems] = useState([]);
  const [showQuestion,setShowQuestion] = useState(false);
  const [currentItem,setCurrentItem] = useState();
  const [question,setQuestion] = useState("");
  const [getBack,setGetBack] = useState(false);
  const [price,setPrice] = useState(0)
  // const [tries,setTries] = useState(10)
  const dispatch = useDispatch();
  const item = useSelector((state)=>state.cardSlice);
  const chitdata = useSelector((state)=>state.allChitSlice);
  const accountData = useSelector((state)=>state.accountSlice)


  const fetchAccountData=async()=>{
    const response = await accountApi(msisdn);
    dispatch(addAccount(response))
  }

  useEffect(()=>{
    fetchAccountData();
  },[])

  const fetchChitData=async()=>{
    const response = await chitApi();
    dispatch(allItems(response?.result))
}

useEffect(()=>{
  console.log(accountData?.tries)
  if(accountData?.tries == 10){
    fetchChitData();
    }
},[accountData])


  useEffect(()=>{
    if(accountData.tries == 0 && !question){
      setTimeout(()=>{
        navigate('/gameOver')
      },5000)
     
    }
  },[accountData])

function notificationsLabel(num) {
  if (num == 0) {
    return 'no notifications';
  }
  if (num > 99) {
    return 'more than 99 notifications';
  }
  return `${num} notifications`;
}

  useEffect(() => {

    dispatch(shuffleChits(chitdata))
  }, []);


  const fetchQuestion =async()=>{
    const question = await questionApi();
    setQuestion(question.result)
  }

  useEffect(()=>{
      if(!showItem.includes(currentItem?.id)){
        setCount(count+1);
        dispatch(removeChit(currentItem?.id));
        fetchAccountData();
      }
    
  },[showItem])
  

  const handleClick = async (id,value) => {
  console.log(value,'value')
    const response = await decreaseTries();
    setCurrentItem({id:id,price:value,currency:'$'})
    setTimeout(()=>{
      if(!showItem.includes(id)){
        setCount(count+1);
        dispatch(removeChit(id));
        fetchAccountData();
      }
    },3000)
    setShowItem([...showItem,id])

    dispatch(addCard({id:id,value:value}))
    fetchAccountData();
    if(value == "EMPTY"){
      return;
    }

   fetchQuestion()
    setTimeout(()=>{
      setShowQuestion(true)
    },2000)
  };


  const AddScore=()=>{
    console.log('accountData fetching')
    fetchAccountData();
    console.log('accountData fetched')
  }

  
  const removeItem=()=>{
    console.log("removeItem invoked")
    dispatch(removeCard());
    showItem.pop();
    fetchAccountData();
    dispatch(addChit(currentItem)) ;
    dispatch(shuffleChits(chitdata))
  }



  return (
    <Layout>

    <div className={classes.top}>
    <div className={classes.top1}>
    <p><strong>Tries:</strong>{accountData?.tries}</p>
    <p> <strong>Price:</strong>${accountData?.price}</p>
    </div>
    <div className={classes.top2}>
    {/* <div className={classes.delete_icon}> */}
      <IconButton aria-label={notificationsLabel(item?.length)} style={{float:"inline-end"}}>
  <Badge badgeContent={item?.length} color="secondary">
    <MarkAsUnreadIcon  style={{fontSize:"5rem",cursor:"pointer",color:"white"}} onClick={()=>{setShowModal(true)}}
    />
  </Badge>
</IconButton>
      {/* </div> */}
    </div>
    </div>
      <div className={classes.grid}>
        {
          
          (
           chitdata?.length>0 ?

          chitdata?.map((dataItem, i) => {
            {/* console.log(showItem.includes(dataItem?.id),"showitem"); */}
          return (
            <>
            
            <motion.div
            animate={
              // !getBack ? (
              showItem.includes(dataItem?.id)
               &&
              {rotate: 360 ,x:360,transitionDelay:"2s",transitionDuration:"3s",transition:{ease:"easeInOut"}}
              // ):{rotate: -360 ,x:0,transitionDelay:"2s",transitionDuration:"3s",transition:{ease:"easeInOut"}}

              
            } 
            
              className={classes.wrapper}
              onClick={() => handleClick(dataItem?.id,dataItem.price)}
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
              
                <p>{dataItem?.currency}{dataItem?.price}</p>
              </div>
            </motion.div>
            
            </>
          );
        }):"Loading..."
        )
   
        }
      </div>
      
      <BottomNavbar />
      <DeletedItemModal open={showModal} items = {item} close ={()=>{setShowModal(false)}} />
      <QuestionModal open ={showQuestion} close={()=>{setShowQuestion(false)}} question={question} price={currentItem?.price} remove={removeItem} AddScore={AddScore}/>

    </Layout>
  );
};

export default GamePage;
