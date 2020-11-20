import React, { useState } from "react";
import chi from "../img/child.png";
import "../assets/css/usprofile.css";
import UploadPropicModel from "./UploadPropicModel";
import AcDetails from "../utils/hooks/AcDetails";
import { store } from "react-notifications-component";

export default function ProfileHead() {

  const [showModel,setshowModel] = useState(false);
  const [filePath, setfilePath] = useState('');
  const [imgObjectURL, setimgObjectURL] = useState('');

  const openModel = () =>{
    setshowModel(!showModel);
  }

  const hadelFileUpload =(e)=>{
    if(e.target.files[0] && e.target.files[0].name){
      if(e.target.files[0].type === 'image/jpeg' || e.target.files[0].type ==='image/png' || e.target.files[0].type === 'image/jpg'){
        setimgObjectURL(URL.createObjectURL(e.target.files[0]));
        setfilePath(e.target.files[0]);
      }
      else{
          setshowModel(!showModel);
          store.addNotification({
          title: "Invalid File Type!",
          message: "OnDevlms",
          type: "danger",
          insert: "top",
          container: "top-left",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
            pauseOnHover: true,
            showIcon:true
          },
          width:600
      });
      }
    }
  }

  const [teachProfilepic,profileDetails] = AcDetails();

  return (
    <div>
      <UploadPropicModel showModel={showModel} setshowModel={setshowModel} filePath={filePath} setfilePath={setfilePath} imgObjectURL={imgObjectURL} setimgObjectURL={setimgObjectURL}/>
      <div className="profil_box">
        <div className="srow">
          <h2>{`${profileDetails.name} ${profileDetails.lname}`}</h2>
          <p>Instructor</p>
          <div className="srow_pro_pic">
            <img src={`http://127.0.0.1:8000${teachProfilepic}`} alt="" />
            <label htmlFor="uppic" onClick={openModel}>
            <i className="fas fa-camera"></i>
            </label>
            <input type="file" id="uppic" onChange={hadelFileUpload}/>
          </div>
        </div>
        <div className="brow">
          <div className="brow_info">
            <p>
              Chirathma Furniture,kandegedara
              rd,keeriayagolla,samagipura,hali-ela
            </p>
            <p>
              <i className="fas fa-phone-alt"></i>{profileDetails.phoneNumber}
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
