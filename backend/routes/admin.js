const express = require('express');
const Router = express.Router();
var userController =  require('../controller/userController')
var categoryController = require('../controller/categoryController')
var SubCategoryController = require('../controller/subCategoryController')
const requireAuth = require('../middleware/authMiddleware');
var ProductController = require('../controller/ProductController')
var adminController = require('../controller/adminController')
var serviceController = require('../controller/serviceController')
var otpController =  require('../controller/otpController')
var techController = require('../controller/technicianController')
var brandController = require('../controller/brandController')
var bannerController = require('../controller/bannerController')
var aboutController = require('../controller/aboutController')
var AppointmentController = require('../UserContollers/appointmentController')
var multer = require('multer')



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() +'-'+ file.originalname)
    },
})

var upload = multer({
    storage: storage
})



Router.post('/',adminController.datas)
Router.post('/updatePasswordwithOtp',adminController.updatePasswordWithOtps)
Router.get('/adminData',requireAuth,adminController.getAdminData)
Router.post('/changePassword/:id',requireAuth,adminController.changePassword)
Router.post('/Otpgenerate',adminController.sendOTP)
Router.post('/CheckOTP',otpController.checkOTP)
Router.post('/changeForgotPassword/:id',adminController.changeForgotPassword)


Router.post('/adminLogins',adminController.adminData)
Router.get('/editAdminData/:id',requireAuth,adminController.getAdminDataForEdit)
Router.put('/updateAdminData/:id',requireAuth,adminController.getAdminDataForUpdate)


// adminListController
Router.post('/userLoginData',userController.userLogin)
Router.get('/getData',requireAuth,userController.getDatas)
Router.delete('/delete/:id',requireAuth,userController.signupDelete)
Router.get('/getListById/:id',requireAuth,userController.getLIstbyIds)
Router.put('/getUpdateById/:id',requireAuth,userController.getUpdateByIds)

//categoryRoutes
Router.post('/category',requireAuth,upload.single("image"),categoryController.postCategory)
Router.get('/getCategory',requireAuth,categoryController.getCategory)
Router.get('/getCategoryById/:id',requireAuth,categoryController.getCategoryById)
Router.put('/getUpdateCategory/:id',requireAuth,upload.single("image"),categoryController.updateCategory)
Router.delete('/deleteCategory/:id',requireAuth,categoryController.deleteCategory)


//SubcategoryRoutes
Router.post('/subcategory',requireAuth,upload.single("image"),SubCategoryController.postsubCategory)
Router.get('/getsubCategory',requireAuth,SubCategoryController.getsubCategory)
Router.get('/getsubCategoryById/:id',requireAuth,SubCategoryController.getsubCategoryById)
Router.put('/getSubUpdateCategory/:id',requireAuth,upload.single("image"),SubCategoryController.updatesubCategory)
Router.delete('/deletesubCategory/:id',requireAuth,SubCategoryController.deletesubCategory)

//prodctRuotes

Router.post('/product',upload.array("image"),requireAuth,ProductController.postProduct)
Router.get('/getProducts',requireAuth,ProductController.getProduct)
Router.get('/getProductById/:id',requireAuth,ProductController.getProductById)
Router.put('/EditProduct/:id',upload.array("image"),requireAuth,ProductController.editProduct)
Router.delete('/productDelete/:id',requireAuth,ProductController.deleteProduct)

//serviceRoutes

Router.post('/servicePost',upload.array("image"),requireAuth,serviceController.addService)
Router.get('/getService',requireAuth,serviceController.getService)
Router.delete('/serviceDelete/:id',requireAuth,serviceController.deleteService)
Router.get('/getServiceEdit/:id',requireAuth,serviceController.getServiceData)
Router.put('/updateServiceData/:id',upload.array("image"),requireAuth,serviceController.updateServiceData)

//technicianRoutes

Router.post('/technicianpost',upload.array("image"),techController.Addtechnician)
Router.get('/gettechnicians',requireAuth,techController.getTechnician)
Router.delete('/deletetechnician/:id',requireAuth,techController.deleteTechnician)
Router.get('/getTechnicianforUpdate/:id',requireAuth,techController.getEditTechnician)
Router.put('/updateById/:id',upload.array("image"),techController.updateTechData)

//brandRoutes

Router.post('/brandpost',upload.single("image"),brandController.BrandAdd)
Router.get('/getBrand',requireAuth,brandController.getBrand)
Router.delete('/deleteBrand/:id',brandController.deleteBrand)
Router.get('/getBrandById/:id',requireAuth,brandController.getBrandById)
Router.put('/getUpdateBrand/:id',upload.single("image"),brandController.updateBrand)

//bannerRoutes

Router.post('/banneradd',upload.single("image"),bannerController.bannerAdds)
Router.delete('/deleteBanner/:id',bannerController.bannerDelete)
Router.get('/bannerGet',requireAuth,bannerController.bannerGet)
Router.get('/getBannerById/:id',requireAuth,bannerController.bannerGetbyId)
Router.put('/updateBannerById/:id',upload.single("image"),bannerController.bannerUpdatebyId)

//aboutController

Router.post('/aboutpost',upload.single("image"),aboutController.addAboutPost)
Router.get('/getpost',requireAuth,aboutController.getAbout)
Router.delete('/deleteabout/:id',aboutController.deleteAbout)
Router.get('/getaboutbyid/:id',requireAuth,aboutController.getAboutbyId)
Router.put('/editAboutByid/:id',requireAuth,upload.single('image'),aboutController.editByID )

//appointmentRoutes

Router.get('/getappointmentdata',requireAuth,AppointmentController.getappdatas)

module.exports = Router;