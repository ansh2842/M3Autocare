import React, { useEffect, useState } from 'react'
import styles from '../assets/userCss/syles.module.css'
import styles2 from '../assets/userCss/login.module.css'
import logo from '../userImage/logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faUser,faCaretDown, faCaretUp,faRightFromBracket, faCross, faClose, faBars, faBarsProgress} from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {Zoom} from '@mui/material';
import { faDropbox } from '@fortawesome/free-brands-svg-icons';
function Navbar() {
    const navigate =  useNavigate()
    const[name,setName] = useState('')
    const [hide,setHide] = useState(null)
    const [nIcon,setnicon] = useState(faBars)
    const [nameHide,setNameHide] = useState(false)
    const [opens,setOpens] = React.useState(false);
    const [loginHide,setLoginHide] = useState(false)
    const [icon ,setIcon] = useState(faCaretDown)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [logDropdown, setLogDropdown] = useState(false);
    const logDropdowns = () =>{
      setLogDropdown(!logDropdown);
      setIcon((prevIcon)=>(prevIcon === faCaretDown ? faCaretUp : faCaretDown));
    }
    const handleClickOpens = () => {
      setOpens(true);
      
    };
  
    const handleCloses = () => {
      setOpens(false);
    };
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
      setIcon((prevIcon)=>(prevIcon === faCaretDown ? faCaretUp :faCaretDown) )
    };
  
    useEffect(()=>{
      const getName = JSON.parse(localStorage.getItem('userFront')) || {};
      setName(getName);
      if(localStorage.getItem('userFront')){
        setNameHide(true);
        setLoginHide(false);
      }else{
        setNameHide(false);
        setLoginHide(true);     
      }
    },[])
  
    const logout = () => {
      localStorage.removeItem('userFront');
      window.location.href='/home'
     
    }

    const shown = () =>{
      setHide(!hide);
      if(nIcon ===faBars){
        setnicon(faClose)
      }else{
        setnicon(faBars)
      }
      
    }
    const goServices = ()=>{
      if(!localStorage.getItem('userFront')){
    
        window.location.href='/user-signup'
     }else{
      navigate(`/appointment/${name.id}?${Date.now()}`)
     }
    }
  return (
    <div>
        
<header className={styles.header_section}>
      <div className={styles.header_bottom}>
        <div className={styles.container_fluid}>
          <nav className={`${styles.navbar} navbar-expand-lg ${styles.custom_nav_container}`}>
          <Link to={'/home?' +Date.now()}><a className={styles.navbar_brand} >
              <span>
                <img className={styles.logo} src={logo}/>
              </span>
            </a></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className> </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className={styles.navbar_nav}>
                <li className={`${styles.nav_item} ${styles.active}`}>
                 <Link to={'/home?' +Date.now()}><a className={styles.nav_link} >Home</a></Link>
                </li>
                <li className={styles.nav_item}>
                 <Link to={'/user-service/:id?' + Date.now()}> <a className={styles.nav_link} >Services</a></Link>
                </li>
                <li className={styles.nav_item}>
                 <Link to={'/user-product/:id?' + Date.now()}> <a  className={styles.nav_link} >Products</a></Link>
                </li>
                <li className={styles.nav_item}>
                 <Link to={'/user-about?' + Date.now()}> <a className={styles.nav_link} > About</a></Link>
                </li>
                <li className={styles.nav_item}>
                <Link to={'/user-contact?' + Date.now()}> <a className={styles.nav_link} >Contact Us</a></Link>
                </li>
                {loginHide &&(
                    <li className={styles.nav_item}>
                     <Link ><a onClick={logDropdowns} className={styles.nav_link} ><FontAwesomeIcon icon={faUser}   aria-hidden="true" /> User <FontAwesomeIcon icon={icon}   aria-hidden="true" /></a></Link> 
                    </li>
                )}
                
              {nameHide &&(
                <div className={styles.navBox}>
                 <li className={styles.nav_item}>
                 <img className={styles.profile} src={name.image} /> 
                 <a onClick={toggleDropdown} className={styles.nav_link} > {name.username} <FontAwesomeIcon icon={icon}   aria-hidden="true" /></a>
                 </li>
                 </div>
              )}
                
                 
                
              </ul>
            </div>
          </nav>
        </div>
      </div>
     </header>
     <div className={styles2.boxy} >
    {isDropdownOpen && (
        <div className={styles2.dropdown}>
          <ul >
          <Link to={`/Users-Profile/${name.id}?${Date.now()}`}>
            <li className={styles2.texts3}>Profile </li>
            </Link>
            <Link to={`/appointment/${name.id}?${Date.now()}`}>
              <li className={styles2.texts3}>Appointment </li>
              </Link>
              <Link to={`/checkappointment/${name.id}?${Date.now()}`}>
              <li className={styles2.texts3}>Check Appoinments </li>
              </Link>
            <Link  to={`/UserChangePassword/${name.id}?${Date.now()}`}>  <li className={styles2.texts3}>Change password</li></Link>
            
            <li onClick={handleClickOpens} className={styles2.texts3}>Log out <FontAwesomeIcon icon={faRightFromBracket} />     </li>
          </ul>
        </div>
      )}
       </div>
       <div className={styles2.boxy} >
      {logDropdown &&(

     
        <div className={styles2.dropdown}>
          <ul >
            <Link to={'/user-login?'+ Date.now()}>
              <li className={styles2.texts3}>Login </li>
              </Link>
            <Link to={'/user-signup?'+ Date.now()}>
              <li className={styles2.texts3}>Sign Up </li>
              </Link>
            <p onClick={goServices}>
              <li className={styles2.texts3}>Appointment </li>
              </p>
            <Link to={`/checkappointment/${name.id}?${Date.now()}`}>
              <li className={styles2.texts3}>Check Appoinments </li>
              </Link>
          </ul>
        </div>
          )}
     <div className={styles.bntbrs}>
      <div>
      <span>
                <img className={styles.logo} src={logo}/>
              </span>
      </div>
     <div>
     <div className={styles.navBox}>
                 <li className={styles.nav_item}>
                 <img onClick={shown} className={styles.profile} src={name.image} /> 
                 </li>
     <button onClick={shown} className="btn  my-2 my-sm-0 nav_search-btn "  >
                  <FontAwesomeIcon icon={nIcon} className={styles.menu_icon}  aria-hidden="true" />
                  </button>
                 </div>
     </div>
     </div>
       </div>

       {hide && (
          <div>
          <div className={styles.mainn}>
          <div className={styles.mainhead}>
              <ul className={styles.ullist}>
              <Link to={'/home?' +Date.now()}><li className={styles.lists}>Home</li></Link>
              <Link to={'/user-service/:id?' +Date.now()}>  <li className={styles.lists}>Services</li></Link>
              <Link to={'/user-product/:id?' + Date.now()}>  <li className={styles.lists}>Products</li></Link>
              <Link to={`/appointment/${name.id}?${Date.now()}`}>
              <li className={styles2.texts3}>Appointment </li> </Link>
            <Link to={`/checkappointment/${name.id}?${Date.now()}`}>
              <li className={styles2.texts3}>Check Appoinments </li> </Link>
              <Link to={'/user-about?' + Date.now()}> <li className={styles.lists}>About</li></Link>
              <Link to={'/user-contact?' + Date.now()}> <li className={styles.lists}>Contact Us</li></Link>
              <Link to={'/user-login?'+ Date.now()}>
              <li className={styles2.texts3}>Login </li> </Link>
            <Link to={'/user-signup?'+ Date.now()}>
              <li className={styles2.texts3}>Sign Up </li>
              </Link>
              <li onClick={handleClickOpens} className={styles2.texts3}>Log out <FontAwesomeIcon icon={faRightFromBracket} />     </li>
              </ul>
          </div>
          </div>
      </div>
       )}
       
       <div>
        <Dialog
          open={opens}
          onClose={handleCloses}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          TransitionComponent={Zoom} transitionDuration={400}
          fullWidth
          maxWidth={'sm'}
        >
          <DialogTitle id="alert-dialog-title">Logout</DialogTitle>
          <DialogContent>
            <DialogContentText style={{fontSize:'14px'}} id="alert-dialog-description">
              Are you sure  want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloses} color="error">
              Cancel
            </Button>
            <Button onClick={logout} color="error">
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default Navbar