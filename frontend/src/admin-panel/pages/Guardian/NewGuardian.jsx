import React, { useEffect, useState } from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { GuardianInputs } from '../../formSource';
import { useNavigate } from 'react-router-dom';
import Select from "../../components/dropdown/Select";

const NewGuardian = () => {
  const navigate = useNavigate();
  const [imagesPreview, setImagesPreview] = useState([]);
  const [childimage, setChildimage] = useState();
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

  const [Child_id, setChild_id] = useState([]);
  console.log(formData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/child_id');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setChild_id(data);
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
    axios.post('http://localhost:4000/guardian', formData)
    .then(response => {
        alert('Added Successfully!');
        navigate('/admin/Guardian');
    })
    .catch(error => {
        console.error('Error:', error);
    });
    // Here you can access formData and perform actions like submitting to a server
    
  };
  const staff_type_id= (id)=>{
    if(id !== undefined){
    const dep_id = Child_id.find(dept => dept.name === id);
    formData.child_id=dep_id.id;
    setChildimage(dep_id.image);
  }
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Guardian</h1>
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

              <h1>
                Child Image
              </h1>
              <img
                src={
                  childimage ? childimage
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
  
                {GuardianInputs.map((input) => (
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
              <Select language='English' value={Child_id} handleChange={(e)=>{staff_type_id(e.target.value)}} name='Child_id' title='Child_id'/>

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
              Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewGuardian