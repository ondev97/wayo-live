export default function validation(values) {
  let errors = {};

  let pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  if (!values.firstName.trim()) {
    errors.firstName = "First Name is Required";
  } else if (values.firstName.length > 100) {
    errors.firstName = "First Name Must Be Less Than 10 characters";
  }
  if (!values.lastName.trim()) {
    errors.lastName = "Last Name is Required";
  } else if (values.lastName.length > 100) {
    errors.lastName = "Last Name Must Be Less Than 20 characters";
  }
  if (!values.userName.trim()) {
    errors.userName = "User Name Is Required";
  } else if (values.userName.length < 4) {
    errors.userName = "User Name Must Be More Than 4 characters";
  } else if (
    values.userName.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)
  ) {
    errors.userName = "User Name Must Not Be Contain Special Characters";
  }
  if (!values.email.trim()) {
    errors.email = "Email is Required";
  } else if (values.email.length > 35) {
    errors.email = "Email Must Be Less Than 35 characters";
  } else if (!pattern.test(values.email)) {
    errors.email = "Please Enter Valid Email";
  }
  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = "Phone Number Is Required";
  } else if (values.phoneNumber.length > 12) {
    errors.phoneNumber = "Phone Number Must Be 12 characters";
  } else if (isNaN(values.phoneNumber)) {
    errors.phoneNumber = "Please Enter Valid Phone Number";
  }
  if (values.des !== null && values.des !== undefined) {
    if (values.des.trim()) {
      if (values.des.length > 400) {
        errors.des = "Description Must Be Less Than 400 characters";
      }
    }
  }
  if (!values.pw.trim()) {
    errors.pw = "Password Is Required For Update Your Account";
  }

  return errors;
}
