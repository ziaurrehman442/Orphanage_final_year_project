import React from 'react';
import { useEffect, useState, useRef } from "react";
import { Circles } from 'react-loader-spinner';
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import axios from 'axios';
import List from '../list/List'

const Orphanagebranch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const childRef = useRef(null);



    useEffect(() => {
        const fetchDataForPosts = async () => {
          try {
            const response = await fetch(
              `http://localhost:4000/orphanagebranch`
            );
            if (!response.ok) {
              throw new Error(`HTTP error: Status ${response.status}`);
            }
            let usersData = await response.json();
            setData(usersData);
            console.log(usersData);
            setIsLoading(false);
          } catch (err) {
            console.log(err.message)
            setIsLoading(false);
          }
        };
    
        fetchDataForPosts();
      }, [])

      const userColumns = [
        { field: "id", headerName: "Branch ID", width: 150 },
        {
          field: "Orphanage_id",
          headerName: "Orphanage Id",
          width: 150,
        },
        {
          field: "city",
          headerName: "City",
          width: 150,
        },
        {
          field: "Capacity",
          headerName: "Capacity",
          width: 150,
        },
        {
          field: "N_room",
          headerName: "Number of Rooms",
          width: 150,
        },
        {
          field: "no_of_stories",
          headerName: "Number of Stories",
          width: 150,
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
              link='Orphanage_branches'
              columns={userColumns} 
              setData={setData} 
              title={"Branches"}
          />          
              )
            )}
          </div>
        </div>
    </>
  )
}

export default Orphanagebranch