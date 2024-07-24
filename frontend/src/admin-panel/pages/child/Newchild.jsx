import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { childInputs, userInputs } from '../../formSource';
import { useNavigate } from 'react-router-dom';
import Select from "../../components/dropdown/Select";

const Newchild = () => {
  const navigate = useNavigate();
  const [imagesPreview, setImagesPreview] = useState([]);
  const [formData, setFormData] = useState({
    child_id: '', // Example of auto-generated child_id
    branch_id: '', // Example of branch_id
    DOB: '',
    register_time: '', // Example of current timestamp
    Name: '',
    f_name: '',
    M_name: '',
    Siblings: '',
    F_cnic: '',
    M_cnic: '',
    cnic: '',
    mailing_address: '',
    emergency_contact: '',
    image: ''
  });


  const [branch, setbranch] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/branchname_id');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setbranch(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    

    fetchData();
  }, []);

  // Function to handle image selection
  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.readyState === 2) {
          setImagesPreview([...imagesPreview, reader.result]);
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
    formData.image= imagesPreview[0];
    console.log(formData);
    // Send POST request to backend API
    axios.post('http://localhost:4000/child', formData)
      .then(response => {
        alert('Child added Successfully!');
        navigate('/admin/child');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error adding child. Please try again.');
      });
  };

  const staff_type_id= (id)=>{
    if(id !== undefined){
    const dep_id = branch.find(dept => dept.name === id);
    formData.branch_id=dep_id.id;}
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Child</h1>
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

              {childInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput" key={'staff_type'}>
              <Select language='English' id='3' value={branch} handleChange={(e)=>{staff_type_id(e.target.value)}} name='branch' title='Branch'/></div>
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
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newchild;
