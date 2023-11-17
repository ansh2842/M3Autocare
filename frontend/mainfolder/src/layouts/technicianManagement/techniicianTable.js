import React, { useCallback } from "react";
import "assets/userCss/styleTable.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

function techniicianTable() {
  const { id } = useParams();
  const [techiHist, setTechHist] = useState([]);
  const [getService, setGetService] = useState([]);
  const [getDataTech, setGetData] = useState({
    image: null,
    name: "",
    contact: "",
    email: "",
    specialised: "",
    description: "",
  });
  const [data, getDataApp] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(5);
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = techiHist.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const calculateSerialNumber = (currentIndex) => {
    return (currentPage - 1) * appointmentsPerPage + currentIndex + 1;
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(techiHist.length / appointmentsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
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

  useEffect(() => {
    getappData();
    getDatastech();
  }, [id]);

  const getappData = async () => {
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = token;

    try {
      const response = await axios.get("http://localhost:8000/admin/getDataSerivceFilter");
      const data = await response.data;
      console.log("anshasbhahd", data);
      getDataApp(data);
    } catch (err) {
      if (err.response.status === 400) {
        window.location.href = "/authentication/sign-in";
      }
      console.log(err);
    }
  };

  const getDatastech = useCallback(async () => {
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get(`http://localhost:8000/admin/getTechnicianforUpdate/${id}`);
      const data = response.data;
      setGetData({
        image: data.image,
        name: data.name,
        contact: data.contact,
        email: data.email,
        specialised: data.specialised,
        description: data.description,
      });
      console.log("aaaaaaaaaaa", data);

      const responses = await axios.get(`http://localhost:8000/admin/gettechbYids/${id}`);
      const datas = responses.data;

      setTechHist(datas);
      console.log("qqqqqqqqqqqqqqqq111", datas);
    } catch (err) {
      if (err.response.status === 400) {
        window.location.href = "/authentication/sign-in";
      } else if (err.response.status === 405) {
        setTechHist([err.response.data]);
      }
      console.log(err);
    }
  }, [id]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="content">
        <div className="container">
          <h2 className="head mb-5">Technician History</h2>
          <div className="table-responsive">
            <table className="table table-striped custom-table">
              <thead>
                <tr>
                  <th scope="col">Sl No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Contact / Email</th>
                  <th scope="col">Job Id</th>
                  <th scope="col">Service</th>
                  <th scope="col">Car Name</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Comments</th>
                </tr>
              </thead>
              <tbody>
                {techiHist && techiHist.length > 0 ? (
                  currentAppointments.map((item, index) => (
                    <tr key={index}>
                      <td>{calculateSerialNumber(index)}</td>
                      <td>{getDataTech.name}</td>
                      <td>
                        {getDataTech.contact}
                        <br />
                        {getDataTech.email}
                      </td>
                      <td>{item.jobId}</td>
                      <td>
                        {getService.find((servieName) => servieName._id === item.serviceId)?.name ||
                          "This technician doest have any services history"}
                      </td>
                      <td style={{ textTransform: "capitalize" }}>
                        {data.find(
                          (ServiceName) => ServiceName.Appointment_id === item.appointmentId
                        )?.carName || "This technician doest have any services history"}
                      </td>
                      <td>{item.startDate}</td>
                      <td>{item.endDate}</td>
                      <td style={{ textTransform: "capitalize", color: "green" }}>
                        {item.comment}
                      </td>
                    </tr>
                  ))
                ) : (
                  <span style={{ fontSize: "15px" }}>
                    {techiHist
                      ? "No Services History"
                      : "Error: Unable to fetch technician history."}
                  </span>
                )}
              </tbody>
            </table>
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
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default techniicianTable;
