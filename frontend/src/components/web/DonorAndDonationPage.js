import React, { useState } from 'react';
import DonorDetailsForm from './DonorDetails';
import DonationForm from './DonationForm';
import Navbar from '../../Navbar';
import './donation.css'

const DonorAndDonationPage = () => {
    const [donorId, setDonorId] = useState(null);
    const [skipForm, setSkipForm] = useState(false);
    const [showDonationForm, setShowDonationForm] = useState(false);

    const handleDonorSubmit = (id) => {
        setDonorId(id);
        setShowDonationForm(true);
    };

    const handleSkip = () => {
        setSkipForm(true);
        setShowDonationForm(true);
    };

    const handleDonorIdChange = (e) => {
        setDonorId(e.target.value);
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h1 className="mb-4" style={{ color: "black" }}>Add Donor and Donation</h1>
                {!donorId && !skipForm && (
                    <>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card shadow-sm bank-details-card">
                            <div className="card-body">
                                <h5 className="card-title">Bank Details</h5>
                                <p className="card-text">Bank Name: [Habib materopolitan bank]</p>
                                <p className="card-text">Account Number: [6046620363714126091]</p>
                                <p className="card-text">IBAN: [Pk48MPBL0466697140126091]</p>
                                <p className="card-text">Branch name: [G-8 Markaz Islamabad ]</p>
                                <p className="card-text">For more details, please contact us at [<a href="mailto: zia.rehman1010p@gmail.com">zia.rehman1010p@gmail.com</a>]/[<a href="mailto: zia.rehman1010p@gmail.com">03149501784</a>].</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p style={{color: 'black'}}>If you want to become a regular or permanent donor, please fill out the form below.</p>
                <p style={{color: 'black'}}>If you already have your donor ID, you can skip this form.</p>
                <p style={{color: 'black'}}>Otherwise,send the Donation details on email: <a href="mailto: zia.rehman1010p@gmail.com">zia.rehman1010p@gmail.com</a>.</p>
                <p style={{color: 'black'}}>Thanks!</p>
                <button onClick={handleSkip} className="btn btn-secondary mt-3 mb-3">Skip</button>
                </>)}
                {!donorId && !skipForm && (
                    <>
                        <DonorDetailsForm onDonorSubmit={handleDonorSubmit} />
                    </>
                )}

                {(skipForm || donorId) && (
                    <>
                        {donorId && (
                            <p>Your Donor ID: {donorId}. Please save or memorize it for your next donation.</p>
                        )}
                        <DonationForm donorId={donorId} />
                    </>
                )}
            </div>
        </>
    );
};

export default DonorAndDonationPage;
