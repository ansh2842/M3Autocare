import React, { useEffect, useState } from "react";
import styles from "../assets/userCss/syles.module.css";
import { Link, useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Zoom } from "@mui/material";
import "../assets/userCss/checkApoointemnt.css";
import { useCallback } from "react";
import axios from "axios";
import Navbar from "../userInterface/Navbar";
import Footer from "../userInterface/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarOfLife } from "@fortawesome/free-regular-svg-icons";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Style } from "@mui/icons-material";

function contact() {
  const { id } = useParams();
  const [msgs, setmsgs] = useState(false);
  const [getId, setgetId] = useState(null);
  const [Feedback, setFeedback] = useState("");
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");
  const [five, setFive] = useState("");
  const [star, setStar] = useState("");
  const [open, setOpen] = useState(false);
  const [get, setGet] = useState(null);
  const [cancel, setCancel] = useState(null);
  const [getTech, setTech] = useState(null);
  const [opens, setOpens] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hide, setHide] = useState(true);
  const [techId, settechId] = useState([]);
  const [datas, setDatas] = useState([]);
  const [getService, setGetData] = useState([]);
  const [getDatas, setGetDatas] = useState([]);
  const [getCancel, setGetCancel] = useState([]);
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

  const [opens2, setOpens2] = React.useState(false);

  const handleClickOpens2 = (id) => {
    setOpens2(true);
    setgetId(id);
  };
  console.log(getId);
  const handleCloses2 = () => {
    setOpens2(false);
  };

  const handleClickOpen = (id, appId) => {
    setOpen(true);
    setGet(id);
    setTech(appId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpens = (id) => {
    setOpens(true);
    setCancel(id);
  };

  const handleCloses = () => {
    setOpens(false);
  };

  const getappData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user/gettappdata/${id}`);
      const data = await response.data;
      setDatas(data);
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const getdataApp = useCallback(
    async (get) => {
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
          rating: data.rating,
          Feedback: data.Feedback,
        });
        console.log("wwwwwwwww", data);

        const responses = await axios.get(`http://localhost:8000/user/getTechId/${getTech}`);
        console.log("eeeeeeee", responses.data);
        const datas = await responses.data;
        settechId(datas);
        console.log("Tech Data:", datas);
      } catch (err) {
        console.log(err);
      }
    },
    [get, getTech]
  );

  useEffect(() => {
    getappData();
    getdataApp(get);

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
  }, [getappData, getdataApp]);

  useEffect(() => {
    const getDataTech = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/gettechnicians");
        const data = response.data;

        setGetDatas(data);
      } catch (err) {
        console.log(err);
      }
    };
    getDataTech();
  }, []);

  const cancelRequest = async () => {
    const data = {
      id: cancel,
    };
    try {
      await axios
        .post("http://localhost:8000/user/cancelAppointment", data)
        .then((res) => {
          window.location.reload();
          setOpens(false);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/getCancel");
        const data = await response.data;
        setSuccess(true);
        setHide(false);
        setGetCancel(data);
        console.log("dsfsdfsdf", data);
      } catch (err) {
        setSuccess(false);
        setHide(true);
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const ratingStar = (value) => {
    console.log(value);
    setStar(value);

    setOne(value === "one star" ? "one star" : "");
    setTwo(value === "two stars" ? "two stars" : "");
    setThree(value === "three stars" ? "three stars" : "");
    setFour(value === "four stars" ? "four stars" : "");
    setFive(value === "five stars" ? "five stars" : "");
  };

  console.log("eee", star);

  const handleStar = async () => {
    const data = {
      star: star,
      Feedback: Feedback,
    };
    console.log("prrr", getId);

    try {
      await axios
        .put(`http://localhost:8000/user/updateFedback/${getId}`, data)
        .then((res) => {
          setmsgs("Your feedback has been updated");
          setTimeout(() => {
            setOpens2(false);

            window.location.reload();
          }, 2000);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      {/* contact section */}
      <div className="container mt-5">
        <div className="d-flex justify-content-center row">
          <div className="col-md-10 col-lg-12">
            <div className="shadow p-3 mb-5 bg-body rounded">
              <div className="table-responsive table-borderless shadow-2-strong rounded-4">
                <h3
                  style={{ fontFamily: "Onest, sans-serif", fontWeight: "700", color: "#0a97b0" }}
                  className="text-center"
                >
                  M3 AUTOCARE
                </h3>
                <p
                  style={{ fontFamily: "Onest, sans-serif", textTransform: "capitalize" }}
                  className="text-center"
                >
                  Here is your appointment details
                </p>
                <table style={{ marginTop: "2rem" }} className="table">
                  <thead>
                    <tr>
                      <th className="text-center"></th>
                      <th className={styles.tdhead}>Appointment Id</th>
                      <th className={styles.tdhead}>Car Name</th>
                      <th className={styles.tdhead}>Car No:</th>
                      <th className={styles.tdhead}>Location</th>
                      <th className={styles.tdhead}>Service</th>
                      <th className={styles.tdhead}>Status</th>
                      <th className={styles.tdhead}>Total Amount</th>
                      <th className={`${styles.tdhead} ${styles.date}`}>Appointment Date</th>
                      <th className={styles.tdhead}>Action</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {datas.map((item) => (
                      <tr className="cell-1" key={item.id}>
                        <td className="text-center"></td>
                        <td style={{ fontFamily: "Onest, sans-serif", fontSize: "14px" }}>
                          {item.Appointment_id}
                        </td>
                        <td
                          style={{
                            fontFamily: "Onest, sans-serif",
                            textTransform: "capitalize",
                            fontSize: "14px",
                          }}
                        >
                          {item.carName}
                        </td>
                        <td
                          style={{
                            fontFamily: "Onest, sans-serif",
                            textTransform: "uppercase",
                            fontSize: "14px",
                          }}
                        >
                          {item.CarNumber}
                        </td>
                        <td
                          style={{
                            fontFamily: "Onest, sans-serif",
                            textTransform: "uppercase",
                            fontSize: "14px",
                          }}
                        >
                          {item.location}
                        </td>
                        <td
                          style={{
                            fontFamily: "Onest, sans-serif",
                            textTransform: "capitalize",
                            fontSize: "14px",
                          }}
                        >
                          {getService.find((name) => name._id === item.service)?.name || ""}
                        </td>
                        <td style={{ fontFamily: "Onest, sans-serif" }}>
                          {item.status === "Received" && (
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
                              {item.status}
                            </span>
                          )}
                          {item.status === "Seeking Issue" && (
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
                              {item.status}
                            </span>
                          )}
                          {item.status === "Team on work" && (
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
                              {item.status}
                            </span>
                          )}
                          {item.status === "On progress" && (
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
                              {item.status}
                            </span>
                          )}
                          {item.status === "Checking all works" && (
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
                              {item.status}
                            </span>
                          )}
                          {item.status === "we are on last" && (
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
                              {item.status}
                            </span>
                          )}
                          {item.status === "Work Done" && (
                            <span
                              className="badge badge-success"
                              style={{
                                fontFamily: "Onest, sans-serif",
                                fontSize: "14px",
                                position: "relative",
                                bottom: "5px",
                              }}
                            >
                              {item.status}
                            </span>
                          )}
                          {item.status === "Cancelled" && (
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
                              {item.status}
                            </span>
                          )}
                        </td>
                        <td style={{ fontFamily: "Onest, sans-serif", fontSize: "14px" }}>
                          ₹{item.price}
                        </td>
                        <td style={{ fontFamily: "Onest, sans-serif", fontSize: "14px" }}>
                          {item.appointment_date}
                        </td>
                        <div className={styles.boxbtn}>
                          <button
                            onClick={() => handleClickOpen(item._id, item.Appointment_id)}
                            style={{ color: "#0a97b0", fontSize: "13px" }}
                            className={styles.viewbtn}
                          >
                            View
                          </button>

                          {item.status === "Received" || item.status === "Seeking Issue" ? (
                            success && (
                              <>
                                {getCancel.find((id) => id.id === item._id) ? (
                                  <button
                                    disabled
                                    style={{
                                      color: "orange",
                                      fontFamily: "Onest, sans-serif",
                                      fontSize: "13px",
                                      border: "none",
                                      marginLeft: "10px",
                                      backgroundColor: "transparent",
                                    }}
                                  >
                                    Requested for cancel
                                  </button>
                                ) : getCancel.find((rej) => rej.appointmentid === item._id) ? (
                                  <button
                                    disabled
                                    style={{
                                      color: "brown",
                                      fontFamily: "Onest, sans-serif",
                                      fontSize: "13px",
                                      border: "none",
                                      marginLeft: "10px",
                                      backgroundColor: "transparent",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Request Rejected
                                  </button>
                                ) : (
                                  <button
                                    style={{
                                      color: "orange",
                                      cursor: "pointer",
                                      fontSize: "13px",
                                      marginLeft: "10px",
                                    }}
                                    className={styles.viewbtn}
                                    onClick={() => handleClickOpens(item._id)}
                                  >
                                    Cancel Appointment
                                  </button>
                                )}
                              </>
                            )
                          ) : item.status === "Cancelled" ? (
                            <button
                              disabled
                              style={{ color: "red", fontSize: "13px", marginLeft: "10px" }}
                              className={styles.viewbtn}
                            >
                              Appointment cancelled
                            </button>
                          ) : item.status === "Work Done" ? (
                            <></>
                          ) : (
                            <button
                              disabled
                              style={{ color: "#ccc", fontSize: "13px" }}
                              className={styles.viewbtn}
                            >
                              Cancel Appointment
                            </button>
                          )}
                          {item.status === "Work Done" ? (
                            <button
                              style={{
                                color: "blue",
                                cursor: "pointer",
                                fontSize: "13px",
                                marginLeft: "55px",
                                position: "absolute",
                              }}
                              onClick={() => handleClickOpens2(item._id)}
                              className={styles.viewbtn}
                            >
                              Feedback
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end contact section */}
      {/* info section */}
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="md"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{
              color: "#0a97b0",
              display: "grid",
              placeItems: "center",
              fontFamily: "Onest, sans-serif",
            }}
          >
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
                  <span className={styles.deatils1}> {appdata.location}</span>
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
                        <div key={index}>
                          <span className={styles.deatils1} style={{ fontSize: "14px" }}>
                            {getDatas.find((techItem) => techItem._id === technician.technicianId)
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
                          </span>
                        </div>
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
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div></div>

      <div>
        <Dialog
          open={opens}
          onClose={handleCloses}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          TransitionComponent={Zoom}
          transitionDuration={400}
          fullWidth
          maxWidth={"sm"}
        >
          <DialogTitle id="alert-dialog-title" style={{ fontFamily: "Onest, sans-serif" }}>
            Appointment Cancellation
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{ fontSize: "14px", fontFamily: "Onest, sans-serif", color: "black" }}
              id="alert-dialog-description"
            >
              Are you sure want to cancel this Appointment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloses} color="error">
              No
            </Button>
            <Button onClick={cancelRequest} color="error">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <Dialog
        open={opens2}
        onClose={handleCloses2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Zoom}
        transitionDuration={400}
        fullWidth
        maxWidth={"sm"}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Ratings
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloses2}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {msgs && (
            <p
              style={{
                opacity: msgs ? 1 : 0,
                transition: "opacity 0.9s ease-in-out",
                fontSize: "13px",
                fontFamily: "Onest, sans-serif",
                color: "green",
              }}
            >
              {msgs}
            </p>
          )}
          <Typography gutterBottom style={{ fontSize: "15px", fontFamily: "Onest, sans-serif" }}>
            Give US Rating
          </Typography>
          <Typography gutterBottom style={{ fontSize: "15px", fontFamily: "Onest, sans-serif" }}>
            <div style={{ display: "flex" }}>
              {[1, 2, 3, 4, 5].map((index) => (
                <FontAwesomeIcon
                  key={index}
                  onClick={() => ratingStar(`${index} stars`)}
                  style={{ color: index <= parseInt(star[0]) ? "yellow" : "black" }}
                  icon={faStar}
                />
              ))}
            </div>
            <br />
            <div>
              <textarea
                placeholder="Type your opinion"
                onChange={(e) => setFeedback(e.target.value)}
                className={styles.texttareas}
              />
            </div>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloses2}>
            Close
          </Button>
          <Button autoFocus onClick={handleStar}>
            Done
          </Button>
        </DialogActions>
      </Dialog>

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
    </div>
  );
}

export default contact;

{
  /* <div>


</div> */
}
