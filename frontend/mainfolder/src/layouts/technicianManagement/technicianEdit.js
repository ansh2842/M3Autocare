import React from 'react'
import { useEffect, useState, useCallback } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { useParams } from "react-router-dom";
import curved6 from "assets/images/curved-images/curved14.jpg";
import axios from 'axios'

const tecnicianEdit = () => {

  const {id} = useParams()
  const [invalid,setInvalid] =useState(false)
  const [getData,setGetData] = useState({
    image:null,
    name:"",
    contact:'',
    email:'',
    specialised:'',
    description:''
  })


  const getDatas = useCallback(async() =>{
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = token;
    try{

      const response = await axios.get(`http://localhost:8000/admin/getTechnicianforUpdate/${id}`)
      const data =  response.data;
      setGetData({
        name: data.name,
        contact: data.contact,
        email: data.email,
        specialised: data.specialised,
        description: data.description
      })

    }catch(err){
      if (err.response.status == "400") {
        window.location.href = "/authentication/sign-in";}
      console.log(err)
    }
  },[id])

  useEffect(()=>{
    getDatas()
  },[getDatas])


  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === 'image') {
      setGetData({ ...getData, image: files });
    } else {
      setGetData({ ...getData, [name]: value });
    }
  };
  

  const handleUpdate =async () => {

    const formData = new FormData()
    if (getData.image && getData.image.length > 0) {
      for(let i = 0; i < getData.image.length; i++) {
        formData.append('image', getData.image[i])
      }
    }
  formData.append('name',getData.name)
  formData.append('contact',getData.contact)
  formData.append('email',getData.email)
  formData.append('specialised',getData.specialised)
  formData.append('description',getData.description)

  try{
    await axios.put(`http://localhost:8000/admin/updateById/${id}`, formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    }).then(res=>{
      setInvalid('')
      console.log(res)
      window.location.href ='/Technician?message=Technician%20Updated%20successfully'
    }).catch(err=>{
      if (err.response && err.response.status === 400) {
        setInvalid('Email already used');
      }
      console.log(err)
    })

  }catch(err){
    console.error(err)
  }
}

  return (
    <BasicLayout 
    title='Update'
    image={curved6} >
    <Card>
        <SoftBox p={3} mb={1} textAlign="center">
            <SoftTypography variant="h5" fontWeight="medium">
                Update Category
            </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
            {/* ... */}
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
            <SoftBox component="form" role="form">
                <SoftBox mb={2}>
                   
                    <input style={{width:'100%'}} accept="image/*" name="image" onChange={handleChange}  multiple type="file" placeholder="Name" />
                </SoftBox>
                <SoftBox mb={2}>
                    <SoftInput value={getData.name} onChange={handleChange} name="name" type="text" placeholder="Technician Name" />
                </SoftBox>
                {/* <p style={{ color: "red", fontSize: "11px" }}>{titleError}</p> */}
                <SoftBox mb={2}>
                    <SoftInput value={getData.contact} onChange={handleChange} name="contact" type="text" placeholder="Technician Contact" />
                </SoftBox>
                {/* <p style={{ color: "red", fontSize: "11px" }}>{titleError}</p> */}
                <SoftBox mb={2}>
                    <SoftInput value={getData.email} onChange={handleChange} name="email" type="text" placeholder="Technician Email" />
                    {invalid && (
                        <p style={{marginTop:'-0', color:'red', fontSize:'11px'}}>
                        {invalid}
                          </p>

                          )}
                </SoftBox>
                {/* <p style={{ color: "red", fontSize: "11px" }}>{titleError}</p> */}
                <SoftBox mb={2}>
                    <SoftInput value={getData.specialised} onChange={handleChange} name="specialised" type="text" placeholder="Technician Specialised" />
                </SoftBox>
                {/* <p style={{ color: "red", fontSize: "11px" }}>{titleError}</p> */}
                <SoftBox mb={2}>
                    <SoftInput value={getData.description} onChange={handleChange} name="description" type="text" placeholder="Technicain Description" />
                </SoftBox>
                {/* <p style={{ color: "red", fontSize: "11px" }}>{titleError}</p> */}
                <SoftBox display="flex" alignItems="center">
                    {/* ... */}
                </SoftBox>
                <SoftBox mt={4} mb={1}>
                    <SoftButton onClick={handleUpdate} variant="gradient" color="dark" fullWidth>
                        Update Category
                    </SoftButton>
                </SoftBox>
            </SoftBox>
        </SoftBox>
    </Card>
</BasicLayout>
  )
}

export default tecnicianEdit