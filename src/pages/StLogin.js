import React, { useEffect } from "react";
import StLoginForm from "../components/StLoginForm";
import logo from "../img/Logo_1.png";
import { useDispatch } from "react-redux";
import { activeAccount } from "../actions";
import "../assets/css/stlogin.css";
import "../assets/css/mediaFiles/loginRegister.css";

export default function StLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activeAccount());
  }, [dispatch]);

  return (
    <div className="login_body">
      <div className="login_column">
        <div className="login_form">
          <div className="topSign">
            <h2>Login</h2>
            <p>
              Access the Eyekon eClass Dashboard using your Username (Class
              Number) and Password.
            </p>
          </div>
          <StLoginForm />
        </div>
      </div>
      <div className="login_column">
        <div className="image_login">
          <img src={logo} alt="" />
        </div>
        <div className="image_content">
          <h3>
            Eyekon eClass provides facilities in a higher manner to the Sri
            Lankan educational sector. All the courses are being conducted by
            leading and fully qualified panel of teachers in the Island. With
            the direct guidance of the teachers, students follow their syllabus.
            At Eyekon eClass, conduct online examinations and will be assessed
            the student’s progress accordingly.
          </h3>
        </div>
      </div>
    </div>
  );
}
