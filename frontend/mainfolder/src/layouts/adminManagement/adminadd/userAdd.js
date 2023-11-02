import { useState } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import curved6 from "assets/images/curved-images/curved14.jpg";
import axios from 'axios'



function SignUp() {


  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [contact,setContact] = useState('')
  const [password,setPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [contactError, setContactError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [invalid, setInvalid] = useState(false)


  const handleContactChange = (e) => {
    const inputValue = e.target.value;
    
    if (inputValue.length <= 10) {
        setContact(inputValue);
    }
};


  const handleAdd = async () =>{



   if(name.length <1){
    setNameError('Name is required')
   }else{
    setNameError('')
   }
   if(email.length <1){
    setEmailError('Email is required')
   }else{
    setEmailError('')
   }
   if(contact.length <1){
    setContactError('Contact is required')
   }else{
    setContactError('')
   }
   if(password.length <1){
    setPasswordError('Password is required')
   }else{
    setPasswordError('')
   }

   
   if(name !== '' && email !=='' && contact!=='' && password!==''){


    const datas ={
        name:name,
        email:email,
        contact:contact,
        password:password
      }

      try{
         const response =  await axios.post('http://localhost:8000/admin/userLoginData',datas)
          const data = response.data
          console.log(data)
          setInvalid('')
          window.location.href ='/user?message=User%20added%20successfully'
        
      }catch(err){
        console.log(err)
        setInvalid('email already exists')
      }
    
   }

      

      
      }

    return (

        <div>


       
        <BasicLayout>
            
            <Card>
                <SoftBox p={3} mb={1} textAlign="center">
                    <SoftTypography variant="h5" fontWeight="medium">
                        Add User
                    </SoftTypography>
                </SoftBox>
                <SoftBox mb={2}>
                </SoftBox>
                <SoftBox pt={2} pb={3} px={3}>
                    <SoftBox component="form" role="form">
                        <SoftBox mb={2}>
                            <SoftInput onChange={(e) => setName(e.target.value)} placeholder="Name" />
                        </SoftBox>
                        <p style={{ color: "red", fontSize: "11px" }}>{nameError}</p>
                        <SoftBox mb={2}>
                            <SoftInput onChange={(e) => setEmail(e.target.value)}  type="text" placeholder="Email" />
                        </SoftBox>
                        {invalid && (
                        <p style={{marginTop:'-16px', color:'red', fontSize:'11px'}}>
                        {invalid}
                          </p>

                          )}
                        <p style={{ color: "red", fontSize: "11px" }}>{emailError}</p>
                        <SoftBox mb={2}>
                            <SoftInput value={contact}  onChange={handleContactChange} type="number" placeholder="Contact" />
                        </SoftBox>
                        <p style={{ color: "red", fontSize: "11px" }}>{contactError}</p>
                        <SoftBox mb={2}>
                            <SoftInput onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                        </SoftBox>
                        <p style={{ color: "red", fontSize: "11px" }}>{passwordError}</p>
                        <SoftBox display="flex" alignItems="center">
                        </SoftBox>
                        <SoftBox mt={4} mb={1}>
                            <SoftButton onClick={handleAdd}  variant="gradient" color="dark" fullWidth>
                                Add User
                            </SoftButton>
                        </SoftBox>
                    </SoftBox>
                </SoftBox>
            </Card>
        </BasicLayout>
        </div>
    );
}

export default SignUp;
