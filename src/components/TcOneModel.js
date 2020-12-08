import React from 'react';
import ReactHtmlParser  from 'react-html-parser';

export default function TcOneModel({name,msg,moduleFiles,id}) {

    function filterTags(nodes){
        /*if(nodes.length > 0){
            let re;
            nodes.map(nd=>(
                nd.type ?
                    nd.props.children ?
                        nd.props.children.map(chi=>(
                            chi.type ? 
                                chi.type === 'a'? 
                                    re = <a data={chi.props.href} onClick={geturl}>{chi.props.children}</a>
                                :re=nodes
                            :re=nodes
                        ))
                    : re=nodes  
                : re =nodes
            ))
            return re;
        }*/
        return nodes;
    }

    const geturl = (e) =>{
        console.log(e.target);
    }

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
                            {filterTags(ReactHtmlParser(msg))}
                        </div>
                }
                {
                    moduleFiles.length !== 0 ? 

                        moduleFiles.map((files)=>(
                            parseInt(Object.keys(files)) === id &&
                            Object.values(files)[0].map(fl =>(
                                <div className="model_body_row" key={fl.id}>
                                    <p>
                                        {
                                            fl.file.substring(fl.file.lastIndexOf('.')+1) === 'jpg' || fl.file.substring(fl.file.lastIndexOf('.')+1) === 'png' || fl.file.substring(fl.file.lastIndexOf('.')+1) === 'jpeg' ?
                                                        <i className="fas fa-file-image"></i>
                                            : fl.file.substring(fl.file.lastIndexOf('.')+1) === 'pdf' ?
                                                        <i className="fas fa-file-pdf"></i>
                                            : fl.file.substring(fl.file.lastIndexOf('.')+1) === 'pptx' || fl.file.substring(fl.file.lastIndexOf('.')+1) === 'pptm' || fl.file.substring(fl.file.lastIndexOf('.')+1) === 'ppt' ?
                                                        <i className="fas fa-file-powerpoint"></i>
                                            : fl.file.substring(fl.file.lastIndexOf('.')+1) === 'mp4' || fl.file.substring(fl.file.lastIndexOf('.')+1) === 'mkv' ?
                                                        <i className="fab fa-youtube"></i>
                                            : fl.file.substring(fl.file.lastIndexOf('.')+1) === 'mp3' ?
                                                        <i className="far fa-file-audio"></i>
                                            : fl.file.substring(fl.file.lastIndexOf('.')+1) === 'xlsx' || fl.file.substring(fl.file.lastIndexOf('.')+1) === 'xlsb' ?
                                                    <i className="far fa-file-excel"></i>
                                            : fl.file.substring(fl.file.lastIndexOf('.')+1) === 'html' ?
                                                    <i className="fab fa-html5"></i>
                                            : fl.file.substring(fl.file.lastIndexOf('.')+1) === 'css'?
                                                    <i className="fab fa-css3-alt"></i>
                                            : fl.file.substring(fl.file.lastIndexOf('.')+1) === 'js' ?    
                                                    <i className="fab fa-js-square"></i>
                                            : <i className="far fa-file-alt"></i>
                                        } 
                                        <a href={`${process.env.REACT_APP_LMS_MAIN_URL}${fl.file}`} target="_blank" download>{fl.file_name || fl.id}</a> </p>
                                </div>
                            ))
                        ))

                    : ''
                }
            </div>
        </div>
    )
}
