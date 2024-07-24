import React from 'react';
import { useEffect, useState, useRef } from "react";
import { Circles } from 'react-loader-spinner';
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import axios from 'axios';
import List from '../list/List'

const Orphanage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const childRef = useRef(null);



    useEffect(() => {
        const fetchDataForPosts = async () => {
          try {
            const response = await fetch(
              `http://localhost:4000/orphanages`
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
          renderCell: (params) => {
            return (
              <div>
                <a href={`mailto:${params.row.email}`}>{params.row.email}</a>
              </div>
            );
          },
        },
        {
          field: "contact",
          headerName: "Phone",
          width: 100,
          renderCell: (params) => {
            return (
              <div>
                <a href={`tel:${params.row.contact}`}>{params.row.contact}</a>
              </div>
            );
          },
        },
        {
          field: "city",
          headerName: "City",
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
              link='Orphanage'
              columns={userColumns} 
              setData={setData} 
              title={"Orphanages"}
              // onChange={(userId, newPrice) => {
              //     // Handle update logic here
              //     console.log(`Updated payment for user ${userId} to ${newPrice}`);
              // }}
          />          
              )
            )}
          </div>
        </div>
    </>
  )
}

export default Orphanage