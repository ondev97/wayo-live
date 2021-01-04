import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import React, { useRef, useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import rjs from '../../img/rjs.jpg';
import '../../assets/css/student/stcourse.css';
import {useSelector} from "react-redux";
import Axios from "axios";
import CourseSect from "../../components/CourseSect";
import Empty from "../../components/Empty";
import CourseCard from "../../components/student/CourseCard";
import useDebounce from "../../utils/hooks/useDebounce";
import InfiniteScroll from 'react-infinite-scroll-component'
import MyCourseCard from "../../components/student/MyCourseCard";


export default function StSubCourses() {
    const {id} = useParams();
    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);
    const [courseData, setcourseData] = useState([]);
    const [subData, setsubData] = useState({});
    const [nextPage, setnextPage] = useState(null);
    const [isShowDes, setisShowDes] = useState(false);
    const [search, setsearch] = useState('');
    const [page, setpage] = useState(1);
    const [isRedirect, setisRedirect] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const debounce = useDebounce();//custom hook

    useEffect(async() => {
        setisLoading(true);
        if(usDetails.key){
            await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/subject_stu/${id}/`,{
                headers:{Authorization:"Token "+usDetails.key}
            }).then(res=>{
                setisLoading(false);
                if(res.data){
                    setsubData({...subData,'sub_name':res.data.subject_name,'sub_cover':res.data.subject_cover,'sub_sdes':res.data.short_description,'description':res.data.description});
                }
            }).catch(err=>{
                if(err.response.data.message){
                    setisRedirect(true);
                }
            })

            await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/enrolledcoursesinsubject/${id}/?page=${page}`,{
                headers:{Authorization:"Token "+usDetails.key}
            }).then(res=>{
                setisLoading(false);
                if(page > 1){
                    setcourseData([...courseData,...res.data.results]);
                }
                else{
                    setcourseData([...res.data.results]);
                }
                setnextPage(res.data.next);
            }).catch(err=>{
                console.log(err);
            })
        }
    }, [usDetails, search, page]);

    const handelSearchSubject = (e) =>{
        const search = e.target.value;
        setpage(1);
        debounce(()=>setsearch(search),1000);
    }
    function next(){
        if(nextPage){
            setpage(page+1);
        }
    }

    return (
        <>
        <div className="ful_manage_course">
            <div className="top_manage_course">
                <img src={process.env.REACT_APP_LMS_MAIN_URL+subData.sub_cover} alt=""/>
                <div className="top_manage_head">
                    <h1>{subData.sub_name}</h1>
                    <h3>{subData.sub_sdes}</h3>
                </div>

                {
                    //subData.description ?
                        <motion.div layout className="down">
                            <motion.i layout className={`fas fa-chevron-down ${isShowDes ? 'up' : ''}`} onClick={()=>setisShowDes(!isShowDes)}></motion.i>
                        </motion.div>
                    //:''
                }
            </div>
            <motion.div layout>
                <AnimateSharedLayout>
                {
                    isShowDes /*&& subData.description*/ ?
                        <div  className="sub_des_show">
                            <p>{subData.description}</p>
                        </div>
                    : ''
                }
                </AnimateSharedLayout>
            </motion.div>
            <div className="st_top_manage_body">
                <div className="st_mange_cos_body">
                    <div className="st_manage_cos_search">
                        <input type="text" name='search' placeholder="Search Courses" onChange={handelSearchSubject}/>
                        <button><i className="fas fa-search"></i></button>
                    </div>
                    <div className="">
                        <InfiniteScroll dataLength={courseData.length} next={next} hasMore={true} className='st_manage_course_grid'>
                            {
                                courseData.length !== 0 ?
                                        courseData.map((cdata,index)=> <MyCourseCard key={index} course_cover={cdata.course_cover} enrollkey={cdata.enroll_key} course_name={cdata.course_name} price={cdata.price} duration={cdata.duration} created_at={cdata.created_at} courseid={cdata.id} no={index}/>)
                                :  <Empty target='No Courses'/>
                            }
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
