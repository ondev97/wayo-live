import { useEffect, useState } from "react";
import validation from "../../components/ValidateProfileSettings";
import AcDetails from "./AcDetails";

function ProfileUpdate(submit) {
  const { profileDetails } = AcDetails();

  const [values, setvalues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
    email: "",
    address: "",
    des: "",
    pw: "",
  });
  const [errors, seterrors] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
    email: "",
    address: "",
    des: "",
    pw: "",
  });
  const [hide, sethide] = useState({
    firstName: false,
    lastName: false,
    userName: false,
    email: false,
    phoneNumber: false,
    phonenumber: false,
    address: false,
    des: false,
    pw: false,
  });
  const [isSibmitting, setisSibmitting] = useState(false);
  const [inputField, setinputField] = useState([]);
  const [inputFieldED, setinputFieldED] = useState([]);
  const [fini, setfini] = useState(false);
  const [fidi, setfidi] = useState(false);

  //set database values to fields
  useEffect(() => {
    setvalues({
      ...values,
      firstName: profileDetails.name,
      lastName: profileDetails.lname,
      phoneNumber: profileDetails.phoneNumber,
      email: profileDetails.email,
      userName: profileDetails.userName,
      address: profileDetails.address,
      des: profileDetails.des,
    });
  }, [profileDetails]);

  //set values to states
  const hadelChange = (e) => {
    const { name, value } = e.target;
    if (e.target.id === "un") {
      setvalues({
        ...values,
        [name]: value.trim(),
      });
    } else {
      setvalues({
        ...values,
        [name]: value,
      });
    }
  };

  //hadel form submit
  const hadelSubmitForm = (e) => {
    e.preventDefault();
    //hadlling errors
    seterrors(validation(values));
    sethide({
      firstName: false,
      lastName: false,
      userName: false,
      email: false,
      phoneNumber: false,
      phonenumber: false,
      address: false,
      des: false,
      pw: false,
    });
    setisSibmitting(true);
  };
  const hideError = (e) => {
    Object.entries(errors).map(([keys, val]) => {
      if (keys === e.target.name && val !== "") {
        sethide({ ...hide, [e.target.name]: true });
      }
    });
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSibmitting) {
      submit();
    }
  }, [errors]);

  return [
    hadelChange,
    hadelSubmitForm,
    values,
    errors,
    seterrors,
    hide,
    hideError,
    inputField,
    inputFieldED,
  ];
}

export default ProfileUpdate;
