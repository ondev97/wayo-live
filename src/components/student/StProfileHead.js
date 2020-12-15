import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStDetails } from '../../actions/stDetailsAction';

export default function StProfileHead() {
    const {initialState} = useSelector(state => state.StudentDetails);

    return (
        <div>
      <div className="profil_box">
        <div className="srow">
          <h2>{`${initialState && initialState.user.first_name} ${initialState && initialState.user.last_name}`}</h2>
          <p>Student</p>
          <div className="srow_pro_pic">
            <img src={`#`} alt="" />
            <label htmlFor="uppic" >
            <i className="fas fa-camera"></i>
            </label>
            <input type="file" id="uppic" />
          </div>
        </div>
        <div className="brow">
          <div className="brow_info">
            <p>
              
            </p>
            <p>
              <i className="fas fa-phone-alt"></i>
              {initialState && initialState.user.phone_no}
            </p>
          </div>
          <div className="tous">
            <div className="coscount">
              <h3>20</h3>
              <p>Subject</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
