import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { vehicleInputs } from '../../formSource';
import { useNavigate, useParams } from 'react-router-dom';

const EditVehicle = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming your route provides the vehicle ID
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch existing vehicle data based on the ID
    axios.get(`http://localhost:4000/vehicles/${id}`)
      .then(response => {
        setFormData(response.data); // Populate form data with existing vehicle details
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching vehicle:', error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:4000/vehicles/${id}`, formData)
      .then(response => {
        alert('Updated Successfully!');
        navigate('/admin/vehicles');
      })
      .catch(error => {
        console.error('Error updating vehicle:', error);
      });
  };

  if (loading) {
    return <p>Loading...</p>; // Add loading indicator if needed
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Vehicle</h1>
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
                    value={formData[input.name] || ''}
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
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditVehicle;
