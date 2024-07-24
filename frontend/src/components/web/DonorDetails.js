import React, { useState } from 'react';

const DonorDetailsForm = ({ onDonorSubmit }) => {
    const [donor, setDonor] = useState({
        name: '',
        country: '',
        city: '',
        cnic: '',
        passport: '',
        contact: '',
        email: '',
        address: '',
        street_1: '',
        street_2: '',
        region: '',
        postal_code: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDonor(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/donor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(donor)
            });

            const data = await response.json();
            onDonorSubmit(data.donorId); // Pass the new donor ID to the parent component
        } catch (error) {
            console.error('Error submitting donor details:', error);
        }
    };

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <h5 className="card-title">Donor Details</h5>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={donor.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input type="text" className="form-control" id="country" name="country" value={donor.country} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" className="form-control" id="city" name="city" value={donor.city} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cnic">CNIC</label>
                        <input type="text" className="form-control" id="cnic" name="cnic" value={donor.cnic} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passport">Passport</label>
                        <input type="text" className="form-control" id="passport" name="passport" value={donor.passport} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">Contact</label>
                        <input type="text" className="form-control" id="contact" name="contact" value={donor.contact} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={donor.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control" id="address" name="address" value={donor.address} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="street_1">Street 1</label>
                        <input type="text" className="form-control" id="street_1" name="street_1" value={donor.street_1} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="street_2">Street 2</label>
                        <input type="text" className="form-control" id="street_2" name="street_2" value={donor.street_2} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="region">Region</label>
                        <input type="text" className="form-control" id="region" name="region" value={donor.region} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postal_code">Postal Code</label>
                        <input type="text" className="form-control" id="postal_code" name="postal_code" value={donor.postal_code} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-warning mt-3">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default DonorDetailsForm;
