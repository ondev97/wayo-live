import Home from "../pages/Home";
import StLogin from "../pages/StLogin";
import StSignUp from "../pages/StSignUp";
import UserDashboard from "../pages/UserDashboard";
import TeacherDashboard from "../pages/TeacherDashboard";
import StudentDashBoard from "../components/StudentDashBoard";

export default [
    {
        path:'/',
        exact:true,
        components: () =><Home/>
    },{
        path:'/stlogin',
        components: () =><StLogin/>
    },{
        path:'/stsignup',
        components: () =><StSignUp/>
    },{
        path:'/teacherdashboard',
        components: () => <TeacherDashboard/>
    },{
        path:'/studentdashboard',
        components:()=> <StudentDashBoard/>
    }
]