import React, { useState } from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { vehicleInputs } from '../../formSource';
import { useNavigate } from 'react-router-dom';

const Newvehicles = () => {
  const navigate = useNavigate();
  const [imagesPreview, setImagesPreview] = useState([]);
  const [formData, setFormData] = useState({});

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
    axios.post('http://localhost:4000/vehicles', formData)
    .then(response => {
        alert('Added Successfully!');
        navigate('/admin/vehicles');
    })
    .catch(error => {
        console.error('Error:', error);
    });
    // Here you can access formData and perform actions like submitting to a server
    
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Vehicle</h1>
        </div>
        <div className="bottom">
            <div className="right">
              <form>
                {vehicleInputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input 
                      type={input.type} 
                      placeholder={input.placeholder} 
                      name={input.name}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </form>
            </div>
          </div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', justifyItems: 'center' }}>
          <button
            className="submit-btn"
            style={{ backgroundColor: '#FFC107', color: 'white' }} 
            type="submit"
            onClick={handleSubmit}
          >
              Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default Newvehicles