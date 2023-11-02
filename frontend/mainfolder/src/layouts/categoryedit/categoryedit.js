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

function SignUp() {
    const { id } = useParams();

    const [titleError, setTitleError] = useState("");
    const [imageError, setImageError] = useState("")
    const [getsubCategory,setSubCategory] = useState([])

    const [categoryData, setCategoryData] = useState({
        images: null,
        Title: '',
        brandname:''
    });

    const getCategory = useCallback(async () => {
        const token = localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"] = token;
        try {
            const response = await axios.get(`http://localhost:8000/admin/getCategoryById/${id}`)
            const data = response.data
            setCategoryData({
                images: data.image,
                Title: data.Title,
                brandname: data.brandname
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

    const handleChange = (e) => {
        const { name, value, type } = e.target;
    
        if (type === 'file') {
            const file = e.target.files[0];
            setCategoryData({ ...categoryData, images: file });
        } else {
            setCategoryData({ ...categoryData, [name]: value });
        }
    }

    const handleUpdate = async () => {

        const formData = new FormData();

        formData.append('image',categoryData.images)
        formData.append('Title',categoryData.Title)
        formData.append('brandname',categoryData.brandname)
        console.log(categoryData.images);

        if (!categoryData.Title) {
            setTitleError("Title is required");
            
        }else{
            setTitleError("");
        }
        if(categoryData.images.length < 1) {
            setImageError("Image is required");
        }else{
            setImageError("");
            try {
                await axios.put(`http://localhost:8000/admin/getUpdateCategory/${id}`,formData,{
                    headers: { 'Content-Type': 'multipart/form-data'}
                });
                console.log("Update successful!");
                window.location.href = `/category?message=Category%20updated%20successfully`;
            } catch (error) {
                console.error("Error updating category:", error);
            }
        }   
            
        
    
       
    };


    useEffect(()=>{
        getsubCategoryData()
       },[])
       
       const getsubCategoryData = async() =>{
    
        try{
          await axios.get('http://localhost:8000/admin/getsubCategory')
          .then(res =>{
            setSubCategory(res.data)
          })
        }catch(err){
          console.log(err);
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
                            <SoftInput accept="image/*" onChange={handleChange} type="file" name="image" placeholder="Name" />
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftInput value={categoryData.Title} onChange={handleChange} name="Title" type="text" placeholder="Title" />
                        </SoftBox>
                        <p style={{ color: "red", fontSize: "11px" }}>{titleError}</p>
                        {/* <SoftBox mb={2}>
                <select value={categoryData.brandname}   onChange={handleChange} name="brandname"   style={{fontSize:"14px"}}> 
                <option  value="select" disabled selected>Select Sub Category</option>
                {getsubCategory.map((items) =>(
                <option key={items.id}>{items.Title}</option>
                ))}
                </select>
                <p style={{ color: "red", fontSize: "11px" }}>{Errorbrandname}</p>
            </SoftBox> */}
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
    );
}

export default SignUp;
