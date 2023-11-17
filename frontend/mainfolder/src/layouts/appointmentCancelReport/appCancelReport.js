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
import axios from "axios";
import { Zoom } from "@mui/material";

function appCancelReport() {
  const [getCancel, setGetCancel] = useState([]);
  const [data, getData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(10);
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = getCancel.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const calculateSerialNumber = (currentIndex) => {
    return (currentPage - 1) * appointmentsPerPage + currentIndex + 1;
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(getCancel.length / appointmentsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwtToken");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get("http://localhost:8000/user/getappointReport");
        const data = await response.data;

        setGetCancel(data);
      } catch (err) {
        if (err.response.status == "400") {
          window.location.href = "/authentication/sign-in";
        }
        console.log(err);
      }
    };
    fetchData();
    getappData();
  }, []);

  const getappData = async () => {
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = token;

    try {
      const response = await axios.get("http://localhost:8000/admin/getdataappData");
      const data = await response.data;
      getData(data);
      console.log(data);
    } catch (err) {
      if (err.response.status == "400") {
        window.location.href = "/authentication/sign-in";
      }
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftTypography variant="h6">Appointment Cancel Report table</SoftTypography>
      </SoftBox>

      <Table className="shadow p-3 mb-5 bg-body rounded" striped="columns">
        <thead>
          <tr style={{ fontSize: "16px" }}>
            <th>Sl.no</th>
            <th>Appointment_id</th>
            <th>Appointment Date</th>
            <th>Car Name</th>
            <th>Car Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments.map((item, index) => (
            <tr style={{ fontSize: "14px" }} key={index}>
              <td>{calculateSerialNumber(index)}</td>
              <td>
                {
                  data.find((name) => name._id === item.id || name._id === item.appointmentid)
                    ?.Appointment_id
                }
              </td>
              <td>
                {
                  data.find((name) => name._id === item.id || name._id === item.appointmentid)
                    ?.appointment_date
                }
              </td>
              <td style={{ textTransform: "uppercase" }}>
                {
                  data.find((name) => name._id === item.id || name._id === item.appointmentid)
                    ?.carName
                }
              </td>
              <td style={{ textTransform: "uppercase" }}>
                {
                  data.find((name) => name._id === item.id || name._id === item.appointmentid)
                    ?.CarNumber
                }
              </td>

              <td>
                {item.cancel === "Cancelled" ? (
                  <button
                    disabled
                    style={{
                      border: "none",
                      fontSize: "14px",
                      backgroundColor: "transparent",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    Cancelled
                  </button>
                ) : item.reject === "Rejected" ? (
                  <button
                    disabled
                    style={{
                      border: "none",
                      fontSize: "14px",
                      backgroundColor: "transparent",
                      color: "brown",
                      fontWeight: "bold",
                    }}
                  >
                    Rejected
                  </button>
                ) : (
                  <></>
                )}
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
    </DashboardLayout>
  );
}

export default appCancelReport;
