import { useEffect, useState, useCallback } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { useParams } from "react-router-dom";
import curved6 from "assets/images/curved-images/curved14.jpg";
import axios from 'axios'

const serviceEdit = () => {

    const {id } = useParams();
    const [getService, setService] = useState({
        image:null,
        name:'',
        description:'',
        mrp:'',
        price:''
    })


    const getServiceData = useCallback( async() => {
        const token = localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"] = token;

        await axios.get(`http://localhost:8000/admin/getServiceEdit/${id}`)
        .then(res =>{
            setService({
                image:res.data.image,
                name:res.data.name,
                description:res.data.description,
                mrp:res.data.mrp,
                price:res.data.price
            })
        }).catch(err=>{
            if (err.response.status == "400") {
                window.location.href = "/authentication/sign-in";}
            console.log(err)
        })
    },[id])

    useEffect(() => {
        getServiceData()
    },[])

    const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (name === 'image') {
            setService({ ...getService, image: files });
        }    else {
            setService({ ...getService, [name]: value });
        }
    }

    const handleUpdate =async() =>{
        const formData =  new FormData();

        for(let i = 0; i < getService.image.length; i++) {
            formData.append('image', getService.image[i])
          }

          formData.append('names',getService.name)
          formData.append('descriptions',getService.description)
          formData.append('mrps',getService.mrp)
          formData.append('prices',getService.price)

          try{
            await axios.put(`http://localhost:8000/admin/updateServiceData/${id}`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            window.location.href ='/service?message=Service%20updated%20successfully'
        }catch(err){
            
            console.log(err)
            
        }
    }

  return (
    <BasicLayout
    title='Update'
    image={curved6} >
    <Card>
        <SoftBox p={3} mb={1} textAlign="center">
            <SoftTypography variant="h5" fontWeight="medium">
                Update Service
            </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
            {/* ... */}
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
            <SoftBox component="form" role="form">
                <SoftBox mb={2}>
                    <SoftInput accept="image/*" name="image" onChange={handleChange}  type="file"  placeholder="Name" />
                </SoftBox>
                <SoftBox mb={2}>
                    <SoftInput value={getService.name} onChange={handleChange} name="name"   type="text" placeholder="Title" />
                </SoftBox>
                {/* <p style={{ color: "red", fontSize: "11px" }}>{titleError}</p> */}
                <SoftBox display="flex" alignItems="center">
                    {/* ... */}
                </SoftBox>
                <SoftBox mb={2}>
              
              <textarea value={getService.description} name='description' onChange={handleChange}  style={{width:'100%',borderRadius:'7px',fontSize:'14px',paddingLeft:'4px',outline:'none'}} placeholder="Description" type='text'  />
            </SoftBox>
            {/* <p style={{ color: "red", fontSize: "11px" }}>{Errordescription}</p> */}
          
            <SoftBox mb={2}>
              <SoftInput style={{ textDecoration: 'line-through' }} value={getService.mrp} onChange={handleChange} name="mrp"   placeholder="MRP" type='number'  />
            </SoftBox>
            {/* <p style={{ color: "red", fontSize: "11px" }}>{Errormrp}</p> */}
            <SoftBox mb={2}>
              <SoftInput    value={getService.price} onChange={handleChange} name='price' placeholder="price" type='number'  />
            </SoftBox>
                <SoftBox mt={4} mb={1}>
                    <SoftButton onClick={handleUpdate}  variant="gradient" color="dark" fullWidth>
                        Update Service
                    </SoftButton>
                </SoftBox>
            </SoftBox>
        </SoftBox>
    </Card>
</BasicLayout>
  )
}

export default serviceEdit