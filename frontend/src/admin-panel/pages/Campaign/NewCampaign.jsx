import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Select from "../../components/dropdown/Select";
import TextAreaEditor from '../../components/textareaEditor/TextAreaEditor';

const NewCampaign = () => {
  const navigate = useNavigate();
  const [imagesPreview, setImagesPreview] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    Description: '',
    date_created: '',
    status: '',
    image: ''
  });



  const statuses = [
    {
      name: 'Active'
    },
    {
      name: 'Inactive'}
  ]

  // Function to handle image selection
  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.readyState === 2) {
          setImagesPreview(prevState => [...prevState, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;  
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(formData);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.image = imagesPreview[0];
    console.log(formData);
    // Send POST request to backend API

    axios.post('http://localhost:4000/campaign', formData)
      .then(response => {
        alert('Campaign added successfully!');
        navigate('/admin/campaign');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error adding campaign. Please try again.');
      });
  };

  const handleStatusChange = (e) => {
    setFormData({
      ...formData,
      status: e.target.value
    });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Campaign</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                imagesPreview[0] ? imagesPreview[0]
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={handleImages}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Enter campaign title"
                  name="title"
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Amount</label>
                <input
                  type="number"
                  placeholder="Enter campaign amount"
                  name="amount"
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Date Created</label>
                <input
                  type="date"
                  name="date_created"
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Status</label>
                <Select
                  value={statuses}
                  handleChange={handleStatusChange}
                  name="status"
                  title="Select Status"
                />
              </div>
              <div style={{width: '100%'}}>
                <label>Description</label>
                <TextAreaEditor
                  setData={(e)=>{formData.Description = e}} 
                  />
                  </div>
            </form>
          </div>
        </div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
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
  );
};

export default NewCampaign;