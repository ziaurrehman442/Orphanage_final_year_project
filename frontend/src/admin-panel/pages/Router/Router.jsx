import React from 'react';
import { useEffect, useState, useRef } from "react";
import { Circles } from 'react-loader-spinner';
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import axios from 'axios';
import List from '../list/List'

const Router = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        const fetchDataForPosts = async () => {
          try {
            const response = await fetch(
              `http://localhost:4000/vehicle_roster`
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
      console.log(data);
      const userColumns = [
        { field: "id", headerName: "ID", width: 70 },
        {
          field: "Vehicle_id",
          headerName: "Vehicle Id",
          width: 100
        },
        {
          field: "time_in",
          headerName: "Time In",
          width: 100,
        },
        {
          field: "time_out",
          headerName: "Time Out",
          width: 100,
        },
        {
          field: "off_days",
          headerName: "Off Days",
          width: 300
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
              link='vehicle_roster'
              columns={userColumns} 
              setData={setData} 
              title={"Roster"}
          />          
              )
            )}
          </div>
        </div>
    </>
  )
}

export default Router