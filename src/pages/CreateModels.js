import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { store } from 'react-notifications-component';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ThreeStepSection from '../components/ThreeStepSection'

function CreateModels() {

    const {id} = useParams();
    const [formValues, setformValues] = useState({mn:"",msg:""});
    const [formErrors, setformErrors] = useState({mn:"",msg:"",comerr:""});
    const [hide, sethide] = useState({mn:false,msg:false});
    const [mediafiles, setmediafiles] = useState([]);
    const [isSubmit, setisSubmit] = useState(false);
    const [uploading, setuploading] = useState(false);
    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

    const hadelValues = (e)=>{
        const {name,value} = e.target
        setformValues({
            ...formValues,[name]:value
        })
    }
    const files = (e)=>{
        if(e.target.files){
            setmediafiles([...mediafiles,...e.target.files]);
        }
    }

    useEffect(() => {
        if(mediafiles !== null){

            for(let i=0;i<mediafiles.length;i++){
                if(mediafiles[i].type === 'video/mp4'){
                    setformErrors({...formErrors,comerr:"Please Upload Video Files To Vimeo And paste Vimeo URL In Here"});
                }
            }
        }
    }, [mediafiles])

    const checkErrors = (values)=>{
        let errors={};
        if(!values.mn.trim()){
            errors.mn = "Module Name Is Required";
        }
        if(!values.msg){
            if(!mediafiles){
                errors.comerr ="Do not Have Anything Please Select Media Or Create Message"
            }
        }
        return errors;
    }
    const hideErrors = (e)=>{
        Object.entries(formErrors).map(([keys,val]) =>{
            if(keys === e.target.name && val !== ""){
                sethide({...hide,[e.target.name]:true});
            }
        })
    }

    const hadelSubmit = (e)=>{
        e.preventDefault();
        setformErrors(checkErrors(formValues));
        sethide({mn:false,msg:false});
        setisSubmit(true);
    }

    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmit){
            uploadModule();
        }
    }, [formErrors])

    function uploadModule(){
        let formData = new FormData();
        let fileData = new FormData();

        formData.append('module_name',formValues.mn);
        formData.append('module_content',formValues.msg);

        //add multiple files
        if(mediafiles !== null){
            for(let i=0;i<mediafiles.length;i++){
                if((mediafiles[i].type !== 'video/mp4')){
                    console.log(mediafiles[i].name);
                    fileData.append(`files`,mediafiles[i]);
                }
            }
        }
        Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/createmodule/${id}/`,formData,{
            headers:{
                Authorization:"Token "+usDetails.key,
                "content-type":"multipart/form-data"
            }
        }).then(res=>{
            if(res.data.id){
                Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/createmodulefile/${res.data.id}/`,fileData,{
                   headers:{Authorization:"Token "+usDetails.key},onUploadProgress:progressEvent=>{
                       if(progressEvent.isTrusted){
                           setuploading(true);
                       }
                   }
               }).then(()=>{
                    setuploading(false);
                    setmediafiles(null);
                    setformValues({mn:"",msg:""});

                   //showing alert
                    store.addNotification({
                        title: "Module Added Successfully!",
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

               }).catch(err=>{
                   console.log(err,"file");
               })
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className="subject_form">
            <ThreeStepSection set="acm"/>
            <div className="main_form">
                <h1>Create Module</h1>
                <form onSubmit={hadelSubmit}>
                    {
                        formErrors.comerr && <p style={{color:'red',fontSize:"13px",marginBottom:"10px"}}>{formErrors.comerr}</p>
                    }
                    <p>
                        <label htmlFor="mn">Module Name</label>
                        <input type="text" id="mn" name="mn" value={formValues.mn} onChange={hadelValues} onFocus={hideErrors}/>
                        {
                            formErrors.mn && <span className={`tip ${hide.mn ? 'hidetip' : ''}`}>{formErrors.mn}</span>
                        }
                    </p>
                    <p>
                        <label htmlFor="msg">Messages/Links</label>
                        <textarea name="msg" id="msg" rows="10" value={formValues.msg} onChange={hadelValues}></textarea>
                    </p>
                        {
                            mediafiles !== null ? 
                            <div className="show_files">
                            <ul className="up_list">
                                {
                                    Object.values(mediafiles).map((value,index)=>(
                                        value.type !== 'video/mp4' && <li key={index} className="row">{value.name}<i className={`fas fa-circle-notch ${uploading ? 'rot' : 'dis'} `}></i></li>
                                    ))
                                }
                            </ul>
                            </div>
                            :''
                        }
                    <div className="multi_files">
                        <p>
                            <label htmlFor="fl">Upload Module Materials</label>
                            <input type="file" name="file" className="multi" id="fl" multiple onChange={files}/>
                        </p>
                    </div>
                    <p>
                        <input type="submit" name="submit" value="Upload Module"/>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default CreateModels
