export default function  ValidateSubjectCreateForm(values){
    let errors = {};

    if(!values.subject_title.trim()){
        errors.subject_title ="Subject Title Is Required";
    }
    if(!values.subject_shdes.trim()){
        errors.subject_shdes ="Short Description Is Required";
    }
    if(!values.class_type){
        errors.class_type ="Class Type Is Required";
    }
    if(!values.subject_type){
        errors.subject_type ="Subject Type Is Required";
    }
    if(!values.hr.trim()){
        errors.hr ="Total Hours Of Subject Is Required";
    }

    return errors;
}