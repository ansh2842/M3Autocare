import { useEffect, useState, useCallback } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { useParams } from "react-router-dom";
import curved6 from "assets/images/curved-images/curved14.jpg";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

const subCategoryedit = () => {
  const { id } = useParams();

  const [titleError, setTitleError] = useState("");
  const [AboutData, setAboutData] = useState({
    image: null,
    about: "",
    head: "",
    value: "",
    mission: "",
    valuedata: "",
    missiondata: "",
    choose: "",
    journey: "",
    choosedata: "",
    journeydata: "",
  });

  const config = {
    init: () => {
      (selector = "Editor"),
        (plugins = "lists"),
        (toolbar = config.toolbar),
        (menu = { tools: { title: "Tools", items: "listprops" } });
    },
    toolbar: "bullist numlist | undo redo",
  };
  function myCustomOnChangeHandler(inst) {
    alert("Some one modified something");
    alert("The HTML is now:" + inst.getBody().innerHTML);
  }
  tinymce.init({
    selector: "textarea#content_about",
    plugins: "lists",
    toolbar: config.toolbar,
  });
  tinymce.init({
    selector: "textarea#content_about2",
    plugins: "lists",
    toolbar: config.toolbar,
  });
  tinymce.init({
    selector: "textarea#content_about3",
    plugins: "lists",
    toolbar: config.toolbar,
  });
  tinymce.init({
    selector: "textarea#content_about4",
    plugins: "lists",
    toolbar: config.toolbar,
  });
  tinymce.init({
    selector: "textarea#content_about5",
    plugins: "lists",
    toolbar: config.toolbar,
  });
  tinymce.init({
    selector: "textarea#content_about6",
    plugins: "lists",
    toolbar: config.toolbar,
  });

  const getAbout = useCallback(async () => {
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get(`http://localhost:8000/admin/getaboutbyid/${id}`);
      const data = response.data;
      setAboutData({
        images: data.image,
        about: data.about,
        head: data.head,
        value: data.value,
        mission: data.mission,
        valuedata: data.valuedata,
        missiondata: data.missiondata,
        choose: data.choose,
        journey: data.journey,
        choosedata: data.choosedata,
        journeydata: data.journeydata,
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
    getAbout();
  }, [getAbout]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      setAboutData({ ...AboutData, image: file });
    } else {
      setAboutData({ ...AboutData, [name]: value });
    }
  };

  const handleUpdate = async () => {
    var editor = tinymce.get("content_about");
    var editor2 = tinymce.get("content_about2");
    var editor3 = tinymce.get("content_about3");
    var editor4 = tinymce.get("content_about4");
    var editor5 = tinymce.get("content_about5");
    var editor6 = tinymce.get("content_about6");
    // Get the content of the editor
    AboutData.about = editor.getContent();
    AboutData.valuedata = editor2.getContent();
    AboutData.missiondata = editor3.getContent();
    AboutData.choosedata = editor4.getContent();
    AboutData.journeydata = editor5.getContent();

    const formData = new FormData();

    formData.append("image", AboutData.image);
    formData.append("about", AboutData.about);
    formData.append("valuedata", AboutData.valuedata);
    formData.append("missiondata", AboutData.missiondata);
    formData.append("choosedata", AboutData.choosedata);
    formData.append("journeydata", AboutData.journeydata);

    if (!AboutData.about) {
      setTitleError("About is required");
    } else {
      setTitleError("");
      try {
        await axios.put(`http://localhost:8000/admin/editAboutByid/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Update successful!");
        window.location.href = `/admin-about?message=About%20updated%20successfully`;
      } catch (error) {
        console.error("Error updating category:", error);
      }
    }
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
              <label style={{ fontSize: "16px" }}>About description</label>
              <textarea
                id="content_about"
                style={{
                  width: "100%",
                  borderRadius: "7px",
                  fontSize: "14px",
                  paddingLeft: "4px",
                  outline: "none",
                }}
                value={AboutData.about}
                onChange={handleChange}
                name="about"
                type="text"
                placeholder="About Description"
              />
            </SoftBox>
            <p style={{ color: "red", fontSize: "11px" }}>{titleError}</p>
            <SoftBox mb={2}>
              <label style={{ fontSize: "16px" }}>Our value description</label>
              <textarea
                id="content_about2"
                value={AboutData.valuedata}
                onChange={(e) => setAboutData({ ...AboutData, valuedata: e.target.value })}
                name="valuedata"
                placeholder="Our Value Description"
              />
            </SoftBox>
            <SoftBox mb={2}>
              <label style={{ fontSize: "16px" }}>Mission description</label>
              <textarea
                id="content_about3"
                value={AboutData.missiondata}
                name="missiondata"
                onChange={(e) => setAboutData({ ...AboutData, missiondata: e.target.value })}
                placeholder="Our mission Description"
              />
            </SoftBox>
            <SoftBox mb={2}>
              <label style={{ fontSize: "16px" }}>Choose description</label>
              <textarea
                id="content_about4"
                value={AboutData.choosedata}
                onChange={(e) => setAboutData({ ...AboutData, choosedata: e.target.value })}
                name="choosedata"
                placeholder="Our Value Description"
              />
            </SoftBox>
            <SoftBox mb={2}>
              <label style={{ fontSize: "16px" }}>Journey description</label>
              <textarea
                id="content_about5"
                value={AboutData.journeydata}
                name="journeydata"
                onChange={(e) => setAboutData({ ...AboutData, journeydata: e.target.value })}
                placeholder="Our journey Description"
              />
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
