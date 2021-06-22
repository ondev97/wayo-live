import Axios from "axios";
import { useEffect, useState } from "react";
import UserStatus from "./UserStatus";

function ProfileDetails(usDetails) {
  const [profileDetails, setprofileDetails] = useState({});
  const { hadelLogOut } = UserStatus(); //custom hook
  let location = window.location.pathname;
  //const usDetails = useSelector(state => state.accountDetails);

  useEffect(async () => {
    if (localStorage.getItem("usValues") !== null) {
      if (
        Object.keys(JSON.parse(localStorage.getItem("usValues"))).length !== 0
      ) {
        const userDetails = JSON.parse(localStorage.getItem("usValues"));
        if (userDetails.user.is_band) {
          await Axios.get(
            `${process.env.REACT_APP_LMS_MAIN_URL}/auth/viewprofile/`,
            {
              headers: { Authorization: "Token " + userDetails.key },
            }
          )
            .then((res) => {
              setprofileDetails({
                name: res.data.user.first_name,
                lname: res.data.user.last_name,
                phoneNumber: res.data.user.phone_no,
                email: res.data.user.email,
                userName: res.data.user.username,
                address: res.data.user.address,
                pic: res.data.band_image,
              });
            })
            .catch((err) => {
              if (err) {
                hadelLogOut();
              }
            });
        } else {
          await Axios.get(
            `${process.env.REACT_APP_LMS_MAIN_URL}/auth/viewprofile/`,
            {
              headers: { Authorization: "Token " + userDetails.key },
            }
          )
            .then((res) => {
              setprofileDetails({
                name: res.data.user.first_name,
                lname: res.data.user.last_name,
                phoneNumber: res.data.user.phone_no,
                email: res.data.user.email,
                userName: res.data.user.username,
                address: res.data.user.address,
                pic: res.data.user_image,
              });
            })
            .catch((err) => {
              if (err) {
                hadelLogOut();
              }
            });
        }
      }
    }
  }, [location]);
  return profileDetails;
}

export default ProfileDetails;
