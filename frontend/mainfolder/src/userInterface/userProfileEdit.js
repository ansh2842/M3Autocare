
import React, { useCallback, useEffect, useState } from 'react'
import styles2 from '../assets/userCss/login.module.css'
import SoftButton from 'components/SoftButton';
import {  useParams } from 'react-router-dom';
import Navbar from '../userInterface/Navbar'
import Footer from '../userInterface/Footer'

import axios from 'axios';

const UserProfileEdit = () => {
    const {id} = useParams()
    const [image,setImage] = useState('')
    const [name,setName] = useState('')
    const [location,setLocation] = useState('')
    const [getData,setGetData] = useState({
      image:null,
      name:"",
      contact:'',
      email:'',
      name:'',
      location:''
    })

    
    
    
      const getDatas = useCallback(async() =>{
        const token = localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"] = token;
        try{
    
          const response = await axios.get(`http://localhost:8000/user/getUserforUpdate/${id}`)
          const data =  response.data;
          setGetData({
            image: data.image,
            username: data.username,
            contact: data.contact,
            email: data.email,
            specialised: data.setLocation,
           
          })

          setName(data.name)
          setLocation(data.location)
    
        }catch(err){
          if (err.response.status == "400") {
            window.location.href = "/authentication/sign-in";}
          console.log(err)
        }
      },[id])
    
      useEffect(()=>{
        getDatas()
      },[getDatas])
    
    const displayImage = (event) => {

        
        const imageElement = document.querySelector('.img-thumbnail');
       
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onload = function (e) {
            setImage(e.target.result);  
            imageElement.src = e.target.result; 
          }
    
          reader.readAsDataURL(file);
          
        } else {
          imageElement.src = 'https://bootdey.com/img/Content/avatar/avatar7.png';
        }
      };
    
  
        const handleUpdate =async () =>{
            const formData = new FormData()
           
          formData.append('image', image)
          formData.append('name',name)
          formData.append('username',getData.username)
          formData.append('contact',getData.contact)
          formData.append('email',getData.email)
          formData.append('location',location)
          formData.append('specialised',getData.location)
         
        
          try{
            await axios.put(`http://localhost:8000/user/updateById/${id}`, formData,{
              headers:{
                "Content-Type":"multipart/form-data"
              }
            }).then(res=>{

                localStorage.setItem('userFront',JSON.stringify(res.data.UserFront))
                window.location.href =`/Users-Profile/${names.id}`
            }).catch(err=>{
              console.log(err)
            })
        
          }catch(err){
            console.error(err)
          }
        }

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
        <p className={styles2.lables}>Your Photo:</p>
          <div className="text-center">
            <img src={getData.image}  style={{width:'200px',borderRadius:'7px'}}  /><br/>
            <input name='image' type="file" className="form-control" onChange={displayImage} />
          </div>
        </div>
        {/* edit form column */}
        <div className="col-md-9 personal-info">
          <h3 style={{fontFamily:'Onest, sans-serif'}}>Edit your personal info</h3>
          <form className="form-horizontal" role="form">
            <div className="form-group">
              <label className={`col-lg-3 control-label ${styles2.lables}`}>Name:</label>
              <div className="col-lg-8">
                <input style={{fontFamily:'Onest, sans-serif',textTransform:'capitalize'}} onChange={(e) => setName(e.target.value)} name='name' className="form-control" type="text" value={name}  />
              </div>
            </div>
            <div className="form-group">
              <label className={`col-lg-3 control-label ${styles2.lables}`}>User name:</label>
              <div className="col-lg-8">
                <input style={{fontFamily:'Onest, sans-serif'}} onChange={(e) => setGetData({...getData,username:e.target.value.toLowerCase()})} name='username' className="form-control" type="text" value={getData.username}  />
              </div>
            </div>
            <div className="form-group">
              <label className={`col-lg-3 control-label ${styles2.lables}`}>Contact:</label>
              <div className="col-lg-8">
                <input style={{fontFamily:'Onest, sans-serif'}}  onChange={(e) => setGetData({...getData,contact:e.target.value})} name='contact' className="form-control" type="number" value={getData.contact}  />
              </div>
            </div>
            <div className="form-group">
              <label className={`col-lg-3 control-label ${styles2.lables}`}>Email:</label>
              <div className="col-lg-8">
                <input style={{fontFamily:'Onest, sans-serif'}} onChange={(e) => setGetData({...getData,email:e.target.value})} name='email' className="form-control" type="text"  value={getData.email} />
              </div>
            </div>
            <div className="form-group">
              <label className={`col-lg-3 control-label ${styles2.lables}`}>Location:</label>
              <div className="col-lg-8">
                <input style={{fontFamily:'Onest, sans-serif',textTransform:'capitalize'}} onChange={(e) => setLocation(e.target.value)} name='location' className="form-control" type="text"  value={location} />
              </div>
            </div><br/>
            <div  className={styles2.btns}>
            <SoftButton onClick={handleUpdate}  style={{fontFamily:'Onest, sans-serif'}} variant="contained" color="info"  fontWeight="medium">Save Changes</SoftButton>
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