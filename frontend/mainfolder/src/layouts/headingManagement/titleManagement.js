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
import {Editor} from "@tinymce/tinymce-react"
import Footer from "examples/Footer";
import {Zoom} from '@mui/material';

function headingManagemtn() {

  
 const [title,setTitle] = useState('')
 const [getTitle,setGetTitle] = useState([])
  const [open, setOpen] = React.useState(false);
  const[opens,setOpens] = React.useState(false)
  const [deleteId, setDeleteId] = useState(null);
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
    fetchData()
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
  selector: 'textarea#content_about1', 
  plugins: 'lists',
  toolbar: config.toolbar,
  
});

  const handleAdd =async () =>{
    var editor = tinymce.get('content_about1');
    var title = editor.getContent();

    const data ={
      title: title,
    }

    await axios.post('http://localhost:8000/admin/titleadd', data)
    .then(res =>{
      window.location.href =`/title?message=Title%20Added%20successfully`;
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  }

  const fetchData =async()=>{
    const token = localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"] = token;
            try{
                const response = await axios.get('http://localhost:8000/admin/getTitle')
                const data = await response.data
                setGetTitle(data)
            }catch(err){
                if (err.response.status == "400") {
                    window.location.href = "/authentication/sign-in";}
                console.log(err)
            }
        
  }

  const handleDelete = async() =>{
    handleCloses()
    if(deleteId){
      window.location.href =`/title?message=Title%20Deleted%20successfully`;
      
      try{
         await axios.delete(`http://localhost:8000/admin/deleteTitle/${deleteId}`) 
          setGetTitle((prevData) => prevData.filter((item)=> item.id !== deleteId))
          
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
              Add Title
             </SoftButton>
             </div>
             
       <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
         
             <SoftTypography variant="h6">Title table</SoftTypography>
           </SoftBox>
           <SoftTypography   style={{ opacity: message ? 1 : 0, transition: "opacity 0.9s ease-in-out",fontSize:"13px" }}  variant="h6" color="success">
               {message && decodeURIComponent(message)}
           </SoftTypography>
           <Table  className="shadow p-3 mb-5 bg-body rounded" striped="columns">
     <thead>
       <tr style={{fontSize:'16px'}}>
           <th>Title</th>
         <th>Edit</th>
         <th>Delete</th>
       </tr>
     </thead>
     <tbody>
        {getTitle.map((item)=>(
          <tr style={{fontSize:'14px'}} key={item.id} >
          <td dangerouslySetInnerHTML={{__html:item.title}}></td>
          <td><Link to={`/titleEdit/${item._id}`} ><SoftButton variant="text" color="info"  fontWeight="medium">Edit</SoftButton></Link></td>
          <td>  <SoftButton variant="text" color="error"  fontWeight="medium" onClick={() => handleClickOpens(item._id)} >Delete</SoftButton></td>
        </tr>


        ))}
           
    
       
     </tbody>
   </Table>


   <div>
     <Dialog TransitionComponent={Zoom} transitionDuration={400} open={open} onClose={handleClose}>
       <DialogTitle>Add Title</DialogTitle>
       <DialogContent>
         <DialogContentText>
           Title details
         </DialogContentText>
         <SoftBox mb={2}>
          <textarea style={{width:'100%',borderRadius:'7px',fontSize:'14px',paddingLeft:'4px',outline:'none'}} onChange={(e)=> setTitle(e.target.value)} type='text' placeholder='About Description' id="content_about1"  />
            </SoftBox>
         
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
             Are you sure you want to delete this Title?
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

export default headingManagemtn