import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { Circles } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditExpenses = () => {
  const { id } = useParams();
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
    // Fetch expense data and staff list when the component mounts
    axios.get(`http://localhost:4000/expenses/${id}`)
      .then(response => {
        const { expense_type, Date, Amount, Staff_id, Recorder_name } = response.data;
        setFormData({
          expense_type,
          Date,
          Amount,
          Staff_id,
          Recorder_name
        });
      })
      .catch(error => {
        toast.error(`Error fetching expense: ${error.message}`);
      });

    axios.get('http://localhost:4000/api/staff_id')
      .then(response => {
        setStaffList(response.data);
      })
      .catch(error => {
        toast.error(`Error fetching staff: ${error.message}`);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.put(`http://localhost:4000/expenses/${id}`, formData)
      .then(response => {
        toast.success("Expense updated successfully!");
        navigate('/admin/expenses');
      })
      .catch(error => {
        toast.error(`Error: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
console.log(formData);
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
                <h1>Edit Expense</h1>
              </div>
              <div className="bottom">
                <div className="right">
                  <form onSubmit={handleSubmit}>
                    <div className="formInput">
                      <label>Expense Type</label>
                      <input
                        required
                        type='text'
                        name='Expense_type'
                        value={formData.expense_type}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="formInput">
                      <label>Date</label>
                      <input
                        required
                        type='date'
                        name='Date'
                        value={formData.Date} // Ensure formData.date is correctly set
                        onChange={handleChange}
                      />
                    </div>
                    <div className="formInput">
                      <label>Amount</label>
                      <input
                        required
                        type='number'
                        name='Amount'
                        value={formData.Amount}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="formInput">
                      <label>Staff</label>
                      <select
                        required
                        name='Staff_id'
                        value={formData.Staff_id} // Ensure formData.staff_id is correctly set
                        onChange={handleChange}
                      >
                        <option value=''>Select Staff</option>
                        {staffList.map(staff => (
                          <option key={staff.id} value={staff.id}>
                            {staff.name}
                          </option>
                        ))}
                      </select>
                      {formData.Staff_id !== '' ? (
                        <img
                          src={staffList.find(staff => staff.id === Number(formData.Staff_id))?.image || ''}
                          style={{ width: '50px', height: '50px', position: 'relative', float: 'right' }}
                          alt="Staff"
                        />
                      ) : null}
                    </div>
                    <div className="formInput">
                      <label>Recorder Name</label>
                      <input
                        required
                        type='text'
                        name='Recorder_name'
                        value={formData.Recorder_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                      <button
                        className="submit-btn"
                        style={{ backgroundColor: '#FFC107', color: 'white' }}
                        type="submit"
                      >
                        Update
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

export default EditExpenses;
