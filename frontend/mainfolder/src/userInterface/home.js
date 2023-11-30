import React, { useCallback, useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import styles from "../assets/userCss/syles.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Navbar from "../userInterface/Navbar";
import Footer from "../userInterface/Footer";
import axios from "axios";
import spinner from "../userImage/Double Ring-1s-200px (1).gif";
import car1 from "../userImage/car1.jpg";

function home() {
  const [carouselItems, setCarouselItems] = useState(4);
  const [validationError, setValidationError] = useState(null);
  const [spinners, setSpinners] = useState(false);
  const [spinnersX, setSpinnersX] = useState(false);
  const [bthhide, setBtnhide] = useState(true);
  const [sendbtn, setSendbtn] = useState(true);
  const [success, setSuccess] = useState(true);
  const [nameerr, setNameerr] = useState("");
  const [numerr, setnumerr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [mesggerr, setMesggerr] = useState("");
  const [name, setName] = useState({ email: "" });
  const [message, setMessage] = useState("");
  const [trackerr, setTrackerr] = useState("");
  const [getService, setGetData] = useState([]);
  const [dataTech, setDataTech] = useState([]);
  const [imagedata, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const [getDataAbout, setDataAbout] = useState([]);
  const [trackData, setTrackData] = useState("");
  const [getTrackDown, setTrackDwon] = useState([]);
  const [invalid, setInvalid] = useState("");
  const [get, setGet] = useState(null);
  const [open, setOpen] = useState(false);
  const [trackdown, setTrackdown] = useState(false);
  const [getTech, setTech] = useState(null);
  const [techId, settechId] = useState([]);
  const [appdata, setappData] = useState({
    id: "",
    carname: "",
    carnumber: "",
    contact: "",
    email: "",
    location: "",
    status: "",
    name: "",
    price: "",
    date: "",
    remarks: "",
    Feedback: "",
    rating: "",
  });

  useEffect(() => {
    const getName = JSON.parse(localStorage.getItem("userFront")) || {};
    setName(getName);
    function handleResize() {
      if (window.innerWidth < 768) {
        setCarouselItems(2);
      } else {
        setCarouselItems(4);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const shuffleService = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleClickOpens1 = (id, appId) => {
    setOpen(true);
    setGet(id);
    setTech(appId);
  };

  const handleCloses1 = () => {
    setOpen(false);
  };

  const getdataApp = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user/getappByid/${get}`);
      const data = await response.data;
      setappData({
        id: data.Appointment_id,
        carname: data.carName,
        carnumber: data.CarNumber,
        contact: data.contact,
        email: data.email,
        service: data.service,
        location: data.location,
        status: data.status,
        name: data.name,
        price: data.price,
        date: data.appointment_date,
        remarks: data.remarks,
        Feedback: data.Feedback,
        rating: data.rating,
      });
      console.log("1111111", data);

      const responses = await axios.get(`http://localhost:8000/user/getTechId/${getTech}`);
      console.log("eeeeeeee", responses.data);
      const datas = await responses.data;
      settechId(datas);
      console.log("Tech Data:", datas);
    } catch (err) {
      console.log(err);
    }
  }, [get]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/bannerGet");
        const data = await response.data;
        setData(data);
      } catch (err) {
        console.log(err);
      }

      try {
        const response = await axios.get("http://localhost:8000/user/getService");
        const data = await response.data;
        setGetData(data);
      } catch (err) {
        console.log(err);
      }

      try {
        const response = await axios.get("http://localhost:8000/user/gettechnicians");
        const data = await response.data;

        setDataTech(data);
      } catch (err) {
        console.log(err);
      }

      try {
        const response = await axios.get("http://localhost:8000/user/getpost");
        const data = await response.data;
        setDataAbout(data);
      } catch (err) {
        console.log(err);
      }
      await axios
        .get("http://localhost:8000/user/getProducts")
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
    getdataApp();
  }, [getdataApp]);

  const shuffleServices = shuffleService(getService);

  const shuffle = shuffleArray(product);

  const handleTrack = async (id) => {
    try {
      if (trackData.length < 1) {
        setTrackerr("Enter your appointment id");
        setInvalid("");
      } else {
        setSpinners(true);
        setBtnhide(false);
        setInvalid("");
        setTrackerr("");

        setTimeout(async () => {
          try {
            const response = await axios.get(`http://localhost:8000/user/getTrack/${id}`);
            const data = response.data;
            console.log("1111111", data);
            setTrackDwon(data);
            setTrackdown(true);
            setSpinners(false);
            setBtnhide(true);
          } catch (err) {
            console.log(err);
            setSpinners(false);
            setBtnhide(true);
            if (err.response && err.response.status === 404) {
              setInvalid("Entered Appointment ID is invalid");
            } else {
              console.log("Other error occurred:", err);
            }
          }
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setTrackdown(false);
  };

  const HandleChange = (e) => {
    const { name, value } = e.target;
    const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
    setName((prevData) => ({ ...prevData, [name]: value, [`${name}IsValid`]: isValid }));
  };
  const sendMessage = async () => {
    if (!name.name || name.name.length < 1) {
      setNameerr("Enter your name");
    } else {
      setNameerr("");
    }

    if (!name.contact || name.contact.length < 1) {
      setnumerr("Enter your number");
    } else {
      setnumerr("");
    }

    if (!name.email || name.email.length < 1) {
      setEmailErr("Enter your email");
      setValidationError(null);
    } else {
      setEmailErr("");
    }

    if (!message || message.length < 1) {
      setMesggerr("Enter your messages");
    } else {
      setMesggerr("");
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!emailRegex.test(name.email)) {
      setValidationError("Please enter a valid email address.");
    } else {
      setValidationError(null);
    }

    if (name.name !== "" && name.conatct !== "" && name.email !== "" && message !== "") {
      setSendbtn(false);
      setSpinnersX(true);

      const data = {
        name: name.name,
        contact: name.contact,
        email: name.email,
        message: message,
      };

      setTimeout(async () => {
        try {
          await axios
            .post("http://localhost:8000/user/sendMessage", data)
            .then((res) => {
              console.log(res.data);
              setSendbtn(true);
              setSpinnersX(false);
              setSuccess("Your email has been sent");
              setTimeout(() => {
                setSuccess("");
              }, 6000);
              document.getElementById("msgs").value = "";
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (err) {
          console.log(err);
        }
      }, 3000);
    }
  };

  return (
    <div>
      <div className={styles.hero_area}>
        {/* header section strats */}
        <Navbar className="navbar" />
        {/* end header section */}
        {/* slider section */}
        {imagedata.length > 0 && (
          <section className={styles.slider_section}>
            {/* <div className={styles.slider_bg_box}  >
    <img src={`${image1}`} className={styles.image} alt />
      </div> */}
            <OwlCarousel
              className={`owl-theme corousel-outer`}
              loop
              margin={10}
              autoplay
              autoplayTimeout={5000}
              items={1}
            >
              {imagedata &&
                imagedata.map((item) => (
                  <div className="item" key={item.id}>
                    <div className={styles.slider_bg_box}></div>
                    <img className={styles.image} src={`http://localhost:8000/${item.image}`} />

                    <div className="container">
                      <div className={styles.row}>
                        <div className="col-md-7 ">
                          <div className={`${styles.detail_box} ${styles.detaailbox}`}>
                            <h1 className={styles.cartext}>{item.title}</h1>

                            <p className={styles.cartext5}>{item.description}</p>

                            {/* <div className={styles.btn_box}>
                      <a href className={styles.btn1}>
                        Get A Quote
                      </a>
                    </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </OwlCarousel>
          </section>
        )}

        {/* end slider section */}
      </div>

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
              {shuffleServices.slice(0, 4).map((item) => (
                <div className="col-md-6 " key={item.id}>
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
                        to={`/user-service/${item._id}`}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* products */}

      <section className={`${styles.service_section} ${styles.layout_padding}`}>
        <div className={styles.service_container}>
          <div className="container ">
            <div className="row">
              <div className={styles.heading_container}>
                <h2 style={{ fontFamily: "Onest, sans-serif" }}>
                  Our <span>Products</span>
                </h2>
                <p style={{ fontFamily: "Onest, sans-serif" }}>
                  Our Products give life to your car...
                </p>
              </div>
              {shuffle.slice(0, 8).map((item) => (
                <div className="col-md-3" key={item.id}>
                  <Card
                    style={{
                      marginTop: "30px",
                      backgroundColor: "transparent",
                      border: "none",
                      boxShadow: "0px 2px 3px 0px rgba(0, 0, 0, 0.10)",
                    }}
                  >
                    <Card.Img
                      className={styles.card}
                      variant="top"
                      src={`http://localhost:8000/${item.image[0]}`}
                    />
                    <Card.Body>
                      <div className={styles.headcard}>
                        <Card.Title className={styles.titlecard}>
                          {item.name.slice(0, 21)}
                        </Card.Title>
                      </div>
                      <Card.Text className={styles.textflex}>
                        <p className={styles.cartext3}>Brand: {item.brand}</p>
                        <p className={styles.cartext1}>₹{item.mrp}</p>
                      </Card.Text>
                      <Card.Text className={styles.textflex1}>
                        <p className={styles.cartext3}>Qty left: {item.quantity}</p>
                        <p className={styles.cartext2}>₹{item.price}</p>
                      </Card.Text>
                      <Link className={styles.linkcard} to={`/user-product/${item._id}`}>
                        Read More
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {dataTech.length > 0 && (
        <section className={`${styles.service_section} ${styles.layout_padding}`}>
          <div className={styles.service_container}>
            <div className="container ">
              <div className={styles.heading_container}>
                <h2 style={{ fontFamily: "Onest, sans-serif" }}>
                  Our <span>Technicians</span>
                </h2>
                <p style={{ fontFamily: "Onest, sans-serif" }}>
                  Our Technicians are build for cars...
                </p>
              </div>

              <OwlCarousel
                className={`owl-theme corousel-outer`}
                loop
                margin={10}
                autoplay
                autoplayTimeout={5000}
                items={carouselItems}
              >
                {dataTech &&
                  dataTech.map((item) => (
                    <Card
                      style={{
                        margin: "0 auto",
                        marginTop: "30px",
                        backgroundColor: " rgb(242, 242, 242)",
                        border: "none",
                      }}
                      key={item.id}
                    >
                      <Card.Img variant="top" src={`http://localhost:8000/${item.image}`} />
                      <Card.Body>
                        <Card.Title
                          style={{
                            color: "black",
                            fontSize: "19px",
                            textTransform: "uppercase",
                            fontFamily: "Onest, sans-serif",
                            fontWeight: "bold",
                          }}
                        >
                          {item.name}
                        </Card.Title>
                        <Card.Text
                          style={{
                            color: "black",
                            fontSize: "14px",
                            fontFamily: "Onest, sans-serif",
                          }}
                        >
                          Experince: {item.description} <br />
                          Specialised: {item.specialised}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
              </OwlCarousel>
            </div>
          </div>
        </section>
      )}
      {/* end service section */}
      {/* about section */}
      <section className={`${styles.about_section} ${styles.layout_padding_bottom}`}>
        <div className="container">
          <div className="row">
            {getDataAbout.map((item) => (
              <div className="col-md-6" key={item.id}>
                <div className={styles.detail_box}>
                  <p
                    style={{ fontFamily: "Onest, sans-serif" }}
                    dangerouslySetInnerHTML={{ __html: item.about }}
                  ></p>
                  <Link
                    style={{ fontSize: "17px", fontFamily: "Onest, sans-serif" }}
                    to="/user-about"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
            {getDataAbout.map((item) => (
              <div className="col-md-6" key={item.id}>
                <div className={`${styles.img_box} ${styles.imggbox}`}>
                  <img src={`http://localhost:8000/${item.image}`} alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* end about section */}
      {/* track section */}
      <section className={`${styles.track_section} ${styles.layout_padding}`}>
        <div className={styles.track_bg_box}>
          <img src={car1} alt />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className={styles.heading_container}>
                <h2 style={{ fontFamily: "Onest, sans-serif" }}>
                  Track Your <span style={{ color: "#0a97b0" }}>Service</span>
                </h2>
              </div>
              <p style={{ fontFamily: "Onest, sans-serif" }}>
                You can track your services by just enter the appointment id and your appointment id
                will be send to your email after you take an appointment.
              </p>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  id="value"
                  onChange={(e) => setTrackData(e.target.value)}
                  type="text"
                  style={{ fontFamily: "Onest, sans-serif", fontSize: "14px" }}
                  placeholder="Enter Your Appointment Id"
                />
                {bthhide && (
                  <button
                    onClick={() => handleTrack(trackData)}
                    style={{ fontFamily: "Onest, sans-serif", cursor: "pointer" }}
                  >
                    Track
                  </button>
                )}
                {spinners && (
                  <div className={styles.spin}>
                    <img style={{ width: "35px" }} src={spinner} />
                  </div>
                )}
              </form>
              {invalid && (
                <p style={{ fontFamily: "Onest, sans-serif", color: "red", fontSize: "14px" }}>
                  {invalid}
                </p>
              )}
              <p style={{ fontFamily: "Onest, sans-serif", color: "red", fontSize: "14px" }}>
                {trackerr}
              </p>
            </div>
          </div>
        </div>

        <div>
          {trackdown && (
            <div className="container mt-5">
              <div className="d-flex justify-content-center row">
                <div className="col-md-6  col-lg-12">
                  <div className="shadow p-3 mb-5 bg-body rounded">
                    <FontAwesomeIcon
                      style={{ color: "black", float: "right", cursor: "pointer" }}
                      onClick={handleClose}
                      icon={faClose}
                    />
                    <div className="table-responsive table-borderless shadow-2-strong rounded-4">
                      <h3
                        style={{
                          fontFamily: "Onest, sans-serif",
                          fontWeight: "700",
                          color: "#0a97b0",
                        }}
                        className="text-center"
                      >
                        M3 AUTOCARE
                      </h3>
                      <p
                        style={{
                          fontFamily: "Onest, sans-serif",
                          color: "black",
                          fontSize: "18px",
                        }}
                        className="text-center"
                      >
                        Here is your appointment details
                      </p>
                      <table style={{ marginTop: "2rem" }} className="table">
                        <thead>
                          <tr>
                            <th className="text-center"></th>
                            <th style={{ fontFamily: "Onest, sans-serif", fontSize: "17px" }}>
                              Appointment Id
                            </th>
                            <th style={{ fontFamily: "Onest, sans-serif", fontSize: "17px" }}>
                              Car Name
                            </th>
                            <th style={{ fontFamily: "Onest, sans-serif", fontSize: "17px" }}>
                              Car No:
                            </th>
                            <th style={{ fontFamily: "Onest, sans-serif", fontSize: "17px" }}>
                              Location
                            </th>
                            <th style={{ fontFamily: "Onest, sans-serif", fontSize: "17px" }}>
                              Service
                            </th>
                            <th style={{ fontFamily: "Onest, sans-serif", fontSize: "17px" }}>
                              Status
                            </th>
                            <th style={{ fontFamily: "Onest, sans-serif", fontSize: "17px" }}>
                              Total Amount
                            </th>
                            <th style={{ fontFamily: "Onest, sans-serif", fontSize: "17px" }}>
                              Appointment Date
                            </th>
                            <th style={{ fontFamily: "Onest, sans-serif", fontSize: "17px" }}>
                              Action
                            </th>
                            <th />
                          </tr>
                        </thead>
                        <tbody className="table-body">
                          <tr className="cell-1">
                            <td className="text-center "></td>
                            <td style={{ fontFamily: "Onest, sans-serif", fontSize: "14px" }}>
                              {getTrackDown.Appointment_id}
                            </td>
                            <td
                              style={{
                                fontFamily: "Onest, sans-serif",
                                textTransform: "capitalize",
                                fontSize: "14px",
                              }}
                            >
                              {getTrackDown.carName}
                            </td>
                            <td
                              style={{
                                fontFamily: "Onest, sans-serif",
                                textTransform: "uppercase",
                                fontSize: "14px",
                              }}
                            >
                              {getTrackDown.CarNumber}
                            </td>
                            <td
                              style={{
                                fontFamily: "Onest, sans-serif",
                                textTransform: "capitalize",
                                fontSize: "14px",
                              }}
                            >
                              {getTrackDown.location}
                            </td>
                            <td
                              style={{
                                fontFamily: "Onest, sans-serif",
                                textTransform: "capitalize",
                                fontSize: "14px",
                              }}
                            >
                              {" "}
                              {getService.find((name) => name._id === getTrackDown.service)?.name ||
                                ""}
                            </td>
                            <td style={{ fontFamily: "Onest, sans-serif" }}>
                              {getTrackDown.status === "Received" && (
                                <span
                                  className="badge badge-success"
                                  style={{
                                    fontFamily: "Onest, sans-serif",
                                    fontSize: "14px",
                                    position: "relative",
                                    bottom: "5px",
                                    backgroundColor: "#0a97b0",
                                  }}
                                >
                                  {getTrackDown.status}
                                </span>
                              )}
                              {getTrackDown.status === "Seeking Issue" && (
                                <span
                                  className="badge badge-success"
                                  style={{
                                    fontFamily: "Onest, sans-serif",
                                    fontSize: "14px",
                                    position: "relative",
                                    bottom: "5px",
                                    backgroundColor: "orange",
                                  }}
                                >
                                  {getTrackDown.status}
                                </span>
                              )}
                              {getTrackDown.status === "Team on work" && (
                                <span
                                  className="badge badge-success"
                                  style={{
                                    fontFamily: "Onest, sans-serif",
                                    fontSize: "14px",
                                    position: "relative",
                                    bottom: "5px",
                                    backgroundColor: "brown",
                                  }}
                                >
                                  {getTrackDown.status}
                                </span>
                              )}
                              {getTrackDown.status === "On progress" && (
                                <span
                                  className="badge badge-success"
                                  style={{
                                    fontFamily: "Onest, sans-serif",
                                    fontSize: "14px",
                                    position: "relative",
                                    bottom: "5px",
                                    backgroundColor: "purple",
                                  }}
                                >
                                  {getTrackDown.status}
                                </span>
                              )}
                              {getTrackDown.status === "Checking all works" && (
                                <span
                                  className="badge badge-success"
                                  style={{
                                    fontFamily: "Onest, sans-serif",
                                    fontSize: "14px",
                                    position: "relative",
                                    bottom: "5px",
                                    backgroundColor: "cyan",
                                  }}
                                >
                                  {getTrackDown.status}
                                </span>
                              )}
                              {getTrackDown.status === "we are on last" && (
                                <span
                                  className="badge badge-success"
                                  style={{
                                    fontFamily: "Onest, sans-serif",
                                    fontSize: "14px",
                                    position: "relative",
                                    bottom: "5px",
                                    backgroundColor: "pink",
                                  }}
                                >
                                  {getTrackDown.status}
                                </span>
                              )}
                              {getTrackDown.status === "Work Done" && (
                                <span
                                  className="badge badge-success"
                                  style={{
                                    fontFamily: "Onest, sans-serif",
                                    fontSize: "14px",
                                    position: "relative",
                                    bottom: "5px",
                                  }}
                                >
                                  {getTrackDown.status}
                                </span>
                              )}
                              {getTrackDown.status === "Cancelled" && (
                                <span
                                  className="badge badge-success"
                                  style={{
                                    fontFamily: "Onest, sans-serif",
                                    fontSize: "14px",
                                    position: "relative",
                                    bottom: "5px",
                                    backgroundColor: "red",
                                  }}
                                >
                                  {getTrackDown.status}
                                </span>
                              )}
                            </td>
                            <td style={{ fontFamily: "Onest, sans-serif", fontSize: "14px" }}>
                              ₹{getTrackDown.price}
                            </td>
                            <td style={{ fontFamily: "Onest, sans-serif", fontSize: "14px" }}>
                              {getTrackDown.appointment_date}
                            </td>
                            <button
                              style={{ color: "#0a97b0" }}
                              onClick={() =>
                                handleClickOpens1(getTrackDown._id, getTrackDown.Appointment_id)
                              }
                              className={styles.viewbtn}
                            >
                              View
                            </button>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* end track section */}
      {/* contact section */}
      <section className={styles.contact_section}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-md-5 offset-md-1">
              <div className={styles.heading_container}>
                <h2 style={{ fontFamily: "Onest, sans-serif" }}>Contact Us</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-5 offset-md-1">
              <div className={`${styles.form_container} contact-form`}>
                <form onSubmit={(e) => e.preventDefault()}>
                  <p className={styles.success}>{success}</p>
                  <div>
                    <input
                      value={name.name}
                      onChange={HandleChange}
                      name="name"
                      className={styles.hinputs}
                      type="text"
                      placeholder="Your Name"
                    />
                    <p className={styles.err}>{nameerr}</p>
                  </div>
                  <div>
                    <input
                      value={name.contact}
                      onChange={HandleChange}
                      name="contact"
                      className={styles.hinputs}
                      type="text"
                      placeholder="Phone Number"
                    />
                    <p className={styles.err}>{numerr}</p>
                  </div>
                  <div>
                    <input
                      value={name.email}
                      onChange={HandleChange}
                      name="email"
                      className={styles.hinputs}
                      style={{ textTransform: "lowercase" }}
                      type="email"
                      placeholder="Email"
                      required
                    />
                    {validationError && (
                      <div
                        style={{ fontFamily: "Onest, sans-serif", color: "red", fontSize: "14px" }}
                        className="error-message"
                      >
                        {validationError}
                      </div>
                    )}
                    <p className={styles.err}>{emailErr}</p>
                  </div>
                  <div>
                    <input
                      style={{ fontFamily: "Onest, sans-serif", fontSize: "16px" }}
                      type="text"
                      onChange={(e) => setMessage(e.target.value)}
                      className={styles.message_box}
                      id="msgs"
                      placeholder="Message"
                    />
                    <p className={styles.err}>{mesggerr}</p>
                  </div>
                  {sendbtn && (
                    <div className={styles.btn_box}>
                      <button onClick={sendMessage} className={styles.hinputs}>
                        SEND
                      </button>
                    </div>
                  )}
                  {spinnersX && (
                    <div className={styles.spinX}>
                      <img style={{ width: "35px" }} src={spinner} />
                    </div>
                  )}
                </form>
              </div>
            </div>
            <div className="col-lg-7 col-md-6 px-0">
              <div className="map-container">
                <div className="map">
                  <div id="googleMap" />
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.1845225251054!2d75.83155997482352!3d11.24783255032209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65b51851a4693%3A0x947a392074f873da!2sTechoriz%20Digital%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1698145182003!5m2!1sen!2sin"
                    width="800"
                    height="450"
                    style={{
                      border: "0",
                    }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end contact section */}
      {/* info section */}
      <Footer />
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
      <div>
        <Dialog
          open={open}
          onClose={handleCloses1}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="md"
        >
          <DialogTitle id="alert-dialog-title" style={{ color: "#0a97b0" }}>
            {"Appointment Details"}
          </DialogTitle>
          <DialogContent>
            <div style={{ display: "flex", gap: "50px" }}>
              <div>
                <DialogContentText className={styles.dialogpop}>
                  <span className={styles.dialogpop}>Appointment ID:</span>{" "}
                  <span className={styles.deatils}>{appdata.id}</span>
                </DialogContentText>
                <DialogContentText>
                  <span className={styles.dialogpop}>Name:</span>
                  <span className={styles.deatils1}> {appdata.name}</span>
                </DialogContentText>
                <DialogContentText>
                  <span className={styles.dialogpop}>Contact:</span>
                  <span className={styles.deatils1}> {appdata.contact}</span>
                </DialogContentText>
                <DialogContentText>
                  <span className={styles.dialogpop}>Car Name:</span>
                  <span className={styles.deatils1} style={{ textTransform: "capitalize" }}>
                    {" "}
                    {appdata.carname}
                  </span>
                </DialogContentText>
                <DialogContentText>
                  <span className={styles.dialogpop}>Service:</span>
                  <span className={styles.deatils1}>
                    {" "}
                    {getService.find((name) => name._id === appdata.service)?.name || ""}
                  </span>
                </DialogContentText>
                <DialogContentText>
                  {appdata.status === "Received" && (
                    <div>
                      <span className={styles.dialogpop}>Status:</span>
                      <span
                        className="badge badge-success"
                        style={{
                          fontFamily: "Onest, sans-serif",
                          fontSize: "14px",
                          position: "relative",
                          bottom: "5px",
                          backgroundColor: "#0a97b0",
                        }}
                      >
                        {appdata.status}
                      </span>
                    </div>
                  )}
                  {appdata.status === "Seeking Issue" && (
                    <div>
                      <span className={styles.dialogpop}>Status:</span>
                      <span
                        className="badge badge-success"
                        style={{
                          fontFamily: "Onest, sans-serif",
                          fontSize: "14px",
                          position: "relative",
                          bottom: "5px",
                          backgroundColor: "orange",
                        }}
                      >
                        {appdata.status}
                      </span>
                    </div>
                  )}
                  {appdata.status === "Team on work" && (
                    <div>
                      <span className={styles.dialogpop}>Status:</span>
                      <span
                        className="badge badge-success"
                        style={{
                          fontFamily: "Onest, sans-serif",
                          fontSize: "14px",
                          position: "relative",
                          bottom: "5px",
                          backgroundColor: "brown",
                        }}
                      >
                        {appdata.status}
                      </span>
                    </div>
                  )}
                  {appdata.status === "On progress" && (
                    <div>
                      <span className={styles.dialogpop}>Status:</span>
                      <span
                        className="badge badge-success"
                        style={{
                          fontFamily: "Onest, sans-serif",
                          fontSize: "14px",
                          position: "relative",
                          bottom: "5px",
                          backgroundColor: "purple",
                        }}
                      >
                        {appdata.status}
                      </span>
                    </div>
                  )}
                  {appdata.status === "Checking all works" && (
                    <div>
                      <span className={styles.dialogpop}>Status:</span>
                      <span
                        className="badge badge-success"
                        style={{
                          fontFamily: "Onest, sans-serif",
                          fontSize: "14px",
                          position: "relative",
                          bottom: "5px",
                          backgroundColor: "cyan",
                        }}
                      >
                        {appdata.status}
                      </span>
                    </div>
                  )}
                  {appdata.status === "we are on last" && (
                    <div>
                      <span className={styles.dialogpop}>Status:</span>
                      <span
                        className="badge badge-success"
                        style={{
                          fontFamily: "Onest, sans-serif",
                          fontSize: "14px",
                          position: "relative",
                          bottom: "5px",
                          backgroundColor: "pink",
                        }}
                      >
                        {appdata.status}
                      </span>
                    </div>
                  )}
                  {appdata.status === "Work Done" && (
                    <div>
                      <span className={styles.dialogpop}>Status:</span>
                      <span
                        className="badge badge-success"
                        style={{
                          fontFamily: "Onest, sans-serif",
                          fontSize: "14px",
                          position: "relative",
                          bottom: "5px",
                        }}
                      >
                        {appdata.status}
                      </span>
                    </div>
                  )}
                  {appdata.status === "Cancelled" && (
                    <div>
                      <span className={styles.dialogpop}>Status:</span>
                      <span
                        className="badge badge-success"
                        style={{
                          fontFamily: "Onest, sans-serif",
                          fontSize: "14px",
                          position: "relative",
                          bottom: "5px",
                          backgroundColor: "red",
                        }}
                      >
                        {appdata.status}
                      </span>
                    </div>
                  )}
                </DialogContentText>
                <DialogContentText>
                  <span className={styles.dialogpop}>Remarks:</span>
                  <span style={{ textTransform: "capitalize" }} className={styles.deatils1}>
                    {" "}
                    {appdata.remarks}
                  </span>
                </DialogContentText>
                <DialogContentText>
                  <span className={styles.dialogpop}>Feedback & Ratings:</span>
                  <span
                    style={{ textTransform: "capitalize", fontSize: "14px" }}
                    className={styles.deatils1}
                  >
                    {appdata.rating}
                    <br />
                    {appdata.Feedback}
                  </span>
                </DialogContentText>
              </div>
              <div>
                <DialogContentText className={styles.dialogpop}>
                  <span className={styles.dialogpop}>Appointment Date:</span>{" "}
                  <span className={styles.deatils}>{appdata.date}</span>
                </DialogContentText>
                <DialogContentText>
                  <span className={styles.dialogpop}>Email:</span>
                  <span className={styles.deatils1}> {appdata.email}</span>
                </DialogContentText>

                <DialogContentText>
                  <span className={styles.dialogpop}>Location:</span>
                  <span style={{ textTransform: "capitalize" }} className={styles.deatils1}>
                    {" "}
                    {appdata.location}
                  </span>
                </DialogContentText>
                <DialogContentText>
                  <span className={styles.dialogpop}>Car Number:</span>
                  <span className={styles.deatils1} style={{ textTransform: "uppercase" }}>
                    {" "}
                    {appdata.carnumber}
                  </span>
                </DialogContentText>
                <DialogContentText>
                  <span className={styles.dialogpop}>Price:</span>
                  <span className={styles.deatils1}>₹{appdata.price}/-</span>
                </DialogContentText>
                <DialogContentText>
                  <span className={styles.dialogpop}>Technicians:</span>
                  <div>
                    {techId && techId.technicians ? (
                      techId.technicians.map((technician, index) => (
                        <span key={index} className={styles.deatils1} style={{ fontSize: "14px" }}>
                          {dataTech.find((techItem) => techItem._id === technician.technicianId)
                            ?.name || "No Technician Assigned"}
                          -({technician.startDate} to {technician.endDate})<br />
                          <span
                            style={{
                              marginLeft: "5px",
                              position: "relative",
                              bottom: "13px",
                              color: "green",
                            }}
                          >
                            {technician.comment}.
                          </span>
                          <br />
                        </span>
                      ))
                    ) : (
                      <span style={{ fontFamily: "Onest, sans-serif", fontSize: "15px" }}>
                        No Technicians Assigned
                      </span>
                    )}
                  </div>
                </DialogContentText>
                <DialogContentText></DialogContentText>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloses1}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div></div>
    </div>
  );
}

export default home;
