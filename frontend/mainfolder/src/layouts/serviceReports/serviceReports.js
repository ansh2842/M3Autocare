import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "react-bootstrap/Table";
import styles from "assets/userCss/syles.module.css";
import axios from "axios";

function serviceReports() {
  const [data, getData] = useState([]);
  const [getService, setGetService] = useState([]);
  const [filter, setFIlter] = useState("");
  const [filterSearch, setFIlterSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(7);
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

  useEffect(() => {
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

    getSerive();
  }, []);

  useEffect(() => {
    getappData(filter, filterSearch);
  }, [filter, filterSearch]);

  const getappData = async (filter, filterSearch) => {
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = token;

    try {
      const response = await axios.get(
        `http://localhost:8000/admin/getFilterReport?service=${filter}&name=${filterSearch}`
      );
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

  const handleFilterChange = (e) => {
    const target = e.target.value;

    if (target === "All Services") {
      setFIlter(" ");
    } else {
      setFIlter(target);
    }
  };
  console.log(filter);

  const handleChange = (id) => {
    setFIlter(id === filter ? "" : id);
  };
  const handleUpdateServices = (e) => {
    setFIlterSearch(e.target.value);
  };
  console.log(filterSearch);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}></div>

      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftTypography variant="h6">Service Report table</SoftTypography>
      </SoftBox>
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
          onChange={handleFilterChange}
        >
          <option value="" onClick={() => handleChange("")} selected>
            All Services
          </option>

          {getService.map((items) => (
            <option onClick={() => handleChange(items._id)} value={items._id} key={items.id}>
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
            <th>Status</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments.map((item, index) => (
            <tr style={{ fontSize: "14px" }} key={index}>
              <td>{calculateSerialNumber(index)}</td>
              <td>{item.Appointment_id}</td>
              <td style={{textTransform:"capitalize"}}>
                {item.name}
                <br />
                {item.location}
              </td>
              <td>
                {item.email}
                <br />
                {item.contact}
              </td>
              <td>
                {getService.find((service) => service._id === item.service)?.name || ""} <br />
                {item.price}
              </td>
              <td style={{ textTransform: "capitalize" }}>
                {item.carName}
                <br />
                <span style={{ textTransform: "uppercase" }}>{item.CarNumber}</span>
              </td>
              <td style={{ textTransform: "capitalize" }}>{item.remarks}</td>
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
              <td>
                {item.rating}
                <br />
                <span style={{ textTransform: "capitalize" }}>{item.Feedback}</span>
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

export default serviceReports;
