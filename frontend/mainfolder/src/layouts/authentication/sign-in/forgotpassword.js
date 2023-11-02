import React, { useEffect, useState } from 'react'
import SoftBox from "components/SoftBox";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import SoftInput from "components/SoftInput";
import axios from 'axios'


const forgotpassword = () => {

  
    const[email,setEmail] = useState('')
    const navigate =  useNavigate()
    const [invalid,setInvalid] =useState(false)

    const handleUpdate = async () => {

        const datas ={
            emails: email,
        }

        try{
         const response = await axios.post('http://localhost:8000/admin/updatePasswordwithOtp',datas)
         console.log(response.data)
      
         const userData = {
            username: response.data.userData.username,
            email: response.data.userData.email,
            id: response.data.userData.id,
            contact: response.data.userData.contact};
           localStorage.setItem("userData",JSON.stringify (userData));
           const userEmail = response.data.userData.email.toLowerCase().trim();
           const enteredEmail = email.toLowerCase().trim();
           
           if (userEmail === enteredEmail) {
             navigate(`/ForgotPasswrodId/${userData.id}`)
         
           } else {
            
             setInvalid('Email is wrong');
           }
           console.log(contact)
        }catch(err){
            console.log(err)  
            setInvalid('Email is wrong')
        }
    }
  

  return (
    
    
    <div
    style={{
      display: 'flex',
      marginTop:'100px',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '500px',
      
    }}
  >
    <p>Recover Your Password with <br/>your email...</p>
    <div style={{ width: '300px',
     height:'400px', 
     display:'flex',
     marginLeft:'40px',
     flexDirection:'column',
     justifyContent: 'center',
     boxShadow:' rgba(0, 0, 0, 0.35) 0px 5px 15px',
     borderRadius:'10px',
     alignItems:'center' }}>
      <SoftBox mb={2}>
      
        <h4 style={{marginLeft:'10px'}}>m3 autocare</h4>
        <p style={{ fontSize: '13px' }}>Enter your registered Email</p>
        <SoftInput  onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
      </SoftBox>
      {invalid && (
         <p style={{marginTop:'-16px'
         , color:'red',
         position:'relative',
         right:'40px',
          fontSize:'11px'}}>
                {invalid}
         </p>

             )}
      <SoftBox mt={4} mb={1}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Link onClick={handleUpdate}>
            <Button variant="success">Done</Button>
          </Link>
        </div>
      </SoftBox>
    </div>
  </div>
  
   
  )
}

export default forgotpassword