import React, { useState } from 'react'
import { Cropper } from 'react-cropper';
import CropImages from '../utils/hooks/CropImages';
import child from '../img/child.png';
import UpdateSubjectFunc from '../utils/hooks/SubjectUpdateValidation';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { store } from 'react-notifications-component';
import { Redirect, useParams } from 'react-router-dom';

export default function UpdateSubject() {

    const {subid} = useParams();
    const {hadelChabgeFormValues,formValue,handelSubmit,hideError,hide,formErrors} = UpdateSubjectFunc(submitForm,subid);
    const [image,getCropData,setCropper,onChange,cropData,err,file] = CropImages();//custom hook
    const [showCropper , setshowCropper] = useState(false);
    const [isUploading, setisUploading] = useState(false);
    const [isredirect, setisredirect] = useState(false);

    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

    //function for base64 to blob 
    const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
      
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
      
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
      
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
      
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    function submitForm(){
        let form_data = new FormData();

        if(cropData !== '#'){
            let input = cropData.split(',')[1];
            const blob = b64toBlob(input,file.type)
            form_data.append("subject_cover",blob,file.name);
        }

        form_data.append("subject_name",formValue.subject_title);
        form_data.append("short_description",formValue.subject_shdes);
        form_data.append("description",formValue.sub_des);
        form_data.append("class_type",formValue.class_type);
        form_data.append("subject_type",formValue.subject_type);

        Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/updatesubject/${subid}/`,form_data,{
            headers:{Authorization:"Token " + usDetails.key},onUploadProgress:progressEvent=>{
                if(progressEvent.isTrusted){
                    setisUploading(true);
                }
            }
        }).then(()=>{
            setisUploading(false);
            //showing alert
            store.addNotification({
                title: "Subject Updated!",
                message: "OnDevlms",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true,
                  pauseOnHover: true,
                  showIcon:true
                },
                width:600
            });
            setisredirect(true);

        }).catch(e=>{
            console.log(e);
        })
    }

    if(isredirect){
        return <Redirect to='/teacherdashboard/managecourse'/>
    }
    return (
        <div className="subject_form">
            <div className="main_form">
                <h1>Update Subject</h1>
                     <form onSubmit={handelSubmit}>
                        <p>
                            <label htmlFor="st">Subject Title</label>
                            <input type="text" name="subject_title" id="st" value={formValue.subject_title} onChange={hadelChabgeFormValues} onFocus={hideError}/>
                            {
                                formErrors.subject_title && <span className={`tip ${hide.subject_title ? 'hidetip' : ''}`}>{formErrors.subject_title}</span>
                            }
                        </p>
                        <p>
                            <label htmlFor="ssd">Subject Short Description</label>
                            <input type="text" name="subject_shdes" id="ssd" value={formValue.subject_shdes} onChange={hadelChabgeFormValues} onFocus={hideError}/>
                            {
                                formErrors.subject_shdes && <span className={`tip ${hide.subject_shdes ? 'hidetip' : ''}`}>{formErrors.subject_shdes}</span>
                            }
                        </p>
                        <p>
                            <label htmlFor="sd">Subject Description</label>
                            <textarea name="sub_des" id="sd" rows="10" value={formValue.sub_des} onChange={hadelChabgeFormValues} onFocus={hideError}></textarea>
                            {
                                formErrors.subject_des && <span className={`tip ${hide.subject_des ? 'hidetip' : ''}`}>{formErrors.subject_des}</span>
                            }
                        </p>
                        <div className="up_pro_pic">
                            {
                                showCropper && cropData === '#' && !err.img &&
                                <div className="cropper_be">
                                    <Cropper
                                        style={{ height: '100%', width: "100%" }}
                                        initialAspectRatio={16 / 9}
                                        aspectRatio={16 / 9}
                                        preview=".img-preview"
                                        src={image}
                                        viewMode={1}
                                        guides={true}
                                        minCropBoxHeight={10}
                                        minCropBoxWidth={10}
                                        background={false}
                                        responsive={true}
                                        autoCropArea={1}
                                        checkOrientation={false}
                                        onInitialized={(instance) => {
                                        setCropper(instance);
                                        }}
                                    />
                                </div>
                            }
                            {
                                !showCropper &&
                                <div className="finCropImg">
                                    <img style={{ width: "100%" }} src={cropData ==='#' ? process.env.REACT_APP_LMS_MAIN_URL+formValue.subject_cover : cropData} alt="cropped" />
                                </div>
                            }
                            <p>
                                <label htmlFor="file">Change Subject Cover</label>
                                <input type="file" name="file" id="file" onChange={(e)=>{onChange(e);setshowCropper(true)}}/>
                                {
                                    showCropper && cropData === '#' && !err.img? <button className="cp" onClick={(e)=>{getCropData(e); setshowCropper(false)}}>Crop Image</button> : ''
                                }
                            </p>
                        </div>
                        <div className="sub_sect">
                            <p>
                                <label htmlFor="ct">Class Type</label>
                                <select name="class_type" id='ct' value={formValue.class_type} onChange={hadelChabgeFormValues} onFocus={hideError}>
                                    <option value="" disabled>Select Class Type</option>
                                    <option value="a/l">A/L</option>
                                    <option value="o/l">O/L</option>
                                    <option value="other">Other</option>
                                </select>
                                {
                                formErrors.class_type && <span className={`tip ${hide.class_type ? 'hidetip' : ''}`}>{formErrors.class_type}</span>
                                }
                            </p>
                            <p>
                                <label htmlFor="st">Subject Type</label>
                                <select name="subject_type" id="st" value={formValue.subject_type} onChange={hadelChabgeFormValues} onFocus={hideError}>
                                    <option value="" disabled>Select Subject Type</option>
                                    <option value="revision">Revision</option>
                                    <option value="theory">Theory</option> 
                                    <option value="group">Group</option> 
                                </select>
                                {
                                    formErrors.subject_type && <span className={`tip ${hide.subject_type ? 'hidetip' : ''}`}>{formErrors.subject_type}</span>
                                }
                            </p>
                        </div>
                        <p>
                            <button className="sub" type={`${isUploading ? 'button' : 'submit'}`} name="create"><span>Create Subject</span> <i className={`fas fa-circle-notch notch ${!isUploading ? 'dis' : ''}`}></i></button>
                        </p>
                    </form>
            </div>
        </div>
    )
}
