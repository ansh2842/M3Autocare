import React, { useEffect, useState } from 'react'
import styles from '../assets/userCss/syles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Link, useParams} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css';
import Navbar from '../userInterface/Navbar'
import Footer from '../userInterface/Footer'
import axios from 'axios'
import { useCallback } from 'react'

function products() {
    const {id} =useParams()
    const [get,setGet] = useState(null)
    const [product,setProduct] = useState([])
    const [Categorys, setCategorys]= useState([])
    const [filterCategory,setFilterCategory] = useState('')
    const [arrhide, setArrHide] = useState(true);
    const [getById,setById] = useState({
      image:null,
      Name:'',
      Brand: '',
      Type: '',
      Mrp: '',
      Price:'',
    })
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    
    
   
   
    const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);
    
    const [products,getProducts] = useState({
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


    const [open, setOpen] = React.useState(false);
    const [opens,setOpens] = React.useState(false);
    const handleClickOpen = (id) => {
      setOpen(true);
      setGet(id)
      console.log(id)
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
  
    const handleCloses = () => {
      setOpens(false);
    };
  
    
  

    const HandleChange = (e) => {
      const selectedCategory = e.target.value;
      if (selectedCategory === "All Products") {
        setFilterCategory('');
      }else{
        setFilterCategory(selectedCategory);
      }
      console.log(selectedCategory)
     
    
    }
    
    const getProductById = useCallback(async()=>{

      try{
        const response = await axios.get(`http://localhost:8000/user/productById/${id}`)
        const data = await response.data;
        setById(data)
        setOpens(true)
        console.log('qrrrrrrrrrrr',data)
      }catch(err){
        console.error(err)
      }
    },[id])
  
    useEffect(()=>{
  

      getCategory();
      getProductById();
    },[getProductById])

    useEffect(()=>{
      getProduct(filterCategory);
    },[filterCategory])

    const getProduct = async (filterCategory) =>{
        console.log(filterCategory)
  
        await axios.get(`http://localhost:8000/user/getFIlterProducts?category=${filterCategory}`)
        .then(res =>{
          setProduct(res.data)
        
        }).catch(err=>{
         
          console.log(err)
        })
      }
   
   

    const fetchProducts = useCallback(async() =>{
    
        try{
            const response =await axios.get(`http://localhost:8000/user/getProductById/${get}`)
            const data = response.data
            getProducts({
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
            console.log('getServiceId:', getProducts);
        }catch(err){
            console.log(err)
        }
    },[get])

    useEffect(()=>{
        fetchProducts();
    },[fetchProducts])

   
  const handleFilter =(id) =>{
    setFilterCategory(id ===filterCategory? '': id)
    
  }
 
     const getCategory = async () =>{
     
  
     await axios.get('http://localhost:8000/user/getCategory')
      .then(res =>{
        setCategorys(res.data)
      }).catch(err =>{
       
          console.log(err)
      })
  
     }
  
    return (
      <div>
   
      <Navbar />
    {/* contact section */}
    <section className={`${styles.service_section} ${styles.layout_padding}`}>
      <div className={styles.service_container}>
        <div className="container ">
        <div className='row' >
       
           
          <div className={styles.heading_container}>
            <h2  style={{fontFamily:'Onest, sans-serif'}}>
              Our <span>Products</span>
            </h2>
            <p  style={{fontFamily:'Onest, sans-serif'}}>Our Products give life to your car...</p>
          </div>
          <div >
            <select style={{width:"22%"}}  onChange={HandleChange} className={styles.selects} >
            <option onClick={()=> handleFilter("")}>All Products</option>
            {Categorys.map((items) => (
                
                <option key={items.id} onClick={()=>handleFilter(items._id)} value={items._id}>{items.Title}</option>
              ))}
            </select>
          </div>
          {currentProducts
         
          .map((item) => (
              <div className="col-md-3" key={item.id}>
               
                <Card style={{ marginTop: '30px', backgroundColor: 'transparent', border: 'none', boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.10)' }}>
                  <Card.Img className={styles.card} variant="top" src={`http://localhost:8000/${item.image[0]}`} />
                  
                  <Card.Body>
                    <div className={styles.headcard}>
                      <Card.Title className={styles.titlecard}>{item.name.slice(0,21)}</Card.Title>
                    </div>
                    <Card.Text className={styles.textflex}>
                      <p className={styles.cartext3}>Brand: {item.brand}</p>
                      <p className={styles.cartext1}>₹{item.mrp}</p>
                    </Card.Text>
                    <Card.Text className={styles.textflex1}>
                      <p className={styles.cartext3}>Qty left: {item.quantity}</p>
                      <p className={styles.cartext2}>₹{item.price}</p>
                    </Card.Text>
                    <Link className={styles.linkcard} onClick={()=>handleClickOpen(item._id)}>
                      View More
                    </Link>
                  </Card.Body>
                </Card>
             
              </div>
          
          ))}
          <div className="pagination">
        <button className={styles.btnn}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
           <FontAwesomeIcon icon={faArrowLeft} />
        </button >
        {arrhide &&(
          
        <button className={styles.btnn}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastProduct >= product.length}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
        )}
      </div>


          </div>

        </div>
      </div>
    </section>
    {/* end contact section */}
    {/* info section */}
  <Footer />
   
        <div>
     
     <Dialog
       open={open}
       onClose={handleClose}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description"
       fullWidth
       maxWidth='lg'
     >
       <DialogTitle id="alert-dialog-title">
         {"Product Details"}
       </DialogTitle>
       <DialogContent>
        {products.image && products.image.length > 0 ?(
            <ImageGallery
            thumbnailPosition='left'
            items={products.image.map((image, index) => ({
              original: `http://localhost:8000/${image}`,
              thumbnail: `http://localhost:8000/${image}`,
              originalAlt: `Image ${index + 1}`,
              thumbnailAlt: `Image ${index + 1}`,
              originalHeight: 400,
              originalWidth: 600,
            }))}
            thumbnailClass={styles.custom_original_image}
            className={styles.image_gallery_image}
          />
           
        ):<></>}
         
             <DialogContentText  >
           <span  className={styles.dialogpop}>Name:</span>  <span className={styles.deatils}>{products.name}</span>
           </DialogContentText>
             <DialogContentText >
          <span  className={styles.dialogpop}>Brand:</span> <span className={styles.deatils1}>{products.brand}</span>
           </DialogContentText>
             <DialogContentText >
          <span  className={styles.dialogpop}>Type:</span> <span className={styles.deatils1}>{products.subcategory}</span>
           </DialogContentText>
             <DialogContentText >
          <span  className={styles.dialogpop}>Mrp:</span> <span className={styles.deatils2}>₹{products.mrp}</span>
           </DialogContentText>
             <DialogContentText >
          <span  className={styles.dialogpop}>Price:</span> <span className={styles.deatils1}>₹{products.price}</span>
           </DialogContentText>
           
           
           <div className={styles.textflex}>
             <DialogContentText >
          <span  className={styles.dialogpop}>About this item:</span><br/><span dangerouslySetInnerHTML={{__html:products.description}} className={styles.deatils1}></span>
           </DialogContentText>
           </div> 
       </DialogContent>
       <DialogActions>
         <Button onClick={handleClose}>Close</Button>
       </DialogActions>
     </Dialog>
   </div>


        <div>
     
     <Dialog
       open={opens}
       onClose={handleCloses}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description"
       fullWidth
       maxWidth='lg'
     >
       <DialogTitle id="alert-dialog-title">
         {"Product Details"}
       </DialogTitle>
       <DialogContent>
        {getById.image && getById.image.length > 0 ?(
            <ImageGallery thumbnailPosition='left'
            items={getById.image.map((image, index) => ({
              original: `http://localhost:8000/${image}`,
              thumbnail: `http://localhost:8000/${image}`,
              originalAlt: `Image ${index + 1}`,
              thumbnailAlt: `Image ${index + 1}`,
              originalHeight: 400,
              originalWidth: 600,
            }))}
          />
           
        ):<></>}
         
             <DialogContentText  >
           <span  className={styles.dialogpop}>Name:</span>  <span className={styles.deatils}>{getById.name}</span>
           </DialogContentText>
             <DialogContentText >
          <span  className={styles.dialogpop}>Brand:</span> <span className={styles.deatils1}>{getById.brand}</span>
           </DialogContentText>
             <DialogContentText >
          <span  className={styles.dialogpop}>Type:</span> <span className={styles.deatils1}>{getById.subcategory}</span>
           </DialogContentText>
             <DialogContentText >
          <span  className={styles.dialogpop}>Mrp:</span> <span className={styles.deatils2}>₹{getById.mrp}</span>
           </DialogContentText>
             <DialogContentText >
          <span  className={styles.dialogpop}>Price:</span> <span className={styles.deatils1}>₹{getById.price}</span>
           </DialogContentText>
           
           
           <div className={styles.textflex}>
             <DialogContentText >
          <span  className={styles.dialogpop}>About this item:</span><br/><span dangerouslySetInnerHTML={{__html:getById.description}} className={styles.deatils1}></span>
           </DialogContentText>
           </div> 
       </DialogContent>
       <DialogActions>
         <Button onClick={handleCloses}>Close</Button>
       </DialogActions>
     </Dialog>
   </div>
    {/* end info section */}
    {/* footer section */}
   
    {/* footer section */}
    {/* jQery */}
    {/* popper js */}
    {/* bootstrap js */}
    {/* owl slider */}
    {/* custom js */}
    {/* Google Map */}
    {/* End Google Map */}
  </div>
  
    )
}

export default products