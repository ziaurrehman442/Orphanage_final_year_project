import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { Circles } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

const DonationDetails = () => {
  const { donation_id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonationDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/donation/${donation_id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const donationData = await response.json();
        setData(donationData); // Set donationData into data state
        setIsLoading(false);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError(err.message); // Set error state
        setIsLoading(false);
      }
    };

    fetchDonationDetails();
  }, [donation_id]);

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
                <h1 className="title">Donation Details</h1>
                <div className="item">
                  <div className="details mx-5 px-3" align="left">
                    <h1 className="itemTitle" align="center">Donor Information</h1>
                    <div className="detailItem">
                      <span className="itemKey">Name:</span>
                      <span className="itemValue">{data.donor.name}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{data.donor.email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Contact:</span>
                      <span className="itemValue">{data.donor.contact}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Cnic:</span>
                      <span className="itemValue">{data.donor.cnic}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Country:</span>
                      <span className="itemValue">{data.donor.country}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">City:</span>
                      <span className="itemValue">{data.donor.city}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Address:</span>
                      <span className="itemValue">{data.donor.Address}</span>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="details mx-5 px-3" align="left">
                    <h1 className="itemTitle" align="center">Donation Information</h1>
                    <div className="detailItem">
                      <span className="itemKey">Amount:</span>
                      <span className="itemValue">{data.donation.amount}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Date:</span>
                      <span className="itemValue">{data.donation.date}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Time:</span>
                      <span className="itemValue">{data.donation.time}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Method:</span>
                      <span className="itemValue">{data.donation.method}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Transaction id:</span>
                      <span className="itemValue">{data.donation.transaction_id}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Purpose:</span>
                      <span className="itemValue">{data.donation.purpose}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationDetails;