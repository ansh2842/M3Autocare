import { useEffect, useState, useCallback } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { useParams } from "react-router-dom";
import curved6 from "assets/images/curved-images/curved14.jpg";
import axios from "axios";

const subCategoryedit = () => {
  const { id } = useParams();

  const [titleError, setTitleError] = useState("");
  const [Category, setCategory] = useState([]);
  const [categoryData, setCategoryData] = useState({
    images: null,
    Title: "",
    brandname: "",
  });

  const getCategory = useCallback(async () => {
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get(`http://localhost:8000/admin/getsubCategoryById/${id}`);
      const data = response.data;
      setCategoryData({
        images: data.image,
        Title: data.Title,
        brandname: data.brandname,
      });
    } catch (err) {
      if (err.response.status == "400") {
        window.location.href = "/authentication/sign-in";
      }
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      setCategoryData({ ...categoryData, images: file });
    } else if (name === "brandname") {
      const selectedCategory = Category.find((category) => category._id === value);
      setCategoryData({ ...categoryData, brandname: selectedCategory });
    } else {
      setCategoryData({ ...categoryData, [name]: value });
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();

    formData.append("image", categoryData.images);
    formData.append("Title", categoryData.Title);
    formData.append("brandname", categoryData.brandname);

    console.log(categoryData.images);
    if (!categoryData.Title) {
      setTitleError("Title is required");
    } else {
      setTitleError("");
      try {
        await axios.put(`http://localhost:8000/admin/getSubUpdateCategory/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Update successful!");
        window.location.href = `/SubCategory?message=sub%20Category%20updated%20successfully`;
      } catch (error) {
        console.error("Error updating category:", error);
      }
    }
  };

  useEffect(() => {
    getCategorys();
  }, []);

  const getCategorys = async () => {
    await axios
      .get("http://localhost:8000/admin/getCategory")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <BasicLayout title="Update" image={curved6}>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Update Category
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>{/* ... */}</SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput
                accept="image/*"
                onChange={handleChange}
                type="file"
                name="image"
                placeholder="Name"
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                value={categoryData.Title}
                onChange={handleChange}
                name="Title"
                type="text"
                placeholder="Title"
              />
            </SoftBox>
            <p style={{ color: "red", fontSize: "11px" }}>{titleError}</p>
            <SoftBox display="flex" alignItems="center">
              {/* ... */}
            </SoftBox>
            <SoftBox mb={2}>
              <select
                value={categoryData.brandname ? categoryData.brandname : ""}
                onChange={(e) => setCategoryData({ ...categoryData, brandname: e.target.value })}
                // onChange={(e) => handleChange(e)}
                name="brandname"
                style={{ fontSize: "14px" }}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {Category.map((items) => (
                  <option key={items._id} value={items._id}>
                    {items.Title}
                  </option>
                ))}
              </select>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton onClick={handleUpdate} variant="gradient" color="dark" fullWidth>
                Update Category
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
};

export default subCategoryedit;
