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
                        <p>'eyekoneclass.lk' provides facilities in a higher manner to the Sri Lankan educational sector. All the courses are being conducted by leading and fully qualified panel of teachers in the Island. With the direct guidance of the teachers, students follow their syllabus. At 'eyekoneclass.lk', conduct online examinations and will be assessed the student’s progress accordingly.</p>
                    </div>
                </div>
                <div className="footer_column">
                    <h2>Location</h2>
                    <p>No 156/2 2-6,‘S. De. S. Jayasinghe Mawatha,<br/>Kohuwala Road,Nugegoda</p>
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
