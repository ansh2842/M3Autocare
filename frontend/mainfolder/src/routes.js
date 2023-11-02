/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts

import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import AdminManagement from './layouts/adminManagement/adminManagement'
import AdminEdit from './layouts/adminManagement/adminadd/userAdd'
import Edit from "layouts/adminedit/adminedit"
import CategoryManagement from "layouts/categoryManagement/categoryManagement";
import CategoryEdit from "./layouts/categoryedit/categoryedit"
import ProductManagement from './layouts/productManagement/productManagement'
import ProductEdit from "./layouts/productManagement/prouductEdt.js/productEdit"
import SerivceManagement from './layouts/serviceManagement/serviceManagement'
import ServiceEdit from "layouts/serviceManagement/serviceEdit";
import AdminEdits from './layouts/profile/components/adminEdit'
import SubCategoryManagement from "./layouts/subCategoryManagement/subCategoryManagement";
import SubCategoryedit from "layouts/subCategoryManagement/subCategoryEdit/subCategoryedit";
import ForgotPassword from "layouts/authentication/sign-in/forgotpassword";
import ForgotPasswrodId from "layouts/authentication/sign-in/forgotPasswrodId";
import ChangePassword from "layouts/authentication/sign-in/changePassword";
import TechnicianManagement from "./layouts/technicianManagement/technicianManagement";
import TechnicianEdit from "./layouts/technicianManagement/technicianEdit";
import BrandManagement from "layouts/brandManagement/brandManagement";
import BrandEdit  from "./layouts/brandManagement/brandedit"
import Home from './userInterface/home'
import Service from './userInterface/services'
import About from './userInterface/about'
import Contact from './userInterface/contact'
import Login from './userInterface/login'
import Signup from './userInterface/signup'
import UserForgot from './userInterface/userForgotPassword'
import UserForgotId from './userInterface/userForgotPasswordwithID'
import UserForgotIdsave from './userInterface/forgotpasswordSave'
import UserManagement from './layouts/UserManagement/usermanagement'
import UserProfile from './userInterface/userProfileEdit'
import UserProfileManagement from './userInterface/userProfile'
import UserChangePassword from './userInterface/userChangePassword'
import BannerManagement from './layouts/BannerManagement/BannerManagement'
import BannerEdit from './layouts/BannerManagement/bannerEdit'
import AboutManagement  from './layouts/aboutManagement/aboutmaganement'
import AboutEdit  from './layouts/aboutManagement/aboutEdit'
import Product from './userInterface/products'
import Appointment from "userInterface/appoinment";
import Title  from './layouts/headingManagement/titleManagement'
import TitleEdit  from './layouts/headingManagement/titleEdit'
import CheckApp from './userInterface/checkAppointements'
import Appoinmentmgt from './layouts/appointmentManagement/appointmentManagement'

//icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import PostAddIcon from '@mui/icons-material/PostAdd';




const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
 
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Admin",
    key: "user management",
    route: "/admin",
    icon: <PersonAddIcon size="12px" />,
    component: <AdminManagement />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Service",
    key: "service management",
    route: "/service",
    icon: <CarRepairIcon size="12px" />,
    component: <SerivceManagement />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Product",
    key: "product management",
    route: "/product",
    icon: <InventoryOutlinedIcon size="12px" />,
    component: <ProductManagement />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Category",
    key: "category management",
    route: "/category",
    icon: <CategoryOutlinedIcon size="12px" />,
    component: <CategoryManagement />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "SubCategory",
    key: "Sub category management",
    route: "/SubCategory",
    icon: <PostAddIcon size="12px" />,
    component: <SubCategoryManagement />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Technician",
    key: "Technician management",
    route: "/Technician",
    icon: <PostAddIcon size="12px" />,
    component: <TechnicianManagement />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Brand",
    key: "BrandManagement",
    route: "/Brand",
    icon: <PostAddIcon size="12px" />,
    component: <BrandManagement />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "User",
    key: "User Management",
    route: "/User",
    icon: <PostAddIcon size="12px" />,
    component: <UserManagement />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Banner",
    key: "User Management",
    route: "/banner",
    icon: <PostAddIcon size="12px" />,
    component: <BannerManagement />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "About",
    key: "About Management",
    route: "/admin-about",
    icon: <PostAddIcon size="12px" />,
    component: <AboutManagement />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Appoinment",
    key: "dashboard",
    route: "/appoinmentmgt",
    icon: <Shop size="12px" />,
    component: <Appoinmentmgt />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Title",
  //   key: "About Management",
  //   route: "/title",
  //   icon: <PostAddIcon size="12px" />,
  //   component: <Title />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <CreditCard size="12px" />,
  //   component: <Billing />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Virtual Reality",
  //   key: "virtual-reality",
  //   route: "/virtual-reality",
  //   icon: <Cube size="12px" />,
  //   component: <VirtualReality />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   route: "/rtl",
  //   icon: <Settings size="12px" />,
  //   component: <RTL />,
  //   noCollapse: true,
  // },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
   {
    
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
   
    name: "Admin Edit",
    key: "update",
    route: "/addUser",
    icon: <SpaceShip size="12px" />,
    component: <AdminEdit />,
    noCollapse: true,
  },
  {
   
    name: "Admin Edit",
    key: "update",
    route: "/edit/:id",
    icon: <SpaceShip size="12px" />,
    component: <Edit />,
    noCollapse: true,
  },
  {
   
    name: "Category Edit",
    key: "update",
    route: "/editCategory/:id",
    icon: <SpaceShip size="12px" />,
    component: <CategoryEdit />,
    noCollapse: true,
  },
  {
   
    name: "Sub Category Edit",
    key: "update",
    route: "/SubCategoryedit/:id",
    icon: <SpaceShip size="12px" />,
    component: <SubCategoryedit />,
    noCollapse: true,
  },
  {
   
    name: "Product Edit",
    key: "update",
    route: "/ProductEdit/:id",
    icon: <SpaceShip size="12px" />,
    component: <ProductEdit />,
    noCollapse: true,
  },
  {
   
    name: "Service Edit",
    key: "update",
    route: "/ServiceEdit/:id",
    icon: <SpaceShip size="12px" />,
    component: <ServiceEdit />,
    noCollapse: true,
  },
  {
   
    name: "Admin Edits",
    key: "update",
    route: "/AdminEdits/:id",
    icon: <SpaceShip size="12px" />,
    component: <AdminEdits />,
    noCollapse: true,
  },
  {
   
    name: "Forgot Password",
    key: "update",
    route: "/ForgotPassword",
    icon: <SpaceShip size="12px" />,
    component: <ForgotPassword />,
    noCollapse: true,
  },
  {
   
    name: "Forgot Password",
    key: "update",
    route: "/ForgotPasswrodId/:id",
    icon: <SpaceShip size="12px" />,
    component: <ForgotPasswrodId />,
    noCollapse: true,
  },
  {
   
    name: "Forgot Password",
    key: "update",
    route: "/ChangePassword/:id",
    icon: <SpaceShip size="12px" />,
    component: <ChangePassword />,
    noCollapse: true,
  },
  {
   
    name: "Forgot Password",
    key: "update",
    route: "/TechnicianEdit/:id",
    icon: <SpaceShip size="12px" />,
    component: <TechnicianEdit />,
    noCollapse: true,
  },
  {
   
    name: "BrandEdit",
    key: "update",
    route: "/BrandEdit/:id",
    icon: <SpaceShip size="12px" />,
    component: <BrandEdit />,
    noCollapse: true,
  },
  
  {
   
    name: "BrandEdit",
    key: "update",
    route: "/home",
    icon: <SpaceShip size="12px" />,
    component: <Home />,
    noCollapse: true,
  },
  
  {
   
    name: "BrandEdit",
    key: "update",
    route: "/user-service/:id",
    icon: <SpaceShip size="12px" />,
    component: <Service />,
    noCollapse: true,
  },
  {
   
    name: "BrandEdit",
    key: "update",
    route: "/user-about",
    icon: <SpaceShip size="12px" />,
    component: <About />,
    noCollapse: true,
  },
  {
   
    name: "BrandEdit",
    key: "update",
    route: "/user-contact",
    icon: <SpaceShip size="12px" />,
    component: <Contact />,
    noCollapse: true,
  },
  {
   
    name: "BrandEdit",
    key: "update",
    route: "/user-login",
    icon: <SpaceShip size="12px" />,
    component: <Login />,
    noCollapse: true,
  },
  {
   
    name: "BrandEdit",
    key: "update",
    route: "/user-signup",
    icon: <SpaceShip size="12px" />,
    component: <Signup />,
    noCollapse: true,
  },
  {
   
    name: "BrandEdit",
    key: "update",
    route: "/user-forgotpassword",
    icon: <SpaceShip size="12px" />,
    component: <UserForgot />,
    noCollapse: true,
  },
  {
   
    name: "BrandEdit",
    key: "update",
    route: "/userforgotpasswordid/:id",
    icon: <SpaceShip size="12px" />,
    component: <UserForgotId />,
    noCollapse: true,
  },
  {
   
    name: "BrandEdit",
    key: "update",
    route: "/userforgotpasswordsave/:id",
    icon: <SpaceShip size="12px" />,
    component: <UserForgotIdsave />,
    noCollapse: true,
  },
  {
   
    name: "BrandEdit",
    key: "update",
    route: "/UserProfile/:id",
    icon: <SpaceShip size="12px" />,
    component: <UserProfile />,
    noCollapse: true,
  },
  {
   
    name: "BrandEdit",
    key: "update",
    route: "/Users-Profile/:id",
    icon: <SpaceShip size="12px" />,
    component: <UserProfileManagement />,
    noCollapse: true,
  },
  {
   
    name: "BrandEdit",
    key: "update",
    route: "/UserChangePassword/:id",
    icon: <SpaceShip size="12px" />,
    component: <UserChangePassword />,
    noCollapse: true,
  },
  {
   
    name: "BrandEdit",
    key: "update",
    route: "/Banneredit/:id",
    icon: <SpaceShip size="12px" />,
    component: <BannerEdit />,
    noCollapse: true,
  },
  {
   
    name: "BrandEdit",
    key: "update",
    route: "/Aboutedit/:id",
    icon: <SpaceShip size="12px" />,
    component: <AboutEdit />,
    noCollapse: true,
  },
  {
   
    name: "BrandEdit",
    key: "update",
    route: "/user-product/:id",
    icon: <SpaceShip size="12px" />,
    component: <Product />,
    noCollapse: true,
  },
  {
   
    name: "BrandEdit",
    key: "update",
    route: "/appointment/:id",
    icon: <SpaceShip size="12px" />,
    component: <Appointment />,
    noCollapse: true,
  },
  {
   
    name: "BrandEdit",
    key: "update",
    route: "/checkappointment/:id",
    icon: <SpaceShip size="12px" />,
    component: <CheckApp />,
    noCollapse: true,
  },
   
   
  //   name: "BrandEdit",
  //   key: "update",
  //   route: "/titleEdit/:id",
  //   icon: <SpaceShip size="12px" />,
  //   component: <TitleEdit />,
  //   noCollapse: true,
  // },
  
  
  
  

];

export default routes;
