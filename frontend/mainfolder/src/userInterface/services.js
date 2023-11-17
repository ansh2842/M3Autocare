import React, { useCallback, useEffect, useState } from "react";
import styles from "../assets/userCss/syles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Navbar from "../userInterface/Navbar";
import Footer from "../userInterface/Footer";
import axios from "axios";

function servives() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [getService, setGetData] = useState([]);
  const [getServiceById, setServiceById] = useState({
    image: null,
    name: "",
    description: "",
    mrp: "",
    price: "",
  });
  const [getServiceId, setServiceId] = useState({
    image: null,
    name: "",
    description: "",
    mrp: "",
    price: "",
    id: "",
  });

  const [get, setGet] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [opens1, setOpens1] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    setGet(id);
    console.log(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloses1 = () => {
    setOpens1(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/getService");
        const data = await response.data;
        console.log(data);
        setGetData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const getServiceData = useCallback(async () => {
    await axios
      .get(`http://localhost:8000/user/getServiceEdit/${get}`)
      .then((res) => {
        setServiceId({
          image: res.data.image,
          name: res.data.name,
          description: res.data.description,
          mrp: res.data.mrp,
          price: res.data.price,
          id: res.data._id,
        });
        console.log("getServiceId:", getServiceId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [get]);
  const getServiceDataById = useCallback(async () => {
    await axios
      .get(`http://localhost:8000/user/getServiceEdit/${id}`)
      .then((res) => {
        setServiceById({
          image: res.data.image,
          name: res.data.name,
          description: res.data.description,
          mrp: res.data.mrp,
          price: res.data.price,
          id: res.data._id,
        });
        setOpens1(true);
        console.log("getServiceById:", getServiceById);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    getServiceData();
  }, [getServiceData]);
  useEffect(() => {
    getServiceDataById();
  }, [getServiceDataById]);

  const goService = () => {
    if (!localStorage.getItem("userFront")) {
      window.location.href = "/user-signup";
    } else {
      navigate(`/appointment/${getServiceById.id}`);
    }
  };

  const goServices = () => {
    if (!localStorage.getItem("userFront")) {
      window.location.href = "/user-signup";
    } else {
      navigate(`/appointment/${getServiceId.id}`);
    }
  };

  return (
    <div>
      {/* header section strats */}

      <Navbar />
      {/* service section */}
      <section className={`${styles.service_section} ${styles.layout_padding}`}>
        <div className={styles.service_container}>
          <div className="container ">
            <div className={styles.heading_container}>
              <h2 style={{ fontFamily: "Onest, sans-serif" }}>
                Our <span>Services</span>
              </h2>
              <p style={{ fontFamily: "Onest, sans-serif" }}>
                Make service with us and make your day and your car day...
              </p>
            </div>

            <div className="row">
              {getService.map((item) => (
                <div className="col-md-6" key={item.id}>
                  <div className={styles.box}>
                    <div className={styles.img_box}>
                      <img src={`http://localhost:8000/${item.image}`} alt />
                    </div>
                    <div className={styles.detail_box}>
                      <h5 style={{ fontFamily: "Onest, sans-serif" }}>{item.name}</h5>
                      <p style={{ fontFamily: "Onest, sans-serif" }}>
                        {item.description.slice(0, 100)}...
                      </p>
                      <Link
                        style={{ fontSize: "17px", fontFamily: "Onest, sans-serif" }}
                        onClick={() => handleClickOpen(item._id)}
                      >
                        View More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* end service section */}
      {/* info section */}
      <Footer />
      {/* end info section */}
      {/* footer section */}

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            id="alert-dialog-title"
          >
            {"Service Details"}
            <DialogContentText>
              <p onClick={goServices} className={`${styles.deatils1} ${styles.bntssa}`}>
                {" "}
                Take an Appointment <FontAwesomeIcon icon={faArrowRight} />
              </p>
            </DialogContentText>
          </DialogTitle>
          <DialogContent>
            <img className={styles.imgpop} src={`http://localhost:8000/${getServiceId.image}`} />
            <DialogContentText className={styles.dialogpop}>
              <span className={styles.dialogpop}>Name:</span>{" "}
              <span className={styles.deatils}> {getServiceId.name}</span>
            </DialogContentText>
            <DialogContentText>
              <span className={styles.dialogpop}>Description:</span>
              <span className={styles.deatils1}> {getServiceId.description} </span>
            </DialogContentText>
            <DialogContentText>
              <span className={styles.dialogpop}>Mrp:</span>
              <span className={styles.deatils2}> {getServiceId.mrp} </span>
            </DialogContentText>
            <DialogContentText>
              <span className={styles.dialogpop}>Price:</span>
              <span className={styles.deatils1}> {getServiceId.price} </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={opens1}
          onClose={handleCloses1}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            id="alert-dialog-title"
          >
            {"Service Details"}
            <DialogContentText>
              <button onClick={goService} className={`${styles.deatils1} ${styles.bntssa}`}>
                {" "}
                Take an Appointment <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </DialogContentText>
          </DialogTitle>
          <DialogContent>
            <img className={styles.imgpop} src={`http://localhost:8000/${getServiceById.image}`} />
            <DialogContentText className={styles.dialogpop}>
              <span className={styles.dialogpop}>Name:</span>{" "}
              <span className={styles.deatils}> {getServiceById.name}</span>
            </DialogContentText>
            <DialogContentText>
              <span className={styles.dialogpop}>Description:</span>
              <span className={styles.deatils1}> {getServiceById.description} </span>
            </DialogContentText>
            <DialogContentText>
              <span className={styles.dialogpop}>Mrp:</span>
              <span className={styles.deatils2}> {getServiceById.mrp} </span>
            </DialogContentText>
            <DialogContentText>
              <span className={styles.dialogpop}>Price:</span>
              <span className={styles.deatils1}> {getServiceById.price} </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloses1}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default servives;
