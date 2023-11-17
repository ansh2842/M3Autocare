import { useEffect, useState, useCallback } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import curved6 from "assets/images/curved-images/curved14.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";

function SignUp() {
  const { id } = useParams();
  const [invalid, setInvalid] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactError, setContactError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const editData = useCallback(async () => {
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get(`http://localhost:8000/admin/getListById/${id}`);
      const data = response.data;
      setAdminData({
        name: data.name,
        email: data.email,
        contact: data.contact,
        password: data.password,
      });

      console.log(data);
    } catch (err) {
      if (err.response.status == "400") {
        window.location.href = "/authentication/sign-in";
      }
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    editData();
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact" && value.length <= 10) {
      setAdminData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name !== "contact") {
      setAdminData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleUpdate = async () => {
    if (adminData.name.length < 1) {
      setNameError("Enter the name");
    } else {
      setNameError("");
    }
    if (adminData.email.length < 1) {
      setEmailError("Enter the email");
    } else {
      setEmailError("");
    }
    if (adminData.contact.length < 1) {
      setContactError("Enter the contact");
    } else {
      setContactError("");
    }
    if (adminData.password.length < 1) {
      setPasswordError("Enter the password");
    } else {
      setPasswordError("");
    }
    if (
      adminData.name !== "" &&
      adminData.email !== "" &&
      adminData.contact !== "" &&
      adminData.password !== ""
    ) {
      try {
        const response = await axios.put(`http://localhost:8000/admin/getUpdateByid/${id}`, {
          name: adminData.name,
          email: adminData.email,
          contact: adminData.contact,
          password: adminData.password,
        });
        console.log(response);
        setInvalid("");
        window.location.href = "/user?message=User%20updated%20successfully";
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 400) {
          setInvalid("Email already used");
        }
        return;
      }
    }
  };

  return (
    <BasicLayout title="Update" image={curved6}>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Change Data
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}></SoftBox>

        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput
                value={adminData.name}
                onChange={handleChange}
                name="name"
                placeholder="Name"
              />
            </SoftBox>
            <p style={{ marginTop: "-16px", color: "red", fontSize: "11px" }}>{nameError}</p>
            <SoftBox mb={2}>
              <SoftInput
                value={adminData.email}
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Email"
              />
            </SoftBox>
            <p style={{ marginTop: "-16px", color: "red", fontSize: "11px" }}>{emailError}</p>
            {invalid && (
              <p style={{ marginTop: "-16px", color: "red", fontSize: "11px" }}>{invalid}</p>
            )}
            <SoftBox mb={2}>
              <SoftInput
                value={adminData.contact}
                onChange={handleChange}
                name="contact"
                type="number"
                placeholder="Contact"
              />
            </SoftBox>
            <SoftTypography>
              <p style={{ marginTop: "-16px", color: "red", fontSize: "11px" }}>{contactError}</p>
            </SoftTypography>

            <SoftBox mb={2}>
              <SoftInput
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
              />
            </SoftBox>
            <p style={{ marginTop: "-16px", color: "red", fontSize: "11px" }}>{passwordError}</p>
            <SoftBox display="flex" alignItems="center"></SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton onClick={handleUpdate} variant="gradient" color="dark" fullWidth>
                Update
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
