import React, { useState, useEffect, useCallback } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "react-bootstrap/Table";
import Footer from "examples/Footer";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SoftInput from "components/SoftInput";
import Button from "@mui/material/Button";
import axios from "axios";
import styles from "assets/userCss/syles.module.css";
import { Zoom } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowsToDot,
  faCaretDown,
  faCaretRight,
  faDotCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const AppointmentManagement = () => {
  const [data, getData] = useState([]);
  const [getService, setGetService] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(5);
  const [techErr, setTechErr] = useState("");
  const [startDateErr, setStartDateErr] = useState("");
  const [endDateErr, setEndDateErr] = useState("");
  const [cmntErr, setCmntErr] = useState("");
  const [getDatas, setGetDatas] = useState([]);
  const [newstatus, setNewStatus] = useState("");
  const [techniName, setTechniName] = useState("");
  const [comments, setComment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [opens2, setOpens2] = useState(false);
  const [get, setGet] = useState(null);
  const [gets, setGets] = useState(null);
  const [getbyid, setByid] = useState(null);
  const [getTech, setTech] = useState(null);
  const [dltID, setDltId] = useState(null);
  const [getByidData, setGetByid] = useState([]);
  const [techId, settechId] = useState([]);
  const [filterData, setFilterData] = useState("");
  const [filterDataSearach, setFilterDataSearch] = useState("");
  const [message, setMessage] = useState("");

  const handleClickOpen = (Appointmentid, id) => {
    setOpen(true);
    setGet(Appointmentid);
    setGets(id);
  };
  const handleClickOpens2 = (deleteId) => {
    setOpens2(true);
    setDltId(deleteId);
  };

  const handleClose = () => {
    setOpen(false);
    setTechErr("");
    setStartDateErr("");
    setEndDateErr("");
    setCmntErr("");
  };
  const handleCloses2 = () => {
    setOpens2(false);
  };

  const handleOpen = (id, appId) => {
    setOpens(true);
    setByid(id);
    setTech(appId);
  };

  const handleCloses = () => {
    setOpens(false);
  };

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = data.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const calculateSerialNumber = (currentIndex) => {
    return (currentPage - 1) * appointmentsPerPage + currentIndex + 1;
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / appointmentsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleChangeService = (e) => {
    const selectedCategory = e.target.value;

    if (selectedCategory === "All Services") {
      setFilterData("");
    } else {
      setFilterData(selectedCategory);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const messageParam = queryParams.get("message");

    if (messageParam) {
      setMessage(messageParam);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }

    getDataTech();
    getSerive();
  }, []);

  const getSerive = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get("http://localhost:8000/admin/getService");
      const data = await response.data;
      setGetService(data);
    } catch (err) {
      if (err.response.status == "400") {
        window.location.href = "/authentication/sign-in";
      }
      console.log(err);
    }
  };

  const getDataApp = useCallback(async () => {
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get(`http://localhost:8000/admin/getdataapp/${getbyid}`);
      const data = await response.data;
      console.log(data);
      setGetByid(data);

      const responses = await axios.get(`http://localhost:8000/admin/getTechId/${getTech}`);
      console.log("eeeeeeee", responses.data);
      const datas = await responses.data;
      settechId(datas);
      console.log("Tech Data:", data);
    } catch (err) {
      if (err.response.status == "400") {
        window.location.href = "/authentication/sign-in";
      }
      console.log(err);
    }
  }, [getbyid, getTech]);

  useEffect(() => {
    getDataApp();
  }, [getDataApp]);

  const getDataTech = async () => {
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get("http://localhost:8000/admin/gettechnicians");
      const data = response.data;

      setGetDatas(data);
    } catch (err) {
      if (err.response.status == "400") {
        window.location.href = "/authentication/sign-in";
      }
      console.log(err);
    }
  };

  const hanldeUpdatesService = (id) => {
    setFilterData(id === filterData ? "" : id);
  };
  console.log("mmmmmmmm", filterData);

  useEffect(() => {
    getappData(filterData, filterDataSearach);
  }, [filterData, filterDataSearach]);

  const getappData = async (filterData) => {
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = token;

    try {
      const response = await axios.get(
        `http://localhost:8000/admin/getDataSerivceFilter?service=${filterData}&carname=${filterDataSearach}`
      );
      const data = await response.data;
      getData(data);
    } catch (err) {
      if (err.response.status == "400") {
        window.location.href = "/authentication/sign-in";
      }
      console.log(err);
    }
  };

  const handleChange = async (id) => {
    const data = {
      newstatus: newstatus,
    };

    try {
      await axios
        .put(`http://localhost:8000/user/updateStatus/${id}`, data)
        .then((res) => {
          alert("status updated");
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleTechUpdates = async () => {
    if (techniName.length < 1) {
      setTechErr("Choose a Technician");
    } else {
      setTechErr("");
    }
    if (startDate.length < 1) {
      setStartDateErr("Choose a start date");
    } else {
      setStartDateErr("");
    }
    if (endDate.length < 1) {
      setEndDateErr("Choose a end date");
    } else {
      setEndDateErr("");
    }
    if (comments.length < 1) {
      setCmntErr("Enter a comment");
    } else {
      setCmntErr("");
    }

    if (techniName !== "" && startDate !== "" && endDate !== "" && comments !== "") {
      const data = {
        technicianId: techniName,
        Appointmentid: gets,
        serviceid: get,
        startDate: startDate,
        endDate: endDate,
        comment: comments,
      };
      console.log(data);
      try {
        await axios
          .post("http://localhost:8000/admin/puttechanddate", data)
          .then((res) => {
            console.log(res.data);
            setOpen(false);
            window.location.href = "/appoinmentmgt?message=Technician%20Added%20Succesfully";
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handledeleted = async () => {
    handleCloses2(false);
    if (dltID) {
      window.location.href = "/appoinmentmgt?message=Technician%20Deleted%20successfully";

      try {
        await axios.delete(`http://localhost:8000/admin/deleteTechByid/${dltID}`);

        console.log("Item deleted successfully.");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleUpdateServices = (e) => {
    const selectedServices = e.target.value;
    setFilterDataSearch(selectedServices);
  };
  console.log(filterDataSearach);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}></div>

      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftTypography variant="h6">Appoinment table</SoftTypography>
      </SoftBox>
      <SoftTypography
        style={{
          opacity: message ? 1 : 0,
          transition: "opacity 0.9s ease-in-out",
          fontSize: "13px",
        }}
        variant="h6"
        color="success"
      >
        {message && decodeURIComponent(message)}
      </SoftTypography>
      <div
        style={{
          marginBottom: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <select
          id="subCategory"
          style={{ marginLeft: "10px", fontSize: "14px", width: "12rem" }}
          onChange={handleChangeService}
        >
          <option value="" onClick={() => hanldeUpdatesService("")} selected>
            All Services
          </option>

          {getService.map((items) => (
            <option
              onClick={() => hanldeUpdatesService(items._id)}
              value={items._id}
              key={items.id}
            >
              {items.name}
            </option>
          ))}
        </select>
        <input
          onChange={handleUpdateServices}
          type="text"
          placeholder="Search by name or car name..."
          className={styles.serchBoxx}
        />
      </div>
      <Table className="shadow p-3 mb-5 bg-body rounded" striped="columns">
        <thead>
          <tr style={{ fontSize: "16px" }}>
            <th>Sl.no</th>
            <th>Appointment ID</th>
            <th>
              Name /<br />
              Location
            </th>
            <th>
              Email /<br />
              Contact
            </th>
            <th>
              Service / <br />
              Price
            </th>
            <th>
              Car Name /<br />
              Car Number
            </th>
            <th>Remarks</th>
            <th>
              Status /<br />
              Action
            </th>
            <th>View</th>
            <th>Work Assign</th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments.map((item, index) => (
            <tr style={{ fontSize: "14px" }} key={index}>
              <td>{calculateSerialNumber(index)}</td>
              <td>{item.Appointment_id}</td>
              <td>
                {item.name} <br />
                {item.location}
              </td>
              <td>
                {item.email}
                <br />
                {item.contact}
              </td>
              <td style={{ textTransform: "capitalize" }}>
                {getService.find((servieName) => servieName._id === item.service)?.name || ""}
                <br />
                {item.price}
              </td>
              <td style={{ textTransform: "capitalize" }}>
                {item.carName}
                <br />
                <span style={{ textTransform: "uppercase" }}>{item.CarNumber}</span>
              </td>
              <td style={{ textTransform: "capitalize" }}>{item.remarks}</td>
              <td>
                <select
                  disabled={item.status === "Cancelled"}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value={item.status}>{item.status}</option>
                  <option>Received</option>
                  <option>Seeking Issue</option>
                  <option>Team on work</option>
                  <option>On progress</option>
                  <option>Checking all works</option>
                  <option>we are on last</option>
                  <option>Work Done</option>
                  <option>Cancelled</option>
                </select>
                <br />
                <SoftButton
                  onClick={() => handleChange(item.Appointment_id)}
                  variant="text"
                  color="info"
                  fontWeight="medium"
                  disabled={item.status === "Cancelled"}
                >
                  Done
                </SoftButton>
              </td>
              <td>
                <SoftButton
                  onClick={() => handleOpen(item._id, item.Appointment_id)}
                  variant="text"
                  color="info"
                  fontWeight="medium"
                  disabled={item.status === "Cancelled"}
                >
                  View
                </SoftButton>
              </td>
              <td>
                <SoftButton
                  onClick={() => handleClickOpen(item.service, item.Appointment_id)}
                  variant="text"
                  color="info"
                  fontWeight="medium"
                  disabled={item.status === "Cancelled"}
                >
                  Add Technicians
                </SoftButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <nav>
          <ul className="pagination">
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <button onClick={() => paginate(number)} className="page-link">
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div>
        <Dialog
          TransitionComponent={Zoom}
          transitionDuration={400}
          open={open}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Add Technicians</DialogTitle>
          <DialogContent>
            <DialogContentText>Add Technicians</DialogContentText>

            <SoftBox mb={2}>
              <select
                style={{ fontSize: "16px" }}
                onChange={(e) => setTechniName(e.target.value)}
                type="text"
                placeholder="Select Technicians"
              >
                <option disabled selected value="Choose Technicians">
                  Choose Technicians
                </option>
                {getDatas.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <p style={{ color: "red", fontSize: "11px" }}>{techErr}</p>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Start Date"
                type="datetime-local"
              />
              <p style={{ color: "red", fontSize: "11px" }}>{startDateErr}</p>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="End Date"
                type="datetime-local"
              />
              <p style={{ color: "red", fontSize: "11px" }}>{endDateErr}</p>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comments"
                type="text"
              />
              <p style={{ color: "red", fontSize: "11px" }}>{cmntErr}</p>
            </SoftBox>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleTechUpdates} color="error">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Dialog
        open={opens}
        onClose={handleCloses}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">{"Appointment Details"}</DialogTitle>

        <DialogContent>
          <div style={{ display: "flex", gap: "50px" }}>
            <div>
              <DialogContentText className={styles.dialogpop}>
                <span className={styles.dialogpop}>Appointment ID:</span>
                <span
                  className={styles.deatils}
                  style={{ textTransform: "lowercase", fontSize: "15px" }}
                >
                  {getByidData.Appointment_id}
                </span>
              </DialogContentText>
              <DialogContentText className={styles.dialogpop}>
                <span className={styles.dialogpop}>User ID:</span>
                <span
                  className={styles.deatils}
                  style={{ textTransform: "lowercase", fontSize: "15px" }}
                >
                  {getByidData.Userid}
                </span>
              </DialogContentText>
              <DialogContentText>
                <span className={styles.dialogpop}>Name:</span>
                <span className={styles.deatils1}>{getByidData.name}</span>
              </DialogContentText>
              <DialogContentText>
                <span className={styles.dialogpop}>Contact:</span>
                <span className={styles.deatils1}>{getByidData.contact}</span>
              </DialogContentText>
              <DialogContentText>
                <span className={styles.dialogpop}>Car Name:</span>
                <span className={styles.deatils1} style={{ textTransform: "capitalize" }}>
                  {getByidData.carName}
                </span>
              </DialogContentText>
              <DialogContentText>
                <span className={styles.dialogpop}>Service:</span>
                <span className={styles.deatils1}>{getByidData.service}</span>
              </DialogContentText>
              <DialogContentText>
                {getByidData.status === "Received" && (
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
                      {getByidData.status}
                    </span>
                  </div>
                )}
                {getByidData.status === "Seeking Issue" && (
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
                      {getByidData.status}
                    </span>
                  </div>
                )}
                {getByidData.status === "Team on work" && (
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
                      {getByidData.status}
                    </span>
                  </div>
                )}
                {getByidData.status === "On progress" && (
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
                      {getByidData.status}
                    </span>
                  </div>
                )}
                {getByidData.status === "Checking all works" && (
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
                      {getByidData.status}
                    </span>
                  </div>
                )}
                {getByidData.status === "we are on last" && (
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
                      {getByidData.status}
                    </span>
                  </div>
                )}
                {getByidData.status === "Work Done" && (
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
                      {getByidData.status}
                    </span>
                  </div>
                )}
              </DialogContentText>
              <DialogContentText>
                <span className={styles.dialogpop}>Remarks:</span>
                <span style={{ textTransform: "capitalize" }} className={styles.deatils1}>
                  {getByidData.remarks}
                </span>
              </DialogContentText>
              <DialogContentText>
                  <span className={styles.dialogpop}>Feedback & Ratings:</span>
                  <span
                    style={{ textTransform: "capitalize", fontSize: "14px" }}
                    className={styles.deatils1}
                  >
                    {getByidData.rating}
                    <br />
                    {getByidData.Feedback}
                  </span>
                </DialogContentText>
            </div>

            <div>
              <DialogContentText className={styles.dialogpop}>
                <span className={styles.dialogpop}>Appointment Date:</span>
                <span className={styles.deatils} style={{ fontSize: "15px" }}>
                  {getByidData.appointment_date}
                </span>
              </DialogContentText>
              <DialogContentText>
                <span className={styles.dialogpop}>Email:</span>
                <span className={styles.deatils1}>{getByidData.email}</span>
              </DialogContentText>
              <DialogContentText>
                <span className={styles.dialogpop}>Location:</span>
                <span className={styles.deatils1} style={{ textTransform: "capitalize" }}>
                  {getByidData.location}
                </span>
              </DialogContentText>
              <DialogContentText>
                <span className={styles.dialogpop}>Car Number:</span>
                <span className={styles.deatils1} style={{ textTransform: "uppercase" }}>
                  {getByidData.CarNumber}{" "}
                </span>
              </DialogContentText>

              <DialogContentText>
                <span className={styles.dialogpop}>Price:</span>
                <span className={styles.deatils1}>₹{getByidData.price}/-</span>
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
                          -({technician.startDate} to {technician.endDate}){" "}
                          <FontAwesomeIcon
                            onClick={() => handleClickOpens2(technician._id)}
                            style={{ color: "#344767", cursor: "pointer", fontSize: "14px" }}
                            icon={faTrash}
                          />
                          <br />
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
                      </div>
                    ))
                  ) : (
                    <span style={{ fontSize: "15px" }}>No Technicians Assigned</span>
                  )}
                </div>
              </DialogContentText>
              <DialogContentText></DialogContentText>
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloses}>Close</Button>
        </DialogActions>
      </Dialog>

      <div>
        <Dialog
          open={opens2}
          onClose={handleCloses2}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          TransitionComponent={Zoom}
          transitionDuration={400}
        >
          <DialogTitle id="alert-dialog-title">Delete Product</DialogTitle>
          <DialogContent>
            <DialogContentText style={{ fontSize: "14px" }} id="alert-dialog-description">
              Are you sure you want to delete this Technician?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloses2} color="error">
              Cancel
            </Button>
            <Button onClick={handledeleted} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentManagement;
