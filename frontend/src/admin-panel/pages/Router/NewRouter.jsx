import React, { useState } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { Circles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

const AddVehicleRoster = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Vehicle_id: '',
    time_in: '',
    time_out: '',
    off_days: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post('http://localhost:4000/vehicle_roster', formData)
      .then(response => {
        alert('Vehicle roster entry added successfully!');
        navigate('/admin/vehicle_roster');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to add vehicle roster entry');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Vehicle Roster Entry</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Vehicle ID</label>
                <input
                  type="text"
                  name="Vehicle_id"
                  value={formData.Vehicle_id}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Time In</label>
                <input
                  type="time"
                  name="time_in"
                  value={formData.time_in}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Time Out</label>
                <input
                  type="time"
                  name="time_out"
                  value={formData.time_out}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Off Days</label>
                <input
                  type="text"
                  name="off_days"
                  value={formData.off_days}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  className="submit-btn"
                  style={{ backgroundColor: '#FFC107', color: 'white' }}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Adding...' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicleRoster;
