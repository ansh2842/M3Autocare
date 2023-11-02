import React, { useState,useEffect } from 'react'
import styles from '../assets/userCss/login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import SoftTypography from "components/SoftTypography";
import axios from 'axios';
import Navbar from '../userInterface/Navbar'
import Footer from '../userInterface/Footer'

const login = () => {

  const navigate = useNavigate()
  
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState(false)
  const [email,setEmail] =useState('')
  const [password,setPassword] =useState('')
  const [type,setType] =useState('password')
  const [icon,setIcon] = useState(faEyeSlash)

  const HandleChnage =() =>{
    if(type === 'password'){
      setType('text')
      setIcon(faEye)
    }else{
      setType('password')
      setIcon(faEyeSlash)
    }
  }

  const handleLogin = async() => {
    
    const data = {
      
      email:email,
      password:password
    }
    try{
     const response = await axios.post('http://localhost:8000/user/userlogin',data);
     console.log(response.data);
      localStorage.setItem('userFront',JSON.stringify(response.data.UserFront))
      setInvalid('')
      window.location.href ='/home'
    }catch(err){  
      if(err.response && err.response.status === 401){
        setInvalid('Invalid email or password')
      }
      console.log(err)
    }
    
  }
  
  useEffect(() => {
   
    const queryParams = new URLSearchParams(window.location.search);
    const messageParam = queryParams.get("message");

    if (messageParam) {
        setMessage(messageParam);
        setTimeout(()=>{
          setMessage("")
        },3000)
    }
}, []);


  return (
    <div>
    <Navbar />
    <div className={styles.mainBox}>
      
        <div className={styles.box}>
       
            <div className={styles.box2}>
            <h2 className={styles.head}>M3 Autocare</h2>
            <p className={styles.text}>Work Simple - Smooth Driving</p>
            <SoftTypography   style={{ opacity: message ? 1 : 0, transition: "opacity 0.9s ease-in-out",fontSize:"13px" }}  variant="h6" color="success">
                {message && decodeURIComponent(message)}
            </SoftTypography>
            </div>
            <div className={styles.forms}>
            <form>
              <label className={styles.text}>Email or Username</label><br />
              <div className={styles.box3}>
              <input style={{textTransform:'lowercase'}} onChange={(e)=>setEmail(e.target.value)} className={styles.input} type="name"></input><br />
              </div>
              <label className={styles.text}>Password</label><br />
              <div className={styles.box3}>
              <input style={{textTransform:'lowercase'}} className={styles.input} onChange={(e)=>setPassword(e.target.value)} type={type}></input><FontAwesomeIcon onClick={HandleChnage} className={styles.icon} icon={icon} />
              </div>
              {invalid && (

                <p style={{marginTop:'0', color:'red', fontSize:'11px'}}>
                {invalid}
                </p>

                  )}
              <div className={styles.text2}>
                <Link to={'/user-forgotpassword'}>Forgot Password</Link>
                </div>
            </form>
            </div><br/>
            <div className={styles.btnbox}>
          <button onClick={handleLogin} className={styles.btn}>Login</button>
          </div><br />
          <div className={styles.btnbox}>
          <p className={styles.text}> Do not have an account? <Link to={'/user-signup?'+ Date.now()}>Sign Up.</Link></p>

            </div>
        </div>
    </div>
    <Footer />
    </div>
  )
}

export default login