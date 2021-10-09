import React from "react";
import "../assets/css/guidelines.css";
import step01 from "../img/guide/01.jpeg";
import step02 from "../img/guide/02.PNG";
import step03 from "../img/guide/03.PNG";
import step04 from "../img/guide/04.jpeg";
import step05 from "../img/guide/05.jpeg";
import step06 from "../img/guide/06.jpeg";

export default function Guidelines() {
  return (
    <div className="mainContainerGuide">
      <div className="mainGuide">
        <div className="step">
          <div className="stephead">
            <h1>Step 01</h1>
          </div>
          <div className="imageSec">
            <img src={step01} alt="step 01" />;
          </div>
          <p>
            මේ වනවිටත් username සහ password ඔබ සතුව පවතීනේ එම username සහ
            password ඒ අයුරින්ම නිවැරදිව මෙහි ඇතුලත් කරන්න.
          </p>
        </div>
        <div className="step">
          <div className="stephead">
            <h1>Step 02</h1>
          </div>
          <p>
            ඉන්පසු ඔබට පහත සදහන් ආකොරමේ Form එකක් දිස්වනු ඇත. එහි ඔබගේ තොරතුරු
            නිවැරදිව සදහන් කරන්න.
          </p>
          <div className="guideRow">
            <div className="imageSec">
              <img src={step02} alt="step 02" style={{ width: "90%" }} />;
            </div>
            <div>
              <p>
                ඔබමේ ජංගම දුරකථන අංකයට මුලින්; 0 මවනුවට 94 මෙලස ලබොදීම අනිවොර්ය
                වේ.
              </p>
              <p>
                උදාහරණය - <br />
                <span>
                  ඔබමේ ජංගම දුරකථන අංකය 0714563390 නම් එය ඇතුලත් කලයුතු ආකාරය -
                  94714563390
                </span>
              </p>
            </div>
          </div>
          <p>
            Email ලිපිනය ඇතුලත් කිරීමේදී හැකි සෑමවිටම වලංගු email ලිපිනයක්
            ඇතුලත් කිරීමට උත්සහ කරන්න. ජංගම දුරකථන අංකය ලෙස ඔබ සතුව මේ මෙහොතේ
            පවතින වලංගු ජංගම දුරකථන අංකයක් නිවැරදිව සදහන් කිරීම අනිවොර්ය වේ. එම
            දුරකථන අංකයට ඉලක්කේ 6කින් යුතු OTP (One Time Password) එක පැමිනේ.
            මෙම OTP එක ඔබට පැමිනෙනුයේ පළමු log වීමේදී පමණි. ඔබ භාවිතා කරන දුරකථන
            සේබන්දතොවය මත එම OTP පණිවිඩය ලැබීමට ගතවන කොලය වෙනස් විය හැක.
            (මිනිත්තු 1-5)
          </p>
        </div>
        <div className="step">
          <div className="stephead">
            <h1>Step 03</h1>
          </div>
          <p>
            ඔබ ලබොදුන් ජංගම දුරකථන අංකය නිවැරදිනම් "YES" Button මත click කරන්න.
            ඔබ ලබොදුන් ජංගම දුරකථන අංකය මොරුකිරීමට හෝ නිවැරදි කිරීමට අවශ්‍යනම්
            පමෙනක් "NO" Button මත click කර එය නිවැරදි කරන්න.{" "}
          </p>
          <div className="imageSec">
            <img src={step03} alt="step 03" style={{ width: "50%" }} />
          </div>
        </div>
        <div className="step">
          <div className="stephead">
            <h1>Step 04</h1>
          </div>
          <p>
            ඉන්පසු ඔබ නැවත Login Form වෙත පැමින. ඔබ නැවත එහි "Login" Button එක
            මත click කරන්න.
          </p>
          <div className="imageSec">
            <img src={step04} alt="step 04" />;
          </div>
        </div>
        <div className="step">
          <div className="stephead">
            <h1>Step 05</h1>
          </div>
          <p>
            අප කලින් සදහන් කල පරිදි ඔබමේ දුරකතන අංකයට පැමිමෙන OTP පණිවිඩමයහි
            සදහන් ඉලක්කේ 6 කින් යුත් code (කේතය) ඇතුලත් කර "Validate" යන Button
            එක click කරන්න.
          </p>
          <div className="imageSec">
            <img src={step05} alt="step 05" />;
          </div>
        </div>
        <div className="step">
          <div className="stephead">
            <h1>Step 06</h1>
          </div>
          <p>දැන් ඔබ WAYO.LIVE ගිණුම සාර්ථකව පිහිටුවා ඇත.</p>
          <div className="imageSec">
            <img src={step06} alt="step 06" />;
          </div>
        </div>
      </div>
    </div>
  );
}
