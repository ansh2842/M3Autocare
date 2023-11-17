import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SoftInput from "components/SoftInput";
import Button from "@mui/material/Button";
import axios from "axios";
import Footer from "examples/Footer";
import { Zoom } from "@mui/material";

const serviceManagement = () => {
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [img, setImag] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mrp, setMrp] = useState("");
  const [price, setPrice] = useState("");
  const [getData, setGetData] = useState([]);
  const [getServices, setServices] = useState("");
  const [imgError, setImageError] = useState([]);
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [mrpError, setMrpErrorr] = useState("");
  const [priceError, setPriceError] = useState("");
  const [message, setMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(5);
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = getData.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const calculateSerialNumber = (currentIndex) => {
    return (currentPage - 1) * appointmentsPerPage + currentIndex + 1;
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(getData.length / appointmentsPerPage); i++) {
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
  };

  const handleClickOpens = (_id) => {
    setOpens(true);
    setDeleteId(_id);
  };

  const handleCloses = () => {
    setOpens(false);
  };

  const handleAdd = async () => {
    if (img.length < 1) {
      setImageError("image is required");
    } else {
      setImageError("");
    }
    if (name.length < 1) {
      setNameError("name is required");
    } else {
      setNameError("");
    }
    if (description.length < 1) {
      setDescriptionError("description is required");
    } else {
      setDescriptionError("");
    }
    if (mrp.length < 1) {
      setMrpErrorr("mrp is required");
    } else {
      setMrpErrorr("");
    }
    if (price.length < 1) {
      setPriceError("price is required");
    } else {
      setPriceError("");
      const formData = new FormData();

      for (let i = 0; i < img.length; i++) {
        formData.append("image", img[i]);
      }
      formData.append("name", name);
      formData.append("description", description);
      formData.append("mrp", mrp);
      formData.append("price", price);

      try {
        const response = await axios.post("http://localhost:8000/admin/servicePost", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data);
        window.location.href = "/service?message=Service%20Added%20successfully";
        setOpen(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getSerive();
  }, []);

  const getSerive = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get("http://localhost:8000/admin/getService");
      const data = await response.data;
      setGetData(data);
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
      window.location.href = "/service?message=Service%20Deleted%20successfully";
      try {
        await axios.delete(`http://localhost:8000/admin/serviceDelete/${deleteId}`);
        setProduct((prevList) => prevList.filter((item) => item.id !== deleteId));
        setDeleteId(null);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const ChangeService = (e) => {
    setServices(e.target.value);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <SoftButton onClick={handleClickOpen} variant="gradient" color="dark">
          Add Services
        </SoftButton>
      </div>

      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftTypography variant="h6">Service table</SoftTypography>
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
      <div style={{ marginBottom: "20px", width: "10rem" }}>
        <label style={{ fontSize: "13px" }}>Filter by Sub-Category: </label>

        <select
          id="subCategory"
          onChange={ChangeService}
          value={getServices}
          style={{ marginLeft: "10px", fontSize: "14px" }}
        >
          <option value="">All Services</option>

          {getData.map((items) => (
            <option key={items.id}>{items.name}</option>
          ))}
        </select>
      </div>
      <Table className="shadow p-3 mb-5 bg-body rounded" striped="columns">
        <thead>
          <tr style={{ fontSize: "16px" }}>
            <th>sl.no</th>
            <th>Service Image</th>
            <th>Service Name</th>
            <th>Description</th>
            <th>MRP</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments
            .filter((item) => !getServices || item.name === getServices)
            .map((items, index) => (
              <tr style={{ fontSize: "14px" }} key={index}>
                <td>{calculateSerialNumber(index)}</td>
                <td>
                  <img
                    style={{ width: "40px" }}
                    src={`http://localhost:8000/${items.image[0]}`}
                    alt=""
                  ></img>
                </td>
                <td>{items.name}</td>
                <td>{items.description}</td>
                <td style={{ textDecoration: "line-through" }}>{items.mrp}</td>
                <td>{items.price}</td>
                <td>
                  <Link to={`/ServiceEdit/${items._id}`}>
                    <SoftButton variant="text" color="info" fontWeight="medium">
                      Edit
                    </SoftButton>
                  </Link>
                </td>
                <td>
                  {" "}
                  <SoftButton
                    onClick={() => handleClickOpens(items._id)}
                    variant="text"
                    color="error"
                    fontWeight="medium"
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
          <DialogTitle>Add Services</DialogTitle>
          <DialogContent>
            <DialogContentText>Service details</DialogContentText>
            <SoftBox mb={2}>
              <input
                multiple
                onChange={(e) => setImag(e.target.files)}
                accept="jpeg,jpg,png"
                type="file"
              />
            </SoftBox>
            <p style={{ color: "red", fontSize: "11px" }}>{imgError}</p>
            <SoftBox mb={2}>
              <SoftInput
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Service Name"
              />
            </SoftBox>
            <p style={{ color: "red", fontSize: "11px" }}>{nameError}</p>

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
                placeholder="Description"
                type="text"
              />
            </SoftBox>
            <p style={{ color: "red", fontSize: "11px" }}>{descriptionError}</p>

            <SoftBox mb={2}>
              <SoftInput
                style={{ textDecoration: "line-through" }}
                onChange={(e) => setMrp(e.target.value)}
                placeholder="Mrp"
                type="number"
              />
            </SoftBox>
            <p style={{ color: "red", fontSize: "11px" }}>{mrpError}</p>
            <SoftBox mb={2}>
              <SoftInput
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                type="number"
              />
            </SoftBox>
            <p style={{ color: "red", fontSize: "11px" }}>{priceError}</p>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleAdd} color="error">
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
              Are you sure you want to delete this Service?
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

export default serviceManagement;
