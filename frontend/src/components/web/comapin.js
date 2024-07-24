import React from 'react';
import './ContactUs.css'; // You can keep the same CSS file or create a new one if needed
import Navbar from '../../Navbar';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Complaints = () => {
    return (
        <div>
            <Navbar />
            {/* <div className="page-header parallaxie"> */}
                {/* <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* Page Header Box Start 
                            <div className="page-header-box">
                                <h1 className="text-anime-style-3">Complaints</h1>
                                <nav className="wow fadeInUp">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="./">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Complaints</li>
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
                                    <h2 className="card-title">Complaint Information</h2>
                                    <div className="contact-info">
                                        <div className="contact-item">
                                            <FaPhone className="contact-icon" />
                                            <div className="contact-details">
                                                <h5>Phone</h5>
                                                <p>+92 3325364781</p>
                                            </div>
                                        </div>
                                        <div className="contact-item">
                                            <FaEnvelope className="contact-icon" />
                                            <div className="contact-details">
                                                <h5>Email</h5>
                                                <p>info@orphanage.com</p>
                                            </div>
                                        </div>
                                        <div className="contact-item">
                                            <FaMapMarkerAlt className="contact-icon" />
                                            <div className="contact-details">
                                                <h5>Address</h5>
                                                <p>Preston University H-8/1, Islamabad, Pakistan</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="complaint-instructions">
                                        <h3>How to File a Complaint</h3>
                                        <p style={{color: 'black'}}>If you have a complaint, please contact us using the information above. We strive to address all concerns promptly and professionally.</p>
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

export default Complaints;
