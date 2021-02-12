import React, { useEffect, useState } from 'react';
import '../assets/css/viewallsts.css';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useHistory, useParams } from 'react-router-dom';
import Empty from '../components/Empty';
import ViewStuTc from '../components/ViewStuTc';

export default function AllStList() {

     //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);
    const [allstudent, setallstudent] = useState([]);
    const [modelOp, setmodelOp] = useState(false);
    const history = useHistory();
    const {cid} = useParams();

    const getallStude = async () =>{
        if(usDetails){
            await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/students/${cid}/`,{
                headers:{Authorization:'Token '+usDetails.key}
            }).then(res=>{
                console.log(res.data);
                setallstudent([...res.data])
            })
        }
    }

    useEffect(() => {
        getallStude();
    }, [usDetails]);

    const back = () =>{
        history.goBack();
    }

    const viewPr = () =>{
        if(!modelOp){
            setmodelOp(true);
        }
    }

    return (
        <div className="stlist">
            <ViewStuTc setmodelOp={setmodelOp} modelOp={modelOp}/>
            <div className="pageTop">
                <h1>Enrolled Students</h1>
            </div>
            <div className="search_st">
                <button onClick={back}><i className="fas fa-arrow-circle-left"></i> Back to Course</button>
                <div className="search">
                    <input type="text"/>
                    <button><i className="fas fa-search"></i></button>
                </div>
            </div>
            <div className="sttable">
                {
                    allstudent ? 
                        (<table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Profile Picture</th>
                                    <th>Name</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Unenroll</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allstudent.map((data)=>(
                                            <tr key={data.id} onClick={viewPr}>
                                                <td>{data.id}</td>
                                                <td><LazyLoadImage src={data.profile_pic} effect="blur"/></td>
                                                <td>{data.user.first_name+" "+data.user.last_name}</td>
                                                <td>{data.user.username}</td>
                                                <td>{data.user.email}</td>
                                                <td><button><i className="far fa-times-circle"></i></button></td>
                                            </tr>
                                    ))
                                    
                                }
                            </tbody>
                        </table>)
                    : <Empty target="No Students"/>
                }
            </div>

        </div>
    )
}
