import React, { useCallback, useEffect, useState } from 'react'
import styles from '../assets/userCss/syles.module.css'
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import {Link, useParams} from 'react-router-dom'
import spinner from '../userImage/Double Ring-1s-200px (1).gif'
import '../assets/userCss/style.css'
import Footer from '../userInterface/Footer'
import car5 from '../userImage/car5.jpg'
import axios from 'axios'


function appoinment() {

    const {id} = useParams()
    const[name,setName] = useState('')
    const [spinners,setSpinners] = useState(false)
    const [btnApp,setBtnApp] = useState(true)
    const [getService, setGetData] = useState([])
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')
    const [location, setLocation] = useState('')
    const [service,setService] = useState('')
    const [price,setPrice] = useState('')
    const [Remarks,setRemarks] = useState('')
    const [date,setDate] = useState('')
    const [carName,setCarName] = useState('')
    const [carNo,setCarNo] = useState('')
    const [selectedServicePrice,setSelectedServicePrice] = useState('')
    const [message,setMessage] = useState(false)
    const [logDropdown, setLogDropdown] = useState(false);
    const [serviceErr,setServiceErr] = useState('')
    const [priceErr,setPriceErr] = useState('')
    const [dateErr,setDateErr]= useState('')
    const [carnameErr,setCarnameErr]= useState('')
    const [carNoErr,setCarNoErr] = useState('')
    const [getServiceId, setServiceId] = useState({
     
      name:'',
      price:'',
      id:''
  })
  

  
    const nameChange = (e) => {
        setName({ ...name, name: e.target.value });
        
      };
      
      const emailChange = (e) => {
        setName({ ...name, email: e.target.value });
       
      };
      
      const contactChange = (e) => {
        setName({ ...name, contact: e.target.value });
       
      };

      const locationChange =(e) =>{
        setName({...name,location:e.target.value})
        
    }
      
    //   const handleServiceChange = (event) => {
    //     const selectedPrice = event.target.value;
    //     setSelectedServicePrice(selectedPrice);
    //     setService(event.target.value)
      
        
    //   };
    const handleServiceChange = (event) => {
        const selectedService = getService.find(item => item.name === event.target.value);
        if (selectedService) {
          setService(selectedService.name);
          setSelectedServicePrice(selectedService.price);
        }
      };
      
  
   
  
   
      const getServiceData = useCallback(async() => {
   

        await axios.get(`http://localhost:8000/user/getServiceEdit/${id}`)
        .then(res =>{
            setServiceId({
                
                name:res.data.name,
                price:res.data.price,
               
            })
            console.log('getServiceId:', getServiceId);
        }).catch(err=>{
           
            console.log(err)
        })
    },[id])

  
    useEffect(()=>{
      const getName = JSON.parse(localStorage.getItem('userFront')) || {};
      setName(getName);
     
      const fetchData = async() =>{
        try{
          
          const response = await axios.get('http://localhost:8000/user/getService')
          const data = await response.data
          console.log(data)
          setGetData(data)
        }catch(err){
          console.log(err)
        }
      }
      fetchData()
      getServiceData()
    },[ getServiceData])
  
   

   

      
      const handleAdd =async() =>{

        if(service ===''){
          setServiceErr('Please Choose a service')
          setPriceErr('Choose a Service the amount will show here')
        }else{
          setServiceErr('')
          setPriceErr('')
        }
        if(date ===''){
          setDateErr('Please select a date')
        }else{
          setDateErr('')
        }
        if(carName===''){
          setCarnameErr('Please enter your car name')
        }else{
          setCarnameErr('')
        }
        if(carNo === ''){
          setCarNoErr('Please enter your car number')
        }else{
          setCarNoErr('')
        }

        if(service  !=='' && date !=='' && carName !=='' && carNo !==''){

          try{
            setSpinners(true)
            setBtnApp(false)
         
             const  data = {
                id:name.id,
                username:name.name,
                email:name.email,
                contact:name.contact,
                location:name.location,
                service:service || getServiceId.name,
                price:selectedServicePrice || getServiceId.price,
                date:date,
                carName:carName,
                carNo:carNo,
                status:'Received',
                remarks:Remarks
            }
    
            setTimeout(async()=>{
    
            try{
    
                await axios.post('http://localhost:8000/user/appointmentAdd',data)
                setSpinners(false)
                setBtnApp(true)
                setMessage(true)
                setTimeout(()=>{
                    setMessage(false)
                },7000)
                console.log(res=>{
                    console.log(res.data)
                })
            }catch(err){
              setMessage(false)
                console.log(err)
            }
          },5000)
          }catch(err){
            console.log(err)
          }
        }

     
      }

  
  return (
    <div>
 
   <Navbar />
  {/* contact section */}
  <div id="booking" style={{ backgroundImage: `url(${car5})` }} className="section">

    <div className="section-center">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className={`booking-cta`}>
              <h1 style={{color:"#0a97b0",fontWeight:'700'}} className={styles.headBook}>Book your  Service <span style={{color:"#0a97b0",fontWeight:'700'}}>today!</span> </h1>
              <p className={styles.texttmedia}>Take an appointment with us and enjoy your day</p>
            </div>
          </div>
          <div className="col-md-7 col-md-offset-1">
            <div className={`booking-form ${styles.boxe}`}>
              <form>
                <div className="form-group">
                  <div className="form-checkbox">
                    <label htmlFor="roundtrip">
                      <p className={styles.apptext}>Book your service with <span style={{color:"#0a97b0"}}> M3 AUTOCARE</span></p>

                      {message && (
                        <p style={{ fontWeight: 'normal', fontSize: '14px', opacity: message ? 1 : 0, transition: 'opacity 0.9s ease-in-out' }}>
                         Your Appointment has been sent and Check your email for APPOINTMENT ID
                        </p>
                      )}
                    </label>
                  
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 ">
                    <div className="form-group">
                      <span className="form-label" style={{color:"#0a97b0"}}>Name</span>
                      <input className="form-control" type="text" placeholder="Name" name='name' value={name.name} onChange={nameChange} required/>
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="form-group">
                      <span className="form-label" style={{color:"#0a97b0"}}>Email</span>
                      <input style={{textTransform:"lowercase"}} className="form-control" type="text" placeholder="Email"  name='email' value={name.email} onChange={emailChange} required/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 ">
                    <div className="form-group">
                      <span className="form-label" style={{color:"#0a97b0"}}>Number</span>
                      <input className="form-control" placeholder="Phone Number" type="number"  name='contact' value={name.contact} onChange={contactChange} required />
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="form-group">
                      <span className="form-label" style={{color:"#0a97b0"}}>Location</span>
                      <input className="form-control" placeholder="Location" type="text"  name='location' value={name.location} onChange={locationChange} required />
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="form-group">
                      <span className="form-label" style={{color:"#0a97b0"}}>Choose Services</span>
                      <select className="form-control" style={{ textTransform: 'capitalize' }} onChange={handleServiceChange}>
                      {getServiceId.name.length > 0 ? (
                        <>
                        

                          <option selected value={getServiceId.name}>{getServiceId.name}</option>
                        
                          {getService.map((item) => (
                            <option  key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </>
                      ) : (
                        <>
                          <option selected disabled value="Choose Service">Choose Service</option>
                          {!getService ? (
                            <option disabled>Loading...</option>
                          ) : (
                            getService.map((item) => (
                              <option key={item.id} value={item.name}>
                                {item.name}
                              </option>
                            ))
                          )}
                        </>
                      )}
                      
                    </select>
                      <span className="select-arrow" />
                      <p style={{fontFamily:'Onest, sans-serif',color:"red",fontSize:'12px'}}>{serviceErr}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="form-label" style={{color:"#0a97b0"}}>Service Price</span>
                      <input disabled className="form-control" placeholder="Price" type="text"  value={( !selectedServicePrice ? `₹${getServiceId.price}/-`:`₹${selectedServicePrice}/-`)} required />
                      <p style={{fontFamily:'Onest, sans-serif',color:"red",fontSize:'12px'}}>{priceErr}</p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      
                      <span className="form-label" style={{color:"#0a97b0"}}>Remarks <span>(Optional)</span></span>
                      <textarea  className="form-control" placeholder="Remarks" type="text" style={{textTransform:'capitalize'}} onChange={(e)=>setRemarks(e.target.value)}  required />
                     
                    </div>
                  </div>
                 

                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <span className="form-label" style={{color:"#0a97b0"}}>Appointment Date</span>
                      <input className="form-control" type="date" required  onChange={(e) => setDate(e.target.value)} />
                      <span className="select-arrow" />
                      <p style={{fontFamily:'Onest, sans-serif',color:"red",fontSize:'12px'}}>{dateErr}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <span className="form-label" style={{color:"#0a97b0"}}>Your Car Name</span>
                      <input className="form-control" placeholder='Car Name' type="text"  onChange={(e) => setCarName(e.target.value)} required />
                      <p style={{fontFamily:'Onest, sans-serif',color:"red",fontSize:'12px'}}>{carnameErr}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <span className="form-label" style={{color:"#0a97b0"}}>Car Number</span>
                      <input style={{textTransform:"uppercase"}} className="form-control" placeholder='Car Number' type="text"  onChange={(e) => setCarNo(e.target.value)} required />
                      <p style={{fontFamily:'Onest, sans-serif',color:"red",fontSize:'12px'}}>{carNoErr}</p>
                    </div>
                  </div>
                  
                </div>
                
              </form>
              {btnApp && (

                <div className="form-btn">
                  <button className="submit-btn" onClick={handleAdd}>Book Your Appointment</button>
                 
                </div>
              )}
                {spinners &&(

                <div className={styles.spinXx}>
            <img style={{width:"50px"}} src={spinner} />
            </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* end contact section */}
  {/* info section */}
  <section className={`${styles.info_section} ${styles.layout_padding2} ${styles.padFooter}`}>
    <div className="container">
      <div className="row">
        <div className={`col-md-6 col-lg-4 ${styles.info_col}`}>
          <div className={styles.info_contact}>
            <h4 style={{fontFamily:'Onest, sans-serif'}}>
              Address
            </h4>
            <div className={styles.contact_link_box}>
              <a href>
                <i className="fa fa-map-marker" aria-hidden="true" />
                <span style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}} >
                  Areekode
                </span>
              </a>
              <a href>
                <i className="fa fa-phone" aria-hidden="true" />
                <span style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>
                  Call +91 9526380448
                </span>
              </a>
              <a href>
                <i className="fa fa-envelope" aria-hidden="true" />
                <span style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>
                  m3autocare20@gmail.com
                </span>
              </a>
            </div>
          </div>
          <div className={styles.info_social}>
            <a href>
            <FontAwesomeIcon icon={faFacebook}   aria-hidden="true" />
            </a>
            <a href>
            <FontAwesomeIcon icon={faXTwitter}   aria-hidden="true" />
            </a>
            <a href>
            <FontAwesomeIcon icon={faLinkedinIn}   aria-hidden="true" />
            </a>
            <a href>
            <FontAwesomeIcon icon={faInstagram}   aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className={`col-md-6 col-lg-4 ${styles.info_col}`}>
          <div className={styles.info_detail}>
            <h4 style={{fontFamily:'Onest, sans-serif'}}>
              Info
            </h4>
            <p style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>
              we M3AUTOCARE , we are your trusted partner in ensuring a smooth and enjoyable driving experience. Our journey began 1995 with a vision to revolutionize the way car services are delivered, and we have been steering toward that goal ever since.
            </p>
          </div>
        </div>
        <div className={`col-md-6 col-lg-2 mx-auto ${styles.info_col}`}>
          <div className={styles.info_link_box}>
            <h4 style={{fontFamily:'Onest, sans-serif'}}>
              Links
            </h4>
            <div className={styles.info_links}>
            <Link to={'/home?' +Date.now()}> <a className={styles.active} href="index.html" style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>
                {/* <img src="images/nav-bullet.png" alt /> */}
                Home
              </a></Link>
             
              <Link to={'/user-service/:id?' + Date.now()}> <a className href="about.html" style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>
                {/* <img src="images/nav-bullet.png" alt /> */}
                Services
              </a></Link>
              <Link to={'/user-product/:id?' + Date.now()}> <a className href="service.html" style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>
                {/* <img src="images/nav-bullet.png" alt /> */}
                Products
              </a></Link>
              <Link to={'/user-about?' + Date.now()}> <a className href="contact.html" style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>
                {/* <img src="images/nav-bullet.png" alt /> */}
                About Us
              </a></Link>
              <Link to={'/user-contact?' + Date.now()}><a className href="contact.html" style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>
                {/* <img src="images/nav-bullet.png" alt /> */}
               Contact Us
              </a></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
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

export default appoinment