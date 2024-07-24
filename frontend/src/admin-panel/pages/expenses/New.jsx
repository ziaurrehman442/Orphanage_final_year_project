import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { Circles } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddExpenses = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    expense_type: '',
    date: '',
    amount: '',
    staff_id: '',
    recorder_name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    // Fetch staff data when the component mounts
    axios.get('http://localhost:4000/api/staff_id')
      .then(response => {
        setStaffList(response.data);
      })
      .catch(error => {
        toast.error(`Error fetching staff: ${error.message}`);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post('http://localhost:4000/expenses', formData)
      .then(response => {
        toast.success("Expense added successfully!");
        navigate('/admin/expenses');
      })
      .catch(error => {
        toast.error(`Error: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          {isLoading ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              position: 'fixed'
            }}>
              <Circles
                height="80"
                width="80"
                color="#FFC107"
                ariaLabel="circles-loading"
                visible={true}
              />
            </div>
          ) : (
            <>
              <div className="top">
                <h1>Add Expense</h1>
              </div>
              <div className="bottom">
                <div className="right">
                  <form onSubmit={handleSubmit}>
                    <div className="formInput">
                      <label>Expense Type</label>
                      <input
                        required
                        type='text'
                        name='expense_type'
                        value={formData.expense_type}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="formInput">
                      <label>Date</label>
                      <input
                        required
                        type='date'
                        name='date'
                        value={formData.date}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="formInput">
                      <label>Amount</label>
                      <input
                        required
                        type='number'
                        name='amount'
                        value={formData.amount}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="formInput">
                      <label>Staff</label>
                      <select
                        required
                        name='staff_id'
                        value={formData.staff_id}
                        onChange={handleChange}
                      >
                        <option value=''>Select Staff</option>
                        {staffList.map(staff => (
                          <option key={staff.id} value={staff.id}>
                            {staff.name}
                          </option>
                        ))}
                      </select>
                      {formData.staff_id !== '' ? <img
                              src={staffList.find(child => child.id === Number(formData.staff_id))  ?.image || ''}
                              style={{width: '50px', height:'50px',position: 'relative', float: 'right'}}
                            />
                            : ''}
                    </div>
                    <div className="formInput">
                      <label>Recorder Name</label>
                      <input
                        required
                        type='text'
                        name='recorder_name'
                        value={formData.recorder_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                      <button
                        className="submit-btn"
                        style={{ backgroundColor: '#FFC107', color: 'white' }}
                        type="submit"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default AddExpenses;
