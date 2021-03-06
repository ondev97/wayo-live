import Home from "../pages/Home";
import InAllSubjects from "../pages/InAllSubjects";
import IndexAllTeachers from "../pages/IndexAllTeachers";
import StSignUp from "../pages/StSignUp";
import StudentDashBoard from "../pages/student/StudentDashBoard";
import TeacherDashboard from "../pages/TeacherDashboard";
import PasswordReset from "../pages/PasswordReset";
import Guidelines from "../pages/Guidelines";
import NotFound from "../pages/NotFound";
import Contactus from "../pages/ContactUs";
import SetNewPassword from "../pages/SetNewPassword";
import Privacy from "../pages/Privacy";

export default [
  {
    path: "/",
    exact: true,
    components: () => <Home />,
  },
  ,
  {
    path: "/contact",
    components: () => <Contactus />,
  },
  {
    path: "/guidelines",
    components: () => <Guidelines />,
  },
  {
    path: "/privacypolicy",
    components: () => <Privacy />,
  },
  {
    path: "/allteachers",
    components: () => <IndexAllTeachers />,
  },
  {
    path: "/upcomingevents",
    components: () => <InAllSubjects />,
  },
  {
    path: "/signup",
    components: () => <StSignUp />,
  },
  {
    path: "/band",
    components: () => <TeacherDashboard />,
  },
  {
    path: "/audiencedashboard",
    components: () => <StudentDashBoard />,
  },
  {
    path: "/passwordreset",
    components: () => <PasswordReset />,
  },
  {
    path: "/password-reset-confirm/:uid/:token",
    components: () => <SetNewPassword />,
  },
  {
    components: () => <NotFound />,
  },
];
