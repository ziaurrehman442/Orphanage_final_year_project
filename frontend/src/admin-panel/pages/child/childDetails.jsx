import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Circles } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

const ChildDetails = () => {
  const { childID } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/child/${childID}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const userData = await response.json();
        setData(userData); // Set userData into data state
        setIsLoading(false);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError(err.message); // Set error state
        setIsLoading(false);
      }
    };

    fetchDataForPosts();
  }, [childID]);

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
                  <img
                    src={data.image}
                    alt={data.name}
                    className="itemImg"
                  />
                  <div className="details mx-5 px-3"  align="left">
                    <h1 className="itemTitle" align="center">{data.Name}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Father Name:</span>
                      <span className="itemValue">{data.F_name}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Mother Name:</span>
                      <span className="itemValue">{data.M_name}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Emergency contact:</span>
                      <span className="itemValue">{data.emergency_contact}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Cnic:</span>
                      <span className="itemValue">
                        {data.cnic}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Mother cnic:</span>
                      <span className="itemValue">{data.M_cnic}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Father cnic:</span>
                      <span className="itemValue">{data.F_cnic}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Siblings:</span>
                      <span className="itemValue">{data.Siblings}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Date of Birth:</span>
                      <span className="itemValue">{data.DOB}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Registration Time:</span>
                      <span className="itemValue">{data.register_time}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Mail Address:</span>
                      <span className="itemValue">{data.mailing_address}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right" style={{maxWidth: '50%'}}>
                <Chart aspect={3 / 1} title="Child Spending ( Last 6 Months)" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildDetails;
