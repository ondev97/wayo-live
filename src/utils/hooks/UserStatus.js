import Axios from 'axios';
import { useLayoutEffect, useState } from 'react'

function UserStatus() {

    //checking local storage have a data
    const localStorageCheck =() =>{
        if(Object.keys(JSON.parse(localStorage.getItem("usValues"))).length === 0){
            return (false);
        }
        else{
            return (true);
        }
    }

    const [log, setlog] = useState(true);

    const hadelLogOut = () =>{
        if(Object.keys(JSON.parse(localStorage.getItem("usValues"))).length !== 0){
            localStorage.setItem("usValues",JSON.stringify({}));

            Axios.delete('http://127.0.0.1:8000/account-api/logout/',{
                headers: {Authorization: "Token 5cdcd4229192470ffb9b43b514245181d9dd6e24"}
            }).then(res=>{
                console.log(res);
            }).catch(e=>{
                console.log(e);
            })
        }
        setlog(false);
    }

    useLayoutEffect(() => {
        if (!localStorageCheck()) {
            setlog(false);
        }
    })

    return ([log,hadelLogOut])
}

export default UserStatus
