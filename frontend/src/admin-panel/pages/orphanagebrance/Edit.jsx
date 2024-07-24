import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Circles } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from '../../components/dropdown/Select';

const EditOrphanagebranch = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); 
  const branchId = userId; // Assuming your route parameter is branchId
  const [orphanageimage, setorphanageimage] = useState();
  const [formData, setFormData] = useState({
    Orphanage_id: '',
    Address: '',
    city: '',
    Capacity: '',
    N_room: '',
    No_washrooms: '',
    No_showers: '',
    No_hall: '',
    No_gates: '',
    size: '',
    no_of_stories: '',
    No_orphans: '',
    date_time: '',
    available_space: ''
  });
  const [isLoading, setIsLoading] = useState(true);

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
    formData.Orphanage_id=dep_id.child_id;
    setorphanageimage(dep_id.image);
  }
  }

  


  useEffect(() => {
    const fetchOrphanageData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/orphanagebranch/${branchId}`);
        const orphanageData = response.data;
        setFormData({
          Orphanage_id: orphanageData.Orphanage_id,
          Address: orphanageData.Address,
          city: orphanageData.city,
          Capacity: orphanageData.Capacity,
          N_room: orphanageData.N_room,
          No_washrooms: orphanageData.No_washrooms,
          No_showers: orphanageData.No_showers,
          No_hall: orphanageData.No_hall,
          No_gates: orphanageData.No_gates,
          size: orphanageData.size,
          no_of_stories: orphanageData.no_of_stories,
          No_orphans: orphanageData.No_orphans,
          date_time: orphanageData.date_time,
          available_space: orphanageData.available_space
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching orphanage data:', error);
        setIsLoading(false);
      }
    };

    fetchOrphanageData();
  }, [branchId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:4000/orphanagebranch/${branchId}`, formData);
      toast.success('Orphanage branch updated successfully!');
      navigate('/admin/Orphanage');
    } catch (error) {
      console.error('Error updating orphanage branch:', error);
      toast.error(`Error: ${error.message}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'fixed',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0
            }}
          >
            <Circles color="#FFC107" height={80} width={80} ariaLabel="loading-spinner" />
          </div>
        ) : (
          <>
            <div className="top">
              <h1>Edit Orphanage Branch</h1>
            </div>
            <div className="bottom">
              <div className="right">
                <form onSubmit={handleSubmit}>
                  <div className="formInput">
                  <Select language='English' value={orphanage_id} handleChange={(e)=>{staff_type_id(e.target.value)}} name='orphanage_id' title='Orphanage'/>
                    {orphanageimage ? <img src={orphanageimage} style={{height: "100px",width: "100px", position: 'fixed', top: '70px',right:'40px',borderRadius: '50%'}} alt='orphange'/> : ''}
                  </div>
                  <div className="formInput">
                    <label>Address</label>
                    <input type="text" name="Address" value={formData.Address} onChange={handleChange} required />
                  </div>
                  <div className="formInput">
                    <label>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className="formInput">
                    <label>Capacity</label>
                    <input type="text" name="Capacity" value={formData.Capacity} onChange={handleChange} required />
                  </div>
                  <div className="formInput">
                    <label>Number of Rooms</label>
                    <input type="text" name="N_room" value={formData.N_room} onChange={handleChange} required />
                  </div>
                  <div className="formInput">
                    <label>Number of Washrooms</label>
                    <input type="text" name="No_washrooms" value={formData.No_washrooms} onChange={handleChange} required />
                  </div>
                  <div className="formInput">
                    <label>Number of Showers</label>
                    <input type="text" name="No_showers" value={formData.No_showers} onChange={handleChange} required />
                  </div>
                  <div className="formInput">
                    <label>Number of Halls</label>
                    <input type="text" name="No_hall" value={formData.No_hall} onChange={handleChange} required />
                  </div>
                  <div className="formInput">
                    <label>Number of Gates</label>
                    <input type="text" name="No_gates" value={formData.No_gates} onChange={handleChange} required />
                  </div>
                  <div className="formInput">
                    <label>Size</label>
                    <input type="text" name="size" value={formData.size} onChange={handleChange} required />
                  </div>
                  <div className="formInput">
                    <label>Number of Stories</label>
                    <input type="text" name="no_of_stories" value={formData.no_of_stories} onChange={handleChange} required />
                  </div>
                  <div className="formInput">
                    <label>Number of Orphans</label>
                    <input type="text" name="No_orphans" value={formData.No_orphans} onChange={handleChange} required />
                  </div>
                  <div className="formInput">
                    <label>Date and Time</label>
                    <input type="text" name="date_time" value={formData.date_time} onChange={handleChange} required />
                  </div>
                  <div className="formInput">
                    <label>Available Space</label>
                    <input type="text" name="available_space" value={formData.available_space} onChange={handleChange} required />
                  </div>

                  <button className="submit-btn" style={{ backgroundColor: '#FFC107', color: 'white' }} type="submit">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default EditOrphanagebranch;
