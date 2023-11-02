import React, { useEffect, useState } from 'react'
import styles from '../assets/userCss/login.module.css'

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const login = () => {

  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [otp,setOtp] = useState('')
  const [invalid, setInvalid] = useState(false)

  const [showCountdown, setShowCountdown] = useState(false);
  const [showgetOtp, setGetOtp] = useState(true);
  const [countdown, setCountdown] = useState(30);

  useEffect(()=>{
    const getEmail = JSON.parse(localStorage.getItem('userDataFront')) || {};
    setEmail(getEmail);

     
    let timer;
    if (showCountdown) {
      timer = setInterval(() => {
        if (countdown === 0) {
          clearInterval(timer);
          setGetOtp(true)
        
          setShowCountdown(false)
          return;
        }
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  } ,[showCountdown, countdown])

        const getOtp =() =>{
            setGetOtp(false)
           
            const data = {
                email :`${email.email}`
            }
            try{

                axios.post('http://localhost:8000/user/otpsend',data)
                setShowCountdown(true)
            }catch(err){
                console.log(err)
            }
        }
 const handleUpdate =() =>{
    const datas1 = {
            otps:otp
        }
        axios
        .post('http://localhost:8000/user/otpCheck', datas1)
        .then((res) => {
          console.log(res.data);
          setInvalid('');
          navigate(`/userforgotpasswordsave/${email.id}`);
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            setInvalid('OTP has expired');
          } else if (err.response && err.response.status === 404) {
            setInvalid('OTP not found');
          } else {
            console.log(err);
          }
        })
 }
        


  return (
    <div className={styles.mainBox}>
        <div className={styles.box}>

            <div className={styles.box2}>
            <h2 className={styles.head}>M3 Autocare</h2>
            <p className={styles.text}>Work Simple - Smooth Driving</p>
            </div>
            
            <div className={styles.forms}><br/>
            <form>
           {showgetOtp && (
  <label className={styles.text}>
    <span onClick={getOtp} style={{ textDecoration: 'underline',cursor:'pointer' }}>
      Get OTP
    </span>
  </label>
)}
<br />
              
              <label className={styles.text}>  Enter your OTP </label><br />
              
              <div className={styles.box3}>
              <input onChange={(e)=>setOtp(e.target.value)} className={styles.input} type="number"></input><br />
              </div>
             
              {invalid && (

                <p style={{marginTop:'0', color:'red', fontSize:'11px'}}>
                {invalid}
                </p>

                  )}
                    {showCountdown && (
            <p
              style={{ fontSize: '10px', color: 'green', marginTop: '0px' }}
            >{`OTP valid till ${countdown}`}</p>
          )}
            </form>
            </div><br/>
            <div className={styles.btnbox}>
              
                <button onClick={handleUpdate} className={styles.btn}>Done</button>
              
       
          </div><br />
         
        </div>
    </div>
  )
}

export default login