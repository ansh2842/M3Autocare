import React, { useState ,} from 'react'
import styles from '../assets/userCss/login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const login = () => {

        const {id} = useParams()
  const navigate = useNavigate()
  const [invalid, setInvalid] = useState(false)
  const [newpassword,setNewPassword] =useState('')
  const [password,setPassword] =useState('')
  const [type,setType] =useState('password')
  const [icon,setIcon] = useState(faEyeSlash)
  const [type2,setType2] =useState('password')
  const [icon2,setIcon2] = useState(faEyeSlash)

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

  const handleLogin = async() => {
    
    const data = {
      
        newpassword:newpassword,
      password:password
    }
    try{
     const response = await axios.put(`http://localhost:8000/user/newPassword/${id}`,data);
    console.log(response.data)
     window.location.href= `/user-login?message=Password%20Updated%20successfully`
     localStorage.removeItem('userDataFront')
    }catch(err){  
        if (err.response && err.response.status === 404) {
            setInvalid('The new password and confirm password are incorrect');
    
          } else {
            console.log(err);
          }
      console.log(err)
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
              <label className={styles.text}>Create new password</label><br />
              <div className={styles.box3}>
              <input className={styles.input} onChange={(e)=>setNewPassword(e.target.value)} type={type2}></input><FontAwesomeIcon onClick={HandleChnages} className={styles.icon} icon={icon2} />
              </div>
              <label className={styles.text}>Confirm password</label><br />
              <div className={styles.box3}>
              <input className={styles.input} onChange={(e)=>setPassword(e.target.value)} type={type}></input><FontAwesomeIcon onClick={HandleChnage} className={styles.icon} icon={icon} />
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

export default login