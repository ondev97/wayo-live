export default function ValidateLogin(values) {
  let errors = {};
  let pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  if (!values.un.trim()) {
    errors.un = "Username is Required";
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
