import { useEffect, useState, useCallback } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import curved6 from "assets/images/curved-images/curved14.jpg";
import { useParams } from "react-router-dom";
import axios from 'axios'

function SignUp() {

    const {id} = useParams()
    const[Category, setCategory]= useState([])
    const [subcategory,setSubCategorys] = useState([])
    const [selectCategory,setSelectCategory] = useState('');
    const [Brand, setBrand]= useState([])
    const [errorImage,setErrorImage] = useState('')
    const [errorName,setErrorName] = useState('')
    const [errorCategory,setErrorCategory] = useState('')
    const [errorSubCategory,setErrorSubCategory] = useState('')
    const [errorBrand,setErrorBrand] = useState('')
    const [errorDescription,setErrorDescription] = useState('')
    const [errorQuantity, setErrorQuantity] = useState('')
    const [errorMrp,setErrorMrp] = useState('')
    const [errorPrice,setErrorPrice] = useState('')
    const [product,getProduct] = useState({
        image:null,
        name:"",
        brand:"",
        Category:'',
        subcategory:"",
        description: "",
        quantity: "",
        mrp: "",
        price: "",
    })


    const fetchProducts = useCallback(async() =>{
        const token = localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"] = token;

        try{
            const response =await axios.get(`http://localhost:8000/admin/getProductById/${id}`)
            const data = response.data
            getProduct({
                image:data.image,
                name:data.name,
                brand:data.brand,
                Category:data.Category,
                subcategory:data.subcategory,
                description: data.description,
                quantity: data.quantity, 
                mrp: data.mrp,
                price: data.price,
            })
        }catch(err){
            if (err.response.status == "400") {
                window.location.href = "/authentication/sign-in";}
            console.log(err)
        }
    },[id])

    useEffect(()=>{
        fetchProducts()
    },[fetchProducts])


    const handleChange = (e) => {
        
        const { name, value, files } = e.target;
        setSelectCategory(e.target.value);
        if (name === 'image') {
            getProduct({ ...product, image: files });
        } else if (name === 'subcategory') {
           
            getProduct({ ...product, [name]: value });
            
        } else {
            getProduct({ ...product, [name]: value });
        }
    }


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
        const handleUpdate = async () => {

          

            if(product.image.length < 1) {
                setErrorImage('Image Required');
            }else{
                setErrorImage('')
            }
            if(product.name.length < 1) {
                setErrorName('Name Required');
            }else{
                setErrorName('');
            }
            if(product.brand.length < 1) {
                setErrorBrand('Brand Required');
            }else{
                setErrorBrand('');
            }
            if(product.Category.length < 1){
                setErrorCategory('Category Required')
            }else{
                setErrorCategory('')
            }
            if(product.subcategory.length < 1){
                setErrorSubCategory('Subcategory Required')
            }else{
                setErrorSubCategory('')
            }
            if(product.description.length < 1){
                setErrorDescription('Description Required')
            }else{
                setErrorDescription('')
            }
            if(product.quantity.length < 1){
                setErrorQuantity('Quantity Required')
            }else{
                setErrorQuantity('')
            }
            if(product.price.length < 1){
                setErrorPrice('Price Required')
            }else{
                setErrorPrice('')
            }
            if(product.mrp.length < 1){
                setErrorMrp('MRP Required')
            }else{
                setErrorMrp('')
            }

            if(product.image !== '' 
            && product.name !== ''
            && product.Category !== ''
            && product.subcategory !== ''
            && product.brand !== ''
            && product.description !== ''
            && product.price !== ''
            && product.mrp !== ''){
                const formData = new FormData();

                var editor = tinymce.get('content_about1');
                product.description  =editor.getContent();
        
                for (let i = 0; i < product.image.length; i++) {
                    formData.append('image', product.image[i]);
                }
            
                formData.append('names', product.name);
                formData.append('brands', product.brand);
                formData.append('category', product.Category);
                formData.append('subcategorys', product.subcategory);
                formData.append('descriptions', product.description);
                formData.append('quantitys', product.quantity);
                formData.append('mrps', product.mrp);
                formData.append('prices', product.price);
                console.log(formData);
                try {
                    await axios.put(`http://localhost:8000/admin/EditProduct/${id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    console.log('updated successfully');
                    window.location.href ='/product?message=Product%20updated%20successfully'
                    
                    
                } catch (err) {
                    console.log(err);
                }

            }
           
        }

        
        
    useEffect(()=>{
     getCategory()
    },[])
 
    const getCategory = async () =>{
 
    await axios.get('http://localhost:8000/admin/getCategory')
     .then(res =>{
         setCategory(res.data)
     }).catch(err =>{
         console.log(err)
     })
 
    }

       useEffect(()=>{
      getsubCategoryData()
     },[])
     
     const getsubCategoryData = async() =>{
  
      try{
        await axios.get('http://localhost:8000/admin/getsubCategory')
        .then(res =>{
          setSubCategorys(res.data)
          console.log(res.data)
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
        <BasicLayout 
        title='Update'
        image={curved6}>
            <Card>
                <SoftBox p={3} mb={1} textAlign="center">
                    <SoftTypography variant="h5" fontWeight="medium">
                        Update Product
                    </SoftTypography>
                </SoftBox>
                <SoftBox mb={2}>
                    {/* ... */}
                </SoftBox>
                <SoftBox pt={2} pb={3} px={3}>
                    <SoftBox component="form" role="form">
                        <SoftBox mb={2}>
                            <input style={{width:'100%'}} accept="image/*" name="image" onChange={handleChange}  multiple type="file" placeholder="Name" />
                            <p style={{ color: "red", fontSize: "11px" }}>{errorImage}</p>
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftInput value={product.name} onChange={handleChange} name="name" type="text" placeholder="name" />
                            <p style={{ color: "red", fontSize: "11px" }}>{errorName}</p>
                        </SoftBox>
                        <SoftBox mb={2}>
                                 <select value={product.Category} onChange={handleChange} name="Category"  style={{fontSize:"14px"}}> 
                                 
                                    <option  value="select" disabled selected>Select Category</option>
                                    {Category
                                    .map((items) =>(
                                   <option  key={items.id} value={items._id}>{items.Title}</option>
                                      ))}
                                  </select>
                                  <p style={{ color: "red", fontSize: "11px" }}>{errorCategory}</p>
                                  </SoftBox>
                        <SoftBox mb={2}>
                        <select value={product.subcategory} onChange={(e) => getProduct({...product, subcategory:e.target.value})} name="subcategory" style={{ fontSize: "14px" }}>
                        
                          <option value="select" disabled>Select Sub Category</option>
                          {subcategory
                          .filter((item) => !selectCategory || item.brandname === selectCategory)
                          .map((items) => (
                           <option key={items.id}  value={items.Title}>{items.Title}</option>
                             ))}
                            </select>
                              <p style={{ color: "red", fontSize: "11px" }}>{errorSubCategory}</p>
                         </SoftBox>
                       
                                  <SoftBox mb={2}>
                <select value={product.brand}  onChange={(e) => getProduct({...product, brand:e.target.value})} name="brand"   style={{fontSize:"14px"}}> 
                <option  value="select" disabled selected>Select Brand</option>
                {Brand
                .map((items) =>(
                <option key={items.id}>{items.title}</option>
                ))}
                </select>
                <p style={{ color: "red", fontSize: "11px",  }}>{errorBrand}</p>
            </SoftBox>
                        <SoftBox mb={2}>
                         
                            <textarea value={product.description} onChange={handleChange}  id="content_about1"   name="description" style={{width:'100%',borderRadius:'7px',fontSize:'14px',paddingLeft:'4px',outline:'none'}}  placeholder="Description" type='text'  />
                            <p style={{ color: "red", fontSize: "11px" }}>{errorDescription}</p>
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftInput value={product.quantity} onChange={handleChange}  name="quantity" type="text" placeholder="Quantity" />
                            <p style={{ color: "red", fontSize: "11px" }}>{errorQuantity}</p>
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftInput style={{ textDecoration: 'line-through' }} value={product.mrp} onChange={handleChange}  name="mrp" type="text" placeholder="MRP" />
                            <p style={{ color: "red", fontSize: "11px" }}>{errorMrp}</p>
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftInput value={product.price} onChange={handleChange}  name="price" type="text" placeholder="Price" />
                            <p style={{ color: "red", fontSize: "11px" }}>{errorPrice}</p>
                        </SoftBox>
                        <SoftBox display="flex" alignItems="center">
                            {/* ... */}
                        </SoftBox>
                        <SoftBox mt={4} mb={1}>
                            <SoftButton  onClick={handleUpdate} variant="gradient" color="dark" fullWidth>
                                Update Product
                            </SoftButton>
                        </SoftBox>
                    </SoftBox>
                </SoftBox>
            </Card>
        </BasicLayout>
    );
}

export default SignUp;
