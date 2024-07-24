import React from 'react';
import { useEffect, useState, useRef } from "react";
import { Circles } from 'react-loader-spinner';
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import axios from 'axios';
import List from '../list/List'
import { useNavigate } from 'react-router-dom';

const Vehicles = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const childRef = useRef(null);



    useEffect(() => {
        const fetchDataForPosts = async () => {
          try {
            const response = await fetch(
              `http://localhost:4000/vehicles`
            );
            if (!response.ok) {
              throw new Error(`HTTP error: Status ${response.status}`);
            }
            let usersData = await response.json();
            setData(usersData);
            setIsLoading(false);
          } catch (err) {
            console.log(err.message)
            setIsLoading(false);
          }
        };
    
        fetchDataForPosts();
      }, [])
      const navigate = useNavigate();
      const userColumns = [
        { field: "id", headerName: "Vehicle_id", width: 100 },
        {
          field: "Model",
          headerName: "Model",
          width: 150,
        },
        {
          field: "year",
          headerName: "Year",
          width: 100,
        },
        {
          field: "number",
          headerName: "Number",
          width: 100,
        },
        {
          field: "engin_no",
          headerName: "Engin No",
          width: 100,
        },
        {
          field: "action2",
          headerName: "Add Petrol",
          width: 150,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
                <button className='btn btn-outline-primary' onClick={()=>{navigate(`/admin/Vehicles/add_feul/${params.row.id}`)}}>Add Fuel</button>
              </div>
            );
          }
        },
        {
          field: "action3",
          headerName: "Add Route",
          width: 150,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
                <button className='btn btn-outline-primary' onClick={()=>{navigate(`/admin/Vehicles/add_rout/${params.row.id}`)}}>Add Route</button>
              </div>
            );
          }
        },
        {
          field: "action4",
          headerName: "Add Time In/Out",
          width: 150,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
                <button className='btn btn-outline-primary' onClick={()=>{navigate(`/admin/Vehicles/add_time_in_out/${params.row.id}`)}}>Time in/out</button>
              </div>
            );
          }
        }
      ]

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
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
              </div>
            ) : (data && (
              <List 
              data={data} 
              link='Vehicles'
              columns={userColumns} 
              setData={setData} 
              title={"Vehicles"}
          />
              )
            )}
          </div>
        </div>
    </>
  )
}

export default Vehicles