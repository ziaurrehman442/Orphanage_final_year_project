import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { Circles } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    capacity: '',
    branch_id: '',
    type: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/rooms/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const userData = await response.json();
        setData(userData);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        setIsLoading(false);
      }
    };

    fetchDataForPosts();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toastNotification = (msg) => {
    return (
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
      >
        {msg}
      </ToastContainer>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
formData.type = formData.type? formData.type : data.type;
formData.branch_id = formData.branch_id? formData.branch_id : data.branch_id;
formData.capacity = formData.capacity? formData.capacity : data.capacity;
    axios.put(`http://localhost:4000/rooms/${id}`, formData)
      .then(response => {
        toast.success("Room inserted successfully!");
        navigate('/admin/rooms');
      })
      .catch(error => {
        toast.error(`Error: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const typeOptions = ['hostel', 'office'];
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
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (data && (
            <>
              <div className="top">
                <h1>Edit Room</h1>
              </div>
              <div className="bottom">
                <div className="right">
                  <form>
                    <div className="formInput">
                      <label>Capacity</label>
                      <input
                        required
                        type='text'
                        name='capacity'
                        defaultValue={data.capacity}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="formInput">
                      <label>Branch ID</label>
                      <input
                        required
                        type='text'
                        name='branch_id'
                        defaultValue={data.branch_id}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="formInput">
                        <label>Type</label>
                        <select
                          required
                          name="type"
                          defaultValue={data.type}
                          onChange={handleChange}
                        >
                          {typeOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
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
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default EditRoom;
