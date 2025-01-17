import React, { useState } from 'react';
import Navbar from '../../Navbar';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const Loginadmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successmessage, setsuccessMessage] = useState('');
  const { t } = useTranslation();
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://backendauction.mydriven.ae/adminlogin', { username, password });
      if(response.data.success !== false){
        sessionStorage.setItem('admin', JSON.stringify(response.data));

        setsuccessMessage("Logged in Successfully!");
        navigate('/admindashboard');
      }
      else{
        setErrorMessage(response.data.error);
      }
    } catch (error) {
      setErrorMessage("Login Failed! check your internet.")
    }
  };
  

  return (
    <div className='container-fluid'>
    <Navbar />
    <div style={{ width: '300px', margin: 'auto', marginTop: '100px' }}>
      <h2>{t("LoginAdmin")}</h2>
            
                {successmessage}
      <div style={{ marginBottom: '10px' }}>
      <label for="Username" class="form-label py-3"><b>{t('Username')}</b></label>
        <input
        className='form-control'
          type="text"
          placeholder={t('Username')}
          id='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <label for="Password" class="form-label py-3"><b>{t('Password')}</b></label>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="password"
          placeholder={t('Password')}
          id='Password'
          className='form-control'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div style={{ color: 'red', marginBottom: '10px' }}>
        {errorMessage}
      </div>
      <div>
        <button onClick={handleLogin} className='btn btn-warning py-2 my-3'>{t("Login")}</button>
        <Link to={'/signup'} className='btn btn-warning py-2 my-3 mx-3'>{t("signup")}</Link>
      </div>
    </div>
    </div>
  );
};

export default Loginadmin;