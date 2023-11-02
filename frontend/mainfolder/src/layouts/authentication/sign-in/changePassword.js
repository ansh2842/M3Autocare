import React, { useEffect, useState } from 'react';
import SoftBox from 'components/SoftBox';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import SoftInput from 'components/SoftInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ChangePassword = () => {
  const [invalid, setInvalid] = useState(false);
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(faEye);
  const [type1,setType1] = useState('password')
  const [icon1, setIcon1] = useState(faEye)
  const [newPassword,setNewPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [getData,setGetData] = useState('')
  const navigate =useNavigate()

  useEffect(()=>{
    const Data = JSON.parse(localStorage.getItem('userData')) || {};
    setGetData(Data)
  },[])

  

  const togglePasswordVisibility = () => {
    if (type === 'password') {
      setType('text');
      setIcon(faEyeSlash);
    } else {
      setType('password');
      setIcon(faEye);
    }
  };

  const togglePasswordVisibilitys = () => {
    if (type1 === 'password') {
      setType1('text');
      setIcon1(faEyeSlash);
    } else {
      setType1('password');
      setIcon1(faEye);
    }
  };

  const handleUpdate = async() =>{

    const datas ={
      newPassword:newPassword,
      confirmPassword:confirmPassword
    }

    await axios.post(`http://localhost:8000/admin/changeForgotPassword/${getData.id}`,datas)
    .then(res=>{
      console.log(res.data);
      setInvalid('')
      localStorage.clear();
      navigate('/authentication/sign-in')
    }).catch(err =>{
      if (err.response && err.response.status === 404) {
        setInvalid('The new password and confirm password are incorrect');

      } else {
        console.log(err);
      }
      console.log(err)
    })

  }

  return (
    <div
      style={{
        display: 'flex',
        marginTop: '100px',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '500px',
      }}
    >
      <p>Change your account password here...</p>
      <div
        style={{
          width: '300px',
          height: '400px',
          display: 'flex',
          marginLeft: '40px',
          flexDirection: 'column',
          justifyContent: 'center',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
          borderRadius: '10px',
          alignItems: 'center',
        }}
      >
        <form>
          <SoftBox mb={2}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h4>m3 autocare</h4>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            ></div>

            <label style={{ fontSize: '12px' }}>New password</label>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',fontSize:'15px' }}>
              <input onChange={(e)=> setNewPassword(e.target.value)}
                style={{ border: 'none', backgroundColor: 'transparent', outline: 'none' }}
                type={type}
              />
              <FontAwesomeIcon
                style={{ fontSize: '15px', cursor: 'pointer' }}
                icon={icon}
                onClick={togglePasswordVisibility}
              />
            </div>
            <div style={{ borderBottom: '1px solid black', width: '100%' }}></div>

            <label style={{ fontSize: '12px' }}>Confirm new password</label>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',fontSize:'15px' }}>
              <input onChange={(e)=> setConfirmPassword(e.target.value)}
                style={{ border: 'none', backgroundColor: 'transparent', outline: 'none' }}
                type={type1}
              />
              <FontAwesomeIcon
                style={{ fontSize: '15px', cursor: 'pointer' }}
                icon={icon1}
                onClick={togglePasswordVisibilitys}
              />
            </div>
            <div style={{ borderBottom: '1px solid black', width: '100%' }}></div>

          </SoftBox>
          {invalid && (
            <p
              style={{
                marginTop: '-10px',
                color: 'red',
                fontSize: '9px',
              }}
            >
              {invalid}
            </p>
          )}

          <SoftBox mt={4} mb={1}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Link>
                <Button onClick={handleUpdate} variant="success">Done</Button>
              </Link>
            </div>
          </SoftBox>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
