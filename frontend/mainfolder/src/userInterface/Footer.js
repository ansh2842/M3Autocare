import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../assets/userCss/syles.module.css'
import { faFacebook, faInstagram, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <div> <section className={`${styles.info_section} ${styles.layout_padding2}`}>
    <div className="container">
      <div className="row">
        <div className={`col-md-6 col-lg-4 ${styles.info_col}`}>
          <div className={styles.info_contact}>
            <h4 style={{fontFamily:'Onest, sans-serif'}}>
              Address
            </h4>
            <div className={styles.contact_link_box}>
              <a href>
                <i className="fa fa-map-marker" aria-hidden="true" />
                <span style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}} >
                  Areekode
                </span>
              </a>
              <a href>
                <i className="fa fa-phone" aria-hidden="true" />
                <span style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>
                  Call +91 9526380448
                </span>
              </a>
              <a href>
                <i className="fa fa-envelope" aria-hidden="true" />
                <span style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>
                  m3autocare20@gmail.com
                </span>
              </a>
            </div>
          </div>
          <div className={styles.info_social}>
            <a href>
            <FontAwesomeIcon icon={faFacebook}   aria-hidden="true" />
            </a>
            <a href>
            <FontAwesomeIcon icon={faXTwitter}   aria-hidden="true" />
            </a>
            <a href>
            <FontAwesomeIcon icon={faLinkedinIn}   aria-hidden="true" />
            </a>
            <a href>
            <FontAwesomeIcon icon={faInstagram}   aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className={`col-md-6 col-lg-4 ${styles.info_col}`}>
          <div className={styles.info_detail}>
            <h4 style={{fontFamily:'Onest, sans-serif'}}>
              Info
            </h4>
            <p style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>
              we M3AUTOCARE , we are your trusted partner in ensuring a smooth and enjoyable driving experience. Our journey began 1995 with a vision to revolutionize the way car services are delivered, and we have been steering toward that goal ever since.
            </p>
          </div>
        </div>
        <div className={`col-md-6 col-lg-2 mx-auto ${styles.info_col}`}>
          <div className={styles.info_link_box}>
            <h4 style={{fontFamily:'Onest, sans-serif'}}>
              Links
            </h4>
            <div className={styles.info_links}>
            <Link to={'/home?' +Date.now()}> <a className={styles.active} href="index.html" style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>
                {/* <img src="images/nav-bullet.png" alt /> */}
                Home
              </a></Link>
             
              <Link to={'/user-service/:id?' + Date.now()}> <a className href="about.html" style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>
                {/* <img src="images/nav-bullet.png" alt /> */}
                Services
              </a></Link>
              <Link to={'/user-product/:id?' + Date.now()}> <a className href="service.html" style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>
                {/* <img src="images/nav-bullet.png" alt /> */}
                Products
              </a></Link>
              <Link to={'/user-about?' + Date.now()}> <a className href="contact.html" style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>
                {/* <img src="images/nav-bullet.png" alt /> */}
                About Us
              </a></Link>
              <Link to={'/user-contact?' + Date.now()}><a className href="contact.html" style={{fontFamily:'Onest, sans-serif',fontSize:'17px'}}>
                {/* <img src="images/nav-bullet.png" alt /> */}
               Contact Us
              </a></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section></div>
  )
}

export default Footer