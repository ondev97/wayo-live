import React from 'react'
import '../assets/css/creatsubject.css'
import UseCreateSubject from '../utils/hooks/UseCreateSubject';
import ThreeStepSection from '../components/ThreeStepSection';
import CreateSubjectForm from '../components/CreateSubjectForm';

export default function CreateSubject() {

    const [formValue,hadelChabgeFormValues,handelSubmit,formErrors,hide,hideError] = UseCreateSubject(submitForm);//custom hook

    function submitForm(){
        console.log('Submitted');
    }
    
    return (
        <div className="subject_form">
            <ThreeStepSection set="cs"/>
            <div className="main_form">
                <h1>Create Subject</h1>
                <CreateSubjectForm formValue={formValue} hadelChabgeFormValues={hadelChabgeFormValues} handelSubmit={handelSubmit} formErrors={formErrors} hide={hide} hideError={hideError}/>
            </div>
        </div>
    )
}
