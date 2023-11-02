/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LockResetIcon from '@mui/icons-material/LockReset';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SoftInput from "components/SoftInput";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";

// Soft UI Dashboard React examples
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Soft UI Dashboard React icons
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";
import axios from 'axios'
import { useNavigate, useParams } from "react-router";
import { Icon } from "@mui/material";
import {Zoom} from '@mui/material';
import SoftButton from "components/SoftButton";
import EditIcon from '@mui/icons-material/Edit';

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const [open, setOpen] = useState(false);
  const [AdminData, setAdminData] = useState([])
  
  const [userDetails, setUserDetails] = useState('')
  const [oldPassword,setOldPassword] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswords = () => setShowNewPassword((show) => !show);
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
    setUserDetails(userProfile)
    const queryParams = new URLSearchParams(window.location.search);
    const messageParam = queryParams.get("message");

console.log(userProfile);
    if (messageParam) {
        setMessage(messageParam);
        setTimeout(()=>{
          setMessage("")
        },3000)
    }
}, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInvalid("");
  };
  
console.log(userDetails)
 

  useEffect(() =>{
    getAdmins()
  },[])

  const getAdmins = async () =>{
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = token;

    try{
      const response = await axios.get('http://localhost:8000/admin/adminData',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.data;
      setAdminData(data);
    }catch(err){
      console.log(err)
    }

  }

  const handleAdds = async () => {
   
  
    const datas = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
  
    try {
      const response = await axios.post(`http://localhost:8000/admin/changePassword/${userDetails.id}`, datas);
      setOpen(false);
      const data = await response.data;
      console.log(userDetails.name);
      setInvalid("");
      window.location.href = `/profile?message=Password%20Updated%20successfully`;
    } catch (err) {
      console.error(err);
      setInvalid("User not found or incorrect password");
    }
  };

  const navigates = () =>{
    navigate(`/AdminEdits/${AdminData._id}`)
  }
  

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >

<SoftTypography   style={{ opacity: message ? 1 : 0, transition: "opacity 0.9s ease-in-out",fontSize:"13px" }}  variant="h6" color="success">
                {message && decodeURIComponent(message)}
            </SoftTypography>
   <div>
<Grid container spacing={3} alignItems="center">
<Grid item>
  <SoftAvatar
    src={AdminData.image}
    alt="profile-image"
    variant="rounded"
    size="xl"
    shadow="sm"
  />
</Grid>

<Grid item>
  <SoftBox height="100%" mt={0.5} lineHeight={1}>
    <SoftTypography variant="h5" fontWeight="medium">
      {AdminData.username}
    </SoftTypography>
    <SoftTypography variant="button" color="text" fontWeight="medium">
      {AdminData.role}
    </SoftTypography>
  </SoftBox>
</Grid>

<Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ background: "transparent" }}
              >
                <Tab onClick={navigates} label="Edit" icon={<EditIcon />} />
                <Tab label="Message" icon={<Document />} />
                <Tab onClick={handleClickOpen} label="Change Password" icon={<LockResetIcon />} />
                
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        </div>

       
      </Card>

      <div>
      <Dialog TransitionComponent={Zoom} transitionDuration={400} open={open} onClose={handleClose}>
        <DialogTitle >Change your password</DialogTitle>
        <DialogContent>
         
          <SoftTypography  variant="button" color="text" fontWeight="medium">
             Old  password:
              </SoftTypography>
          <SoftBox mb={2}>
          <OutlinedInput onChange={(e) => setOldPassword(e.target.value)}
            id="outlined-adornment-password"
            placeholder="old password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          
          />
  
              {/* <SoftInput      type="text"  placeholder="old Password" /> < VisibilityOffIcon /> */}
            </SoftBox>
            {/* <p style={{marginTop:'-12px', color:'red', fontSize:'11px'}}>
              {imgError}
            </p> */}
               {invalid && (

              <p style={{marginTop:'-16px', color:'red', fontSize:'11px'}}>
                {invalid}
                </p>

                )}
               <SoftTypography variant="button" color="text" fontWeight="medium">
               New Password:
               </SoftTypography>
          <SoftBox mb={2}>
              {/* <SoftInput   placeholder="new password" type='password' /> */}
              <OutlinedInput  onChange={(e) => setNewPassword(e.target.value)}
            id="outlined-adornment-password"
            placeholder="old password"
            type={showNewPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswords}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          
          />
            </SoftBox>
            {/* <p style={{marginTop:'-12px', color:'red', fontSize:'11px'}}>
              {nameError}
            </p> */}
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>Cancel</Button>
          <Button color="error" onClick={handleAdds} >Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>




    </SoftBox>
  );
}

export default Header;
