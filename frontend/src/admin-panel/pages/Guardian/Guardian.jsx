import React from 'react';
import { useEffect, useState } from "react";
import { Circles } from 'react-loader-spinner';
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import axios from 'axios';
import List from '../list/List'
import { useNavigate } from 'react-router-dom';

const Guardian = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();


    useEffect(() => {
        const fetchDataForPosts = async () => {
          try {
            const response = await fetch(
              `http://localhost:4000/guardian`
            );
            if (!response.ok) {
              throw new Error(`HTTP error: Status ${response.status}`);
            }
            let usersData = await response.json();
            setData(usersData.data);
            setIsLoading(false);
          } catch (err) {
            console.log(err.message)
            setIsLoading(false);
          }
        };
    
        fetchDataForPosts();
      }, [])


      const userColumns = [
        { field: "id", headerName: "ID", width: 70 },
        {
          field: "gardian_name",
          headerName: "Gardian Name",
          width: 230,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
                <img className="cellImg" src={params.row.image} alt="avatar" />
                {params.row.gardian_name}
              </div>
            );
          },
        },{
          field: "child_id",
          headerName: "Child Id",
          width: 100,
        },
        {
          field: "email",
          headerName: "Email",
          width: 100,
        },
        {
          field: "contact",
          headerName: "Phone",
          width: 100,
        },
        {
          field: "emergency_contact",
          headerName: "Emergency Contact",
          width: 100,
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
              link='Guardian'
              columns={userColumns} 
              setData={setData} 
              title={"Gardian"}
          />          
              )
            )}
          </div>
        </div>
    </>
  )
}

export default Guardian