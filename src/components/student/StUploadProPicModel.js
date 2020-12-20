import React, { useRef, useState } from 'react';
import { Cropper } from 'react-cropper';
import { useSpring,animated } from 'react-spring';

export default function StUploadProPicModel({showModel,setshowModel,filePath,setfilePath,imgObjectURL,setimgObjectURL,image,getCropData,setCropper,cropData,err,setImage,setCropData}) {
    
    const modelBGref = useRef();
    const [cropHide, setcropHide] = useState(false);
    const [uploadPresentage, setuploadPresentage] = useState(0);

    const modelBGclick = (e) =>{
        if(modelBGref.current === e.target){
            setshowModel(false);
            setcropHide(false);
            setfilePath('');
            setCropData('#');
        }
    }
    const clearPR = () =>{
        setfilePath('');
        setCropData('#');
    }
     //animations
     const modelAni = useSpring({
        config:{
            duration:350
        },
        opacity:showModel ? 1 : 0
    });
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

    //upload image
    const HadelUploadImage = (e) =>{
        e.preventDefault();

        let contentType = filePath.type;
        let input = cropData.split(',')[1];
        const blob = b64toBlob(input, contentType);

        let form_data = new FormData();
        form_data.append('profile_pic',blob,filePath.name);
    }

    return (
        <>
        {
            showModel ? 
            <div className="model_page" ref={modelBGref} onClick={modelBGclick}>
                <animated.div style={modelAni}>
                <div className="on_model_page">
                    <div className="close_but">
                        {
                            uploadPresentage === 0 &&
                                <button onClick={()=>{setshowModel(!showModel);setcropHide(false);clearPR()}}><i className="fas fa-times"></i></button>
                        }
                    </div>
                    <div className="model_content">
                        <div className={`image_crop_container ${cropHide ? 'disnone' : null}`}>
                                <Cropper
                                    style={{ height: '100%', width: "100%" }}
                                    initialAspectRatio={16 / 9}
                                    aspectRatio={1 / 1}
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
                        {
                            image !== '#' && image !== ''?
                            <div className={`butbut ${cropHide ? 'disnone' : null}`}>
                                <button onClick={(e)=>{getCropData(e);setcropHide(true)}}>Crop Profile Image</button>
                            </div>
                            :''
                        }
                        <div className={`preview_container ${!cropHide ? 'disnone' : null}`}>
                            <div className="loader">
                                <svg>
                                    <circle cx="150" cy="150" r="150"></circle>
                                    <circle cx="150" cy="150" r="150" style={{strokeDashoffset:`calc(972 - (972 * ${uploadPresentage}) / 100)`}}></circle>
                                </svg>
                                <div className="imgwrap">
                                    <img className="image_preview" alt="" src={cropData}/> 
                                </div>
                            </div>
                            <div className="butbut">
                                {
                                    uploadPresentage === 0 ?
                                                <form onSubmit={HadelUploadImage}>
                                                    <button>Upload Profile Picture</button>
                                                </form>
                                    : 
                                <h1 className="count">Uploading {uploadPresentage}%</h1>
                                }
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
