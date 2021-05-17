import React, { useEffect, useState } from "react";
import logo from "../img/Logo_1.png";
import { useDispatch } from "react-redux";
import { activeAccount } from "../actions";
import "../assets/css/stlogin.css";
import "../assets/css/mediaFiles/loginRegister.css";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { store } from "react-notifications-component";

export default function PasswordReset() {
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [readOnly, setreadOnly] = useState("");
  const [redirect, setredirect] = useState(false);

  useEffect(() => {
    dispatch(activeAccount());
  }, [dispatch]);

  const handelemail = (e) => {
    const email = e.target.value;
    setemail(email);
  };

  const handlesubmit = () => {
    setreadOnly("none");

    Axios.post(
      `${process.env.REACT_APP_LMS_MAIN_URL}/rest-auth/password/reset/`,
      { email: email }
    )
      .then((res) => {
        store.addNotification({
          title: res.data.detail,
          message: "Eyekon eClass",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
            pauseOnHover: true,
            showIcon: true,
          },
          width: 600,
        });
        setemail("");
        setreadOnly("");
        setredirect(true);
      })
      .catch((err) => {
        store.addNotification({
          title: "Email was not sent",
          message: "Eyekon eClass",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
            pauseOnHover: true,
            showIcon: true,
          },
          width: 600,
        });
        setreadOnly("");
      });
  };
  if (redirect) {
    return <Redirect to={"/stlogin"} />;
  }
  return (
    <div className="login_body">
      <div className="login_column">
        <div className="login_form" style={{ padding: "25px 0" }}>
          <div className="topSign">
            <h2>Password Reset</h2>
            <p>
              Password Reset කිරීම සදහා ඔබගේ Student Account සාදා ඇති Email
              ලිපිනය නිවැරදිව ඇතුලත් කරන්න.
            </p>
          </div>
          <form>
            <p>
              <label htmlFor="em">Email</label>
              <input
                type="text"
                value={email}
                onChange={handelemail}
                placeholder={
                  "Enter the email that you have used for the registration"
                }
                name="email"
                id="em"
              />
            </p>
            <div className="but">
              <input
                onClick={handlesubmit}
                type="button"
                value="Reset Password"
                name="submit"
                style={{ display: readOnly }}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="login_column">
        <div className="image_login">
          <img src={logo} alt="" />
        </div>
        <div className="image_content">
          <h3>
            ජාතිකපාසල Student Account සදහා Log වීමට ප්‍රථම ඔබ ජාතිකපාසල හි
            ලියාපදිංචි විය යුතුය. ඒ සදහා ඔබගේ අනන්‍යතාවය ගුරුවරයා වෙත තහවුරු කර
            ඔබගේ student account සදහා අදාල Username සහ Password ලබාගන්න.
            ජාතිකපාසල Student Accounts හි කුමන හෝ තාක්ෂණික ගැටළුවක් පවතීනම් එය
            නිරාකරණය කරගැනීම සදහා ඔබගේ ගුරුවරයා සම්බන්ද කරගන්න.
          </h3>
        </div>
      </div>
    </div>
  );
}
