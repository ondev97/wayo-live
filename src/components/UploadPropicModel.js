import React, { useRef, useState } from 'react';
import { useSpring,animated } from 'react-spring';
import Cropper from 'cropperjs';
import "cropperjs/dist/cropper.min.css";
import '../assets/css/modelStyles.css';
import chi from "../img/cs1.jpg";
import Axios from 'axios';
import { useSelector } from 'react-redux';
import AcDetails from '../utils/hooks/AcDetails';

export default function UploadPropicModel({setshowModel,showModel,filePath,setfilePath,imgObjectURL,setimgObjectURL}) {

    const modelBGref = useRef();
    const imagedRef = useRef();

    const modelBGclick = (e) =>{
        if(modelBGref.current === e.target){
            setshowModel(false);
            setcropHide(false);
            setfilePath('');
            setimageDestination('');
            setimgObjectURL('');
        }
    }
    const clearPR = () =>{
            setfilePath('');
            setimageDestination('');
            setimgObjectURL('');
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

    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

    //upload image
    const HadelUploadImage = (e) =>{
        e.preventDefault();

        let contentType = filePath.type;
        let input = imageDestination.imageDestination.split(',')[1];
        const blob = b64toBlob(input, contentType);


        let form_data = new FormData();
        form_data.append('profile_pic',blob,filePath.name);
        Axios.post(`http://127.0.0.1:8000/account-api/updateteacher/${usDetails.id}/`,form_data,{
            header:{
                'content-type':'multipart/form-data'
            }
        }).then(res=>{
            console.log(res.data);
        }).catch(err=>console.log(err))
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
                            <img alt="" src={imgObjectURL} ref={imagedRef} onLoad={cropfunc}/>
                        </div>
                            <div className={`butbut ${cropHide ? 'disnone' : null}`}>
                                <button onClick={()=>setcropHide(true)}>Crop Profile Image</button>
                            </div>
                        <div className={`preview_container ${!cropHide ? 'disnone' : null}`}>
                            <img className="image_preview" alt="" src={imageDestination.imageDestination}/>
                            <div className="butbut">
                                <form onSubmit={HadelUploadImage}>
                                    <button>Upload Profile Picture</button>
                                </form>
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
