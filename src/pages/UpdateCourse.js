import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Cropper } from 'react-cropper';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import CropImages from '../utils/hooks/CropImages';

export default function UpdateCourse() {

    const [image,getCropData,setCropper,onChange,cropData,err,file] = CropImages();//custom h
    const [showCropper , setshowCropper] = useState(false);
    const [courseValue, setcourseValue] = useState({course_name:"",course_price:"",course_description:"",hr:""});
    const [courseErrors, setcourseErrors] = useState({course_name:"",course_price:"",course_description:"",hr:""});
    const [hide, sethide] = useState({course_name:false,course_price:false,course_description:false,hr:false});
    const [isSubmitting, setisSubmitting] = useState(false);
    const [progress, setprogress] = useState(false);
    const [redirec, setredirec] = useState({err:"",id:""});
    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);
    
    const {id} = useParams();

    const handelFormValues =(e)=>{
        const {name,value} = e.target;
        setcourseValue({
            ...courseValue,[name]:value
        })
    }
    const handelSubmit = (e)=>{
        e.preventDefault();
        setcourseErrors(checkErrors(courseValue));
        sethide({course_name:false,course_price:false,course_description:false});
        setisSubmitting(true);
    }

    const checkErrors = (value) =>{
        const formErrors = {};

        if(!value.course_name.trim()){
            formErrors.course_name="Course Name Is Required";
        }
        if(value.course_name.length >200){
            formErrors.course_name="Course Name Must Be Less Than 200 Characters";
        }
        if(!value.course_price.trim()){
            formErrors.course_price="Course Price Is Required";
        }
        if(value.course_description.length >= 300){
            formErrors.course_description="Course Description Must Be Less Than 300 Characters";
        }
        if(!value.hr.trim()){
            formErrors.hr ="Total Hours Of Subject Is Required";
        }

        return formErrors
    }

    const hideError = (e)=>{
        Object.entries(courseErrors).map(([keys,val]) =>{
            if(keys === e.target.name && val !== ""){
                sethide({...hide,[e.target.name]:true});
            }
        })
    }

    useEffect(() => {
        if(Object.keys(courseErrors).length === 0 && isSubmitting){
            submit();
        }
    }, [courseErrors])

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

    function submit(){
        console.log("submit");
        let form_data = new FormData();

        if(cropData !== '#'){
            let input = cropData.split(',')[1];
            const blob = b64toBlob(input,file.type)
            form_data.append("course_cover",blob,file.name);
        }

        form_data.append('course_name',courseValue.course_name);
        form_data.append('course_description',courseValue.course_description);
        form_data.append('price',courseValue.course_price);
        form_data.append('duration',courseValue.hr);

        Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/createcourse/${id}/${usDetails.id}/`,form_data,{
            headers:{Authorization:"Token "+usDetails.key},onUploadProgress:progressEvent=>{
                if(progressEvent.isTrusted){
                    setprogress(true);
                }
            }
        }).then(res=>{
            setredirec({id:res.data.id});
        }).catch(err=>{
            if(err.response.data.message){
                setredirec({err:true});
            }
        })
    }

    return (
        <div className="subject_form">
            <div className="main_form">
            <h1>Create Course</h1>
                <form onSubmit={handelSubmit}>
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
                            cropData !== '#' && 
                                <div className="finCropImg">
                                    <img style={{ width: "100%" }} src={cropData} alt="cropped" />
                                </div>
                        }
                        <p>
                            <label htmlFor="file">{cropData === '#' ? 'Upload Course Cover' : 'Changed Course Cover'}</label>
                            <input type="file" name="file" id="file" onChange={(e)=>{onChange(e);setshowCropper(true)}}/>
                            {
                                showCropper && cropData === '#' && !err.img? <button className="cp" onClick={getCropData}>Crop Image</button> : ''
                            }
                        </p>
                    </div>
                    <p>
                        <label htmlFor="cn">Course Name</label>
                        <input type="text" name="course_name" value={courseValue.course_name}
                        onChange={handelFormValues} onFocus={hideError}/>
                        {
                            courseErrors.course_name && <span className={`tip ${hide.course_name ? 'hidetip' : ''}`}>{courseErrors.course_name}</span>
                        }
                    </p>
                    <p>
                        <label htmlFor="cp">Course Price</label>
                        <span className="on_row">
                            <span className='curu'>LKR</span>
                            <input type="number" name="course_price" min="0" value={courseValue.course_price} onChange={handelFormValues} onFocus={hideError}/>
                        </span>
                        {
                            courseErrors.course_price && <span className={`tip ${hide.course_price ? 'hidetip' : ''}`}>{courseErrors.course_price}</span>
                        }
                    </p>
                    <p>
                        <label htmlFor="cd">Course Description</label>
                        <textarea name="course_description" id="cd" rows="10" value={courseValue.course_description} onChange={handelFormValues} onFocus={hideError}></textarea>
                        {
                            courseErrors.course_description && <span className={`tip ${hide.course_description ? 'hidetip' : ''}`}>{courseErrors.course_description}</span>
                        }
                    </p>
                    <p>
                        <label htmlFor="st">Total Hours</label>
                        <input type="number" name="hr" min='0' step="0.1" value={courseValue.hr} onChange={handelFormValues} />
                        <span className="hr">Hr</span>
                        {
                                courseErrors.hr && <span className={`tip ${hide.hr ? 'hidetip' : ''}`}>{courseErrors.hr}</span>
                        }
                    </p>
                    <p>
                        <button className="sub" type={`${progress ? 'button' : 'submit'}`} name="create">Create Course <i className={`fas fa-circle-notch notch ${!progress ? 'dis' : ''}`}></i></button>
                    </p>
                </form>
            </div>
        </div>
    )
}
