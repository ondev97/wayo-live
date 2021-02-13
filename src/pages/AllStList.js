import React, { useEffect, useState } from 'react';
import '../assets/css/viewallsts.css';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useHistory, useParams } from 'react-router-dom';
import Empty from '../components/Empty';
import ViewStuTc from '../components/ViewStuTc';
import { store } from 'react-notifications-component';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function AllStList() {

     //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);
    const [allstudent, setallstudent] = useState([]);
    const [allDetailSt, setallDetailSt] = useState(null);
    const [modelOp, setmodelOp] = useState(false);
    const [unEnrol, setunEnrol] = useState(false);
    const [stPrDetail, setstPrDetail] = useState([]);
    const [page, setpage] = useState(1);
    const history = useHistory();
    const {cid} = useParams();

    const getallStude = async () =>{
        if(usDetails){
            await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/students/${cid}/?page=${page}`,{
                headers:{Authorization:'Token '+usDetails.key}
            }).then(res=>{
                setallDetailSt(res.data);
                setallstudent([...allstudent,...res.data.results])
            })
        }
    }

    useEffect(() => {
        getallStude();
    }, [usDetails,unEnrol,page]);
    /*model page*/
    const back = () =>{
        history.goBack();
    }
    /*model page*/
    const viewPr = (id) =>{
        if(!modelOp){
            setmodelOp(true);
            /*get studet details */
            Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/account-api/stuprofile/${id}/`,{
                headers:{Authorization:'Token '+usDetails.key}
            }).then(res=>{
                setstPrDetail(res.data);
            }).catch(err=>{
                console.log(err);
            })
        }
    }

    /*Student Unenrolled*/
    const unEnrolSt = async (id)=>{
        if(window.confirm("Are You Sure?")){
            await Axios.delete(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/unenroll/${cid}/${id}/`,{
                headers:{Authorization:'Token ' + usDetails.key}
            }).then(()=>{
                setunEnrol(!unEnrol);
                store.addNotification({
                    title: `Unenrolled Successfully`,
                    message: "Eyekon eClass",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 2000,
                      onScreen: true,
                      pauseOnHover: true,
                      showIcon:true
                    },
                    width:400
                });
                
            }).catch(err=>{
                console.log(err);
            })
        }
    }
    function next(){
        if(allDetailSt.next){
            console.log(page);
            setpage(page+1);
        };
    }


    return (
        <div className="stlist">
            <ViewStuTc setmodelOp={setmodelOp} modelOp={modelOp} stPrDetail={stPrDetail} setstPrDetail={setstPrDetail}/>
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
            {
                allDetailSt !== null ?
            <div className="sttable">
                {
                    allstudent ? 
                        (
                            <InfiniteScroll dataLength={allDetailSt.count} next={next} hasMore={true}>
                            <table>
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
                                        <tr key={data.id}>
                                                <td onClick={()=>viewPr(data.user.id)}>{data.id}</td>
                                                <td onClick={()=>viewPr(data.user.id)}><LazyLoadImage src={data.profile_pic} effect="blur"/></td>
                                                <td onClick={()=>viewPr(data.user.id)}>{data.user.first_name+" "+data.user.last_name}</td>
                                                <td onClick={()=>viewPr(data.user.id)}>{data.user.username}</td>
                                                <td onClick={()=>viewPr(data.user.id)}>{data.user.email}</td>
                                                <td>
                                                    <button onClick={()=>unEnrolSt(data.id)}><i className="far fa-times-circle"></i></button>
                                                </td>
                                            </tr>
                                    ))
                                    
                                }
                            </tbody>
                        </table>
                        </InfiniteScroll> 
                        )
                        : <Empty target="No Students"/>
                    }
            </div>
                    : ''
            }

        </div>
    )
}
