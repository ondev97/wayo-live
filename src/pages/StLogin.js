import React, { useEffect } from "react";
import StLoginForm from "../components/StLoginForm";
import logo from "../img/Logo_1.png";
import { useDispatch } from "react-redux";
import { activeAccount } from "../actions";
import "../assets/css/stlogin.css";
import "../assets/css/mediaFiles/loginRegister.css";
import { Link } from "react-router-dom";

export default function StLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activeAccount());
  }, [dispatch]);

  return (
    <>
      <div className="login_body">
        <div className="login_column">
          <div className="login_form">
            <div className="topSign">
              <h2>Login</h2>
              <p>
                Access the ජාතික පාසල Dashboard using your Username (Class
                Number) and Password.
              </p>
            </div>
            <StLoginForm />
          </div>
        </div>
        <div className="login_column">
          <div className="image_login">
            <img src={logo} alt="" />
          </div>
          <div className="image_content">
            <h3>
              ජාතික පාසල provides facilities in a higher manner to the Sri
              Lankan educational sector. All the courses are being conducted by
              leading and fully qualified panel of teachers in the Island. With
              the direct guidance of the teachers, students follow their
              syllabus. At ජාතික පාසල, conduct online examinations and will be
              assessed the student’s progress accordingly.
            </h3>
          </div>
        </div>
      </div>
      {/* <div className="ins-cont">
        <h3>
          ජාතික පාසල සදහා log වීමේදී "Unable to log in with provided
          credentials" ලෙස error message එකක් පැමිණීම.
        </h3>
        <p>
          ඔබ ජාතික පාසල සදහා log වීමට ප්‍රථම ඔබට Eyekon eClass student account
          එකක් තිබිය යුතුය. ඒ සදහා institute වෙත ඔබගේ අනන්‍යතාවය තහවුරු කර ඔබගේ
          student account එක ලබාගන්න.{" "}
          <span className="red">
            ලියාපදිංචි වීමේදී Username (Class Number) ලෙස ඔබගේ institute එකෙන්
            ඔබට ලබාදෙන ඔබටම අනන්‍ය වූ අංකය පමණක් භාවිතා කිරීම අනිවාර්ය වේ. (EX:
            23A011). ඉන් පරිබාහිරව ලබාදෙන username සහිත සියලු student accounts
            ස්වයංක්‍රියව අප පද්ධතියෙන් ඉවත් වේ.
          </span>
        </p>
        <p>
          මෙම ගැටලුවට හේතුව වනුයේ, ඔබ විසින් ඔබගේ student account සදහා log වීමට
          භාවිත කරන ලද username (class number) හෝ password එකෙහි කුමන හෝ දෝෂයක්
          පැවතීමයි. එම තොරතුරු නිවැරදි දැයි හොදින් පරීක්ෂා කර නැවත වරක් log වීමට
          උත්සාහ කරන්න. එහෙත් එම ගැටලුව පවතීනම්, ඔබගේ දැනට පවතින password එක
          අලුත් password එකක් දක්වා වෙනස් (change/reset) කලයුතු වේ. ඒ සදහා ඔබ
          Log In බොත්තම අසල ඇති{" "}
          {<Link to="/passwordreset"> Forgot Password?</Link>} මත click කරන්න.
          ඉන්පසු ඔබ Eyekon eClass account එක සැදීමට භාවිත කරන ලද email ලිපිනය
          ඇතුලත් කරන්න. ඉන්පසු එම email ලිපිනයට password reset link එකක් පැමිණේ.
          එම link එක click කර ඔබට ඔබගේ password එක change කරගත හැක.
        </p>
        <p>
          ඔබට ඉහත සදහන් කරන ලද ආකාරයට password reset කරගැනීමට නොහැකිනම් පමණක් ඒ
          සදහා ඔබට Eyekon staff හි සහය ලබාගැනීමට හැකිය. ඒ සදහා
          {
            <Link to={"//forms.gle/UBf5LTTdWovPFx527"} target="_blank">
              &nbsp;Reset My Password
            </Link>
          }
          &nbsp; මත click කර ලැබෙන form එක නිවැරදිව පුරවා SUBMIT” button එක
          1වරක් click කරන්න. Password reset කිරීමට ඔබ විසින් ඔබගේ username
          (class number) නිවැරදිව ලබාදීම අනිවාර්ය වේ. ඔබ විසින් අප වෙත ලබාදෙන ලද
          username (class number) හි යම් දෝෂයක් පවතීනම් දැනුම්දීමකින් තොරව ඔබගේ
          පණිවිඩය ප්‍රතික්ෂේප කරනු ලැබේ. අප විසින් ඔබගේ password reset කරන්නේනම්
          ඒ සදහා සදහා උපරිම පැය 12ක කාලයක් ගතවනු ඇත. ඔබ විසින් ලබාදෙන නව මුරපදය
          (new password) සුරක්ෂිතව සටහන් කර තබාගන්න. මින් ඉදිරියට ඔබ ඔබගේ
          student account සදහා log වීමට භාවිත කල යුත්තේ එම නව මුරපදයයි (new
          password).
        </p>
      </div> */}
    </>
  );
}
