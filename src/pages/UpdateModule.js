import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function UpdateModule() {

    const {id} = useParams();
    const [formValues, setformValues] = useState({mn:"",msg:""});
    const [formErrors, setformErrors] = useState({mn:"",msg:"",comerr:""});
    const [hide, sethide] = useState({mn:false,msg:false});
    const [mediafiles, setmediafiles] = useState([]);
    const [isSubmit, setisSubmit] = useState(false);
    const [uploading, setuploading] = useState(false);
    const [sucMsg, setsucMsg] = useState(false);
    const [isRedirect, setisRedirect] = useState(true);
    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

    const hadelValues = (e)=>{
        const {name,value} = e.target
        setformValues({
            ...formValues,[name]:value
        })
    };

    const checkErrors = (values)=>{
        let errors={};
        if(!values.mn.trim()){
            errors.mn = "Module Name Is Required";
        }
        if(!values.msg){
            if(mediafiles.length===0){
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
    };

    const hadelSubmit = (e)=>{
        e.preventDefault();
        setformErrors(checkErrors(formValues));
        sethide({mn:false,msg:false});
        setisSubmit(true);
    }

    const editorOnChangeHandel = (editor) =>{
        let data = editor.getData();
        setformValues({...formValues,['msg']:data});
    }



    return (
        <div className="subject_form">
            <div className="main_form">
                <h1>Update Module</h1>
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
                    </p>
                        <div className="editorck">
                            <CKEditor editor={ ClassicEditor } data={formValues.msg} onChange={editorOnChangeHandel} />
                        </div>
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
                            <input type="file" name="file" className="multi" id="fl" multiple/>
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
