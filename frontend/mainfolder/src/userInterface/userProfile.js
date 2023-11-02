
import React, { useCallback, useEffect, useState } from 'react'
import styles2 from '../assets/userCss/login.module.css'
import SoftButton from 'components/SoftButton';
import { Link} from 'react-router-dom';
import Navbar from '../userInterface/Navbar'
import Footer from '../userInterface/Footer'


const UserProfileEdit = () => {
  
    const[names,setNames] = useState('') 
        useEffect(()=>{
          const getName = JSON.parse(localStorage.getItem('userFront')) || {};
          setNames(getName);
         
        },[])

       



  return (
    <div>
        <Navbar />
   
    <div style={{marginTop:'3.3rem'}} className="container bootstrap snippets bootdey">
     
      <hr />
      <div className="row">
        {/* left column */}
   
        <div className="col-md-3">
        <p  className={styles2.lables}>Your Photo:</p>
          <div className="text-center">
            
            <img  style={{width:'200px',borderRadius:'7px'}}  src={names.image} /><br/>
          </div>
        </div>
        {/* edit form column */}
        <div className="col-md-9 personal-info">
          <h3 style={{fontFamily:'Onest, sans-serif'}}>Personal info</h3>
          <form className="form-horizontal" role="form">
            <div className="form-group">
              <label className={`col-lg-3 control-label ${styles2.lables}`}>Name:</label>
              <div className="col-lg-8">
                <input style={{fontFamily:'Onest, sans-serif'}} name='name' disabled className="form-control" type="text" value={names.name} />
              </div>
            </div>
            <div className="form-group">
              <label className={`col-lg-3 control-label ${styles2.lables}`}>User name:</label>
              <div className="col-lg-8">
                <input name='username' disabled className="form-control" type="text" style={{fontFamily:'Onest, sans-serif'}}  value={names.username} />
              </div>
            </div>
            <div className="form-group">
              <label className={`col-lg-3 control-label ${styles2.lables}`}>Contact:</label>
              <div className="col-lg-8">
                <input  name='contact' disabled className="form-control" style={{fontFamily:'Onest, sans-serif'}} type="number" value={names.contact} />
              </div>
            </div>
            <div className="form-group">
              <label className={`col-lg-3 control-label ${styles2.lables}`}>Email:</label>
              <div className="col-lg-8">
                <input  name='email' disabled className="form-control" style={{fontFamily:'Onest, sans-serif'}} type="text" value={names.email} />
              </div>
            </div>
            <div className="form-group">
              <label className={`col-lg-3 control-label ${styles2.lables}`}>Location:</label>
              <div className="col-lg-8">
                <input  name='location' className="form-control" disabled type="text" style={{fontFamily:'Onest, sans-serif'}} value={names.location}  />
              </div>
            </div><br/>
            <div  className={styles2.btns}>
            <Link to={`/UserProfile/${names.id}?${Date.now()}`}> <SoftButton variant="contained" color="info"  style={{fontFamily:'Onest, sans-serif'}}  fontWeight="medium">Edit Profile</SoftButton></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    <hr />

   <Footer />
  </div>
  
  )
}

export default UserProfileEdit