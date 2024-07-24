import React from 'react'
import { useEffect, useState, useRef } from "react";
//import { carsColumns } from "../../datatablesource";
import { Circles } from 'react-loader-spinner';
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { StatusDropdown, FeaturedDropdown } from '../../components/customDataButtons/customButtons';
import List from '../list/List'
import { useNavigate } from 'react-router-dom';




const Rooms = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const childRef = useRef(null);
    const [popupImageUrl, setPopupImageUrl] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate('');
  useEffect(() => {
    const fetchDataForRooms = async () => {
      try {
        const response = await fetch(
          'http://localhost:4000/rooms' // Corrected the protocol to 'http', assuming it's HTTP, not HTTPS
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const roomsData = await response.json();
        setData(roomsData);
      } catch (error) {
        console.error('Error fetching rooms data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataForRooms();
  }, []);
  
      const [getFeature, setGetFeature] = useState(data)
      const [getStatus, setGetStatus] = useState(data)
      const handleFeaturedChange = (id, newValue) => {
        setGetFeature(getFeature.map(row => (row.id === id ? { ...row, featured: newValue } : row)));
      };

      const handleStatusChange = (id, newValue) => {
        setGetStatus(getStatus.map(row => (row.id === id ? { ...row, status: newValue } : row)));
      };

      const paymentColumns = [
        { field: "id", headerName: "Room Id", width: 100 },
        {
          field: "capacity",
          headerName: "Capacity",
          width: 100,
        },
        {
          field: "branch_id",
          headerName: "Branch Id",
          width: 100
        },
        {
          field: "type",
          headerName: "type",
          width: 160
        },
        {
          field: "action2",
          headerName: "Allocate room",
          width: 260,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
                <button className='btn btn-outline-primary' onClick={()=>{navigate(`/admin/rooms/update_allocation/${params.row.id}`)}}>Update allocation</button>
              </div>
            );
          }
        }
      ];
    return (
        <>
        <div className="list">
          <Sidebar/>
          <div className="listContainer">
            <Navbar/>
            {isLoading ? (
              <div style=
                {{ 
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
                wrapperClass=""
                visible={true}
                />
              </div>
            ) : (data && (
                <List data={data} columns={paymentColumns} setData={setData} link={"Rooms"} title={"Rooms"}/> 
              )
            )}
          </div>
        </div>
      </>
    )
}

export default Rooms