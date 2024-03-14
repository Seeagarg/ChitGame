import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import classes from './QuestionModal.module.css'
import Button from '@mui/material/Button';
import { addPriceApi, questionApi } from '../api/Http';
import { useState } from 'react';
import Lottie from 'lottie-react';
import win from '../staticAnimations/win.json'
import lose from '../staticAnimations/lose.json'

const QuestionModal = ({open,close,question,price,remove,AddScore}) => {

    const [answer,setAnswer] = useState("")
    const [disabled,setDisabled] = useState(false);
    const [rightAnswer,setRightAnswer] = useState("");
    const [prize,setPrize] = useState(false);
    const [active,setActive] = useState(false)
    const [loss,setLoss] = useState(false)
    // const [question,setQuestion] = useState([])


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        // borderRadius:"20px",
        boxShadow: 24,
        p: 4,
        alignContent:"center"
      };


    //   const fetchQuestion =async()=>{
    //     const question = await questionApi();
    //     setQuestion(question.result)
    //     console.log(question.result,"question");
    //   }

      useEffect(()=>{
        if(!open){
          setLoss(false)
          setPrize(false)
          setAnswer("")
          setRightAnswer("")
          setDisabled(false);
        }
      },[open])


      const handleOptionSelect=(selectedOption,right)=>{
        // console.log("clicked")
        setAnswer(selectedOption);
        setDisabled(true);
        setRightAnswer(right);
        setActive(true);  
      }

      const addPrice=async()=>{
        const response = await addPriceApi(price);
        console.log(response);
        AddScore();
      }
      
      useEffect(()=>{
        if(answer === rightAnswer && answer && rightAnswer){
            // console.log(answer,"right ans")
            setPrize(true);
            addPrice();
            setTimeout(()=>{
             
                close();
              
            },3000)
            
        }

       if(answer !== rightAnswer && answer && rightAnswer){
          setLoss(true)
          setTimeout(()=>{
      
              close();
     
            
          },2000) 
          remove();
        }
      },[rightAnswer])
      // console.log(loss)

  return (
  
      <div >
      <Modal
        open={open}
        onClose={disabled && close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modal}
      >
        <Box sx={style}  >

        {!answer ?
        <>
        
        <div style={{fontSize:"2rem",fontWeight:"800"}}>
          Answer This Question??
          {/* <Button variant="contained" color='error' size="medium" onClick={close} className={classes.close_btn}>Close</Button> */}
          </div>
          
          <div className={classes.question_wrapper}>
          <div className={classes.question}>
          {/* {question.quesion &&  */}
            <p>{question?.question}</p>
            {/* } */}
          </div>
          <div >
          {question?.optionA ?
            <button value="option1" disabled={disabled} onClick={()=>{handleOptionSelect(question.optionA,question.correctAnswer)}} aria-disabled={disabled} className={`${classes.btn_option} ${classes.selected} ${disabled ? classes.disabled :""} `}>{question?.optionA}</button>:""}
            {question?.optionB ? <button value="option2" disabled={disabled} onClick={()=>{handleOptionSelect(question.optionB,question.correctAnswer)}} className={`${classes.btn_option} ${classes.selected}`}>{question?.optionB}</button>:""}
            {question?.optionC ? <button value="option3" disabled={disabled} onClick={()=>{handleOptionSelect(question.optionC,question.correctAnswer)}} className={`${classes.btn_option} ${classes.selected}`}>{question?.optionC}</button>:""}
            {question?.optionD ? <button value="option4" disabled={disabled} onClick={()=>{handleOptionSelect(question.optionD,question.correctAnswer)}} className={`${classes.btn_option} ${classes.selected}`}>{question?.optionD}</button>:""}
           
          </div>
          {/* <button className={classes.submit_btn}>Submit</button> */}
          </div>
          </>:""
        }

          {prize &&
            <div className={classes.win}>
          <p>You Won!!</p>
          <Lottie
            animationData={win}
            className={classes.animation}
          />
          <p>${price}</p>
            </div>
          }
          {
            loss &&
            <div className={classes.win}>
          <p>Try Again !!</p>
          <Lottie
            animationData={lose}
            className={classes.animation}
          />
          <p>$0</p>
            </div>

          }
        </Box>
      </Modal>
    </div>
   
  )
}

export default QuestionModal
