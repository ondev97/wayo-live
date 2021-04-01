export const checkErrors = (value, freeac) => {
  const formErrors = {};

  if (!value.course_name.trim()) {
    formErrors.course_name = "Course Name Is Required";
  }
  if (value.course_name.length > 45) {
    formErrors.course_name = "Course Name Must Be Less Than 45 Characters";
  }
  if (freeac) {
    if (!value.course_price) {
      formErrors.course_price = "Course Price Is Required";
    }
  }
  if (value.course_description !== null) {
    if (value.course_description.length >= 300) {
      formErrors.course_description =
        "Course Description Must Be Less Than 300 Characters";
    }
  }
  if (!value.hr.trim()) {
    formErrors.hr = "Total Hours Of Subject Is Required";
  }

  return formErrors;
};
