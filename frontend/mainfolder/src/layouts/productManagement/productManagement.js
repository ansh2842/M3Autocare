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
import './product.module.css'
import Footer from "examples/Footer";
import {Zoom} from '@mui/material';


const categoryManagement = () => {


    const [open, setOpen] = React.useState(false);
    const [opens,setOpens] = React.useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [img,setImg] = useState([])
    const [prodctname,setProductName] = useState('')
    const [brandname,setBrandName] = useState('')
    const [category,setcategory] = useState('')
    const [subcategory,setSubCategorys] = useState('')
    const [description,setDescription] = useState('')
    const [quantity,setQuantity] = useState('')
    const [mrp,setMRP] = useState('')
    const [price,setPrice] = useState('')
    const [Errorimg,setErrorImg] = useState([])
    const [Errorprodctname,setErrorProductName] = useState('')
    const [Errorcategoryname, setCategoryName] = useState('')
    const [Errorbrandname,setErrorBrandName] = useState('')
    const [Errordescription,setErrorDescription] = useState('')
    const [Errorquantity,setErrorQuantity] = useState('')
    const [Errormrp,setErrorMRP] = useState('')
    const [Errorprice,setErrorPrice] = useState('')
    const [ErrorSub,setSub] = useState('')
    const [product,setProduct] = useState([])
    const [Brand, setBrand]= useState([])
    const [message,setMessage] = useState('')
    const [getsubCategory,setSubCategory] = useState([])
    const [selectCategory,setSelectCategory] = useState('');
    const [Categorys, setCategorys]= useState([])



    const HandleChange =(e) =>{
      setSelectCategory(e.target.value);
      setcategory(e.target.value);
    }

    const handleSubCategoryChanges = (event) => {
      const selectedSubCategoryValue = event.target.value; 
      setSubCategorys(selectedSubCategoryValue);
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
    const handleAdd = async () => {
   
    
    if(img.length < 1){
      setErrorImg('image is required')
    }else{
      setErrorImg('')
    }
    if(prodctname.length < 1){
      setErrorProductName('product name is required')
    }else{
      setErrorProductName('')
    }
    if(category.length < 1){
      setCategoryName('Category is required')
    }else{
      setCategoryName('')
    }
    if(brandname.length < 1){
      setErrorBrandName('Brand is required')
    }else{
      setErrorBrandName('')
    }
    if(subcategory.length < 1){
      setSub('sub category is required')
    }else{
      setSub('')
    }
    
    if(quantity.length < 1){
      setErrorQuantity('quantity is required')
    }else{
      setErrorQuantity('')
    }
    if(mrp.length < 1){
      setErrorMRP('mrp is required')
    }else{
      setErrorMRP('')
    }
    if(price.length < 1){
      setErrorPrice('price is required')
    }else{
      setErrorPrice('')
    }

    if(img !=='' && prodctname !=='' && category !=='' && brandname!=='' && description !=='' && quantity!=='' && mrp!=='' && price!==''){
      const formData = new FormData();

      var editor = tinymce.get('content_about1');
      var description  =editor.getContent();
  
      for (let i = 0; i < img.length; i++) {
        formData.append('image', img[i]);
      }
    
      formData.append('name', prodctname);
      formData.append('category',category);
      formData.append('brand', brandname);
      formData.append('subcategory', subcategory);
      formData.append('description', description);
      formData.append('quantity', quantity);
      formData.append('mrp', mrp);
      formData.append('price', price);
    
      try {
        const response = await axios.post('http://localhost:8000/admin/product', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        window.location.href ='/product?message=Product%20Added%20successfully'
        setOpen(false);
      } catch (err) {
        console.log(err);
      }

    }
  };

    useEffect(()=>{
      const queryParams = new URLSearchParams(window.location.search)
      const messageParams = queryParams.get('message')
      if(messageParams){
        setMessage(messageParams)
        setTimeout(()=>{
          setMessage('')
        },3000)
      } 
    },[])


    
   useEffect(()=>{
    getCategory()
   },[])

   const getCategory = async () =>{
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = token;

   await axios.get('http://localhost:8000/admin/getCategory')
    .then(res =>{
      setCategorys(res.data)
    }).catch(err =>{
      if (err.response.status == "400") {
        window.location.href = "/authentication/sign-in";}
        console.log(err)
    })

   }

    useEffect(()=>{
      getProduct()
    },[])

    const getProduct = async () =>{
      const token = localStorage.getItem("jwtToken");
      axios.defaults.headers.common["Authorization"] = token;
      
      await axios.get('http://localhost:8000/admin/getProducts')
      .then(res =>{
        setProduct(res.data)
      }).catch(err=>{
        if (err.response.status == "400") {
          window.location.href = "/authentication/sign-in";}
        console.log(err)
      })
    }


  const handleClickOpen = () => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
    setErrorImg('')
    setErrorProductName('')
    setErrorBrandName('')
    setCategoryName('')
    setErrorDescription('')
    setErrorQuantity('')
    setErrorMRP('')
    setErrorPrice('')
    setSub('')
  };

  const handleClickOpens = (_id) => {
    setOpens(true);
    setDeleteId(_id)
  };

  const handleCloses = () => {
    setOpens(false);
  };

  
  
    const handleDelete = async () =>{
      handleCloses();
      if(deleteId){
        window.location.href ='/product?message=Product%20Deleted%20successfully'
        try{
            await axios.delete(`http://localhost:8000/admin/productDelete/${deleteId}`)
            setProduct((prevList)=>prevList.filter((item)=>item.id !== deleteId))
            setDeleteId(null)
        
        }catch(err){
          console.log(err)
        }
  
      }
     
    }

    useEffect(()=>{
      getsubCategoryData()
     },[])
     
     const getsubCategoryData = async() =>{
  
      try{
        await axios.get('http://localhost:8000/admin/getsubCategory')
        .then(res =>{
          setSubCategory(res.data)
        })
      }catch(err){
        console.log(err);
      }
  
     }

     useEffect(()=>{
      getCategorys()
     },[])
    
     const getCategorys = async () =>{
      const token = localStorage.getItem("jwtToken");
      axios.defaults.headers.common["Authorization"] = token;
    
     await axios.get('http://localhost:8000/admin/getBrand')
      .then(res =>{
          setBrand(res.data)
      }).catch(err =>{
        if (err.response.status == "400") {
          window.location.href = "/authentication/sign-in";}
          console.log(err)
      })
    
     }

 
      
  return (
    <DashboardLayout>
     <DashboardNavbar />
     <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
     <SoftButton onClick={handleClickOpen}  variant="gradient" color="dark" >
               Add Product
              </SoftButton>
              </div>
        <SoftBox  display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Product table</SoftTypography>
            </SoftBox>
            <SoftTypography   style={{ opacity: message ? 1 : 0, transition: "opacity 0.9s ease-in-out",fontSize:'13px' }}  variant="h6" color="success">
                {message && decodeURIComponent(message)}
            </SoftTypography>
      
      
            <Table  className="shadow p-3 mb-5 bg-body rounded" striped="columns">
      <thead>
        <tr style={{fontSize:'16px'}}>
           <th>Product Image</th>
           <th>Product Name</th>
           <th>Product Brand</th>
           <th>Description</th>
           <th>Quantity</th>
           <th>MRP</th>
           <th>Price</th>
           <th>Edit</th>
           <th>Delete</th>
        </tr>
      </thead>
      <tbody>

        {/* {product.map((items)=>(

<tr style={{fontSize:'14px'}} key={items.id}>

</tr>
        ))} */}
         {product
            
            .map((items) => (
              <tr style={{ fontSize: '14px' }} key={items.id}>
               <td><img style={{ width: '40px' }} src={`http://localhost:8000/${items.image[0]}`} alt={items.name} /></td>
            <td>{items.name}</td>
            <td>{items.brand}</td>
            <td dangerouslySetInnerHTML={{__html:items.description.slice(0,550)}}></td>
            <td>{items.quantity}</td>
            <td style={{textDecoration:'line-through'}}>{items.mrp}</td>
            <td>{items.price}</td>
            <td><Link to={`/productEdit/${items._id}`}><SoftButton  variant="text" color="info"  fontWeight="medium">Edit</SoftButton></Link></td>
            <td> <SoftButton onClick={() => handleClickOpens(items._id)} variant="text" color="error"  fontWeight="medium">Delete</SoftButton></td>
                          </tr>
                        ))}
              </tbody>
            </Table>


    <div>
      <Dialog TransitionComponent={Zoom} transitionDuration={400} open={open} onClose={handleClose}>
        <DialogTitle>Add Products</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Product details
          </DialogContentText>
          <SoftBox mb={2}>
              <input multiple onChange={(e) => setImg([...e.target.files])} accept="jpeg,jpg,png" type="file" />
              <p style={{ color: "red", fontSize: "11px" }}>{Errorimg}</p>
          </SoftBox>
          
          <SoftBox mb={2}>
              <SoftInput onChange={(e) => setProductName(e.target.value)}  type="text" placeholder="Product Name"/>
              <p style={{ color: "red", fontSize: "11px" }}>{Errorprodctname}</p>

            </SoftBox>
            
            <SoftBox mb={2}>
            <select  onChange={HandleChange} style={{ fontSize: "14px" }}>
              <option value="select" disabled selected>Select Category</option>
              {Categorys.map((items) => (
                <option key={items.id} value={items._id}>{items.Title}</option>
              ))}
            </select>
            <p style={{ color: "red", fontSize: "11px" }}>{Errorcategoryname}</p>

                </SoftBox>

             <SoftBox mb={2}>
                <select disabled={!selectCategory}   onChange={handleSubCategoryChanges}  style={{fontSize:"14px",borderColor: !selectCategory ? "red":'grey'}}> 
                
                <option  value="select" disabled selected>Select Sub Category</option>
                {getsubCategory
                .filter((item) => !selectCategory || item.brandname === selectCategory)
                .map((items) =>(
                <option key={items.id}>{items.Title}</option>
                ))}
                </select>
                <p style={{fontSize:'9px', color:'grey'}}>Select any Category </p>
                <p style={{ color: "red", fontSize: "11px" }}>{ErrorSub}</p>
            </SoftBox>
         
          <SoftBox mb={2}>
                <select  onChange={(e) => setBrandName(e.target.value)}   style={{fontSize:"14px"}}> 
                <option  value="select" disabled selected>Select Brand</option>
                {Brand
                .map((items) =>(
                <option key={items.id}>{items.title}</option>
                ))}
                </select>
                <p style={{ color: "red", fontSize: "11px",  }}>{Errorbrandname}</p>
            </SoftBox>
            <SoftBox mb={2}>
              <textarea style={{width:'100%',borderRadius:'7px',fontSize:'14px',paddingLeft:'4px',outline:'none'}} onChange={(e) => setDescription(e.target.value)} id="content_about1"   placeholder="Description" type='text'  />
            </SoftBox>
            <p style={{ color: "red", fontSize: "11px" }}>{Errordescription}</p>
            <SoftBox mb={2}>
              <SoftInput onChange={(e) => setQuantity(e.target.value)}   placeholder="Quantity" type='number'  />
            </SoftBox>
            <p style={{ color: "red", fontSize: "11px" }}>{Errorquantity}</p>
            <SoftBox mb={2}>
              <SoftInput style={{ textDecoration: 'line-through' }}  onChange={(e) => setMRP(e.target.value)}     placeholder="Mrp" type='number'  />
            </SoftBox>
            <p style={{ color: "red", fontSize: "11px" }}>{Errormrp}</p>
            <SoftBox mb={2}>
              <SoftInput onChange={(e) => setPrice(e.target.value)}     placeholder="Price" type='number'  />
            </SoftBox>
            <p style={{ color: "red", fontSize: "11px" }}>{Errorprice}</p>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} color="error" >Done</Button>
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
          <DialogTitle id="alert-dialog-title">Delete Product</DialogTitle>
          <DialogContent>
            <DialogContentText style={{fontSize:'14px'}} id="alert-dialog-description">
              Are you sure you want to delete this Product?
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