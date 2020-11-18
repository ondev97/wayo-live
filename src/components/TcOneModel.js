import React from 'react'

export default function TcOneModel() {
    return (
        <div className="al_on_model">
            <div className="on_model_head">
                <h1>Chapter 01 - Creating Boiler Plate</h1>
                <div className="heads_buts">
                    <button><i className="fas fa-edit"></i></button>
                    <button><i className="fas fa-trash"></i></button>
                </div>
            </div>
            <div className="on_model_body">
                <div className="model_body_row">
                    <p>This Message For All Students</p>
                </div>
                <div className="model_body_row">
                    <p><i className="fas fa-file-word"></i>word.dox</p>
                </div>
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
