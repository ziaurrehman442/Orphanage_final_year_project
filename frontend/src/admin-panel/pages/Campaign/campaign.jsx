import React from 'react';
import { useEffect, useState, useRef } from "react";
import { Circles } from 'react-loader-spinner';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios';
import List from '../list/List';

const Campaign = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const childRef = useRef(null);

  useEffect(() => {
    const fetchDataForCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:4000/campaign');
        let campaignsData = response.data;
        setData(campaignsData);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        setIsLoading(false);
      }
    };

    fetchDataForCampaigns();
  }, []);

  const campaignColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "title",
      headerName: "Title",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image} alt="avatar" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
    },
    {
      field: "Description",
      headerName: "Description",
      width: 300,
    },
    {
      field: "date_created",
      headerName: "Date Created",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
  ];

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
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
            link='campaign'
            columns={campaignColumns} 
            setData={setData} 
            title={"Campaign"}
          />          
        ))}
      </div>
    </div>
  );
}

export default Campaign;
