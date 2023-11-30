import React, { useEffect, useState } from "react";
import styles from "../assets/userCss/syles.module.css";
import Navbar from "../userInterface/Navbar";
import Footer from "../userInterface/Footer";
import axios from "axios";

function about() {
  const [getDataAbout, setDataAbout] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem("userFront");
    window.location.href = "/home";
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/getpost");
      const data = await response.data;
      setDataAbout(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Navbar />

      {/* about section */}
      <section className={`${styles.about_section} ${styles.layout_padding_bottom}`}>
        <div className="container">
          <div className="row">
            {getDataAbout.map((item) => (
              <div className="col-md-6" key={item.id}>
                <div className={styles.detail_box}>
                  <p
                    style={{ fontFamily: "Onest, sans-serif" }}
                    dangerouslySetInnerHTML={{ __html: item.about }}
                  ></p>
                </div>
                <br />
                <br />
              </div>
            ))}

            {getDataAbout.map((item) => (
              <div className="col-md-6" key={item.id}>
                <div className={styles.img_box}>
                  <img src={`http://localhost:8000/${item.image}`} alt="" />
                </div>
              </div>
            ))}
            {getDataAbout.map((item) => (
              <div key={item.id}>
                <p
                  style={{ fontFamily: "Onest, sans-serif" }}
                  dangerouslySetInnerHTML={{ __html: item.valuedata }}
                ></p>
                <br />
                <p
                  style={{ fontFamily: "Onest, sans-serif" }}
                  dangerouslySetInnerHTML={{ __html: item.choosedata }}
                ></p>
                <br />
                <p
                  style={{ fontFamily: "Onest, sans-serif" }}
                  dangerouslySetInnerHTML={{ __html: item.journeydata }}
                ></p>
                <br />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* end about section */}
      {/* info section */}

      {/* end info section */}
      {/* footer section */}

      <Footer />
      {/* footer section */}
      {/* jQery */}
      {/* popper js */}
      {/* bootstrap js */}
      {/* owl slider */}
      {/* custom js */}
      {/* Google Map */}
      {/* End Google Map */}
    </div>
  );
}

export default about;
