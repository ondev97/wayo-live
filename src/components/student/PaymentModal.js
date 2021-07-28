import React, { useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import { store } from "react-notifications-component";
import { Redirect } from "react-router-dom";

const PaymentModal = ({event}) => {
  const usDetails = useSelector((state) => state.accountDetails);
  const [redirect, setredirect] = useState(false);

  console.log(usDetails);

  const payment = {
    sandbox: true,
    merchant_id: '1216340',
    return_url: "",
    cancel_url: "",
    notify_url: `${process.env.REACT_APP_LMS_MAIN_URL}/show/notifyurl/${usDetails.id}/${event.id}/`,
    order_id: event.id,
    items: event.event_name,
    amount: event.event_price,
    currency: 'LKR',
    first_name: 'Saman',
    last_name: 'Perera',
    email: 'samanp@gmail.com',
    phone: '0771234567',
    address: 'No.1, Galle Road',
    city: 'Colombo',
    country: 'Sri Lanka',
  };

  // Called when user completed the payment. It can be a successful payment or failure
  window.payhere.onCompleted = function onCompleted(orderId, amount, currency, status) {
    console.log("Payment completed. OrderID:" + orderId, amount, currency, status);
    store.addNotification({
      title: "Successfully Enrolled",
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
    return <Redirect to={`/audiencedashboard/envet/${event.id}`}/>
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
    Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/show/checkpayment/${event.id}/`, {},
        { headers: { Authorization: "Token " + usDetails.key },})
        .then((res) => {
          console.log(res.data);
          if (res.data.is_payable){
            payment.order_id = res.data.payment_id;
            window.payhere.startPayment(payment);
          }else{
            if (res.data.enrolled){
              store.addNotification({
                title: "You have already enrolled for this event",
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
              return <Redirect to={`/audiencedashboard/envet/${event.id}`}/>
            }else{
              store.addNotification({
                title: "Enrollment limit exceeded",
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
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }
  if (redirect) {
    return <Redirect to={`/`} />;
  }
  return (
    <button onClick={pay}>
      LKR: {event.event_price}
    </button>
  );
};

export default PaymentModal;
