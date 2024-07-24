import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { Circles } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

const GuardianDetails = () => {
  const { guardianId } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/guardian/${guardianId}`);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const guardianData = await response.json();
        setData(guardianData.data);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [guardianId]);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
            <Circles height="80" width="80" color="#FFC107" ariaLabel="circles-loading" />
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="content">
            <div className="top">
              <div className="left">
                <h1 className="title">Information</h1>
                <div className="item">
                  <img
                    src={data.image}
                    alt={data.gardian_name}
                    className="itemImg"
                  />
                  <div className="details mx-5 px-3" align="left">
                    <h1 className="itemTitle" align="center">{data.gardian_name}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{data.email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Contact:</span>
                      <span className="itemValue">{data.contact}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">CNIC:</span>
                      <span className="itemValue">{data.gardian_cnic}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Child ID:</span>
                      <span className="itemValue">{data.child_id}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Address:</span>
                      <span className="itemValue">{data.address}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Emergency Contact:</span>
                      <span className="itemValue">{data.emergency_contact}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <Chart aspect={3 / 1} title="Guardian Activities (Last 6 Months)" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuardianDetails;
