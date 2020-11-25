import React, { useEffect, useState } from 'react'
import { Cropper } from 'react-cropper';
import ThreeStepSection from '../components/ThreeStepSection'
import CropImages from '../utils/hooks/CropImages';

export default function CreateCourse() {

    const [image,getCropData,setCropper,onChange,cropData,err] = CropImages();//custom h
    const [showCropper , setshowCropper] = useState(false);

    const [courseValue, setcourseValue] = useState({course_name:"",course_price:"",course_description:""});
    const [courseErrors, setcourseErrors] = useState({course_name:"",course_price:"",course_description:""});
    const [hide, sethide] = useState({course_name:false,course_price:false,course_description:false});
    const [isSubmitting, setisSubmitting] = useState(false);

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
        if(!value.course_price.trim()){
            formErrors.course_price="Course Price Is Required";
        }
        if(value.course_description.length >= 300){
            formErrors.course_description="Course Description Must Be Less Than 300 Characters";
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

    function submit(){
        console.log("submit");
    }

    return (
       <div className="subject_form">
            <ThreeStepSection set="cc"/>
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
                        <input type="number" name="course_price" min="0" value={courseValue.course_price} onChange={handelFormValues} onFocus={hideError}/>
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
                        <input type="submit" value="Create Course" name="create"/>
                    </p>
                </form>
            </div>
        </div>
    )
}
