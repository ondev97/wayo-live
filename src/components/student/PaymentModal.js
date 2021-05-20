import React, { useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import { store } from "react-notifications-component";
import { Redirect } from "react-router-dom";

const PaymentModal = ({ course_id, course_name, price, user }) => {
  const usDetails = useSelector((state) => state.accountDetails);
  const [redirect, setredirect] = useState(false);

  const payment = {
    sandbox: true,
    merchant_id: "1216340",
    return_url: "",
    cancel_url: "",
    notify_url: "",
    order_id: course_id,
    items: course_name,
    amount: price,
    currency: "LKR",
    first_name: user.user.first_name,
    last_name: user.user.last_name,
    email: user.user.email,
    phone: user.user.phone_no,
    address: user.user.address,
    city: "Colombo",
    country: "Sri Lanka",
  };

  // Called when user completed the payment. It can be a successful payment or failure
  window.payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
    Axios.post(
      `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/enrollbypayment/${course_id}/${usDetails.id}/`,
      {},
      {
        headers: { Authorization: "Token " + usDetails.key },
      }
    )
      .then((res) => {
        console.log(res);
        store.addNotification({
          title: "Sucessfully Enrolled",
          message: process.env.REACT_APP_LMS_ALERT_NAME,
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
            pauseOnHover: true,
            showIcon: true,
          },
          width: 600,
        });
        setredirect(true);
      })
      .catch((err) => {});
    Axios.post(
      `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/enrolledpayment/`,
      payment,
      {
        headers: { Authorization: "Token " + usDetails.key },
      }
    );
  };

  // Called when user closes the payment without completing
  window.payhere.onDismissed = function onDismissed() {
    //Note: Prompt user to pay again or show an error page
    console.log("Payment dismissed");
    store.addNotification({
      title: "Payment Cancelled",
      message: process.env.REACT_APP_LMS_ALERT_NAME,
      type: "warning",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true,
        pauseOnHover: true,
        showIcon: true,
      },
      width: 600,
    });
  };

  // Called when error happens when initializing payment such as invalid parameters
  window.payhere.onError = function onError(error) {
    // Note: show an error page
    console.log("Error:" + error);
    store.addNotification({
      title: "Payment was unsuccessfull",
      message: process.env.REACT_APP_LMS_ALERT_NAME,
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true,
        pauseOnHover: true,
        showIcon: true,
      },
      width: 600,
    });
  };

  function pay() {
    window.payhere.startPayment(payment);
  }
  if (redirect) {
    return <Redirect to={`/studentdashboard/stmodules/${course_id}`} />;
  }
  return (
    <button onClick={pay}>
      <i className="fas fa-shopping-cart"></i>Buy Course
    </button>
  );
};

export default PaymentModal;
