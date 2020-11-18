import React, { useRef, useState } from 'react';
import { useSpring,animated } from 'react-spring';
import Cropper from 'cropperjs';
import "cropperjs/dist/cropper.min.css";
import '../assets/css/modelStyles.css';
import chi from "../img/cs1.jpg";

export default function UploadPropicModel({setshowModel,showModel,filePath,setfilePath}) {

    const modelBGref = useRef();
    const imagedRef = useRef()

    const modelBGclick = (e) =>{
        if(modelBGref.current === e.target){
            setshowModel(false);
            setcropHide(false);
            setfilePath('');
            setimageDestination('');
        }
    }
    const clearPR = () =>{
            setfilePath('');
            setimageDestination('');
    }

    //animations
    const modelAni = useSpring({
        config:{
            duration:350
        },
        opacity:showModel ? 1 : 0
    })

    const [imageDestination, setimageDestination] = useState('');
    const [cropHide, setcropHide] = useState(false);

    const cropfunc =  () =>{
        const cropper = new Cropper(imagedRef.current, {
            aspectRatio: 1 / 1,
                crop() {
                    const canvas = cropper.getCroppedCanvas();
                    setimageDestination({imageDestination:canvas.toDataURL("image/png")});
                }
        });

    }

    //upload image
    const HadelUploadImage = () =>{
        console.log("submit");
    }
    
    return (
        <>
        {
            showModel ? 
            <div className="model_page" ref={modelBGref} onClick={modelBGclick}>
                <animated.div style={modelAni}>
                <div className="on_model_page">
                    <div className="close_but">
                        <button onClick={()=>{setshowModel(!showModel);setcropHide(false);clearPR()}}><i className="fas fa-times"></i></button>
                    </div>
                    <div className="model_content">
                        <div className={`image_crop_container ${cropHide ? 'disnone' : null}`}>
                            <img alt="" src={filePath} ref={imagedRef} onLoad={cropfunc}/>
                        </div>
                            <div className={`butbut ${cropHide ? 'disnone' : null}`}>
                                <button onClick={()=>setcropHide(true)}>Crop Profile Image</button>
                            </div>
                        <div className={`preview_container ${!cropHide ? 'disnone' : null}`}>
                            <img className="image_preview" alt="" src={imageDestination.imageDestination}/>
                            <div className="butbut">
                                <button onClick={HadelUploadImage}>Upload Profile Picture</button>
                            </div>
                        </div>
                    </div>
                </div>
                </animated.div>
            </div>
            : null
        }
        </>
    )
}
