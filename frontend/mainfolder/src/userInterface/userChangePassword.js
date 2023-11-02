import React, { useState ,} from 'react'
import styles from '../assets/userCss/login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function userChangePassword() {

    const {id} =useParams()
    const [invalid, setInvalid] = useState(false)
    const [invalids, setInvalids] = useState(false)
    const [oldpassword,setOldPassword] =useState('')
    const [newPassword,setNewPassword] =useState('')
    const [confirmPassword,setconfirmPassword] =useState('')
    const [type,setType] =useState('password')
    const [icon,setIcon] = useState(faEyeSlash)
    const [type2,setType2] =useState('password')
    const [icon2,setIcon2] = useState(faEyeSlash)
    const [type3,setType3] =useState('password')
    const [icon3,setIcon3] = useState(faEyeSlash)
  
    const HandleChnage =() =>{
      if(type === 'password'){
        setType('text')
        setIcon(faEye)
      }else{
        setType('password')
        setIcon(faEyeSlash)
      }
    }
    const HandleChnages =() =>{
      if(type2 === 'password'){
        setType2('text')
        setIcon2(faEye)
      }else{
          setIcon2(faEyeSlash)
        setType2('password')
        
      }
    }
    const HandleChnaged =() =>{
      if(type3 === 'password'){
        setType3('text')
        setIcon3(faEye)
      }else{
          setIcon3(faEyeSlash)
        setType3('password')
        
      }
    }

    const handleLogin = async() => {
    
        const data = {
          
            oldpassword: oldpassword,
            newpassword: newPassword,
            confirmPassword: confirmPassword
       
        }
        try{
         const response = await axios.put(`http://localhost:8000/user/ChangePassword/${id}`,data);
        console.log(response.data)
        if(response.status && response.status === 200){
            setInvalids('Password changed successfully')

            setTimeout(()=>{
                window.location.href= `/home?message=Password%20Updated%20successfully`
            },1000)
           
        }
        
        }catch(err){  
            if (err.response && err.response.status === 403) {
                setInvalid('Old password is not correct');
        
              } else if (err.response && err.response.status ===400){
                        setInvalid('New passord and Confirm password is not correct');
              }else{
                console.log(err);
              }
                 
              }
              
          
        }
        
      
      
  
  return (
    <div className={styles.mainBox}>
       
        <div className={styles.box}>
            <div className={styles.box2}>
            <h2 className={styles.head}>M3 Autocare</h2>
            <p className={styles.text}>Work Simple - Smooth Driving</p>
            </div>
            <div className={styles.forms}>
            <form>
              <label className={styles.text}>Old password</label><br />
              <div className={styles.box3}>
              <input className={styles.input} onChange={(e)=>setOldPassword(e.target.value)} type={type2}></input><FontAwesomeIcon onClick={HandleChnages} className={styles.icon} icon={icon2} />
              </div>
              {invalids && (

                    <p style={{marginTop:'0', color:'green', fontSize:'11px'}}>
                    {invalids}
                    </p>

                    )}
              <label className={styles.text}>Create new password</label><br />
              <div className={styles.box3}>
              <input className={styles.input} onChange={(e)=>setNewPassword(e.target.value)} type={type}></input><FontAwesomeIcon onClick={HandleChnage} className={styles.icon} icon={icon} />
              </div>
              <label className={styles.text}>Confirm new password</label><br />
              <div className={styles.box3}>
              <input className={styles.input} onChange={(e)=>setconfirmPassword(e.target.value)} type={type3}></input><FontAwesomeIcon onClick={HandleChnaged} className={styles.icon} icon={icon3} />
              </div>
              {invalid && (

                <p style={{marginTop:'0', color:'red', fontSize:'11px'}}>
                {invalid}
                </p>

                  )}
            </form>
            </div><br/>
            <div className={styles.btnbox}>
          <button onClick={handleLogin} className={styles.btn}>done</button>
          </div><br />
          
        </div>
    </div>
  )
}

export default userChangePassword