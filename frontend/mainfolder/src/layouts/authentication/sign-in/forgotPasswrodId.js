import React, { useEffect, useState } from 'react';
import SoftBox from 'components/SoftBox';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import SoftInput from 'components/SoftInput';
import axios from 'axios';

const ForgotPasswordId = () => {
  const [invalid, setInvalid] = useState(false);
  const [number, setNumber] = useState('');
  const [enterotp, setEnterotp] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showCountdown, setShowCountdown] = useState(false);
  const [showgetOtp, setGetOtp] = useState(true);
  const [countdown, setCountdown] = useState(120);

  const message = 'Check your mail for OTP';

  useEffect(() => {
    const getEmail = JSON.parse(localStorage.getItem('userData')) || {};
    setNumber(getEmail);

    
    let timer;
    if (showCountdown) {
      timer = setInterval(() => {
        if (countdown === 0) {
          clearInterval(timer);
          setGetOtp(true)
          setShowCountdown(false)
          return;
        }
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [showCountdown, countdown]);

  const getOtp = () => {

    setGetOtp(false)
    
    const datas = {
      email: `${number.email}`,
      enterotp: enterotp,
    };

    axios
      .post('http://localhost:8000/admin/Otpgenerate', datas)
      .then((res) => {
        console.log(res.data);
        setShowCountdown(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkOTP = () => {
    if (enterotp.length < 1) {
      setError('Enter OTP');
    } else {
      setError('');

      const datas1 = {
        enterotp: enterotp,
      };

      axios
        .post('http://localhost:8000/admin/CheckOTP', datas1)
        .then((res) => {
          console.log(res.data);
          setInvalid('');
          navigate(`/ChangePassword/${number.id}`);
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            setInvalid('OTP has expired');
          } else if (err.response && err.response.status === 404) {
            setInvalid('OTP not found');
          } else {
            console.log(err);
          }
        });
    }
  };

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
      <p>Check your mail for OTP...</p>
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
  <h4 style={{ marginLeft: '10px' }}>m3 autocare</h4>
  <div
    style={{
      display: 'flex',
      justifyContent: 'flex-end',
      textDecoration: 'underline',
      cursor: 'pointer',
    }}
  >
    {showgetOtp && (
      <p
        onClick={getOtp}
        style={{ fontSize: '11px', marginTop: '4px' }}
      >
        Click for OTP
      </p>
    )}
  </div>
  <p style={{ fontSize: '13px' }}>{message}</p>
  <SoftInput
    onChange={(e) => setEnterotp(e.target.value)}
    type="text"
    placeholder="OTP"
  />
</SoftBox>

          <p style={{ fontSize: '10px', color: 'red', marginTop: '-10px' }}>
            {error}
          </p>
          {showCountdown && (
            <p
              style={{ fontSize: '10px', color: 'green', marginTop: '-10px' }}
            >{`OTP valid till ${countdown}`}</p>
          )}
          {invalid && (
            <p
              style={{
                marginTop: '-10px',
                color: 'red',
                fontSize: '10px',
              }}
            >
              {invalid}
            </p>
          )}
          <p
            style={{ fontSize: '9px', color: 'grey', marginTop: '-10px' }}
          >
            *Dont disclose your OTP with someone
          </p>
          <SoftBox mt={4} mb={1}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Link>
                <Button onClick={checkOTP} variant="success">
                  Done
                </Button>
              </Link>
            </div>
          </SoftBox>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordId;
