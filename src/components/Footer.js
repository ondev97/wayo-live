import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/footer.css';
import '../assets/css/mediaFiles/footermedia.css';
import ftimg from '../img/Logo_1.png';

export default function Footer() {

    return (
        <div className="footer_main">
            <div className="footer_mid">
                <div className="footer_column">
                    <div className="lg">
                        <img src={ftimg} alt="footer"/>
                    </div>
                    <div className="ab">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A tenetur consequuntur earum voluptas perspiciatis illum doloremque quasi laboriosam itaque ab dolore, adipisci ipsam laborum quidem omnis laudantium. Voluptatem, enim amet!</p>
                    </div>
                </div>
                <div className="footer_column">
                    <h2>Location</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing el</p>
                    <ul className="scial">
                        <li><i className="fab fa-facebook-square"></i></li>
                        <li><i className="fab fa-twitter-square"></i></li>
                        <li><i className="fab fa-linkedin"></i></li>
                    </ul>
                </div>
                <div className="footer_column">
                    <h2>Explore</h2>
                    <ul className='links'>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/about'>About</Link>
                        </li>
                        <li>
                            <Link to='/contact'>Contact Us</Link>
                        </li>
                        <li>
                            <Link to='/allteachers'>Teachers</Link>
                        </li>
                        <li>
                            <Link to='/allsubjects'>Subjects</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="small_footer">
                <h3>COPYRIGHT © EYEKON INTERNATIONAL 2020</h3>
            </div>
        </div>
    )
}
