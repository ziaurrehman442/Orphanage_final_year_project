import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Circles } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BedAllocationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataForRoom = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/rooms/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const roomData = await response.json();
        setData(roomData);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        setIsLoading(false);
      }
    };

    fetchDataForRoom();
  }, [id]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...formData];
    list[index][name] = value;
    setFormData(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setIsLoading(true);
    try {
      await axios.post(`http://localhost:4000/bedallocation`, formData);
      toast.success("Allocation successful!");
      navigate('/admin/rooms');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addBedAllocation = () => {
    setFormData([...formData, { room_id: id, bed_no: '', std_id: '', date_time: '',type: data.type }]);
  };

  const removeBedAllocation = (index) => {
    const list = [...formData];
    list.splice(index, 1);
    setFormData(list);
  };

  return (
    <>
      <div className="new">
        <div className="newContainer">
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
                <h1>{data.type === 'hostel' ? 'Hostel' : 'Office'} Allocation for Room {data.Room_id}</h1>
              </div>
              <div className="bottom">
                <form onSubmit={handleSubmit}>
                  {formData.map((bed, index) => (
                    <div key={index} className="formInput">
                      {data.type === 'hostel' ? (
                        <>
                          <label>Bed {index + 1}</label>
                          <div>
                            <input
                              type="text"
                              name="bed_no"
                              placeholder="Bed Number"
                              value={bed.bed_no}
                              onChange={(e) => handleInputChange(e, index)}
                              required
                            />
                            <input
                              type="text"
                              name="std_id"
                              placeholder="Child ID"
                              value={bed.std_id}
                              onChange={(e) => handleInputChange(e, index)}
                              required
                            />
                            <input
                              type="date"
                              name="date_time"
                              placeholder="Date & Time"
                              value={bed.date_time}
                              onChange={(e) => handleInputChange(e, index)}
                              required
                            />
                          </div>
                        </>
                      ) : data.type === 'office' && (
                        <>
                          <input
                              type="text"
                              name="bed_no"
                              placeholder="Table Number"
                              value={bed.bed_no}
                              onChange={(e) => handleInputChange(e, index)}
                              required
                            />
                            <input
                              type="text"
                              name="std_id"
                              placeholder="Staff ID"
                              value={bed.std_id}
                              onChange={(e) => handleInputChange(e, index)}
                              required
                            />
                        </>
                      )}
                      <button type="button" className='btn btn-danger my-3' onClick={() => removeBedAllocation(index)}>Remove</button>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button type="button" className='btn btn-primary bg-primary' onClick={addBedAllocation}>Add Allocation</button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button className="btn btn-warning bg-warning submit-btn" type="submit">Allocate Beds</button>
                  </div>
                </form>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default BedAllocationForm;
