import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function UseStprofileUpdate() {

    const [values, setvalues] = useState({firstName:'',lastName:'',userName:'',phoneNumber:'',email:'',address:'',des:'',pw:''});
    const [errors, seterrors] = useState({firstName:'',lastName:'',userName:'',phoneNumber:'',email:'',address:'',des:'',pw:''});
    const [hide, sethide] = useState({firstName:false,lastName:false,userName:false,email:false,phoneNumber:false,phonenumber:false,address:false,des:false,pw:false});
    const [isSibmitting, setisSibmitting] = useState(false);

    const {initialState} = useSelector(state => state.StudentDetails);

    useEffect(() => {
        console.log(initialState);
        //setvalues({...values,firstName:initialState,lastName:'',userName:'',phoneNumber:'',email:'',address:'',des:'',});

    }, [initialState])

    return({values})
}
