import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Table from "react-bootstrap/Table";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SoftInput from "components/SoftInput";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "assets/userCss/syles.module.css";
import Footer from "examples/Footer";
import { Zoom } from "@mui/material";
import { useCallback } from "react";

const technicianManagement = () => {
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [opens1, setOpens1] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [techGet, setTechGet] = useState(null);
  const [techGetHist, setTechGetHist] = useState(null);
  const [invalid, setInvalid] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [specialised, setSpecialised] = useState("");
  const [description, setDescription] = useState("");
  const [imageError, setImageError] = useState("");
  const [nameError, setNameError] = useState("");
  const [contactError, setContactError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [specialisedError, setSpecialisedError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [getDatas, setGetDatas] = useState([]);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(5);
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = getDatas.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const calculateSerialNumber = (currentIndex) => {
    return (currentPage - 1) * appointmentsPerPage + currentIndex + 1;
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(getDatas.length / appointmentsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const messageParams = queryParams.get("message");
    if (messageParams) {
      setMessage(messageParams);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImageError("");
    setNameError("");
    setContactError("");
    setEmailError("");
    setSpecialisedError("");
    setDescriptionError("");
  };

  const handleClickOpens = (_id) => {
    setOpens(true);
    setDeleteId(_id);
  };

  const handleCloses = () => {
    setOpens(false);
  };

  const handleAdd = async () => {
    if (image.length < 1) {
      setImageError("image required");
    } else {
      setImageError("");
    }
    if (name.length < 1) {
      setNameError("name required");
    } else {
      setNameError("");
    }
    if (contact.length < 1) {
      setContactError("contact required");
    } else {
      setContactError("");
    }
    if (email.length < 1) {
      setEmailError("email required");
    } else {
      setEmailError("");
    }
    if (specialised.length < 1) {
      setSpecialisedError("specialised required");
    } else {
      setSpecialisedError("");
    }
    if (description.length < 1) {
      setDescriptionError("description required");
    } else {
      setDescriptionError("");
    }

    if (
      image !== "" &&
      name !== "" &&
      contact !== "" &&
      email !== "" &&
      specialised !== "" &&
      description !== ""
    ) {
      const formData = new FormData();
      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }

      formData.append("name", name);
      formData.append("contact", contact);
      formData.append("email", email);
      formData.append("specialised", specialised);
      formData.append("description", description);

      const token = localStorage.getItem("jwtToken");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        await axios
          .post("http://localhost:8000/admin/technicianpost", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            setInvalid("");
            setOpen(false);
            window.location.href = "/Technician?message=Technician%20Added%20successfully";
            console.log(res.data);
          })
          .catch((err) => {
            if (err.response && err.response.status === 400) {
              setInvalid("Email already used");
            }
            console.log(err);
          });
      } catch (err) {
        if (err.response.status == "400") {
          window.location.href = "/authentication/sign-in";
        }

        console.log(err);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
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

  const handleDelete = async () => {
    handleCloses();
    if (deleteId) {
      window.location.href = "/Technician?message=Technician%20Deleted%20successfully";

      try {
        await axios.delete(`http://localhost:8000/admin/deletetechnician/${deleteId}`);
        setGetDatas((prevData) => prevData.filter((item) => item.id !== deleteId));

        setDeleteId(null);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <SoftButton onClick={handleClickOpen} variant="gradient" color="dark">
          Add Technician
        </SoftButton>
      </div>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftTypography variant="h6">Technician table</SoftTypography>
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
      {/* <div style={{ marginBottom: '20px',width:'10rem'  }}>
        <label style={{fontSize:'13px'}}>Filter by Sub-Category: </label>
        <select
          id="subCategory"
         
          style={{ marginLeft: '10px', fontSize: '14px'}}
        >
          <option value="">All Products</option>
         
            <option  >
            ghj
            </option>
        
        </select>
      </div> */}
      <Table className="shadow p-3 mb-5 bg-body rounded" striped="columns">
        <thead>
          <tr style={{ fontSize: "16px" }}>
            <th>Sl.no</th>
            <th>Technician Profile</th>
            <th>Technician Name</th>
            <th>Technician Contact</th>
            <th>Technician Specialised</th>
            <th>Technician Description</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments.map((item, index) => (
            <tr style={{ fontSize: "14px" }} key={index}>
              <td>{calculateSerialNumber(index)}</td>
              <td>
                <img style={{ width: "40px" }} src={`http://localhost:8000/${item.image[0]}`} />
              </td>
              <td>{item.name}</td>
              <td>
                {item.contact}
                <br />
                {item.email}
              </td>
              <td>{item.specialised}</td>
              <td>{item.description}</td>
              <td>
                <Link to={`/TechniicianTable/${item._id}`}>
                  <SoftButton variant="text" color="info" fontWeight="medium">
                    View
                  </SoftButton>
                </Link>
              </td>
              <td>
                <Link to={`/TechnicianEdit/${item._id}`}>
                  <SoftButton variant="text" color="info" fontWeight="medium">
                    Edit
                  </SoftButton>
                </Link>
              </td>
              <td>
                <SoftButton
                  onClick={() => handleClickOpens(item._id)}
                  variant="text"
                  fontWeight="medium"
                  color="error"
                >
                  Delete
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
          onClose={handleClose}
        >
          <DialogTitle>Add Technician</DialogTitle>
          <DialogContent>
            <DialogContentText>Technician details</DialogContentText>
            <SoftBox mb={2}>
              <input
                multiple
                onChange={(e) => setImage(e.target.files)}
                accept="jpeg,jpg,png"
                type="file"
              />
            </SoftBox>
            <p style={{ color: "red", fontSize: "11px" }}>{imageError}</p>
            <SoftBox mb={2}>
              <SoftInput
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Technician Name"
              />
            </SoftBox>
            <p style={{ color: "red", fontSize: "11px" }}>{nameError}</p>
            <SoftBox mb={2}>
              <SoftInput
                onChange={(e) => setContact(e.target.value)}
                placeholder="Technician Contact"
                type="number"
              />
            </SoftBox>
            <p style={{ color: "red", fontSize: "11px" }}>{contactError}</p>
            <SoftBox mb={2}>
              <SoftInput
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Technician Email"
                type="text"
              />
              {invalid && <p style={{ marginTop: 0, color: "red", fontSize: "11px" }}>{invalid}</p>}
            </SoftBox>
            <p style={{ color: "red", fontSize: "11px" }}>{emailError}</p>
            <SoftBox mb={2}>
              <SoftInput
                onChange={(e) => setSpecialised(e.target.value)}
                placeholder="Technician Specialised"
                type="text"
              />
            </SoftBox>
            <p style={{ color: "red", fontSize: "11px" }}>{specialisedError}</p>
            <SoftBox mb={2}>
              <textarea
                style={{
                  width: "100%",
                  borderRadius: "7px",
                  fontSize: "14px",
                  paddingLeft: "4px",
                  outline: "none",
                }}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Technician Description"
                type="text"
              />
            </SoftBox>
            <p style={{ color: "red", fontSize: "11px" }}>{descriptionError}</p>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="error" onClick={handleAdd}>
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={opens}
          onClose={handleCloses}
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
            <Button onClick={handleCloses} color="error">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default technicianManagement;
