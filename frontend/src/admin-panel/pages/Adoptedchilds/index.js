import React from 'react';
import { useEffect, useState, useRef } from "react";
import { Circles } from 'react-loader-spinner';
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import axios from 'axios';
import List from '../list/List'

const Adoptedchild = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const childRef = useRef(null);



    useEffect(() => {
        const fetchDataForPosts = async () => {
          try {
            const response = await fetch(
              `http://localhost:4000/adopted-children`
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
        { field: "child_id", headerName: "Child id", width: 70 },
        {
          field: "Name",
          headerName: "Name",
          width: 200,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
                <img className="cellImg" src={params.row.image} alt="avatar" />
                {params.row.Name}
              </div>
            );
          },
        },
        {
          field: "DOB",
          headerName: "DOB",
          width: 200,
        },
        {
          field: "emergency_contact",
          headerName: "Emergency Contact",
          width: 200,
        },
        {
          field: "adoption_expiry_date",
          headerName: "Expiry Date",
          width: 200,
        },
        {
          field: "donor_name",
          headerName: "Donor Name",
          width: 200,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
                <a href={`/admin/donations/view/${params.row.donation_id}`}>
                  {params.row.donor_name}
                </a>
              </div>
            );
          },
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
              columns={userColumns} 
              setData={setData} 
              title={"Adopted Child's"}
          />          
              )
            )}
          </div>
        </div>
    </>
  )
}

export default Adoptedchild