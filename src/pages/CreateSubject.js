import Cropper from 'react-cropper';
import React, { useState } from 'react'
import '../assets/css/creatsubject.css'
import CropImages from '../utils/hooks/CropImages';
import UseCreateSubject from '../utils/hooks/UseCreateSubject';

export default function CreateSubject() {

    const [image,getCropData,setCropper,onChange,cropData,err] = CropImages();//custom hook
    const [showCropper , setshowCropper] = useState(false);

    const [formValue,hadelChabgeFormValues,handelSubmit,formErrors,hide,hideError] = UseCreateSubject(submitForm);//custom hook

    function submitForm(){
        console.log('Submitted');
    }
    
    return (
        <div className="subject_form">
            <div className="uppper_section">
                <div className="main_upper">
                    <div className="up_column">
                        <div className="up_icon act">
                            <i className="fas fa-book"></i>
                        </div>
                        <h3>Create Subject</h3>
                        <div className="line"></div>
                    </div>
                    <div className="up_column">
                        <div className="up_icon">
                            <i className="fas fa-book-reader"></i>
                        </div>
                        <h3>Create Course</h3>
                    </div>
                    <div className="up_column">
                        <div className="up_icon">
                        <i className="fas fa-pen-nib"></i>
                        </div>
                        <h3>Add Course Materials</h3>
                    </div>
                </div>
            </div>
            <div className="main_form">
                <h1>Create Subject</h1>
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
                        <textarea name="sub_des" id="sd" rows="10" value={formValue.subject_des} onChange={hadelChabgeFormValues} onFocus={hideError}></textarea>
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
                            cropData !== '#' && 
                                <div className="finCropImg">
                                    <img style={{ width: "100%" }} src={cropData} alt="cropped" />
                                </div>
                        }
                        <p>
                            <label htmlFor="file">{cropData === '#' ? 'Upload Subject Cover' : 'Changed Subject Cover'}</label>
                            <input type="file" name="file" id="file" onChange={(e)=>{onChange(e);setshowCropper(true)}}/>
                            {
                                showCropper && cropData === '#' && !err.img? <button onClick={getCropData}>Crop Image</button> : ''
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
                        <label htmlFor="st">Total Hours</label>
                        <input type="number" name="hr" value={formValue.hr} onChange={hadelChabgeFormValues} />
                        <span className="hr">Hr</span>
                        {
                                formErrors.hr && <span className={`tip ${hide.hr ? 'hidetip' : ''}`}>{formErrors.hr}</span>
                        }
                    </p>
                    <p>
                        <input type="submit" value="Create Subject" name="create"/>
                    </p>
                </form>
            </div>
        </div>
    )
}
