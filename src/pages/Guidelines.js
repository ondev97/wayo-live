import React from "react";
import "../assets/css/guidelines.css";
import step01 from "../img/guide/01.jpeg";
import step02 from "../img/guide/02.PNG";
import step03 from "../img/guide/03.PNG";
import step04 from "../img/guide/04.jpeg";
import step05 from "../img/guide/05.jpeg";
import step06 from "../img/guide/06.jpeg";
import step07 from "../img/guide/07.jpeg";

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
            ඉන්පසු ඔබට පහත සදහන් ආකොරයේ Form එකක් දිස්වනු ඇත. එහි ඔබගේ තොරතුරු
            නිවැරදිව සදහන් කරන්න.
          </p>
          <div className="guideRow">
            <div className="imageSec">
              <img src={step02} alt="step 02" style={{ width: "90%" }} />;
            </div>
            <div>
              <p>
                ඔබමේ ජංගම දුරකථන අංකයට මුලින්; 0 මවනුවට 94 ලෙස ලබාදීම අනිවාර්යය
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
            පවතින වලංගු ජංගම දුරකථන අංකයක් නිවැරදිව සදහන් කිරීම අනිවාර්ය වේ. එම
            දුරකථන අංකයට ඉලක්කම් 6කින් යුතු OTP (One Time Password) එක පැමිනේ.
            මෙම OTP එක ඔබට පැමිනෙනුයේ පළමු log වීමේදී පමණි. ඔබ භාවිතා කරන දුරකථන
            සම්බන්දතාවය මත එම OTP පණිවිඩය ලැබීමට ගතවන කාලය වෙනස් විය හැක.
            (මිනිත්තු 1-5)
          </p>
        </div>
        <div className="step">
          <div className="stephead">
            <h1>Step 03</h1>
          </div>
          <p>
            ඔබ ලබාදුන් ජංගම දුරකථන අංකය නිවැරදිනම් "YES" Button මත click කරන්න.
            ඔබ ලබාදුන් ජංගම දුරකථන අංකය මාරුකිරීමට හෝ නිවැරදි කිරීමට අවශ්‍යනම්
            පමනක් "NO" Button මත click කර එය නිවැරදි කරන්න.{" "}
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
            අප කලින් සදහන් කල පරිදි ඔබමේ දුරකතන අංකයට පැමිනෙන OTP පණිවිඩය සදහන්
            ඉලක්කේ 6 කින් යුත් code (කේතය) ඇතුලත් කර "Validate" යන Button එක
            click කරන්න.
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
        <div className="step">
          <div className="stephead">
            <h1>Step 07</h1>
          </div>
          <div className="imageSec">
            <img src={step07} alt="step 07" />;
          </div>
          <p>
            ඔබ ඔබගේ WAYO.LIVE user account හි username සහ password කිසිවිටෙකත්
            තවත් තෙවන පාර්ශවයක් වෙත ලබා නොදිය යුතුය. එලෙසම ඔබ ඔබගේ user account
            එක සදහා කිසිම විටෙක එකවර device 2කින් log නොවිය යුතුය. ඔබගේ user
            account වෙත තවත් අයෙක් log වී සිටිනම් හෝ ඔබට පෙර අවස්ථාවේ logout
            වීමට අතපසුවී නැවත log වීමට යාමේදී "Someone is already logged into
            this account" ලෙස error message එකක් පැමිණේ. එනම් ඔබගේ account එක
            තාවකාලිකව lock වීමක් සිදුවේ.
          </p>
          <p>
            මෙයට විසදුම ලෙස, ඔබගේ account එක unlock කරගැනීම සදහා "Clear Login
            Session" මත click කර ඔබ register වීමට භාවිත කල ජංගම දුරකථන අංකය
            ඇතුලත් කරන්න. එවිට ඔබගේ ජංගම දුරකථනයට "OTP" පණිවිඩයක් පැමිණේ. එහි
            සදහන් කේතය භාවිත කරන ඔබගේ user account එක unlock කරගන්න.
          </p>
        </div>
      </div>
    </div>
  );
}
