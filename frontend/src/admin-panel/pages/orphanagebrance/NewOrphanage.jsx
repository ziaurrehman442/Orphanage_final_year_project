import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { orphanagebranch_input } from '../../formSource';
import { useNavigate } from 'react-router-dom';
import Select from '../../components/dropdown/Select';

const NewOrphanagebranch = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Orphanage_id: ''
  });

  const [orphanageimage, setorphanageimage] = useState();
  
  const [orphanage_id, setorphanage_id] = useState([]);
  console.log(formData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/orphanage_id');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setorphanage_id(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    
    fetchData();
  }, []);
  const staff_type_id= (id)=>{
    if(id !== undefined){
    const dep_id = orphanage_id.find(dept => dept.name === id);
    formData.Orphanage_id=dep_id.id;
    setorphanageimage(dep_id.image);
  }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios.post('http://localhost:4000/orphanagebranch', formData,{
      headers: {
        'Content-Type': 'application/json'
      }
  })
      .then(response => {
        alert('Added Successfully!');
        navigate('/admin/Orphanage');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Orphanage Branch</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
            <div className="formInput">
                  <Select language='English' value={orphanage_id} handleChange={(e)=>{staff_type_id(e.target.value)}} name='orphanage_id' title='Orphanage'/>
                    {orphanageimage ? <img src={orphanageimage} style={{height: "100px",width: "100px", position: 'fixed', top: '70px',right:'40px',borderRadius: '50%'}} alt='orphange'/> : ''}
                  </div>
              {orphanagebranch_input.map((input) => (
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
              <button
                className="submit-btn"
                style={{ backgroundColor: '#FFC107', color: 'white' }}
                type="submit"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrphanagebranch;
