import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Navbar from '../../Navbar';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const { t } = useTranslation();

  // State variables for form fields and user data
  const [price, setPrice] = useState('');
  const [username, setUsername] = useState('');
  const [receiptImage, setReceiptImage] = useState(null);
  const userData = sessionStorage.getItem('user');
  const defaultUser = {};
  const [user, setUser] = useState(userData ? JSON.parse(userData) : defaultUser);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    id: '',
    image: '',
    price: ''
  });

  const navigate = useNavigate();

  // useEffect to update formData when dependencies change
  useEffect(() => {
    setFormData({
      username: username,
      id: user.data && user.data[0]?.id,
      image: receiptImage,
      price: price
    });
  }, [username, user, receiptImage, price]);

  // Handle form submission
  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      // Send POST request to API
      const response = await axios.post('https://backendauction.mydriven.ae/payment', formData);

      // Handle success response
      console.log('Response:', response.data);
      setSuccess('Payment submitted successfully.');
      setError('');

      // Optionally, reset form fields after successful submission
      setPrice('');
      setUsername('');
      setReceiptImage(null);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      setError('Failed to submit payment. Please try again.');
      setSuccess('');
    }
  };

  // Handle file input change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container p-3">
        <h3 className="my-4" align="center"><b>{t("Payment_Form")}</b></h3>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={HandleSubmit} encType="multipart/form-data">
          <div className="form-group m-3">
            <label htmlFor="price">{t("Price")}</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group m-3">
            <label htmlFor="username">{t("AUsername")}</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group m-3">
            <label htmlFor="receiptImage">{t("Receipt_Image")}</label>
            <input
              type="file"
              className="form-control-file"
              id="receiptImage"
              onChange={handleImageChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning m-3">{t("Submit")}</button>
          <button className="btn btn-warning m-3" onClick={() => navigate('/user/dashboard')}>
            {t("Dashboard")}
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentForm;
