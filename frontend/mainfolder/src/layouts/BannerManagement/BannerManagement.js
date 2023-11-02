import React, { useState,useEffect } from 'react'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Table from 'react-bootstrap/Table';
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SoftInput from "components/SoftInput";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from "examples/Footer";
import {Zoom} from '@mui/material';





const subCategoryManagement = () => {

 
  const [open, setOpen] = React.useState(false);
  const[opens,setOpens] = React.useState(false)
  const [deleteId, setDeleteId] = useState(null);
  const [data,setData] = useState([])
  const [image, setImage] = useState([])
  const [title, setTitle] = useState('')
  const [description,setDescripton] = useState('')
  const [imgError, setImageError] = useState('')
  const [nameError, setNameError] = useState('')
  const [descriptionError, setDesciprionError] = useState('')

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

    getData()
}, []);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  setNameError('')
  setImageError('')
  setDesciprionError('')
};
const handleClickOpens = (_id) => {
  setOpens(true);
  setDeleteId(_id);
};

const handleCloses = () => {
  setOpens(false);
};




 const handleAdd = async () =>{

  
//   const reader = new FileReader();
//   reader.readAsDataURL(image);
//   reader.onloadend = () => {
// const base64Image = reader.result;
  
const formData = new FormData();


formData.append('image', image);
formData.append('title', title);
formData.append('description', description);



if (image.length <1) {
  setImageError("Please select image");
} else {
  setImageError("");
}

if (title.length <1) {
  setNameError("Please enter title");
} else {
  setNameError("");
}

if(description.length <1) {
    setDesciprionError("please enter description");
}else(
    setDesciprionError('')
)

if(image !=='' && title !=='' && description !=='') {

axios.post('http://localhost:8000/admin/banneradd',formData,{
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})
.then((res) => {
  console.log(res.data);
  window.location.href =`/Banner?message=Banner%20Added%20successfully`;
})
.catch((err) => {
  console.log(err);
});
// };

}


 }

 const handleDelete = async() =>{
  handleCloses()
  if(deleteId){
    window.location.href =`/Banner?message=banner%20Deleted%20successfully`;
    
    try{
       await axios.delete(`http://localhost:8000/admin/deleteBanner/${deleteId}`) 
       setData((prevData) => prevData.filter((item)=> item.id !== deleteId))
        
        setDeleteId(null);
       
    }catch(err){
        console.log(err);
    }
  }
  

 }


 const getData = async () =>{
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = token;

    try{
        const response = await axios.get('http://localhost:8000/admin/bannerGet')
        const data = await response.data

        setData(data);
    }catch(err){
        if (err.response.status == "400") {
            window.location.href = "/authentication/sign-in";}
        console.log(err);
    }

 }
 

  return (
   
   
   
    <DashboardLayout>
     <DashboardNavbar />
    
     <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
     <SoftButton onClick={handleClickOpen}  variant="gradient" color="dark" >
               Add Banner
              </SoftButton>
              </div>
              
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          
              <SoftTypography variant="h6">Banner table</SoftTypography>
            </SoftBox>
            <SoftTypography   style={{ opacity: message ? 1 : 0, transition: "opacity 0.9s ease-in-out",fontSize:"13px" }}  variant="h6" color="success">
                {message && decodeURIComponent(message)}
            </SoftTypography>
            <Table  className="shadow p-3 mb-5 bg-body rounded" striped="columns">
      <thead>
        <tr style={{fontSize:'16px'}}>
            <th>Banner Image</th>
            <th>Banner Title</th>
            <th>Banner Description</th>
           
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        
        {data.map((item)=>(
             <tr style={{fontSize:'14px'}} key={item.id}>
             <td><img style={{width:'40px'}} src={`http://localhost:8000/${item.image}`}></img></td>
             <td>{item.title}</td>
             <td>{item.description}</td>
             <td><Link to={`/Banneredit/${item._id}`} ><SoftButton variant="text" color="info"  fontWeight="medium">Edit</SoftButton></Link></td>
             <td>  <SoftButton variant="text" color="error"  fontWeight="medium" onClick={() => handleClickOpens(item._id)} >Delete</SoftButton></td>
           </tr>
        ))}
           

        
        
      </tbody>
    </Table>


    <div>
      <Dialog TransitionComponent={Zoom} transitionDuration={400} open={open} onClose={handleClose}>
        <DialogTitle>Add Banner</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Banner details
          </DialogContentText>
          <SoftBox mb={2}>
              <SoftInput  onChange={(e) => setImage(e.target.files[0])} type="file"  accept="jpeg,jpg,png" />
            </SoftBox>
            <p style={{marginTop:'-12px', color:'red', fontSize:'11px'}}>
              {imgError}
            </p>
          <SoftBox mb={2}>
              <SoftInput  onChange={(e) => setTitle(e.target.value)} placeholder="Banner Title" type='text'  />
            </SoftBox>
            <p style={{marginTop:'-12px', color:'red', fontSize:'11px'}}>
              {nameError}
            </p>
          <SoftBox mb={2}>
          <textarea style={{width:'100%',borderRadius:'7px',fontSize:'14px',paddingLeft:'4px',outline:'none'}} onChange={(e) => setDescripton(e.target.value)} placeholder="Description" type='text'  />
            </SoftBox>
            <p style={{marginTop:'-12px', color:'red', fontSize:'11px'}}>
              {descriptionError}
            </p>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>Cancel</Button>
          <Button color="error" onClick={handleAdd}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>


    <div>
        <Dialog
          open={opens}
          onClose={handleCloses}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          TransitionComponent={Zoom} transitionDuration={400}
        >
          <DialogTitle id="alert-dialog-title">Delete Banner</DialogTitle>
          <DialogContent>
            <DialogContentText style={{fontSize:'14px'}} id="alert-dialog-description">
              Are you sure you want to delete this Banner?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloses} color="error">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
   <Footer />
    </DashboardLayout>

 
  )
  
}
  


export default subCategoryManagement