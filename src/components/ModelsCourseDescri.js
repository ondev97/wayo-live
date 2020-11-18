import React from 'react'
import ModelPreviewAllStudents from '../components/ModelPreviewAllStudents';
import cs1 from '../img/cs1.jpg';

export default function ModelsCourseDescri() {
    return (
        <div>
            <div className="course_desc_head">
                <div className="course_pic">
                    <img src={cs1} alt=""/>
                    <div className="cos_options">
                        <button title="Edit This Course"><i className="fas fa-pencil-alt"></i>Edit Course</button>
                        <button title="Delete This Course"><i className="fas fa-trash-alt"></i>Delete Course</button>
                    </div>
                </div>
                <h2>React Basic Components</h2>
                <h3>1 day ago</h3>
            </div>
            <div className="course_desc_body">
                <div className="course_short_desc">
                    <h3>Course Description</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quod quae id dignissimos porro sequi reprehenderit velit beatae! Voluptates eum fuga ducimus ad officiis ipsum temporibus deserunt suscipit blanditiis nisi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta totam eius asperiores rerum? Quis repudiandae saepe est dolore, asperiores maiores, voluptates adipisci ea praesentium beatae iure distinctio quas possimus facilis?</p>
                </div>
                <div className="course_all_student">
                    <h3>Students</h3>
                    <ModelPreviewAllStudents/>
                </div>
            </div>
        </div>
    )
}
