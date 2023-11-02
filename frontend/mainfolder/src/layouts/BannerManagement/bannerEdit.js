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

const subCategoryedit = () => {
    const { id } = useParams();

    const [titleError, setTitleError] = useState("");

    const [bannerData, setBannerData] = useState({
        images: null,
        Title: '',
       Description:''
    });

    const getCategory = useCallback(async () => {
        const token = localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"] = token;
        try {
            const response = await axios.get(`http://localhost:8000/admin/getBannerById/${id}`)
            const data = response.data
            setBannerData({
                images: data.image,
                Title: data.title,
                Description: data.description
            })
        } catch (err) {
            if (err.response.status == "400") {
                window.location.href = "/authentication/sign-in";}
            console.log(err)
        }
    }, [id]);

    useEffect(() => {
        getCategory();
    }, [getCategory]);

   
    
    

    const handleUpdate = async () => {

        const formData = new FormData();

        formData.append('image',bannerData.images)
        formData.append('title',bannerData.Title)
        formData.append('description',bannerData.Description)
    
        console.log(bannerData.images);
        if (!bannerData.Title) {
            setTitleError("Title is required");
            
        }else{
            setTitleError("");
            try {
                await axios.put(`http://localhost:8000/admin/updateBannerById/${id}`,formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                      },
                });
                console.log("Update successful!");
                window.location.href = `/Banner?message=Banner%20updated%20successfully`;
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
                    <SoftInput accept="image/*" onChange={(e)=> setBannerData({...bannerData,images:e.target.files[0]})}  type="file" name="image" placeholder="Name" />
                </SoftBox>
                <SoftBox mb={2}>
                    <SoftInput value={bannerData.Title} onChange={(e)=> setBannerData({...bannerData,Title:e.target.value})} name="Title" type="text" placeholder="Title" />
                </SoftBox>
                <p style={{ color: "red", fontSize: "11px" }}>{titleError}</p>
                <SoftBox display="flex" alignItems="center">
                    {/* ... */}
                </SoftBox>
                <SoftBox mb={2}>
                
                <textarea style={{width:'100%',borderRadius:'7px',fontSize:'14px',paddingLeft:'4px',outline:'none'}} value={bannerData.Description} onChange={(e)=> setBannerData({...bannerData,Description:e.target.value})}  name="Description" type="text" placeholder="Title" />
                </SoftBox>
                <SoftBox mt={4} mb={1}>
                    <SoftButton onClick={handleUpdate} variant="gradient" color="dark" fullWidth>
                        Update Banner
                    </SoftButton>
                </SoftBox>
            </SoftBox>
        </SoftBox>
    </Card>
</BasicLayout>
  )
}

export default subCategoryedit