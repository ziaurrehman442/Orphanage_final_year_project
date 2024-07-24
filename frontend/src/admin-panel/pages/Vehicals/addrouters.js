import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { Circles } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams

const AddVehicleRoute = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Retrieve id from route params
  const [formData, setFormData] = useState({
    Vehicle_id: id, // Set Vehicle_id to the id from route params
    pick_up: '',
    drop_off: '',
    pick_up_time: '',
    drop_time: ''
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
    axios.post('http://localhost:4000/vehicle_routes', formData)
      .then(response => {
        alert('Vehicle route added successfully!');
        navigate('/admin/Vehicles');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to add vehicle route');
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
          <h1>Add New Vehicle Route</h1>
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
                  disabled // Disable input since it's coming from route params
                />
              </div>
              <div className="formInput">
                <label>Pick Up Location</label>
                <input
                  type="text"
                  name="pick_up"
                  value={formData.pick_up}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Drop Off Location</label>
                <input
                  type="text"
                  name="drop_off"
                  value={formData.drop_off}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Pick Up Time</label>
                <input
                  type="datetime-local"
                  name="pick_up_time"
                  value={formData.pick_up_time}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Drop Time</label>
                <input
                  type="datetime-local"
                  name="drop_time"
                  value={formData.drop_time}
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

export default AddVehicleRoute;
