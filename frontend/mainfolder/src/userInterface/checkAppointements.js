import React, { useEffect, useState } from 'react'
import styles from '../assets/userCss/syles.module.css'
import {Link, useParams} from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {Zoom} from '@mui/material';
import '../assets/userCss/checkApoointemnt.css'
import { useCallback } from 'react'
import axios from 'axios'
import Navbar from '../userInterface/Navbar'
import Footer from '../userInterface/Footer'
function contact() {
    const {id} = useParams()
 
  const [open,setOpen] = useState(false)
  const [get,setGet] = useState(null)
  const [datas, setDatas] = useState([]);
  const [appdata,setappData] = useState({
    id:'',
    carname:'',
    carnumber:'',
    contact:'',
    email:'',
    location:'',
    status:'',
    name:'',
    price:'',
    date:'',
    remarks:''
  });
 
  
  console.log(datas)

  
  const handleClickOpen = (id) => {
    setOpen(true);
    setGet(id)
   
  };

  const handleClose = () => {
    setOpen(false);
  };


  const getappData =useCallback(async()=>{

    try{
        const response = await axios.get(`http://localhost:8000/user/gettappdata/${id}`)
        const data = await response.data;
        setDatas(data);
    }catch(err){
        console.log(err)
    }
  },[id])

  
  const getdataApp = useCallback(async()=>{

    try{
      const response = await axios.get(`http://localhost:8000/user/getappByid/${get}`)
      const data = await response.data;
      setappData({
        id:data.Appointment_id,
        carname:data.carName,
      carnumber:data.CarNumber,
      contact:data.contact,
      email:data.email,
      service:data.service,
      location:data.location,
      status:data.status,
      name:data.name,
      price:data.price,
      date:data.appointment_date,
      remarks:data.remarks

      });
      console.log('1111111',data)
  }catch(err){
      console.log(err)
  }
  },[get])

 useEffect(()=>{
        getappData()
        getdataApp()
 },[getappData,getdataApp])
 
  
  return (
    <div>
 
    <Navbar />
  {/* contact section */}
  <div className="container mt-5">
<div className="d-flex justify-content-center row">
<div className="col-md-10 col-lg-12">
<div className="shadow p-3 mb-5 bg-body rounded">
<div className="table-responsive table-borderless shadow-2-strong rounded-4">
    <h3 style={{fontFamily:'Onest, sans-serif',fontWeight:"700",color:"#0a97b0"}} className="text-center">M3 AUTOCARE</h3>
    <p style={{fontFamily:'Onest, sans-serif'}} className="text-center">Here is your appointment details</p>
  <table style={{marginTop:'2rem'}} className="table">
    <thead>
      <tr>
        <th className="text-center">
         
        </th>
        <th style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>Appointment Id</th>
        <th style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>Car Name</th>
        <th style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>Car No:</th>
        <th style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>Location</th>
        <th style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>Service</th>
        <th style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>Status</th>
        <th style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>Total Amount</th>
        <th style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>Appointment Date</th>
        <th style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>Action</th>
        <th />
      </tr>
    </thead>
    <tbody className="table-body">
  {datas.map((item) => (
    <tr className="cell-1" key={item.id}>
      <td className="text-center"></td>
      <td style={{ fontFamily: 'Onest, sans-serif' ,fontSize:'14px'}}>{item.Appointment_id}</td>
      <td style={{ fontFamily: 'Onest, sans-serif', textTransform: 'capitalize',fontSize:'14px' }}>{item.carName}</td>
      <td style={{ fontFamily: 'Onest, sans-serif', textTransform: 'uppercase',fontSize:'14px' }}>{item.CarNumber}</td>
      <td style={{ fontFamily: 'Onest, sans-serif', textTransform: 'uppercase',fontSize:'14px' }}>{item.location}</td>
      <td style={{ fontFamily: 'Onest, sans-serif', textTransform: 'capitalize' ,fontSize:'14px'}}>{item.service}</td>
      <td style={{ fontFamily: 'Onest, sans-serif' }}>
        {item.status === 'Received' &&(

        <span className="badge badge-success"  style={{ fontFamily: 'Onest, sans-serif' ,fontSize:'14px',position:'relative',bottom:'5px',backgroundColor:'#0a97b0'}}>{item.status}</span>
        )}
        {item.status === 'Seeking Issue' &&(

        <span className="badge badge-success"  style={{ fontFamily: 'Onest, sans-serif' ,fontSize:'14px',position:'relative',bottom:'5px',backgroundColor:'orange'}}>{item.status}</span>
        )}
        {item.status === 'Team on work' &&(

        <span className="badge badge-success"  style={{ fontFamily: 'Onest, sans-serif' ,fontSize:'14px',position:'relative',bottom:'5px',backgroundColor:'brown'}}>{item.status}</span>
        )}
        {item.status === 'On progress' &&(

        <span className="badge badge-success"  style={{ fontFamily: 'Onest, sans-serif' ,fontSize:'14px',position:'relative',bottom:'5px',backgroundColor:'purple'}}>{item.status}</span>
        )}
        {item.status === 'Checking all works' &&(

        <span className="badge badge-success"  style={{ fontFamily: 'Onest, sans-serif' ,fontSize:'14px',position:'relative',bottom:'5px',backgroundColor:'cyan'}}>{item.status}</span>
        )}
        {item.status === 'we are on last' &&(

        <span className="badge badge-success"  style={{ fontFamily: 'Onest, sans-serif' ,fontSize:'14px',position:'relative',bottom:'5px',backgroundColor:'pink'}}>{item.status}</span>
        )}
        {item.status === 'Work Done' &&(

        <span className="badge badge-success"  style={{ fontFamily: 'Onest, sans-serif' ,fontSize:'14px',position:'relative',bottom:'5px'}}>{item.status}</span>
        )}
      </td>
      <td style={{ fontFamily: 'Onest, sans-serif' ,fontSize:'14px' }}>₹{item.price}</td>
      <td style={{ fontFamily: 'Onest, sans-serif' ,fontSize:'14px' }}>{item.appointment_date}</td>
      <button onClick={()=>handleClickOpen(item._id)} style={{color:'#0a97b0'}} className={styles.viewbtn}>View</button>
    
    </tr>
  ))}
</tbody>

  </table>
</div>
</div>
</div>
</div>
</div>
  {/* end contact section */}
  {/* info section */}
<div>
  <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth maxWidth='md'
      >
        <DialogTitle id="alert-dialog-title" style={{color:'#0a97b0'}}>
          {"Appointment Details"}
        </DialogTitle>
        <DialogContent>
        <div style={{display:'flex',gap:'50px'}}>
          <div>
          <DialogContentText className={styles.dialogpop} >
            <span  className={styles.dialogpop}>Appointment ID:</span>  <span className={styles.deatils}>{appdata.id}</span>
            </DialogContentText>
            <DialogContentText >
                <span  className={styles.dialogpop}>Name:</span><span className={styles.deatils1}> {appdata.name}</span>
                 </DialogContentText>
                 <DialogContentText >
                <span  className={styles.dialogpop}>Contact:</span><span className={styles.deatils1}> {appdata.contact}</span> 
                 </DialogContentText>
                 <DialogContentText >
                <span  className={styles.dialogpop}>Car Name:</span><span className={styles.deatils1} style={{textTransform:'capitalize'}}> {appdata.carname}</span>
                 </DialogContentText> 
                 <DialogContentText >
                <span  className={styles.dialogpop}>Service:</span><span className={styles.deatils1}> {appdata.service}</span>
                 </DialogContentText> 
                 <DialogContentText >
                  
                 {appdata.status === 'Received' &&(
              <div>
            <span  className={styles.dialogpop}>Status:</span> 
            <span className="badge badge-success"  style={{ fontFamily: 'Onest, sans-serif' ,fontSize:'14px',position:'relative',bottom:'5px',backgroundColor:'#0a97b0'}}>{appdata.status}</span>
            </div>
                              )}
                    {appdata.status === 'Seeking Issue' &&(
                        <div>
              <span  className={styles.dialogpop}>Status:</span> 
              <span className="badge badge-success"  style={{ fontFamily: 'Onest, sans-serif' ,fontSize:'14px',position:'relative',bottom:'5px',backgroundColor:'orange'}}>{appdata.status}</span>
              </div>
                           )}
                    {appdata.status === 'Team on work' &&(
                        <div>
                        <span  className={styles.dialogpop}>Status:</span>  
                        <span className="badge badge-success"  style={{ fontFamily: 'Onest, sans-serif' ,fontSize:'14px',position:'relative',bottom:'5px',backgroundColor:'brown'}}>{appdata.status}</span>
                        </div>  )}
                                            {appdata.status === 'On progress' &&(
                                              <div>
                        <span  className={styles.dialogpop}>Status:</span> 
                        <span className="badge badge-success"  style={{ fontFamily: 'Onest, sans-serif' ,fontSize:'14px',position:'relative',bottom:'5px',backgroundColor:'purple'}}>{appdata.status}</span>
                        </div>  )}
                                            {appdata.status === 'Checking all works' &&(
                                              <div>
                        <span  className={styles.dialogpop}>Status:</span>  
                        <span className="badge badge-success"  style={{ fontFamily: 'Onest, sans-serif' ,fontSize:'14px',position:'relative',bottom:'5px',backgroundColor:'cyan'}}>{appdata.status}</span>
                        </div>   )}
                                            {appdata.status === 'we are on last' &&(
                                              <div>
                        <span  className={styles.dialogpop}>Status:</span>
                        <span className="badge badge-success"  style={{ fontFamily: 'Onest, sans-serif' ,fontSize:'14px',position:'relative',bottom:'5px',backgroundColor:'pink'}}>{appdata.status}</span>
                        </div> )}
                                            {appdata.status === 'Work Done' &&(
                                              <div>
                        <span  className={styles.dialogpop}>Status:</span> 
                          <span className="badge badge-success"  style={{ fontFamily: 'Onest, sans-serif' ,fontSize:'14px',position:'relative',bottom:'5px'}}>{appdata.status}</span>
                          </div>    )}
                 </DialogContentText> 
                 <DialogContentText >
                <span  className={styles.dialogpop}>Remarks:</span><span style={{textTransform:'capitalize'}} className={styles.deatils1}> {appdata.remarks}</span>
                 </DialogContentText> 
          </div>
            <div>
              <DialogContentText className={styles.dialogpop} >
            <span  className={styles.dialogpop}>Appointment Date:</span>  <span className={styles.deatils}>{appdata.date}</span>
            </DialogContentText>
              <DialogContentText >
           <span  className={styles.dialogpop}>Email:</span><span className={styles.deatils1}> {appdata.email}</span>
            </DialogContentText>
            
            <DialogContentText >
           <span  className={styles.dialogpop}>Location:</span><span className={styles.deatils1}> {appdata.location}</span>
            </DialogContentText>
            <DialogContentText >
           <span  className={styles.dialogpop}>Car Number:</span><span className={styles.deatils1} style={{textTransform:'uppercase'}}> {appdata.carnumber}</span>
            </DialogContentText> 
            <DialogContentText >
           <span  className={styles.dialogpop}>Price:</span><span className={styles.deatils1}>₹{appdata.price}/-</span>
            </DialogContentText> 
              <DialogContentText >
            </DialogContentText>  
            </div>
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
    <div>
    </div>
 
 <Footer />
  {/* end info section */}
  {/* footer section */}
 
  {/* footer section */}
  {/* jQery */}
  {/* popper js */}
  {/* bootstrap js */}
  {/* owl slider */}
  {/* custom js */}
  {/* Google Map */}
  {/* End Google Map */}
</div>

  )
}

export default contact








{/* <div>


</div> */}