import { useEffect, useState } from "react";
import ValidateSubjectCreateForm from "../../components/ValidateCreateSubject";

const UseCreateSubject = (submitForm) => {
  const [isFree, setisFree] = useState(true);
  const [formValue, setformValue] = useState({
    event_type: "Live Streaming",
    event_category: "",
    event_name: "",
    event_short_description: "",
    event_label: "",
    event_date: "",
    event_start_time: "",
    event_end_time: "",
    event_duration: "",
    event_price: 0,
    event_content: "",
    is_freeze: false,
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
    event_content: "",
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
    event_content: false,
  });
  const [isSubmitting, setisSubmitting] = useState(false);

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
    setformErrors(ValidateSubjectCreateForm(formValue, isFree));
    sethide({
      event_name: false,
      event_short_description: false,
      event_label: false,
      event_date: false,
      event_start_time: false,
      event_end_time: false,
      event_price: false,
      event_content: false,
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
    formValue,
    setformValue,
    hadelChabgeFormValues,
    handelSubmit,
    formErrors,
    hide,
    hideError,
    isFree,
    setisFree,
  };
};

export default UseCreateSubject;
