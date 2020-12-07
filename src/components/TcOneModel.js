import React from 'react';

export default function TcOneModel({name,msg,moduleFiles,id}) {
    return (
        <div className="al_on_model">
            <div className="on_model_head">
                <h1>{name}</h1>
                <div className="heads_buts">
                    <button><i className="fas fa-edit"></i></button>
                    <button><i className="fas fa-trash"></i></button>
                </div>
            </div>
            <div className="on_model_body">
                {
                    msg &&
                        <div className="model_body_row">
                            <p>{msg}</p>
                        </div>
                }
                {
                    moduleFiles.length !== 0 ? 

                        moduleFiles.map((files)=>(
                            parseInt(Object.keys(files)) === id &&
                            files.[id].map(fl =>(
                                <div className="model_body_row" key={fl.id}>
                                    <p><i className="fas fa-file-word"></i><a href={`${process.env.REACT_APP_LMS_MAIN_URL}${fl.file}`} target="_blank" download>{fl.file_name || fl.id}</a> </p>
                                </div>
                            ))
                        ))

                    : ''
                }
                <div className="model_body_row">
                    <p><i className="fas fa-file-pdf"></i>pdf.pdf</p>
                </div>
                <div className="model_body_row">
                    <p><i className="fas fa-file-image"></i>image.jpg</p>
                </div>
                <div className="model_body_row">
                    <p><i className="fab fa-youtube"></i>Video.mp4</p>
                </div>
                <div className="model_body_row">
                    <p><i className="fas fa-file-powerpoint"></i>ppt.ppt</p>
                </div>
            </div>
        </div>
    )
}
