import React,{ useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';




const LoginAdmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successmessage, setsuccessMessage] = useState('');
  const { t } = useTranslation();

  const { login } = useAuth()

  console.log();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/adminlogin', { username, password });
      sessionStorage.setItem('userAdmin',JSON.stringify(response.data));
      if(response.data.success === true){
        setsuccessMessage("Logged in Successfully!");
        const data = sessionStorage.getItem('userAdmin')
        login('admin');
        navigate('/admin/', { state: { data } });}
      else{
        setErrorMessage(response.data.error); 
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Login Failed!");
    }
  };


  return (
    <div className='container-fluid'>
    <div style={{ width: '300px', margin: 'auto', marginTop: '100px' }}>
      <h2>{t("Admin Login")}</h2>
            
                {successmessage}
      <div style={{ marginBottom: '10px' }}>
      <label for="Username" class="form-label py-3"><b>{t('Username')}</b></label>
        <input
        className='form-control'
          type="text"
          placeholder={t('Username')}
          id='Username'
          name='username'
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
          name='password'
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
      </div>
    </div>
    </div>
  )
}

export default LoginAdmin