import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BidPopup = ({ onClose, endDate, auctionId }) => {
    const user = useState(JSON.parse(sessionStorage.getItem('user')) || {});
    const users = user[0].data[0];
  const userId = users.id;
  console.log(userId);
  const navigation = useNavigate();
  if (userId === '' || userId === 'undefined'){
    navigation('/login');
  }
  const [formData, setFormData] = useState({
    BidAmount: '',
    BidEndTime: endDate,
    UserID: userId,
    AuctionID: auctionId
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios.post('https://backendauction.mydriven.ae/bids', formData)
      .then(response => {
        console.log('Response:', response.data);
        onClose(); // Close the popup after successful submission
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div id="popup" style={{ backgroundColor: 'white', minWidth: '90%', minHeight: '200px', zIndex: 999, borderRadius: '20px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', position: 'absolute', paddingRight: '50px' }}>
      <div align="right">
        <button onClick={onClose} className="m-3 btn btn-danger">
          Close
        </button>
        <button onClick={handleSubmit} className="m-3 btn btn-danger">
          Submit
        </button>
      </div>
      <div className="row">
        <div style={{ width: '300px', margin: '0px auto' }}>
          <label className="form-label m-3" htmlFor="cnumber">
            Bid Amount
          </label>
          <input
            onChange={handleChange}
            type="number"
            className="form-control m-3 w-80"
            name="BidAmount"
            id="cnumber"
            placeholder='Enter Bid Amount'
          />
        </div>
      </div>
    </div>
  );
};

export default BidPopup;
