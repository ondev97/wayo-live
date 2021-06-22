import Axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ValidateSubjectCreateForm from "../../components/ValidateCreateSubject";

export default function UpdateSubjectFunc(submitForm, subid) {
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);
  const [isFree, setisFree] = useState(true);
  const [formValue, setformValue] = useState({
    event_type: "",
    event_category: "",
    event_name: "",
    event_short_description: "",
    event_label: "",
    event_date: "",
    event_start_time: "",
    event_end_time: "",
    event_duration: "",
    event_price: 0,
    event_description: "",
    is_freeze: false,
    event_cover: "",
  });
  const [formErrors, setformErrors] = useState({
    event_category: "",
    event_name: "",
    event_short_description: "",
    event_label: "",
    event_date: "",
    event_start_time: "",
    event_end_time: "",
    event_price: "",
    event_description: "",
  });
  const [hide, sethide] = useState({
    event_name: false,
    event_category: false,
    event_short_description: false,
    event_label: false,
    event_date: false,
    event_start_time: false,
    event_end_time: false,
    event_price: false,
    event_description: false,
  });
  const [isSubmitting, setisSubmitting] = useState(false);

  /*Getting subject details*/
  useEffect(async () => {
    if (usDetails.key) {
      Axios.get(
        `${process.env.REACT_APP_LMS_MAIN_URL}/show/viewevent/${subid}/`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      ).then((res) => {
        setformValue({
          ...formValue,
          event_category: res.data.event_mode,
          event_type: res.data.event_type,
          event_name: res.data.event_name,
          event_description: res.data.description,
          event_content: res.data.event_content,
          event_cover: res.data.event_cover,
          event_date: res.data.event_date,
          event_end: res.data.event_end,
          event_label: res.data.event_label,
          event_start: res.data.event_start,
          is_freeze: res.data.is_freeze,
        });
      });
    }
  }, [usDetails]);

  const hadelChabgeFormValues = (e) => {
    const { name, value } = e.target;
    setformValue({
      ...formValue,
      [name]: value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    //handling Errors
    setformErrors(ValidateSubjectCreateForm(formValue));
    sethide({
      subject_title: false,
      subject_shdes: false,
      sub_des: false,
      class_type: false,
      subject_type: false,
      hr: false,
    });
    setisSubmitting(true);
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors]);

  const hideError = (e) => {
    Object.entries(formErrors).map(([keys, val]) => {
      if (keys === e.target.name && val !== "") {
        sethide({ ...hide, [e.target.name]: true });
      }
    });
  };

  return {
    hadelChabgeFormValues,
    formValue,
    handelSubmit,
    hideError,
    hide,
    formErrors,
  };
}
