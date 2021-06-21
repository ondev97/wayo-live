import React from "react";
import AcDetails from "../utils/hooks/AcDetails";

export default function AboutUser() {
  const { profileDetails } = AcDetails();

  return (
    <div>
      <div className="about_body">
        <h3>About</h3>
        <div className="ab_main_card">
          <div className="ab_card">
            <h3>Name</h3>
            <h4>
              {profileDetails.name &&
                `${profileDetails.name} ${profileDetails.lname}`}
            </h4>
          </div>
          <div className="ab_card">
            <h3>User Name</h3>
            <h4 style={{ textTransform: "uppercase" }}>
              {profileDetails.userName && profileDetails.userName}
            </h4>
          </div>
          <div className="ab_card">
            <h3>Mobile</h3>
            <h4>{profileDetails.phoneNumber && profileDetails.phoneNumber}</h4>
          </div>
          <div className="ab_card">
            <h3>Email</h3>
            <h4>{profileDetails.email && profileDetails.email}</h4>
          </div>
        </div>
        <div className="disdis">
          <p>
            {profileDetails.des &&
              profileDetails.des !== "null" &&
              profileDetails.des}
          </p>
        </div>
      </div>
    </div>
  );
}
