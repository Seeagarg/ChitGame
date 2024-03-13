import React from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import classes from './DeletedItemModal.module.css'
import Button from '@mui/material/Button';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    alignContent:"center"
  };

const DeletedItemModal = ({open,items,close})=>{

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      
        <Box sx={style}  >
      
        <div style={{fontSize:"3rem",fontWeight:"800"}}>
          Opened Items
          <Button variant="contained" color='error' size="medium" onClick={close} className={classes.close_btn}>Close</Button>
          </div>
          
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
          <div className={classes.grid}>
          {items.length>0 ? ( items.map((dataItem,idx)=>
          
          (
            <div
              className={classes.wrapper}
              key={dataItem?.id}
            >
              <div
                className={`${classes.lid} ${classes.one} ${ classes.open_lid_one}`}
              ></div>
              <div
                className={`${classes.lid} ${classes.two} ${ classes.open_lid_two}`}
              ></div>
              <div className={classes.envelope}></div>
              <div
                className={`${classes.letter} ${classes.open_letter}`}
              >
                <p>{dataItem?.value}</p>
              </div>
            </div>
            ))):(
              <p style={{fontSize:"2rem"}}>
                No Items To Display
              </p>
            )
            }
            </div>
          
          {/* </Typography> */}
        </Box>
      </Modal>
    </div>
  )
}

export default DeletedItemModal
