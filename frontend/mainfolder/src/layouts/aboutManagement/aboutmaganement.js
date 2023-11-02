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
import {Editor} from "@tinymce/tinymce-react"




const subCategoryManagement = () => {

 
  const [open, setOpen] = React.useState(false);
  const[opens,setOpens] = React.useState(false)
  const [getDataAbout,setDataAbout] = useState([])
  const [deleteId, setDeleteId] = useState(null);
  const [about,setAbout] = useState('')
  const [image,setImage] =useState('');
  const [valueData,setValuesData]  = useState('');
  const [missionData,setMissonData]  = useState('');
  const [chooseData,setChooseData] = useState('');
  const [journeyData,setJourneyData] = useState('');
  const [getData, setGetData] = useState([])
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
const SetCountetTyne = (id) => {
    //setOpens(false);
    alert (1)
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
  tinymce.init({
    selector: 'textarea#content_about2',  
    plugins: 'lists',
    toolbar: config.toolbar,

  });
  tinymce.init({
    selector: 'textarea#content_about3',  
    plugins: 'lists',
    toolbar: config.toolbar,
    
  });
  tinymce.init({
    selector: 'textarea#content_about4', 
    plugins: 'lists',
    toolbar: config.toolbar,
  
  });
  tinymce.init({
    selector: 'textarea#content_about5',  
    plugins: 'lists',
    toolbar: config.toolbar,
    
  });
  tinymce.init({
    selector: 'textarea#content_about6',  
    plugins: 'lists',
    toolbar: config.toolbar,
    
  });
  

    const handleAdd =async()=>{
        var editor = tinymce.get('content_about1');
        var editor2 = tinymce.get('content_about2');
        var editor3 = tinymce.get('content_about3');
        var editor4 = tinymce.get('content_about4');
        var editor5 = tinymce.get('content_about5');

         // Get the content of the editor
        var about = editor.getContent();
        var valueData = editor2.getContent();
        var missionData = editor3.getContent();
        var chooseData = editor4.getContent();
        var journeyData = editor5.getContent();
    
       // journey = content
        const formData = new FormData();
        formData.append('about',about);
        formData.append('image',image);

        formData.append('valueData',valueData);
        formData.append('missionData',missionData);

        formData.append('chooseData',chooseData);
        formData.append('journeyData',journeyData);


       await axios.post('http://localhost:8000/admin/aboutpost',formData,{
        headers:{'Content-Type': 'multipart/form-data'}
        
       })
       .then(res=>{
        console.log(res)
        window.location.href =`/admin-about?message=About%20Added%20successfully`;
       }).catch(err=>{
        console.log(err)
       });
    }


    const fetchData = async() =>{
        const token = localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"] = token;
            try{
                const response = await axios.get('http://localhost:8000/admin/getpost')
                const data = await response.data
                setDataAbout(data)
            }catch(err){
                if (err.response.status == "400") {
                    window.location.href = "/authentication/sign-in";}
                console.log(err)
            }
       
    }

 const handleDelete = async() =>{
  handleCloses()
  if(deleteId){
    window.location.href =`/admin-about?message=About%20Deleted%20successfully`;
    
    try{
       await axios.delete(`http://localhost:8000/admin/deleteabout/${deleteId}`) 
        setDataAbout((prevData) => prevData.filter((item)=> item.id !== deleteId))
        
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
               Add About
              </SoftButton>
              </div>
              
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          
              <SoftTypography variant="h6">About table</SoftTypography>
            </SoftBox>
            <SoftTypography   style={{ opacity: message ? 1 : 0, transition: "opacity 0.9s ease-in-out",fontSize:"13px" }}  variant="h6" color="success">
                {message && decodeURIComponent(message)}
            </SoftTypography>
            <Table  className="shadow p-3 mb-5 bg-body rounded" striped="columns">
      <thead>
        <tr style={{fontSize:'16px'}}>
            <th>Image</th>
            <th>Description</th>
            <th>Value Description</th>
            <th>Mission Description</th>
            <th>Choose Description</th>
            <th>Journey Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>

            {getDataAbout.map((item)=>(
                  <tr style={{fontSize:'14px'}} key={item.id}>
                  <td><img style={{width:'40px'}} src={`http://localhost:8000/${item.image}`}></img></td>
                  <td dangerouslySetInnerHTML={{__html:item.about}}></td>
                  <td dangerouslySetInnerHTML={{__html:item.valuedata}}></td>
                  <td dangerouslySetInnerHTML={{__html:item.missiondata}}></td>
                  <td dangerouslySetInnerHTML={{__html:item.choosedata}}></td>
                  <td dangerouslySetInnerHTML={{__html:item.journeydata}}></td>
                  <td><Link to={`/Aboutedit/${item._id}`} ><SoftButton variant="text" color="info"  fontWeight="medium">Edit</SoftButton></Link></td>
                  <td>  <SoftButton variant="text" color="error"  fontWeight="medium" onClick={() => handleClickOpens(item._id)} >Delete</SoftButton></td>
                </tr>
            ))}
       
      </tbody>
    </Table>


    <div>
      <Dialog TransitionComponent={Zoom} transitionDuration={400} open={open} onClose={handleClose}>
        <DialogTitle>Add About</DialogTitle>
        <DialogContent>
          <DialogContentText>
            About details
          </DialogContentText>
          <SoftBox mb={2}>
              <SoftInput type="file" onChange={(e)=>setImage(e.target.files[0])} accept="jpeg,jpg,png" />
            </SoftBox>
            <p style={{marginTop:'-12px', color:'red', fontSize:'11px'}}>
           
            </p>
           
          <SoftBox mb={2}>
          <textarea style={{width:'100%',borderRadius:'7px',fontSize:'14px',paddingLeft:'4px',outline:'none'}} onChange={(e)=> setAbout(e.target.value)} type='text' placeholder='About Description' id="content_about1"  />
            </SoftBox>
            <p style={{marginTop:'-12px', color:'red', fontSize:'11px'}}>
   
            </p>
           
            <SoftBox mb={2}>
            <label style={{fontSize:'16px'}}>Our value description</label>
            <textarea id="content_about2" style={{width:'100%',borderRadius:'7px',fontSize:'14px',paddingLeft:'4px',outline:'none'}} onChange={(e) => setValuesData(e.target.value)} placeholder='Our Value Description'  />
            </SoftBox>
            <SoftBox mb={2}>
            <label style={{fontSize:'16px'}}>Our mission description</label>
            <textarea style={{width:'100%',borderRadius:'7px',fontSize:'14px',paddingLeft:'4px',outline:'none'}} onChange={(e)=>setMissonData(e.target.value)} placeholder='Our mission Description' id='content_about3' />
            </SoftBox>

            <SoftBox mb={2}>
                <label style={{fontSize:'16px'}}>Choose description</label>
            <textarea style={{width:'100%',borderRadius:'7px',fontSize:'14px',paddingLeft:'4px',outline:'none'}} onChange={(e)=>setChooseData(e.target.value)} placeholder='choose Description' id='content_about4' />
            </SoftBox>
            <SoftBox mb={2}>
            <label style={{fontSize:'16px'}}>Journey description</label>
            <textarea style={{width:'100%',borderRadius:'7px',fontSize:'14px',paddingLeft:'4px',outline:'none'}} onChange={(e)=>setJourneyData(e.target.value)} placeholder='journey Description' id='content_about5' />
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
          <DialogTitle id="alert-dialog-title">Delete About</DialogTitle>
          <DialogContent>
            <DialogContentText style={{fontSize:'14px'}} id="alert-dialog-description">
              Are you sure you want to delete this About?
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