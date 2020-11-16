import Home from "../pages/Home";
import StLogin from "../pages/StLogin";
import StSignUp from "../pages/StSignUp";
import UserDashboard from "../pages/UserDashboard";
import TeacherDashboard from "../pages/TeacherDashboard";

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
        path:'/userdashboard',
        components: () => <UserDashboard/>    
    },{
        path:'/teacherdashboard',
        components: () => <TeacherDashboard/>
    }
]