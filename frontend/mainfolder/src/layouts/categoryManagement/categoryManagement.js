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




const categoryManagement = () => {

    const [open, setOpen] = React.useState(false);
    const[opens,setOpens] = React.useState(false)
    const [deleteId, setDeleteId] = useState(null);
    const [image, setImage] = useState([])
    const [title, setTitle] = useState('')
    const [getData, setGetData] = useState([])
    const [brandname,setBrandName] = useState('')
   

   

    const [imgError, setImageError] = useState('')
    const [nameError, setNameError] = useState('')
    const [Errorbrandname,setErrorBrandName] = useState('')

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpens = (_id) => {
    setOpens(true);
    setDeleteId(_id);
  };

  const handleCloses = () => {
    setOpens(false);
  };

  useEffect(()=>{
    fetchData()
},[]);

    const fetchData = async () => {
      const token = localStorage.getItem("jwtToken");
      axios.defaults.headers.common["Authorization"] = token;

        await axios.get('http://localhost:8000/admin/getCategory')
        .then(res =>{
            setGetData(res.data);
            console.log(res.data);
        }).catch(err =>{
          if (err.response.status == "400") {
            window.location.href = "/authentication/sign-in";}
            console.log(err);
        })
    }


   const handleAdd = async () =>{

  

  const formData = new FormData();

  formData.append('image',image)
  formData.append('title',title)


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
  if(brandname.length <1){
    setErrorBrandName('please select from sub Category')
  }else{
    setErrorBrandName('')
  }

 if(image !=='' && title !=='') {

  axios.post('http://localhost:8000/admin/category',formData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .then((res) => {
    console.log(res.data);
    window.location.href =`/category?message=Category%20Added%20successfully`;
  })
  .catch((err) => {
    console.log(err);
  });


 }

   }

   const handleDelete = async() =>{
    handleCloses()
    if(deleteId){
      window.location.href =`/category?message=Category%20Deleted%20successfully`;
      
      try{
         await axios.delete(`http://localhost:8000/admin/deleteCategory/${deleteId}`) 
          setGetData((prevData) => prevData.filter((item)=> item.id !== deleteId))
          setDeleteId(null);
      }catch(err){
          console.log(err);
      }
    }
    
  
   }


  

  


  return (
    <DashboardLayout>
     <DashboardNavbar />
    
     <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
     <SoftButton onClick={handleClickOpen}  variant="gradient" color="dark" >
               Add Category
              </SoftButton>
              </div>
              
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6"> category table</SoftTypography>
            </SoftBox>
            <SoftTypography   style={{ opacity: message ? 1 : 0, transition: "opacity 0.9s ease-in-out",fontSize:"13px" }}  variant="h6" color="success">
                {message && decodeURIComponent(message)}
            </SoftTypography>
            <Table  className="shadow p-3 mb-5 bg-body rounded" striped="columns">
      <thead>
        <tr style={{fontSize:'16px'}}>
            <th>Category Image</th>
          <th>Category Name</th>
          
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {getData
        
        .map((items) =>(
            <tr style={{fontSize:'14px'}} key={items.id}>
            <td><img style={{width:'40px'}} src={`http://localhost:8000/${items.image}`}></img></td>
            <td>{items.Title}</td>
            

            <td><Link to={`/editCategory/${items._id}`}><SoftButton variant="text" color="info"  fontWeight="medium">Edit</SoftButton></Link> </td>
            <td><SoftButton onClick={() => handleClickOpens(items._id)} variant="text" color="error"  fontWeight="medium">Delete</SoftButton></td>
          </tr>

        ))}
        
      </tbody>
    </Table>


    <div>
      <Dialog TransitionComponent={Zoom} transitionDuration={400} open={open} onClose={handleClose}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            category details
          </DialogContentText>
          <SoftBox mb={2}>
              <SoftInput  onChange={(e) => setImage(e.target.files[0])} type="file"  accept="jpeg,jpg,png" />
            </SoftBox>
            <p style={{marginTop:'-12px', color:'red', fontSize:'11px'}}>
              {imgError}
            </p>
          <SoftBox mb={2}>
              <SoftInput  onChange={(e) => setTitle(e.target.value)} placeholder="Title" type='text'  />
            </SoftBox>
            <p style={{marginTop:'-12px', color:'red', fontSize:'11px'}}>
              {nameError}
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
          <DialogTitle id="alert-dialog-title">Delete Category</DialogTitle>
          <DialogContent>
            <DialogContentText style={{fontSize:'14px'}} id="alert-dialog-description">
              Are you sure you want to delete this category?
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

export default categoryManagement