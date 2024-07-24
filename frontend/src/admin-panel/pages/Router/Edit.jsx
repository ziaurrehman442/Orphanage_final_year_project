import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { Circles } from 'react-loader-spinner';
import { useParams, useNavigate } from 'react-router-dom';

const EditVehicleRoster = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Accessing the id parameter from the route
  const [formData, setFormData] = useState({
    Vehicle_id: '',
    time_in: '',
    time_out: '',
    off_days: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch existing data for the selected vehicle roster entry on component mount
  useEffect(() => {
    const fetchVehicleRoster = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/vehicle_roster/${id}`);
        const { Vehicle_id, time_in, time_out, off_days } = response.data;
        setFormData({ Vehicle_id, time_in, time_out, off_days });
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch vehicle roster entry');
      }
    };

    fetchVehicleRoster();
  }, [id]);

  // Handle input changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission to update the vehicle roster entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.put(`http://localhost:4000/vehicle_roster/${id}`, formData);
      alert('Vehicle roster entry updated successfully!');
      navigate('/admin/vehicle_roster'); // Redirect to the list page after successful update
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update vehicle roster entry');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Vehicle Roster Entry</h1>
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
                  {isLoading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVehicleRoster;
