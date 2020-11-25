import React from 'react'
import ThreeStepSection from '../components/ThreeStepSection'

function CreateModels() {
    return (
        <div className="subject_form">
            <ThreeStepSection set="acm"/>
            <div className="main_form">
                <h1>Create Module</h1>
                <form>
                    <p>
                        <label htmlFor="mn">Module Name</label>
                        <input type="text" id="mn"/>
                    </p>
                    <p>
                        <label htmlFor="msg">Message</label>
                        <textarea name="msg" id="msg" rows="10"></textarea>
                    </p>
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

export default CreateModels
