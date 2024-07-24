import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import axios from 'axios';

const Home = () => {
  const [Data, setData] = useState(); 
  const [summaryData, setSummaryData] = useState({
    totalOrphanages: 0,
    totalBranches: 0,
    totalChildren: 0,
    totalStaff: 0,
    totalDonations: 0,
    totalExpenses: 0,
  });

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/summary');
        setSummaryData(response.data);
      } catch (error) {
        console.error('Error fetching summary data:', error);
      }
      try {
        const response = await axios.get('http://localhost:4000/api/donations');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching summary data:', error);
      }
    };

    fetchSummaryData();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="Total Orphanages" amount={summaryData.orphanages} />
          <Widget type="Total Branches" amount={summaryData.branches} />
          <Widget type="Total Children" amount={summaryData.children} />
          <Widget type="Total Staff" amount={summaryData.staff} />
          <Widget type="Total Donations" amount={summaryData.totalDonations} />
          <Widget type="Total Expenses" amount={summaryData.totalExpenses} />
        </div>
        <div className="charts">
          {/* <Featured /> */}
          <Chart title="Last 6 Days (Donations)" Data={Data} aspect={2 / 1} />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;