import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '../../admin-panel/components/dropdown/Select';

const DonationForm = ({ donorId }) => {
    const navigate = useNavigate();
    const [donation, setDonation] = useState({
        donor_id: donorId || '', // Default to empty string if donorId is not provided
        branch_id: '',
        amount: '',
        date: new Date().toISOString().split('T')[0], // Set the initial date
        time: '',
        method: '',
        transaction_id: '',
        purpose: '',
        child_id: ''
    });

    const [branch, setBranch] = useState([]);
    const [children, setChildren] = useState([]);
    const [selectedPurpose, setSelectedPurpose] = useState('');
    const [selectedChild, setSelectedChild] = useState(null);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/branchname_id');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBranch(data);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        };

        const fetchChildren = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/children');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setChildren(data); // Ensure this sets correctly
            } catch (error) {
                console.error('Error fetching children:', error);
            }
        };

        fetchBranches();
        fetchChildren();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDonation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePurposeChange = (e) => {
        const { value } = e.target;
        setSelectedPurpose(value);
        setDonation(prevState => ({
            ...prevState,
            purpose: value
        }));
    };

    const handleChildChange = (e) => {
        const { value } = e.target;
        const selectedChild = children.find(child => child.child_id === Number(value));
        console.log('Selected Child:', selectedChild); // Log selected child to check correctness
        setSelectedChild(selectedChild); // Set the selected child

        setDonation(prevState => ({
            ...prevState,
            child_id: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Set current date and time when form is submitted
        const currentDate = new Date().toISOString().split('T')[0];
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatedDonation = {
            ...donation,
            date: currentDate,
            time: currentTime
        };

        if (selectedPurpose === 'adoption' && selectedChild) {
            updatedDonation.child_id = selectedChild.child_id;
        }

        try {
            const response = await fetch('http://localhost:4000/donation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedDonation)
            });

            if (response.ok) {
                alert('Donation submitted successfully!');
                navigate('/');
                setDonation({
                    donor_id: donorId || '', // Reset to initial value or empty string
                    branch_id: '',
                    amount: '',
                    date: new Date().toISOString().split('T')[0],
                    time: '',
                    method: '',
                    transaction_id: '',
                    purpose: '',
                    child_id: ''
                });
                setSelectedPurpose('');
                setSelectedChild(null);
            }
        } catch (error) {
            console.error('Error submitting donation:', error);
        }
    };

    const handleBranchChange = (e) => {
        const { value } = e.target;
        const selectedBranch = branch.find(branch => branch.name === value);
        setDonation(prevState => ({
            ...prevState,
            branch_id: selectedBranch ? selectedBranch.id : ''
        }));
    };

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="card-title">Donation Form</h5>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="donor_id">Donor ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="donor_id"
                            name="donor_id"
                            value={donation.donor_id}
                            onChange={handleChange}
                            readOnly={!!donorId} // Make read-only if donorId is provided
                        />
                    </div>
                    <div className="formInput" key={'branch'}>
                        <Select language='English' id='branch' value={branch} handleChange={handleBranchChange} name='branch' title='Branch' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input type="number" className="form-control" id="amount" name="amount" value={donation.amount} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="method">Method</label>
                        <input type="text" className="form-control" id="method" name="method" value={donation.method} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="transaction_id">Transaction ID</label>
                        <input type="text" className="form-control" id="transaction_id" name="transaction_id" value={donation.transaction_id} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="purpose">Purpose</label>
                        <select className="form-control" id="purpose" name="purpose" value={donation.purpose} onChange={handlePurposeChange} required>
                            <option value="">Select Purpose</option>
                            <option value="adoption">Adoption</option>
                            <option value="food">Food</option>
                            <option value="clothes">Clothes</option>
                            <option value="others">Others & General Purpose</option>
                        </select>
                    </div>
                    {selectedPurpose === 'adoption' && (
                        <div className="form-group">
                            <label htmlFor="child_id">Child for Adoption</label>
                            <select className="form-control" id="child_id" name="child_id" value={donation.child_id} onChange={handleChildChange} required>
                                <option value="">Select Child</option>
                                {children.map(child => (
                                    <option key={child.child_id} value={child.child_id}>
                                        {child.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    {selectedChild && (
                        <div className="selected-child-info mt-3">
                            <h6>Selected Child Information</h6>
                            <img src={selectedChild.image} alt={selectedChild.Name} className="img-thumbnail rounded-circle" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                            <p style={{color: 'black'}}>{selectedChild.Name}</p>
                        </div>
                    )}
                    <button type="submit" className="btn btn-warning mt-3">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default DonationForm;
