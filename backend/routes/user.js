const express = require('express')
const Router = express.Router()
var usersController  = require('../UserContollers/userController')
const requireAuth = require('../middleware/authMiddleware');
var userOtpController = require('../UserContollers/userOtpController')
var bannerController = require('../controller/bannerController')
var serviceController = require('../controller/serviceController')
var techController = require('../controller/technicianController')
var aboutController = require('../controller/aboutController')
var ProductController = require('../controller/ProductController')
var categoryController = require('../controller/categoryController')
var AppointmentController = require('../UserContollers/appointmentController')
var TechandAppController = require('../controller/techAndapointController')
var CancelAppointmentController = require('../UserContollers/cancelAppointmentController')

const multer =  require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() +'-'+ file.originalname)
    },
})

var upload = multer({
    storage: storage,
    limits: {
        fieldSize: 10 * 1024 * 1024, 
        fileSize: 10 * 1024 * 1024 
      }
})

//userRoutes

Router.post('/userAdd',usersController.userAdds)
Router.post('/userlogin',usersController.loginUser)
Router.post('/forgotPassword',usersController.forgotUser)
Router.post('/otpsend',usersController.sendingOTP)
Router.post('/otpCheck',userOtpController.checkOTPs)
Router.put('/newPassword/:id',usersController.newPassword)
Router.get('/getuser',requireAuth,usersController.getData)
Router.delete('/deleteuser/:id',requireAuth,usersController.deleteData)
Router.get('/getUserforUpdate/:id',usersController.getEditData)
Router.put('/updateById/:id',upload.single('image'),usersController.editData)
Router.put('/ChangePassword/:id',usersController.changePassword)

//banerRoutes
Router.get('/bannerGet',bannerController.bannerGet)


//service routes
Router.get('/getService',serviceController.getService)
Router.get('/getServiceEdit/:id',serviceController.getServiceData)

//Technician routes
Router.get('/gettechnicians',techController.getTechnician)

//about routes
Router.get('/getpost',aboutController.getAbout)

//prduct routes
Router.get('/getProducts',ProductController.getProduct)
Router.get('/getFIlterProducts',ProductController.filterProducts)
Router.get('/getProductById/:id',ProductController.getProductById)
Router.get('/productById/:id',ProductController.ProductById)

//categoryRoutes
Router.get('/getCategory',categoryController.getCategory)

//appRoutes
Router.post('/appointmentAdd',AppointmentController.appointmentAdd)
Router.get('/gettappdata/:id',AppointmentController.getAppointmentData)
Router.put('/updateStatus/:id',AppointmentController.updateStatustData)
Router.get('/getTrack/:id',AppointmentController.getTrackData)
Router.get('/getappByid/:id',AppointmentController.getappdatasByData)
Router.put('/updateFedback/:id',AppointmentController.feedback)


//email
Router.post('/sendMessage',usersController.sendEmail)

//TechandApp routes
Router.get('/getTechId/:id',TechandAppController.getTechandDataByid)

//cancelAppointemtRoutes

Router.post('/cancelAppointment',CancelAppointmentController.cancelAppData)
Router.get('/getCancel',CancelAppointmentController.cancelrqst)
Router.get('/getappointReport',requireAuth,CancelAppointmentController.getappReport)

module.exports = Router