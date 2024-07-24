import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const BedAllocationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState([]);
  const [existingAllocations, setExistingAllocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unallocatedBeds, setUnallocatedBeds] = useState([]);
  const [unallocatedTables, setUnallocatedTables] = useState([]);
  const [childOptions, setChildOptions] = useState([]);
  const [staffOptions, setStaffOptions] = useState([]);

  useEffect(() => {
    const fetchDataForRoom = async () => {
      try {
        const roomResponse = await fetch(`http://localhost:4000/rooms/${id}`);
        if (!roomResponse.ok) {
          throw new Error(`HTTP error: Status ${roomResponse.status}`);
        }
        const roomData = await roomResponse.json();
        setData(roomData);

        const allocationsResponse = await fetch(`http://localhost:4000/api/allocations/${roomData.type === 'hostel' ? 'hostel' : 'office'}/${id}`);
        if (!allocationsResponse.ok) {
          throw new Error(`HTTP error: Status ${allocationsResponse.status}`);
        }
        const allocationsData = await allocationsResponse.json();

        setExistingAllocations(allocationsData);
        
        // Calculate unallocated beds or tables
        if (roomData.type === 'hostel') {
          const totalBeds = roomData.capacity; // Assuming the roomData contains the total capacity
          const allocatedBeds = allocationsData.map(allocation => allocation.bed_no);
          const unallocated = Array.from({ length: totalBeds }, (_, i) => i + 1).filter(bed => !allocatedBeds.includes(bed));
          setUnallocatedBeds(unallocated);
        } else if (roomData.type === 'office') {
          const totalTables = roomData.capacity; // Assuming the roomData contains the total capacity
          const allocatedTables = allocationsData.map(allocation => allocation.tables);
          const unallocated = Array.from({ length: totalTables }, (_, i) => i + 1).filter(table => !allocatedTables.includes(table));
          setUnallocatedTables(unallocated);
        }

        // Fetch children and staff data
        const [childrenResponse, staffResponse] = await Promise.all([
          fetch('http://localhost:4000/api/child_id'),
          fetch('http://localhost:4000/api/staff_id')
        ]);

        if (!childrenResponse.ok || !staffResponse.ok) {
          throw new Error('Failed to fetch children or staff data');
        }

        const [childrenData, staffData] = await Promise.all([
          childrenResponse.json(),
          staffResponse.json()
        ]);

        setChildOptions(childrenData);
        setStaffOptions(staffData);

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
    setIsLoading(true);
    try {
      await axios.post(`http://localhost:4000/bedallocation`, formData);
      toast.success('Allocation successful!');
      navigate('/admin/rooms');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addBedAllocation = () => {
    if (data.type === 'hostel' && unallocatedBeds.length > 0) {
      const nextBedNo = unallocatedBeds.shift();
      setFormData([...formData, { room_id: id, bed_no: nextBedNo, std_id: '', date_time: '', type: data.type }]);
    } else if (data.type === 'office' && unallocatedTables.length > 0) {
      const nextTableNo = unallocatedTables.shift();
      setFormData([...formData, { room_id: id, bed_no: nextTableNo, std_id: '', date_time: '', type: data.type }]);
    }
  };

  const removeBedAllocation = (index) => {
    const list = [...formData];
    const removedItem = list.splice(index, 1)[0];
    setFormData(list);

    if (data.type === 'hostel') {
      setUnallocatedBeds([...unallocatedBeds, removedItem.bed_no].sort((a, b) => a - b));
    } else if (data.type === 'office') {
      setUnallocatedTables([...unallocatedTables, removedItem.bed_no].sort((a, b) => a - b));
    }
  };

  return (
    <>
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
      <ToastContainer />
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
                  {existingAllocations.map((allocation, index) => (
                    <div key={index} className="formInput" style={{marginBottom: '20px'}}>
                      {data.type === 'hostel' ? (
                        <>
                          <label>Bed {allocation.bed_no}</label>
                          <div>
                            <label >Child Name</label>{': '}
                            <input
                              type="text"
                              name="child_name"
                              value={childOptions.find(child => child.id === allocation.std_id)?.name || ''}
                              readOnly
                            />
                            <label >Date</label>{': '}
                            <input
  type="date"
  name="date_time"
  value={new Date(allocation.date_time).toISOString().split('T')[0]}
  readOnly
/>
                            <img
                              src={childOptions.find(child => child.id === allocation.std_id)?.image || ''}
                              style={{width: '50px', height:'50px',position: 'relative', float: 'right'}}
                            />
                          </div>
                        </>
                      ) : data.type === 'office' && (
                        <>
                          <label>Table {allocation.tables}</label>
                          <div style={{marginBottom: '20px'}}>
                          <label >Staff Name</label>{': '}
                            <input
                              type="text"
                              name="staff_name"
                              value={staffOptions.find(staff => staff.id === allocation.staff_id)?.name || ''}
                              readOnly
                            />
                            <img
                              src={staffOptions.find(staff => staff.id === allocation.staff_id)?.image || ''}
                              style={{width: '50px', height:'50px',position: 'relative', float: 'right'}}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  {formData.map((bed, index) => (
                    <div key={index} className="formInput">
                      {data.type === 'hostel' ? (
                        <>
                          <label>Bed {bed.bed_no}</label>
                          <div>
                            <input
                              type="hidden"
                              name="bed_no"
                              value={bed.bed_no}
                            />
                            <select
                              name="std_id"
                              value={bed.std_id}
                              onChange={(e) => handleInputChange(e, index)}
                              required
                            >
                              <option value="" disabled>Select Child</option>
                              {childOptions.map((child) => (
                                <option key={child.id} value={child.id}>{child.name}</option>
                              ))}
                            </select>
                            <input
                              type="date"
                              name="date_time"
                              placeholder="Date & Time"
                              value={bed.date_time}
                              onChange={(e) => handleInputChange(e, index)}
                              required
                            />
                             {formData[index].std_id !== '' ? <img
                              src={childOptions.find(child => child.id === Number(formData[index].std_id))  ?.image || ''}
                              style={{width: '50px', height:'50px',position: 'relative', float: 'right'}}
                            />
                            : ''}
                          </div>
                        </>
                      ) : data.type === 'office' && (
                        <>
                          <label>Table {bed.bed_no}</label>
                          <div>
                            <input
                              type="hidden"
                              name="bed_no"
                              value={bed.bed_no}
                            />
                            <select
                              name="std_id"
                              value={bed.std_id}
                              onChange={(e) => handleInputChange(e, index)}
                              required
                            >
                              <option value="" disabled>Select Staff</option>
                              {staffOptions.map((staff) => (
                                <option key={staff.id} value={staff.id}>{staff.name}</option>
                              ))}
                            </select>
                            {formData[index].std_id !== '' ? <img
                              src={staffOptions.find(child => child.id === Number(formData[index].std_id))  ?.image || ''}
                              style={{width: '50px', height:'50px',position: 'relative', float: 'right'}}
                            />
                            : ''}
                          </div>
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
      </div></div>
    </>
  );
};

export default BedAllocationForm;
