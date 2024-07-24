import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import Select from "../../components/dropdown/Select";

const EditGuardian = () => {
  const { id } = useParams(); // Get the guardian ID from the URL parameters
  const navigate = useNavigate();
  const [imagesPreview, setImagesPreview] = useState([]);
  const [childimage, setChildimage] = useState();
  const [formData, setFormData] = useState({
    image: '',
    gardian_name: '',
    email: '',
    contact: '',
    address: '',
    emergency_contact: '',
    child_id: '',
    gardian_cnic: ''
  });

  const [Child_id, setChild_id] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/guardian/${id}`);
        setFormData(response.data.data);
        setImagesPreview([response.data.data.image]);
        console.log(formData); // Assuming you have a child image in the response
      } catch (error) {
        console.error('Error fetching guardian data:', error);
      }
    };

    const fetchChildIds = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/child_id');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setChild_id(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching child IDs:', error);
      }
    };

    fetchData();
    fetchChildIds();
  }, [id]);

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.readyState === 2) {
          setImagesPreview([reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.image = imagesPreview[0];
    try {
      await axios.put(`http://localhost:4000/guardian/${id}`, formData);
      alert('Guardian updated successfully!');
      navigate('/admin/guardian');
    } catch (error) {
      console.error('Error updating guardian:', error);
      alert('Failed to update guardian. Please try again.');
    }
  };

  const handleChildSelect = (e) => {
    const selectedChild = Child_id.find(child => child.name === e.target.value);
    if (selectedChild) {
      setFormData({
        ...formData,
        child_id: selectedChild.child_id
      });
      setChildimage(selectedChild.image);
    }
  };

  return (
    <div className="new">
    <Sidebar />
    <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Guardian</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={imagesPreview[0] || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt=""
            />
            <h1>Child Image</h1>
            <img
              src={childimage || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleImages}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>Guardian Name</label>
                <input 
                  type="text" 
                  placeholder="Guardian Name" 
                  name="gardian_name"
                  value={formData.gardian_name}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>CNIC</label>
                <input 
                  type="text" 
                  placeholder="CNIC" 
                  name="gardian_cnic"
                  value={formData.gardian_cnic}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input 
                  type="email" 
                  placeholder="Email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Contact</label>
                <input 
                  type="text" 
                  placeholder="Contact" 
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input 
                  type="text" 
                  placeholder="Address" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Emergency Contact</label>
                <input 
                  type="text" 
                  placeholder="Emergency Contact" 
                  name="emergency_contact"
                  value={formData.emergency_contact}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <Select 
                  language='English' 
                  value={Child_id}
                  handleChange={handleChildSelect} 
                  name='Child_id' 
                  title='Child_id'
                />
              </div>
              <button type="submit"  className="submit-btn btn" style={{ backgroundColor: '#FFC107', color: 'white' }}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditGuardian;