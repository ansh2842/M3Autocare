import React, { useState,useEffect } from 'react'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Table from 'react-bootstrap/Table';
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import axios from 'axios';
import { CallReceived } from '@mui/icons-material';






const AppointmentManagement = () => {

    const [data,getData] = useState([])
    const [newstatus,setNewStatus] = useState('')

    useEffect(()=>{
        getappData()
 },[])

    const getappData =async()=>{
        const token = localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"] = token;

        try{
            const response = await axios.get('http://localhost:8000/admin/getappointmentdata')
            const data = await response.data;
            getData(data);
        }catch(err){
            if (err.response.status == "400") {
                window.location.href = "/authentication/sign-in";}
            console.log(err)
        }
      }
    
    const handleChange = async(id)=>{

      const data = {
        newstatus: newstatus 
      }
      

        try{

            await axios.put(`http://localhost:8000/user/updateStatus/${id}`,data)
            .then(res=>{
                alert('status updated')
                console.log(res.data)
            }).catch(err=>{
                console.log(err)
            })
        }catch(err){
            console.log(err)
        }


    }

  return (
   
   
   
    <DashboardLayout>
     <DashboardNavbar />
    
     <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
              </div>
              
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          
              <SoftTypography variant="h6">Appoinment table</SoftTypography>
            </SoftBox>
            <Table  className="shadow p-3 mb-5 bg-body rounded" striped="columns">
      <thead>
        <tr style={{fontSize:'16px'}}>
            <th>Appointment ID</th>
            <th>User ID</th>
          <th>Name</th>
          <th>Email /<br/>Contact</th>
          <th>Service</th>
          <th>Price</th>
          <th>Location</th>
          <th>Car Name /<br/>Car Number</th>
          <th>Remarks</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item)=>(
             <tr style={{fontSize:'14px'}} key={item.id} >
             <td>{item.Appointment_id}</td>
             <td>{item.Userid}</td>
             <td>{item.name}</td>
             <td>{item.email}<br/>{item.contact}</td>
             <td>{item.service}</td>
             <td>{item.price}</td>
             <td>{item.location}</td>
             <td>{item.carName}<br/>{item.CarNumber}</td>
             <td>{item.remarks}</td>
             <td><select  onChange={(e)=>setNewStatus(e.target.value)}>
                <option value={item.status} >{item.status}</option>
                <option>Received</option>
                <option>Seeking Issue</option>
                <option>Team on work</option>
                <option>On progress</option>
                <option>Checking all works</option>
                <option>we are on last</option>
                <option>Work Done</option>
                </select></td>
                
             <td><SoftButton onClick={()=>handleChange(item.Appointment_id)} variant="text" color="info"  fontWeight="medium">Done</SoftButton></td>
           </tr>   
        ))}
           
      </tbody>
    </Table>
   <Footer />
    </DashboardLayout>

 
  )
  
}
  


export default AppointmentManagement