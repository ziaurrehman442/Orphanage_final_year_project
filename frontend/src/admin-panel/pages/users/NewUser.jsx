import React, { useEffect, useState } from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { userInputs } from '../../formSource';
import { useNavigate } from 'react-router-dom';
import Select from "../../components/dropdown/Select";

const NewUser = () => {
  const navigate = useNavigate();
  const [imagesPreview, setImagesPreview] = useState([]);
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    state: '',
    zip_code: '',
    address: '',
    password: '',
    salary: '',
    orphanage_id: '',
    Joinning_date:'',
    date_of_birth: '',
    staff_type: '',
    Department_id: '',
    Emp_no: ''
  });

  const [departments, setDepartments] = useState([]);
  const [orphanage, setorphanage] = useState([]);
  const [staff_type, setstaff_type] = useState([]);
  console.log(formData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/departments');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
      try {
        const response = await fetch('http://localhost:4000/api/staff_type');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setstaff_type(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
      try {
        const response = await fetch('http://localhost:4000/api/Orphanage');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setorphanage(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    

    fetchData();
  }, []);

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
      reader.readAsDataURL(file)
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.image=imagesPreview[0];
    console.log(formData);
    axios.post('http://localhost:4000/signup', formData)
    .then(response => {
        alert('Added Successfully!');
        navigate('/admin/Staff');
    })
    .catch(error => {
        console.error('Error:', error);
    });
    // Here you can access formData and perform actions like submitting to a server
    
  };

  const orphanage_id= (id)=>{
    if(id !== undefined){
    const dep_id = orphanage.find(dept => dept.name === id);
    formData.orphanage_id=dep_id.id;}
  }
  const Department_id= (id)=>{
    if(id !== undefined){
    const dep_id = departments.find(dept => dept.name === id);
    formData.Department_id=dep_id.id;}
  }
  const staff_type_id= (id)=>{
    if(id !== undefined){
    const dep_id = staff_type.find(dept => dept.name === id);
    formData.staff_type=dep_id.id;}
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New User</h1>
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
  
                {userInputs.map((input) => (
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
                {/* {
      label: "Staff Type*",
      name: "staff_type",
      placeholder: 'Enter staff type Id',
      width: 100,
      type: "Text",
    }{
      label: "Department Id*",
      name: "Department_id",
      placeholder: 'Enter Department_id',
      width: 100,
      type: "text",
    },{
      label: "Orphanage ID*",
      type: "text",
      name: "orphanage_id",
      placeholder: 'Orphanage Id',
      width: 100,
    }, */}
                <div className="formInput" key={staff_type}>
              <Select language='English' value={staff_type} handleChange={(e)=>{staff_type_id(e.target.value)}} name='staff_type' title='Staff type'/></div>
              <div className="formInput" key={'orphanage_id'}>
              <Select language='English' value={departments} handleChange={(e)=>{Department_id(e.target.value)}} name='Department_id' title='Department Id'/></div><div className="formInput" key={'Department_id'}>
              <Select language='English' value={orphanage} handleChange={(e)=>{orphanage_id(e.target.value)}} name='orphanage_id' title='orphanage Id'/></div>
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
  )
}

export default NewUser