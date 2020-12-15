import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {activeAccount} from '../actions'
import { loadStDetails } from '../actions/stDetailsAction';

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(activeAccount());
        dispatch(loadStDetails());
      },[dispatch])

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}
