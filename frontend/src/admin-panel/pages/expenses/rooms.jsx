import React from 'react'
import { useEffect, useState, useRef } from "react";
//import { carsColumns } from "../../datatablesource";
import { Circles } from 'react-loader-spinner';
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { StatusDropdown, FeaturedDropdown } from '../../components/customDataButtons/customButtons';
import List from '../list/List'
import { useNavigate } from 'react-router-dom';




const Expenses = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDataForRooms = async () => {
      try {
        const response = await fetch(
          'http://localhost:4000/expenses' // Corrected the protocol to 'http', assuming it's HTTP, not HTTPS
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

      const paymentColumns = [
        { field: "id", headerName: "Expenses Id", width: 100 },
        {
          field: "expense_type",
          headerName: "Expense Type",
          width: 100
        },
        {
          field: "Amount",
          headerName: "Amount",
          width: 100
        },
        {
          field: "Staff_id",
          headerName: "Staff Id",
          width: 100
        },
        {
          field: "Recorder_name",
          headerName: "Recorder Name",
          width: 100
        },
        {
          field: "Date",
          headerName: "Date",
          width: 100
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
                <List data={data} columns={paymentColumns} setData={setData} link={"expenses"} title={"Expenses"}/> 
              )
            )}
          </div>
        </div>
      </>
    )
}

export default Expenses