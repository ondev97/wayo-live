import React from "react";

function RegisterInfo() {
  return (
    <div className="regi_ins">
      <div className="regi_head">
        <h1>ලියාපදිංචි වීම සදහා උපදෙස්</h1>
      </div>
      <div className="regi_body">
        <section>
          <p>
            Username (Class Number) ලෙස ඔබගේ institute එකෙන් ඔබට ලබාදෙන ඔබටම
            අනන්‍ය වූ අංකය භාවිතා කිරීම අනිවාර්ය වේ. (EX: <b>23A011</b>). ඉන්
            පරිබාහිරව ලබාදෙන username සහිත සියලු student accounts ස්වයංක්‍රියව
            අප පද්ධතියෙන් ඉවත් වේ.
          </p>
        </section>
        <section>
          <p>
            Email ලෙස ඔබ සතුව ඇති වලංගු email ලිපිනයක් පමණක් ලබාදෙන්න. Password
            reset කිරීමකදී password reset link එක ඔබ විසින් ලබාදී ඇති email
            ලිපිනයට පැමිණේ.
          </p>
          <p>
            Password ලෙස ඉලක්කම්, අකුරු වලින් යුත් strong password එකක් භාවිතා
            කරන්න.
          </p>
          <p>
            ඔබ විසින් ලබාදෙන password එකෙහි අවම වශයෙන් අක්ෂර 8 ක් වත් තිබිය
            යුතුය.
          </p>
          <p>
            ඔබ විසින් ලබාදෙන password එකෙහි ඉලක්කම් පමණක් අඩංගු නොවිය යුතුය.
          </p>
        </section>
      </div>
    </div>
  );
}

export default RegisterInfo;
