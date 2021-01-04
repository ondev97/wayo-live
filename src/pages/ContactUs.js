import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { activeAccount } from '../actions';
import { loadStDetails } from '../actions/stDetailsAction';
import '../assets/css/contact.css';

export default function ContactUs() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(activeAccount());
        dispatch(loadStDetails());
      },[dispatch])

    return (
        <div className="maininde">
            <div className="upper_cover">
                <h1>Contact Us</h1>
            </div>
            <div className="con_body">
                <div className="short_con">
                    <div className="column_con">
                        <div className="con_upprt">
                            <div className="icon_con">
                                <i className="fas fa-mobile-alt"></i>
                            </div>
                            <h3>Phone</h3>
                        </div>
                        <div className="con_sort_body">
                            <p>076-xxxxxx</p>
                            <p>076-xxxxxx</p>
                            <p>076-xxxxxx</p>
                        </div>
                    </div>
                    <div className="column_con">
                        <div className="con_upprt">
                            <div className="icon_con">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <h3>Location</h3>
                        </div>
                        <div className="con_sort_body">
                            <p>Ondev Technologies, Bandarawela RD,Hali-Ela</p>
                        </div>
                    </div>
                    <div className="column_con">
                        <div className="con_upprt">
                            <div className="icon_con">
                                <i className="fas fa-at"></i>
                            </div>
                            <h3>Email</h3>
                        </div>
                        <div className="con_sort_body">
                            <p>ondevtechnologies@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className="con_form">
                    <h1>Lets Get In Touch</h1>
                    <form>
                        <div className="sect">
                            <p>
                                <label htmlFor="name">Enter Your Name</label>
                                <input type="text" name='name' id='name'/>
                            </p>
                            <p>
                                <label htmlFor="sub">Enter Email Subject</label>
                                <input type="text" name='sub' id='sub'/>
                            </p>
                        </div>
                        <div className="sect">
                            <p>
                                <label htmlFor="email">Enter Your Email</label>
                                <input type="email" name='email' id='email'/>
                            </p>
                            <p>
                                <label htmlFor="pn">Enter Phone Number</label>
                                <input type="tel" name='pn' id='pn' placeholder="07X-xxxxxxx" pattern="[+]{1}[0-9]{11,14}"/>
                            </p>
                        </div>
                        <p>
                            <textarea name="message" id="msg" rows="10" placeholder="Enter Your Message"></textarea>
                        </p>
                        <p className="last">
                            <input type="submit" value="Send Message"/>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
 