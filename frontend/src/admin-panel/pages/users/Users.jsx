import React from 'react';
import { useEffect, useState, useRef } from "react";
import { Circles } from 'react-loader-spinner';
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import axios from 'axios';
import List from '../list/List'
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const childRef = useRef(null);
  const navigate = useNavigate();


    useEffect(() => {
        const fetchDataForPosts = async () => {
          try {
            const response = await fetch(
              `http://localhost:4000/staff`
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

      const userColumns = [
        { field: "id", headerName: "ID", width: 70 },
        {
          field: "name",
          headerName: "Name",
          width: 230,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
                <img className="cellImg" src={params.row.image} alt="avatar" />
                {params.row.name}
              </div>
            );
          },
        },
        {
          field: "email",
          headerName: "Email",
          width: 100,
        },
        {
          field: "phone",
          headerName: "Phone",
          width: 100,
        },
        {
          field: "country",
          headerName: "Country",
          width: 100,
        },{
          field: "Action2",
          headerName: "Allocate Vehicle",
          width: 230,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
                {params.row.Department_id === 3 ? <button className='btn btn-outline-primary' onClick={()=>{navigate(`/admin/Staff/allocation_vehicle/${params.row.id}`)}}>Allocate Vehicle</button> : ''}
              </div>
            );
          },
        },
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
              link='staff'
              columns={userColumns} 
              setData={setData} 
              title={"Staff"}
          />          
              )
            )}
          </div>
        </div>
    </>
  )
}

export default Users