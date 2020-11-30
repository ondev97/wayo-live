import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../assets/css/coursemanage.css'
import Empty from '../components/Empty'
import ProfileLoader from '../components/ProfileLoader'
import TcMaCourses from '../components/TcMaCourses'

export default function MangeCourse() {

    const [subDetails, setsubDetails] = useState([])
    const [isLoading, setisLoading] = useState(false);
    const [allSubDetail, setallSubDetail] = useState(null);
    const [page, setpage] = useState(1);
    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

    const getAllCourse = async()=>{
        setisLoading(true);
        if(usDetails.key){
            await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/teachersubject/${usDetails.id}/?page=${page}`,{
                headers:{Authorization:"Token " + usDetails.key}
            }).then(res=>{
                setisLoading(false);
                setsubDetails([...subDetails,...res.data.results]);
                setallSubDetail(res.data);
            }).catch(err=>{
                console.log(err);
            })
        }
    }
    useEffect(() => {
        getAllCourse();
    }, [usDetails,page]);

    function next(){
        if(allSubDetail.next){
            setpage(page+1);
        }
    }
    
    return (
        <div className="main_ar_course">
            <div className="course_head">
                <div className="crcs">
                    <Link to='/teacherdashboard/createsubject/'>
                        <h2>Create Subject</h2>
                    </Link>
                </div>
                <div className="search">
                    <input type="text" name="search" placeholder="Search Your Courses"/>
                    <button><i className="fas fa-search"></i></button>
                </div>
            </div>
            <div>
                {
                    allSubDetail !== null &&
                    allSubDetail.count === 0 ?
                        <Empty/>
                    :
                    subDetails && allSubDetail !== null &&
                    <InfiniteScroll dataLength={subDetails.length} next={next} hasMore={true} className='course_body'> 
                        {
                        subDetails.map((det,index)=> <TcMaCourses key={index} id={det.id} subject_name={det.subject_name} subject_cover={det.subject_cover} author={det.author} created_at={det.created_at} description={det.description} short_description={det.short_description} class_type={det.class_type} subject_type={det.subject_type} />)
                        }
                    </InfiniteScroll>
                }
                
            </div>
            {
                    isLoading &&  <ProfileLoader/>
            }
        </div>
    )
}
