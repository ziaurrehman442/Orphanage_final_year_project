import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Circles } from 'react-loader-spinner';
import { Link, useNavigate, useParams } from 'react-router-dom';

const OrphanageDetailsbranch = () => {
  const { userId } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate('');
 
  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/orphanagebranch/${userId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const userData = await response.json();
        setData(userData); // Set userData into data state
        setError(null);
        setIsLoading(false); // Clear any previous errors
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError(err.message); // Set error state
        setIsLoading(false);
      }
    };

    fetchDataForPosts();
  }, [userId]);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
            <Circles
              height="80"
              width="80"
              color="#FFC107"
              ariaLabel="circles-loading"
            />
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="content">
            <div className="top">
              <div className="left">
                <h1 className="title">Information</h1>
                <div className="item">
                  <div className="details"  align="left">
                    <h1 className="itemTitle" align="center">Branch ID: {data.branch_id}</h1> 
                    <div className="detailItem">
                      <span className="itemKey">Orphanage_id:</span>
                      <span className="itemValue">{data.Orphanage_id}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Capacity:</span>
                      <span className="itemValue">{data.Capacity}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Address:</span>
                      <span className="itemValue">
                        {data.Address}.{data.city}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Number of Room:</span>
                      <span className="itemValue">{data.N_room}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">No of Washroom:</span>
                      <span className="itemValue">{data.No_washrooms}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">No of Shower:</span>
                      <span className="itemValue">{data.No_showers}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">No of Halls:</span>
                      <span className="itemValue">{data.No_hall}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">No of Gates:</span>
                      <span className="itemValue">{data.No_gates}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">No of Washroom:</span>
                      <span className="itemValue">{data.No_washrooms}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">No of Size:</span>
                      <span className="itemValue">{data.size}sq ft</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">No of Orphans:</span>
                      <span className="itemValue">{data.No_orphans}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Available Space:</span>
                      <span className="itemValue">{data.available_space}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Update Date:</span>
                      <span className="itemValue">{data.date_time}sq ft</span>
                    </div>
                  </div>
                </div> 
                
              </div>
              <div className="right" align="center">
                  <Chart aspect={3 / 1} title="Branch Spending ( Last 6 Months)" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrphanageDetailsbranch;
