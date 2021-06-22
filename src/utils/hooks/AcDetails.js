import Axios from "axios";
import { useEffect, useState } from "react";
import UserStatus from "./UserStatus";

function AcDetails() {
  const [teachProfilepic, setteachProfilepic] = useState("");
  const [profileDetails, setprofileDetails] = useState({});
  const { hadelLogOut } = UserStatus(); //custom hook

  useEffect(async () => {
    if (localStorage.getItem("usValues") !== null) {
      if (
        Object.keys(JSON.parse(localStorage.getItem("usValues"))).length !== 0
      ) {
        const userDetails = JSON.parse(localStorage.getItem("usValues"));
        await Axios.get(
          `${process.env.REACT_APP_LMS_MAIN_URL}/auth/viewprofile/`,
          {
            headers: { Authorization: "Token " + userDetails.key },
          }
        )
          .then((res) => {
            setteachProfilepic(res.data.band_image);
            setprofileDetails({
              id: res.data.id,
              name: res.data.user.first_name,
              lname: res.data.user.last_name,
              phoneNumber: res.data.user.phone_no,
              email: res.data.user.email,
              userName: res.data.user.username,
              des: res.data.band_description,
            });
          })
          .catch((err) => {
            if (err) {
              hadelLogOut();
            }
          });
      }
    }
  }, []);
  return { teachProfilepic, profileDetails };
}

export default AcDetails;
