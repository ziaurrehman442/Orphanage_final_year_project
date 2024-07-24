import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const Allocate_vehicle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [formData, setFormData] = useState({
    staff_id: '',
    vehicle_id: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    setFormData({
        ...formData,
        staff_id: id
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
    setIsLoading(true);
    axios.post(`http://localhost:4000/allocation_vehicle/${id}`, formData)
      .then(response => {
        alert('Vehicle allocated successfully!');
        navigate('/admin/Staff');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to allocate vehicle');
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
          <h1>Allocate Vehicle</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Staff ID</label>
                <input
                  type="text"
                  name="staff_id"
                  value={formData.staff_id}
                  disabled
                />
              </div>
              <div className="formInput">
                <label>Vehicle ID</label>
                <input
                  type="text"
                  name="vehicle_id"
                  value={formData.vehicle_id}
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
                  {isLoading ? 'Allocating...' : 'Allocate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allocate_vehicle;
