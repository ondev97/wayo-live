import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/header.css'
import child from '../img/child.png'

export default function Header({acDetails}) {
    const headerProPic = ()=>{
        if(acDetails.key){
            return(
                <div className="pro_pic">
                    <div className="ac_details_header">
                        <h3>Ozka</h3>
                        <p>Instructor</p>
                    </div>
                    <Link to="teacherdashboard/teachermaindashboard/">
                        <div className="img">
                            <img src={child} alt=""/>
                        </div>
                    </Link>
                </div>
            )
        }
        else{
            return(
                <div className="buttons">
                    <Link to="/stlogin">
                        <button>LOG IN</button>
                    </Link>
                    <Link to="/stsignup">
                        <button>SIGN UP</button>
                    </Link>
                </div>
            )
        }
    }


    return (
        <nav>
            <div className="column">
                <div className="hlogo">
                    <Link to="/">
                        <h1><span>OnDev</span> LMS</h1>
                    </Link>
                </div>
            </div>
            <div className="column">
                <div className="navigation">
                    <ul>
                        <li>
                            <Link to="/">HOME</Link>
                        </li>
                        <li>ABOUT US</li>
                        <li>CONTACT US</li>
                        <li>TEACHERS</li>
                        <li>COURSES</li>
                    </ul>
                </div>
            </div>
            <div className="column">
                {
                    headerProPic()
                }
            </div>
        </nav>
    )
}
