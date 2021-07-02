import React from "react";
import userOne from "../img/user/1.PNG";
import userTwo from "../img/user/2.PNG";
import userThree from "../img/user/3.PNG";
import userFour from "../img/user/4.PNG";
import userFive from "../img/user/5.PNG";
import userSix from "../img/user/6.PNG";
import "../assets/css/userGuide.css";

function UserGuide() {
  return (
    <div className="user-main-container">
      <section>
        <div className="image">
          <img src={userOne} alt="user guide" />
        </div>
        <div className="content">
          <h1>Enter your provided username and password to login to it. </h1>
          <h1>
            If you unable to login it is using given password, please contact
            the relevant Support Team member.
          </h1>
        </div>
      </section>
      <section>
        <div className="image">
          <img src={userTwo} alt="user guide" />
        </div>
        <div className="content">
          <h1>Select WAYO under the Select your favorite band section.</h1>
        </div>
      </section>
      <section>
        <div className="image">
          <img src={userThree} alt="user guide" />
        </div>
        <div className="content">
          <h1>
            Please select the relevant Event by clicking the VIEW EVENT button
            under the all-event section.
          </h1>
        </div>
      </section>
      <section>
        <div className="image">
          <img src={userFour} alt="user guide" />
        </div>
        <div className="content">
          <h1>
            You can view the event in a detail format and JOIN EVENT button will
            display on your right-hand top. Please click it.
          </h1>
          <h1>You will redirect to the live streaming session now.</h1>
        </div>
      </section>
      <section>
        <div className="image">
          <img src={userFive} alt="user guide" />
          <div className="one">1</div>
          <div className="two">2</div>
          <div className="three">3</div>
        </div>
        <div className="content">
          <h1>
            You can select the full screen button for the better experience by
            clicking this icon.
          </h1>
          <h1>
            Focusing your internet bandwidth, you can select the relevant
            quality by cling this icon.
          </h1>
          <h1>You can control your volume by clicking this icon.</h1>
        </div>
      </section>
      <section>
        <div className="content">
          <h1 style={{ color: "red" }}>Special Note:</h1>
          <h1>
            If you try to login from the different devices with same login you
            need to clear the existing session using below screen.
          </h1>
        </div>
        <div className="image">
          <img src={userSix} alt="user guide" />
        </div>
        <div className="content">
          <h1>
            Once you click this clear login session button existing sessions are
            disconnected, and you can get a notification to login.
          </h1>
        </div>
      </section>
    </div>
  );
}

export default UserGuide;
