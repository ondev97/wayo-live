import React from "react";
import chi from "../img/child.png";
import "../assets/css/usprofile.css";

export default function ProfileHead() {
  return (
    <div>
      <div className="profil_box">
        <div className="srow">
          <h2>Osada Manohara</h2>
          <p>Instructor</p>
          <div className="srow_pro_pic">
            <img src={chi} alt="" />
            <label htmlFor="uppic">
              <i className="fas fa-pencil-alt"></i>
            </label>
            <input type="file" id="uppic" />
          </div>
        </div>
        <div className="brow">
          <div className="brow_info">
            <p>
              Chirathma Furniture,kandegedara
              rd,keeriayagolla,samagipura,hali-ela
            </p>
            <p>
              <i className="fas fa-phone-alt"></i>0768597090
            </p>
          </div>
          <div className="tous">
            <div className="coscount">
              <h3>20</h3>
              <p>Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
