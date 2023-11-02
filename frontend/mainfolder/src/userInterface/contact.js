import React, { useEffect, useState } from 'react'
import styles from '../assets/userCss/syles.module.css'
import Navbar from '../userInterface/Navbar' ;
import Footer from '../userInterface/Footer' ;
import spinner from '../userImage/Double Ring-1s-200px (1).gif'
import axios from 'axios';


function contact() {

  const[name,setName] = useState({email:''})
  const [message,setMessage] = useState('')
  const [validationError, setValidationError] = useState(null);
  const [spinnersX,setSpinnersX] = useState(false)
  const [sendbtn,setSendbtn] = useState(true)
  const [success,setSuccess] = useState(true)
  const [nameerr,setNameerr]= useState('')
  const [numerr,setnumerr]= useState('')
  const [emailErr,setEmailErr]= useState('')
  const [mesggerr,setMesggerr]= useState('')
 

  useEffect(()=>{
    const getName = JSON.parse(localStorage.getItem('userFront')) || {};
    setName(getName);
  },[])

  
  const HandleChange = (e)=>{
    const {name,value}= e.target
    const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
    setName((prevData) => ({...prevData,[name]:value , [`${name}IsValid`]: isValid}));
  }
  const sendMessage = async () => {
   
    if (!name.name || name.name.length < 1) {
      setNameerr('Enter your name');
    } else {
      setNameerr('');
    }
    
    if (!name.contact || name.contact.length < 1) {
      setnumerr('Enter your number');
    } else {
      setnumerr('');
    }
    
    if (!name.email || name.email.length < 1) {
      setEmailErr('Enter your email');
    } else {
      setEmailErr('');
    }
    
    
    if (!message || message.length < 1) {
      setMesggerr('Enter your messages');
    } else {
      setMesggerr('');
    }
    
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!emailRegex.test(name.email)) {
      setValidationError('Please enter a valid email address.');
    } else {
      setValidationError(null); 
    }

    if(name.name !=='' && name.conatct !=='' && name.email !=='' && message !== '' ){

      setSendbtn(false)
      setSpinnersX(true)

     
      const data ={
        name:name.name,
        contact:name.contact,
        email:name.email,
        message:message
      }
      setTimeout(async()=>{
        try{
          await axios.post('http://localhost:8000/user/sendMessage',data)
          .then(res=>{
            console.log(res.data)
            setSendbtn(true)
            setSpinnersX(false)
            setSuccess('Your email has been sent')
            setTimeout(()=>{
              setSuccess('')
            },6000)
          }).catch(err=>{
            console.log(err)
          })
        }catch(err){
          console.log(err)
        }
      },3000)

    }

  }
  return (
    <div>
      <Navbar/>
 
  {/* contact section */}
  <section className={styles.contact_section}>
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4 col-md-5 offset-md-1">
          <div className={styles.heading_container}>
            <h2 style={{fontFamily:'Onest, sans-serif'}}>
              Contact Us
            </h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-5 offset-md-1">
          <div className={`${styles.form_container} contact-form`}>
            <form onSubmit={(e)=> e.preventDefault()}>
            <p style={{fontFamily:'Onest, sans-serif',color:"green",fontSize:'14px'}}>{success}</p>
              <div>
                <input value={name.name} onChange={HandleChange} name='name'  style={{fontFamily:'Onest, sans-serif',fontSize:'16px'}} type="text" placeholder="Your Name" />
                <p style={{fontFamily:'Onest, sans-serif',color:"red",fontSize:'14px'}}>{nameerr}</p>
              </div>
              <div>
                <input value={name.contact} onChange={HandleChange} name='contact' style={{fontFamily:'Onest, sans-serif',fontSize:'16px'}} type="text" placeholder="Phone Number" />
                <p style={{fontFamily:'Onest, sans-serif',color:"red",fontSize:'14px'}}>{numerr}</p>
              </div>
              <div>
              <input
              value={name.email}
              onChange={HandleChange}
              name='email'
              style={{ fontFamily: 'Onest, sans-serif', fontSize: '16px', textTransform: 'lowercase' }}
              type="email"
              placeholder="Email"
              required
            />
               {validationError && <div className="error-message" style={{fontFamily:'Onest, sans-serif',color:"red",fontSize:'14px'}}>{validationError}</div>}
                <p style={{fontFamily:'Onest, sans-serif',color:"red",fontSize:'14px'}}>{emailErr}</p>
              </div>
              <div>
                <input style={{fontFamily:'Onest, sans-serif',fontSize:'16px'}} type="text" onChange={(e)=>setMessage(e.target.value)} className={styles.message_box} placeholder="Message" />
                <p style={{fontFamily:'Onest, sans-serif',color:"red",fontSize:'14px'}}>{mesggerr}</p>
              </div>
              {sendbtn && (

              <div className={styles.btn_box}>
                <button onClick={sendMessage} style={{fontFamily:'Onest, sans-serif',fontSize:'16px'}}>
                  SEND
                </button>
              </div>
              )}
              {spinnersX && (

              <div className={styles.spinX}>
            <img style={{width:"35px"}} src={spinner} />
            </div>
              )}
            </form>
          </div>
        </div>
        <div className="col-lg-7 col-md-6 px-0">
  <div className='map-container'>
    <div className='map'>
      <div id="googleMap" />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.1845225251054!2d75.83155997482352!3d11.24783255032209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65b51851a4693%3A0x947a392074f873da!2sTechoriz%20Digital%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1698145182003!5m2!1sen!2sin"
        width="800"
        height="450"
        style={{
          border: '0',
        }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  </div>
</div>

      </div>
    </div>
  </section>
  {/* end contact section */}
  {/* info section */}
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
