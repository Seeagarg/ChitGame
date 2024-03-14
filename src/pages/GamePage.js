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
import debounce from 'lodash/debounce';
import { addQuestion, closeQuestion, openQuestion, removeQuestion } from "../Slices/questionSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from "lottie-react";
import Loading from '../staticAnimations/Loading.json'
// import Lottie from "lottie-web";

const GamePage = () => {

  const navigate = useNavigate();

  const [count,setCount] = useState(0);
  const [showModal,setShowModal] = useState(false);

  const status = useSelector((state)=>state.userSlice)

  const msisdn = getCookie()?JSON.parse(getCookie()).msisdn:"";

  const [showItem, setShowItem] = useState([]);
  const [moveItem,setMoveItem]=useState("");
  const [deletedItems,setDeletedItems] = useState([]);
  // const [showQuestion,setShowQuestion] = useState(false);
  const [currentItem,setCurrentItem] = useState();
  // const [question,setQuestion] = useState("");
  const [getBack,setGetBack] = useState(false);
  const [price,setPrice] = useState();
  const [tries,setTries] = useState();
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  const showQuestion = useSelector((state)=>state.questionSlice).questionOpen;
  const question = useSelector((state)=>state.questionSlice).question;
  console.log(showQuestion)

  const item = useSelector((state)=>state.cardSlice);
  const chitdata = useSelector((state)=>state.allChitSlice);
  const accountData = useSelector((state)=>state.accountSlice)

 
  useEffect(()=>{
    setTimeout(()=>{
      if(tries == 0){
        navigate('/gameover');
      }
    },2000)
  },[])


  const fetchAccountData=async()=>{
    const response = await accountApi(msisdn);
    console.log(response,'response....  ')
    setPrice(response?.price)
    setTries(response?.tries)
   
  }

  useEffect(()=>{
    fetchAccountData();
  },[])

  const fetchChitData=async()=>{
    const response = await chitApi();
    dispatch(allItems(response?.result))
    setLoading(false);
}

useEffect(()=>{
    if(item?.length == 0){
    fetchChitData();
    }
},[])

  useEffect(()=>{
    if(tries == 0 && !question){
      setTimeout(()=>{
        navigate('/gameOver')
      },5000)
    }
  },[tries,question])

function notificationsLabel(num) {
  if (num == 0) {
    return 'no notifications';
  }
  if (num > 99) {
    return 'more than 99 notifications';
  }
  return `${num} notifications`;
}


  const fetchQuestion =async()=>{
    const question = await questionApi();
   dispatch(addQuestion(question.result));

    // setQuestion(question.result)
  }

  useEffect(()=>{
    
    setTimeout(()=>{
      if(showItem.includes(currentItem?.id)){
        
        fetchAccountData();
      }
    },3000)
  },[showItem])



  const handleClick = async (id,value) => {
    if(item.find((item)=>item.id == id)){
      return;
    }
      console.log(item.find((item)=>item.id !== id),"item found")
  console.log(id,value,'value')
    const response = await decreaseTries();
    fetchAccountData();
    setShowItem([...showItem,id])
    setCurrentItem({id:id,price:value,currency:'$'})
    // setTimeout(()=>{
      // if(item.find((item)=>item.id !== id)){
        dispatch(addCard({id:id,value:value}))
      // }
     
    // },2000)
    
    // dispatch(shuffleChits(chitdata));
    console.log(showItem,'show')
 
    fetchAccountData();
    if(value == "EMPTY"){
      return;
    }

   fetchQuestion()
    setTimeout(()=>{
      dispatch(openQuestion());
    },2000)
  
  };

  // const debouncedHandleClick = debounce(handleClick, 1000);


  const AddScore=()=>{
    console.log('accountData fetching')
    dispatch(removeQuestion());
    fetchAccountData();
    console.log('accountData fetched')
  }

  const removeItem=()=>{
    console.log("removeItem invoked")
    dispatch(removeCard());
    dispatch(removeQuestion());
    showItem.pop();
    fetchAccountData();
    dispatch(addChit(currentItem));
    dispatch(shuffleChits(chitdata))
  }



  return (
    <Layout>

    <div className={classes.top}>
    <div className={classes.top1}>
    <p><strong>Tries:</strong>{tries}</p>
    {/* <p><strong>Tries:</strong>{accountData?.tries}</p> */}
    {/* <p> <strong>Price:</strong>${accountData?.price}</p> */}
    <p> <strong>Price:</strong>${price}</p>
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
          Array.isArray(chitdata) > 0 ?

          (
           !loading ?

           chitdata?.map((dataItem, i) => {
            {/* console.log(showItem.includes(dataItem?.id),"showitem"); */}
          return (
            <>
            {dataItem.id?
            <motion.div
            animate={
              // !getBack ? (
              item.find((item)=>item.id == dataItem?.id)
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
            :""
            }
            </>
          );
        }):<Lottie
          animationData={Loading}
        />
        )
        :<Lottie
          animationData={Loading}
        />
   
        }
      </div>
      
      <BottomNavbar />
      <DeletedItemModal open={showModal} items = {item} close ={()=>{setShowModal(false)}} />
      <QuestionModal open ={showQuestion} close={()=>{dispatch(closeQuestion())}} question={question} price={currentItem?.price} remove={removeItem} AddScore={AddScore}/>
      <ToastContainer/>
    </Layout>
  );
};

export default GamePage;
