import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('https://localhost:4000/signup', {
        name,
        image,
        username,
        email,
        phone,
        country,
        city,
        state,
        zip_code: zipCode,
        address,
        password
      });
      console.log(response.data);
      navigate('/login');

      // Optionally, redirect the user to another page after successful signup
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to create account');
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ width: '300px', margin: 'auto', marginTop: '50px' }}>
        <h2>Sign Up</h2>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="name" className="form-label py-1"><b>{t('Name')}</b></label>
          <input
            id="name"
            className="form-control"
            type="text"
            placeholder={t('Name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="image" className="form-label py-1"><b>{t('Image')}</b></label>
          <input
            id="image"
            className="form-control"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="username" className="form-label py-1"><b>{t('Username')}</b></label>
          <input
            id="username"
            className="form-control"
            type="text"
            placeholder={t('Username')}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="email" className="form-label py-1"><b>{t('Email')}</b></label>
          <input
            id="email"
            className="form-control"
            type="email"
            placeholder={t('Email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="phone" className="form-label py-1"><b>{t('Phone')}</b></label>
          <input
            id="phone"
            className="form-control"
            type="text"
            placeholder={t('Phone')}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="country" className="form-label py-1"><b>{t('Country')}</b></label>
          <input
            id="country"
            className="form-control"
            type="text"
            placeholder={t('Country')}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="city" className="form-label py-1"><b>{t('City')}</b></label>
          <input
            id="city"
            className="form-control"
            type="text"
            placeholder={t('City')}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="state" className="form-label py-1"><b>{t('State')}</b></label>
          <input
            id="state"
            className="form-control"
            type="text"
            placeholder={t('State')}
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="zipCode" className="form-label py-1"><b>{t('Zip Code')}</b></label>
          <input
            id="zipCode"
            className="form-control"
            type="text"
            placeholder={t('Zip Code')}
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="address" className="form-label py-1"><b>{t('Address')}</b></label>
          <input
            id="address"
            className="form-control"
            type="text"
            placeholder={t('Address')}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="password" className="form-label py-1"><b>{t('Password')}</b></label>
          <input
            id="password"
            className="form-control"
            type="password"
            placeholder={t('Password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {errorMessage}
        </div>
        <div>
          <button className="btn btn-warning my-3" onClick={handleSignup}>{t('Sign Up')}</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
