import { useEffect, useState, useCallback } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { useParams } from "react-router-dom";
import curved6 from "assets/images/curved-images/curved14.jpg";
import {Editor} from "@tinymce/tinymce-react"
import axios from 'axios'

const subCategoryedit = () => {
    const { id } = useParams();

    const [titleError, setTitleError] = useState("");
    const [titleData, setTitleData] = useState({
      
        title: '',
   
    });

    const getTitle = useCallback(async () => {
        const token = localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"] = token;
        try {
            const response = await axios.get(`http://localhost:8000/admin/getTitleId/${id}`)
            const data = await response.data
            setTitleData({
             
                title: data.title,
             
            })
        } catch (err) {
            if (err.response.status == "400") {
                window.location.href = "/authentication/sign-in";}
            console.log(err)
        }
    }, [id]);

    useEffect(() => {
        getTitle();
    }, [getTitle]);


        
    const config = {
        init: () => {
            selector= 'Editor',  
            plugins= 'lists',
            toolbar= config.toolbar,
            menu= { tools: { title: 'Tools', items: 'listprops' }}
        },
        toolbar: 'bullist numlist | undo redo',
      };
     
      tinymce.init({
        selector: 'textarea#content_about', 
        plugins: 'lists',
        toolbar: config.toolbar,
        
      });
    

    const handleUpdate = async () => {

        var editor = tinymce.get('content_about');
        titleData.title = editor.getContent();
        const data ={
            title: titleData.title
        }
   
    
   
        if (!titleData.title) {
            setTitleError("Title is required");
            
        }else{
            setTitleError("");
            try {
                await axios.put(`http://localhost:8000/admin/getTitleEdit/${id}`,data);
                console.log("Update successful!");
                window.location.href = `/title?message=Title%20updated%20successfully`;
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
                <textarea id="content_about" value={titleData.title} style={{width:'100%',borderRadius:'7px',fontSize:'14px',paddingLeft:'4px',outline:'none'}}  onChange={(e)=> setTitleData({...titleData,title:e.target.value})} name="title" type="text" placeholder="Title" />
                </SoftBox>
                <p style={{ color: "red", fontSize: "11px" }}>{titleError}</p>
                <SoftBox display="flex" alignItems="center">
                    {/* ... */}
                </SoftBox>
                
                <SoftBox mt={4} mb={1}>
                    <SoftButton onClick={handleUpdate} variant="gradient" color="dark" fullWidth>
                        Update Title
                    </SoftButton>
                </SoftBox>
            </SoftBox>
        </SoftBox>
    </Card>
</BasicLayout>
  )
}

export default subCategoryedit