import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Table from "react-bootstrap/Table";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SoftInput from "components/SoftInput";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "examples/Footer";
import { Zoom } from "@mui/material";

const technicianManagement = () => {
  const [opens, setOpens] = React.useState(false);
  const [deleteId, setDeleteId] = useState(null);
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
    getData();
  }, []);

  const handleClickOpens = (_id) => {
    setOpens(true);
    setDeleteId(_id);
  };

  const handleCloses = () => {
    setOpens(false);
  };

  const getData = async () => {
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get("http://localhost:8000/user/getuser");
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
      window.location.href = "/user?message=User%20Deleted%20successfully";

      try {
        await axios.delete(`http://localhost:8000/user/deleteuser/${deleteId}`);
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
      <Table className="shadow p-3 mb-5 bg-body rounded" striped="columns">
        <thead>
          <tr style={{ fontSize: "16px" }}>
            <th>Sl.no</th>
            <th>User Profile</th>
            <th>Name</th>
            <th>User Name</th>
            <th>User Contact</th>
            <th>User Location</th>

            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments.map((item, index) => (
            <tr style={{ fontSize: "14px" }} key={index}>
              <td>{calculateSerialNumber(index)}</td>
              <td>
                <img style={{ width: "40px" }} src={`${item.image}`} />
              </td>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>
                {item.contact}
                <br />
                {item.email}
              </td>
              <td>{item.location}</td>

              <td>
                <Link>
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
