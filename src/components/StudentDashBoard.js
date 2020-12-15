import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { activeAccount } from '../actions';

export default function StudentDashBoard() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(activeAccount());
    },[]);
    return (
        <div>
            <h1>Osada</h1>
        </div>
    )
}
