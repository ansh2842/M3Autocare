import React from 'react'
import { useEffect, useState, useCallback } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import curved6 from "assets/images/curved-images/curved14.jpg";
import { useParams } from "react-router-dom";
import axios from 'axios'

const brandedit = () => {
    const {id} = useParams()

    const [titleError, setTitleError] = useState("");
    const [imageError, setImageError] = useState("")
    const [brand ,getBrand] =useState({
        image:null,
        title:'',
       
    })
    



    const getBrands = useCallback(async()=>{
        const token = localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"] = token;

        try{
            const reponse =  await axios.get(`http://localhost:8000/admin/getBrandById/${id}`);
            const data = await reponse.data;
            getBrand({
                image:data.image,
                title: data.title,
                category: data.category,
            })
            
        }catch(err){
            if (err.response.status == "400") {
                window.location.href = "/authentication/sign-in";}
            console.error(err)
        }
    },[id])


    useEffect(()=>{
        getBrands()
    },[getBrands])

    const handleUpdate = async () => {

        const formData = new FormData();

        formData.append('image',brand.image)
        formData.append('title',brand.title)
      
        

        if (!brand.title) {
            setTitleError("Title is required");
            
        }else{
            setTitleError("");
        }
        if(brand.image.length < 1) {
            setImageError("Image is required");
        }else{
            setImageError("");
            try {
                await axios.put(`http://localhost:8000/admin/getUpdateBrand/${id}`,formData,{
                    headers: { 'Content-Type': 'multipart/form-data'}
                });
                console.log("Update successful!");
                window.location.href = `/Brand?message=Brand%20updated%20successfully`;
            } catch (error) {
                console.error("Error updating category:", error);
            }
        }   
            
        
    
       
    };

   
       
     

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
                        <SoftInput accept="image/*" onChange={(e) => getBrand({...brand, image:e.target.files[0]})}   type="file" name="image" placeholder="Name" />
                    </SoftBox>
                    <p style={{ color: "red", fontSize: "11px" }}>{imageError}</p>
                    <SoftBox mb={2}>
                        <SoftInput value={brand.title} onChange={(e) => getBrand({...brand, title:e.target.value})} name="Title" type="text" placeholder="Title" />
                    </SoftBox>
                    <p style={{ color: "red", fontSize: "11px" }}>{titleError}</p>
                
           
                    <SoftBox display="flex" alignItems="center">
                        {/* ... */}
                    </SoftBox>
                    <SoftBox mt={4} mb={1}>
                        <SoftButton onClick={handleUpdate}  variant="gradient" color="dark" fullWidth>
                            Update Category
                        </SoftButton>
                    </SoftBox>
                </SoftBox>
            </SoftBox>
        </Card>
    </BasicLayout>
  )
}

export default brandedit