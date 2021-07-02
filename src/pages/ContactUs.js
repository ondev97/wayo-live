import React from "react";
import location from "../img/contact/placeholder.png";
import phone from "../img/contact/phone-call.png";
import youtube from "../img/contact/youtube.png";
import facebook from "../img/contact/facebook.png";
import insta from "../img/contact/instagram.png";
import apple from "../img/contact/appleM.png";
import spotify from "../img/contact/spotify.png";
import { Link } from "react-router-dom";
import "../assets/css/student/contactAudi.css";

function ContactUs() {
  return (
    <div className="homeCont">
      <div className="main_container">
        <div className="contact_row">
          <div className="contact_column">
            <div className="image">
              <h1>
                Contact us at any time without any hesitation. <br />
                Follow us on social media.
              </h1>
            </div>
          </div>
          <div className="contact_column">
            <div className="innerContact">
              <div className="icon">
                <img src={location} alt="location" />
              </div>
              <div className="content">
                <p>
                  No. 231/2, Batapotha, Madelgamuwa, Gampaha,
                  <br /> Sri Lanka
                </p>
              </div>
            </div>
          </div>
          <div className="contact_column">
            <div className="innerContact">
              <div className="icon">
                <img src={phone} alt="location" />
              </div>
              <div className="content">
                <p>+9477 755 4000</p>
              </div>
            </div>
          </div>
        </div>
        <div className="contact_second_row">
          <div className="second_cont_column">
            <h1>YOUTUBE</h1>
            <img src={youtube} alt="youtube" />
            <Link to="//www.youtube.com/c/Wayolk" target="__blank">
              <button>FOLLOW US</button>
            </Link>
          </div>
          <div className="second_cont_column">
            <h1>FACEBOOK</h1>
            <img src={facebook} alt="facebook" />
            <Link to="//www.facebook.com/wayosl" target="__blank">
              <button>FOLLOW US</button>
            </Link>
          </div>
          <div className="second_cont_column">
            <h1>INSTAGRAM</h1>
            <img src={insta} alt="instagram" />
            <Link to="//www.instagram.com/wayo_official/" target="__blank">
              <button>FOLLOW US</button>
            </Link>
          </div>
          <div className="second_cont_column">
            <h1>APPLE MUSIC</h1>
            <img src={apple} alt="apple" />
            <Link
              to="//music.apple.com/lk/artist/wayo/1448434740"
              target="__blank"
            >
              <button>FOLLOW US</button>
            </Link>
          </div>
          <div className="second_cont_column">
            <h1>SPOTIFY</h1>
            <img src={spotify} alt="spotify" />
            <Link
              to="//open.spotify.com/artist/4FxhFEHyjxhdm3C8vAq0wV?si=IA4ySbCxQ9SRlk9BMeiecQ&dl_branch=1"
              target="__blank"
            >
              <button>FOLLOW US</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
