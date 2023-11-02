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

    const {id} = useParams()
    const [message, setMessage] = useState("");

    useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search);
      const messageParam = queryParams.get("message");
  
  
      if (messageParam) {
          setMessage(messageParam);
          setTimeout(()=>{
            setMessage("")
          },3000)
      }
  }, []);
  
    const [adminData, setAdminData] =  useState({
        image:'',
        role:'',
        name:'',
        email:'',
        contact:'',
        location:'',
        profileInformation:'',
        facebook:'',
        twitter:'',
        instagram:'',
    })


        const getAdminData = useCallback(async () =>{
            const token = localStorage.getItem("jwtToken");
            axios.defaults.headers.common["Authorization"] = token;

            try{
                const response = await axios.get(`http://localhost:8000/admin/editAdminData/${id}`)
                const data =  response.data;
                setAdminData({
                    image: data.image,
                    role: data.role,
                    name: data.username,
                    email: data.email,
                    contact: data.contact,
                    location: data.location,
                    profileInformation: data.profileInformation,
                    facebook: data.facebook,
                    twitter: data.twitter,
                    instagram: data.instagram,

                })
            }catch(err){
                if (err.response.status == "400") {
                    window.location.href = "/authentication/sign-in";}
                console.log(err)
            }

        })

    useEffect(() =>{
        getAdminData()
    },[]);


    const handleAdd = async() => {

     

        try{
            await axios.put(`http://localhost:8000/admin/updateAdminData/${id}`,{
                image: adminData.image,
                role: adminData.role,
                username: adminData.name,
                email: adminData.email,
                contact: adminData.contact,
                location: adminData.location,
                profileInformation: adminData.profileInformation,
                facebook: adminData.facebook,
                twitter: adminData.twitter,
                instagram: adminData.instagram,

            })
            window.location.href =`/profile?message=Updated%20successfully`;
            
        }catch(err){
            console.log(err);
        }


    }
    

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            if (files.length > 0) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setAdminData({ ...adminData, image: event.target.result });
                };
                reader.readAsDataURL(files[0]);
            }
        } else {
            setAdminData({ ...adminData, [name]: value });
        }
    };

    return (
        <BasicLayout >
            <Card>
                <SoftBox p={3} mb={1} textAlign="center">
                    <SoftTypography variant="h5" fontWeight="medium">
                        Update Admin
                    </SoftTypography>
                </SoftBox>
                <SoftBox mb={2}>
                    {/* ... */}
                </SoftBox>
                <SoftBox pt={2} pb={3} px={3}>
                <SoftTypography   style={{ opacity: message ? 1 : 0, transition: "opacity 0.9s ease-in-out",fontSize:"13px" }}  variant="h6" color="success">
                {message && decodeURIComponent(message)}
            </SoftTypography>
                    <SoftBox component="form" role="form">
                        <SoftBox mb={2}>
                            <input style={{width:'100%'}}   accept="image/*" name="image" onChange={handleChange}  multiple type="file" placeholder="image" />
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftInput value={adminData.role}  onChange={handleChange} name="role" type="text" placeholder="role" />
                        </SoftBox>
                        <SoftBox mb={2}>
                        <SoftInput value={adminData.name}  onChange={handleChange} name="name" type="text" placeholder="name" />
                                  </SoftBox>
                        <SoftBox mb={2}>
                            <SoftInput value={adminData.email}  onChange={handleChange}  name="email" type="text" placeholder="email" />
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftInput value={adminData.contact}  onChange={handleChange}  name="contact" type="text" placeholder="contact" />
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftInput value={adminData.location}  onChange={handleChange}  name="location" type="text" placeholder="location" />
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftInput value={adminData.profileInformation}  onChange={handleChange}  name="profileInformation" type="text" placeholder="Profile Information" />
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftInput value={adminData.facebook}  onChange={handleChange}  name="facebook" type="text" placeholder="facebook link" />
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftInput value={adminData.twitter}  onChange={handleChange}  name="twitter" type="text" placeholder="twitter link" />
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftInput  value={adminData.instagram}  onChange={handleChange}  name="instagram" type="text" placeholder="instagram link" />
                        </SoftBox>
                        <SoftBox display="flex" alignItems="center">
                            {/* ... */}
                        </SoftBox>
                        <SoftBox mt={4} mb={1}>
                            <SoftButton onClick={handleAdd} variant="gradient" color="dark" fullWidth>
                                Update Admin
                            </SoftButton>
                        </SoftBox>
                    </SoftBox>
                </SoftBox>
            </Card>
        </BasicLayout>
    );
}

export default SignUp;
