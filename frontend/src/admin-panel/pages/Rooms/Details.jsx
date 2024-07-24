import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Circles } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

const RoomDetails = () => {
  const { roomId } = useParams(); // Assuming you have defined `roomId` in your route
  const [roomData, setRoomData] = useState({});
  const [bedAllocations, setBedAllocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/rooms/${roomId}`);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const roomDetails = await response.json();
        setRoomData(roomDetails);
        setError(null);
        setIsLoading(false);
      } catch (err) {
        console.error('Fetch room details error:', err.message);
        setError(err.message);
        setIsLoading(false);
      }
    };

    const fetchBedAllocations = async () => {
      try {
        const response = await fetch(`http://localhost:4000/bedallocations/${roomData.type}/${roomId}`);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const allocations = await response.json();
        setBedAllocations(allocations);
        setError(null);
        setIsLoading(false);
      } catch (err) {
        console.error('Fetch bed allocations error:', err.message);
        setError(err.message);
        setIsLoading(false);
      }
    };

    if (roomData.type) {
      fetchBedAllocations();
    } else {
      fetchRoomDetails();
    }
  }, [roomId, roomData.type]);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
            <Circles
              height="80"
              width="80"
              color="#FFC107"
              ariaLabel="circles-loading"
            />
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="content">
            <div className="top">
              <div className="left">
                <h1 className="title">Room Details</h1>
                <div className="item">
                  <div className="details" align="left">
                    <h1 className="itemTitle" align="center">Room ID: {roomData.id}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Type:</span>
                      <span className="itemValue">{roomData.type}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Capacity:</span>
                      <span className="itemValue">{roomData.capacity}</span>
                    </div>
                    {/* Add more details as needed */}
                  </div>
                </div>
              </div>
              <div className="right">
                {roomData.type === 'hostel' && (
                  <div>
                    <h2>Bed Allocations</h2>
                    <ul>
                      {bedAllocations.map((allocation, index) => (
                        <li key={index}>
                          Bed {allocation.bed_no}: Student ID {allocation.std_id}, Allocated on {allocation.date_time}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {roomData.type === 'office' && (
                  <div>
                    <h2>Table Allocations</h2>
                    <ul>
                      {bedAllocations.map((allocation, index) => (
                        <li key={index}>
                          Table: {allocation.tables}, Staff ID: {allocation.staff_id}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetails;
