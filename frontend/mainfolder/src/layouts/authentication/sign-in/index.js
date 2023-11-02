import { useState } from "react";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import axios from "axios"; 
import forgotpassword from "./forgotpassword";

function SignIn() {




  const [rememberMe, setRememberMe] = useState(true);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);


  
  const [email,setEmail] =useState('')
  const [password,setPassword] =useState('') 
  const [Nameerror, setNameError] = useState('')
  const [Passworderror, setPasswordError] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [type,setType] =useState('password')



    const handleLogin = () =>{

      if(email.length<1){
        setNameError('Email is required') 
      }else{
        setNameError('')
      }
  
      if(password.length<1){
        setPasswordError('Password is required')
      }else{
        setPasswordError('') 
      }


      if(email !=='' && password !==''){

        const data ={
          email: email,
          password: password
   
      }
      console.log(data)
         axios.post('http://localhost:8000/admin/adminLogins',data)
              .then(response =>{
               console.log(response.data)
               localStorage.setItem("jwtToken", response.data.token);
               console.log(response.data.userprofile)
               const userProfileData = {
                username: response.data.userprofile.username,
                email: response.data.userprofile.email,
                id: response.data.userprofile.id};
               localStorage.setItem("userProfile",JSON.stringify (userProfileData));
               window.location.href='/dashboard'
               setInvalid(" ");
              }).catch(err =>{
               console.log(err)
               setInvalid("Invalid email or password");
              })
   

      }
    }

    const togglePassword = () =>{

      if(type === 'password'){
        setType('text')
    }else{
      setType('password')
    }
  }

    // axios.post('http://localhost:8000/admin')
    // .then(response =>{
    //   console.log(response.data)
    // }).catch(err =>{
    //   console.log(err)
    // })



  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography  component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput style={{textTransform:'lowercase'}} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        </SoftBox>
        <p style={{marginTop:'-12px', color:'red', fontSize:'11px'}}  >
              {Nameerror}
            </p>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput  type={type} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <div>
          <input onClick={togglePassword} type="checkbox" ></input>
          <label style={{fontSize:"12px",marginLeft:'5px',cursor:'pointer'}}>Show password</label>
          <div style={{display:'flex',justifyContent:'flex-end',marginTop:'-22px', fontSize:'12px',cursor:'pointer'}}>
          <Link  to={'/ForgotPassword'}>Forgot Password ?</Link>
          </div>
          
          </div>
         
          
        </SoftBox>
        <p style={{marginTop:'-12px', color:'red', fontSize:'11px'}}>
              {Passworderror}
            </p>
              {invalid && (

            <p style={{marginTop:'-16px', color:'red', fontSize:'11px'}}>
            {invalid}
            </p>

              )}


            
        <SoftBox display="flex" alignItems="center">
          
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton onClick={handleLogin} variant="gradient" color="info" fullWidth>
            sign in
          </SoftButton>
        </SoftBox>
        {/* <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox> */}
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
