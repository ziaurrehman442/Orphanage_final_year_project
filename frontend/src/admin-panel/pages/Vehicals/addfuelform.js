import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Circles } from 'react-loader-spinner';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFuelForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // This will give you the vehicle_id from the route
  const [formData, setFormData] = useState({
    vehicle_id: id,
    liters: '',
    rate: '',
    total_price: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  // Function to calculate total_price based on liters and rate
  useEffect(() => {
    if (formData.liters && formData.rate) {
      const totalPrice = parseFloat(formData.liters) * parseFloat(formData.rate);
      setFormData(prevState => ({
        ...prevState,
        total_price: totalPrice.toFixed(2) // Round to 2 decimal places
      }));
    }
  }, [formData.liters, formData.rate]);

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
    axios.post(`http://localhost:4000/addFuel/${id}`, formData) // Include id in the POST URL
      .then(response => {
        toast.success('Fuel record added successfully!');
        navigate('/admin/Vehicles');
      })
      .catch(error => {
        toast.error(`Error: ${error.message}`);
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
          <h1>Add Fuel Record</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Vehicle ID</label>
                <input
                  type="text"
                  placeholder="Enter Vehicle ID"
                  name="vehicle_id"
                  value={id} // Display vehicle_id from the route
                  disabled // Disable input to prevent user modification
                />
              </div>
              <div className="formInput">
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Pump</label>
                <input
                  type="text"
                  placeholder="Enter Pump"
                  name="pump"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Pump Location</label>
                <input
                  type="text"
                  placeholder="Enter Pump Location"
                  name="pump_location"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Liters</label>
                <input
                  type="number"
                  placeholder="Enter Liters"
                  name="liters"
                  value={formData.liters}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Rate</label>
                <input
                  type="number"
                  placeholder="Enter Rate"
                  name="rate"
                  value={formData.rate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Total Price</label>
                <input
                  type="number"
                  placeholder="Total Price"
                  name="total_price"
                  value={formData.total_price}
                  readOnly // Read-only to display calculated value
                />
              </div>
            </form>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFuelForm;
