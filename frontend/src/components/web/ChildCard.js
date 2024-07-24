import React from 'react';
import { Link } from 'react-router-dom';

const ChildCard = ({ child }) => {
    return (
        <div className="card mb-3" style={{ width: '18rem' }}>
            <img src={child.image} className="card-img-top" alt="Child" />
            <div className="card-body">
                <h5 className="card-title">{child.Name}</h5>
                <p className="card-text" style={{color: 'black'}}><strong>Date of Birth:</strong> {child.DOB}</p>
                <p className="card-text" style={{color: 'black'}}><strong>Father Name:</strong> {child.f_name}</p>
                <p className="card-text" style={{color: 'black'}}><strong>Mother Name:</strong> {child.M_name}</p>
                <p className="card-text" style={{color: 'black'}}><strong>Siblings:</strong> {child.Siblings}</p>
                <p className="card-text" style={{color: 'black'}}><strong>Emergency Contact:</strong> {child.emergency_contact}</p>
                <Link to="/Donation" className="btn btn-warning">Donation</Link>
            </div>
        </div>
    );
};

export default ChildCard;
