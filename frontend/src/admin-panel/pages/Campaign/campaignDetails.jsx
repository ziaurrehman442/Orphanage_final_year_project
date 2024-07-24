import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { Circles } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import "./campain.css"

const CampaignDetails = () => {
  const { campaignID } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/campaign/${campaignID}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const campaignData = await response.json();
        setData(campaignData); // Set campaignData into data state
        setIsLoading(false);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError(err.message); // Set error state
        setIsLoading(false);
      }
    };

    fetchCampaignData();
  }, [campaignID]);

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
                <h1 className="title">Campaign Information</h1>
                <div className="item">
                  <img
                    src={data.image}
                    alt={data.title}
                    className="itemImg"
                  />
                  <div className="details mx-5 px-3" align="left">
                    <h1 className="itemTitle" align="center">{data.title}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Amount:</span>
                      <span className="itemValue">{data.amount}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Description:</span>
                      <span className="itemValue" dangerouslySetInnerHTML={{ __html: data.Description }}></span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Date Created:</span>
                      <span className="itemValue">{data.date_created}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Status:</span>
                      <span className="itemValue">{data.status}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right" style={{ maxWidth: '50%' }}>
                <Chart aspect={3 / 1} title="Campaign Spending (Last 6 Months)" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignDetails;
