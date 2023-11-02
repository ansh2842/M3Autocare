import React, { useState, useEffect } from 'react';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import Table from 'react-bootstrap/Table';
import Button from '@mui/material/Button';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SoftButton from 'components/SoftButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './admin.css'
import Footer from "examples/Footer";
import {Zoom} from '@mui/material';

const adminManagement = () => {
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [data, getData] = useState([]);

  const [message,setMessage] = useState('');
  

  useEffect(()=>{

    const queryMsg = new URLSearchParams(window.location.search)
    const msg = queryMsg.get('message');
    if (msg ) {
      setMessage(msg);

      setTimeout(()=>{
        setMessage('')
      },3000)
    }
  },[])


  const handleClickOpen = (_id) => {
    setOpen(true);
    setDeleteId(_id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async() => {
    try{
      const token = localStorage.getItem("jwtToken");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get('http://localhost:8000/admin/getData')
      getData(response.data);
    } catch (err) {
      if (err.response.status == "400") {
        window.location.href = "/authentication/sign-in";}
    }
  
  };

  const handleDelete = async () => {
    handleClose();
    if (deleteId) {
      window.location.href ='/user?message=User%20Deleted%20successfully'
      try {
        await axios.delete(`http://localhost:8000/admin/delete/${deleteId}`);
        getData((prevList) => prevList.filter((item) => item._id !== deleteId));
        setDeleteId(null);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Link to="/addUser">
        {' '}
        <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
        <SoftButton variant="gradient" color="dark" >
          Add User
        </SoftButton>
        </div>
      </Link>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftTypography variant="h6">{'User\'s table'}</SoftTypography>
      </SoftBox>
      <SoftTypography  style={{ opacity: message ? 1 : 0, transition: "opacity 0.9s ease-in-out", fontSize:'13px' }}  variant="h6" color="success">
                {message && decodeURIComponent(message)}
            </SoftTypography>
            
      <Table className="shadow p-3 mb-5 bg-body rounded" striped>
        <thead>
          <tr style={{ fontSize: '16px' }}>
            <th>Full Name</th>
            <th>Email</th>
            <th>Conatct no.</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((list) => (
            <tr style={{ fontSize: '14px' }} key={list._id}>
              <td>{list.name}</td>
              <td>{list.email}</td>
              <td>{list.contact}</td>
              <td>
                <Link to={`/edit/${list._id}`}> <SoftButton variant="text" color="info"  fontWeight="medium">Edit</SoftButton> </Link>{' '}
              </td>
              <td><SoftButton onClick={() => handleClickOpen(list._id)} variant="text" color="error"  fontWeight="medium">
                  Delete
                </SoftButton>{' '}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          TransitionComponent={Zoom} transitionDuration={400}
        >
          <DialogTitle id="alert-dialog-title">Delete User</DialogTitle>
          <DialogContent>
            <DialogContentText style={{fontSize:'14px'}} id="alert-dialog-description">
              Are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Footer />
    </DashboardLayout>
  );
};

export default adminManagement;
