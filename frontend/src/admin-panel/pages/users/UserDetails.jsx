import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Circles } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const { userId } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/staff/${userId}`
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
  }, [userId]);
  console.log(data);
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
                    <h1 className="itemTitle" align="center">{data.name}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{data.email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Phone:</span>
                      <span className="itemValue">{data.phone}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Employ No:</span>
                      <span className="itemValue">{data.Emp_no}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Department Id:</span>
                      <span className="itemValue">{data.Department_id}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Address:</span>
                      <span className="itemValue">
                        {data.address}.
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Country:</span>
                      <span className="itemValue">{data.country}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Salary:</span>
                      <span className="itemValue">{data.salary}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Joinning Date:</span>
                      <span className="itemValue">{data.Joinning_date}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Date of Birth:</span>
                      <span className="itemValue">{data.date_of_birth}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Allocated Vehicle ID:</span>
                      <span className="itemValue">{data.vehicle_id}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <Chart aspect={3 / 1} title="Staff Spending ( Last 6 Months)" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
