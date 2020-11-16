import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { activeAccount } from '../actions';

export default function UserDashboard() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(activeAccount());
      },[])
    return (
        <div>
            
        </div>
    )
}
