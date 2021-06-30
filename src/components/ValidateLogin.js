export default function ValidateLogin(values) {
  let errors = {};

  if (!values.un.trim()) {
    errors.un = "Username is Required";
  } else if (values.un.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    errors.un = "User Name Must Not Be Contain Special Characters";
  }
  //   else if (values.un.length > 35) {
  //     errors.un = "Username Must Be Less Than 35 characters";
  //   }
  // else if(!pattern.test(values.email)){
  //     errors.email = "Please Enter Valid Email";
  // }
  if (!values.pw.trim()) {
    errors.pw = "Password Is Required";
  }

  return errors;
}
