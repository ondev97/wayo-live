import React from "react";
import "../assets/css/usprofile.css";
import AcDetails from "../utils/hooks/AcDetails";

export default function ProfileBottom() {
  const [teachProfilepic, profileDetails] = AcDetails();

  return (
    <div>
      <div className="bottom_box">
        <div className="teach_details">
          <div>
            <p>Email Address</p>
            <h3>wayolive@gmail.com</h3>
          </div>
          <div>
            <p>Phone:</p>
            <h3>071 2345678</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
