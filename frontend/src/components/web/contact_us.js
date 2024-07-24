import React from 'react';
import './ContactUs.css'; // Import your custom CSS file
import Navbar from '../../Navbar';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
    return (
        <div>
            <Navbar />
            {/* <div className="page-header parallaxie"> */}
                {/* <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* Page Header Box Start 
                            <div className="page-header-box">
                                <h1 className="text-anime-style-3">Contact Us</h1>
                                <nav className="wow fadeInUp">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="./">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
                                    </ol>
                                </nav>
                            </div>
                            {/* Page Header Box End 
                        </div>
                    </div>
                </div> */}
            {/* </div> */}
            <div className="contact-content">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="contact-card shadow-sm">
                                <div className="card-body">
                                    <h2 className="card-title">Contact Information</h2>
                                    <div className="contact-info">
                                        <div className="contact-item">
                                            <FaPhone className="contact-icon" />
                                            <div className="contact-details">
                                                <h5>Phone</h5>
                                                <p>+92 3149501784</p>
                                            </div>
                                        </div>
                                        <div className="contact-item">
                                            <FaEnvelope className="contact-icon" />
                                            <div className="contact-details">
                                                <h5>Email</h5>
                                                <p>zia.rehman1010p@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="contact-item">
                                            <FaMapMarkerAlt className="contact-icon" />
                                            <div className="contact-details">
                                                <h5>Address</h5>
                                                <p>Preston university H-8/1 ,Islamabad, Pakistan</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
