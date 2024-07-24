import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Chart from '../../components/chart/Chart';
import { Circles } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import CustomTable from '../../components/table/Table';


const VehiclesDetail = () => {
  const { id } = useParams();
  const [data, setVehicleData] = useState({});
  const [fuelingData, setFuelingData] = useState([]);
  const [rosterData, setRosterData] = useState([]);
  const [routeData, setRouteData] = useState([]);
  const [vehicle_time_in_out, setvehicle_time_in_out] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fuelingColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Vehicle_id', headerName: 'Vehicle Id', width: 100 },
    { field: 'time', headerName: 'Time', width: 100 },
    { field: 'date', headerName: 'Date', width: 100 },
    { field: 'pump', headerName: 'Pump', width: 100 },
    { field: 'pump_location', headerName: 'Pump Location', width: 150 },
    { field: 'liters', headerName: 'Liters', width: 100 },
    { field: 'rate', headerName: 'Rate', width: 100 },
    { field: 'total_price', headerName: 'Total Price', width: 120 },
  ];

  const rosterColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Vehicle_id', headerName: 'Vehicle Id', width: 100 },
    { field: 'time_in', headerName: 'Time In', width: 100 },
    { field: 'time_out', headerName: 'Time Out', width: 100 },
    { field: 'off_days', headerName: 'Off Days', width: 300 },
  ];

  const routeColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Vehicle_id', headerName: 'Vehicle Id', width: 100 },
    { field: 'pick_up', headerName: 'Pick Up', width: 150 },
    { field: 'drop_off', headerName: 'Drop Off', width: 150 },
    { field: 'pick_up_time', headerName: 'Pick Up Time', width: 150 },
    { field: 'drop_time', headerName: 'Drop Time', width: 150 },
  ];

  const vehicle_time_in_outColumns =[
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Vehicle_id', headerName: 'Vehicle Id', width: 100 },
    { field: 'time_in', headerName: 'Time In', width: 100 },
    { field: 'time_out', headerName: 'Time Out', width: 100 },
  ]
  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/vehicles/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const data = await response.json();
        setVehicleData(data);
      } catch (error) {
        console.error('Error fetching vehicle data:', error.message);
        setError(error.message);
      }
    };

    const fetchData = async () => {
      try {
        const [fuelingResponse, rosterResponse, routeResponse,vehicle2] = await Promise.all([
          fetch(`http://localhost:4000/fuelRecords/${id}`),
          fetch(`http://localhost:4000/vehicle_roster/${id}`),
          fetch(`http://localhost:4000/vehicle_routes/${id}`),
          fetch(`http://localhost:4000/vehicle_time_in_out/${id}`),
        ]);

        if (!fuelingResponse.ok) {
          throw new Error(`HTTP error: Status ${fuelingResponse.status}`);
        }
        if (!rosterResponse.ok) {
          throw new Error(`HTTP error: Status ${rosterResponse.status}`);
        }
        if (!routeResponse.ok) {
          throw new Error(`HTTP error: Status ${routeResponse.status}`);
        }

        const fuelingData = await fuelingResponse.json();
        const rosterData = await rosterResponse.json();
        const routeData = await routeResponse.json();
        const vehicle1 = await vehicle2.json();

        setFuelingData(fuelingData);
        setRosterData(rosterData);
        setRouteData(routeData);
        setvehicle_time_in_out(vehicle1);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchVehicleData();
    fetchData();
  }, [id]);

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
                <h1 className="title">
                <div className="detailItem">
                      <span className="itemKey">Model:</span>
                      <span className="itemValue">{data.Model}</span>
                    </div>
                  </h1>
                <div className="item">
                  <div className="details mx-5 px-3"  align="left">
                    <h1 className="itemTitle" align="center">{data.name}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Vehicle Id: </span>
                      <span className="itemValue">{`${data.Vehicle_id}`}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Year:</span>
                      <span className="itemValue">{data.year}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Number:</span>
                      <span className="itemValue">{data.number}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Engine No:</span>
                      <span className="itemValue">{data.engin_no}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Chasses No:</span>
                      <span className="itemValue">{data.chasses_no}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Color:</span>
                      <span className="itemValue">{data.color}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">type:</span>
                      <span className="itemValue">{data.type}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">No Of Passanger:</span>
                      <span className="itemValue">{data.no_passanger}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Load weight:</span>
                      <span className="itemValue">{data.loadweight}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Fuel Capacity:</span>
                      <span className="itemValue">{data.fuel_capacity}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Top Speed:</span>
                      <span className="itemValue">{data.top_speed}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Location:</span>
                      <span className="itemValue">{data.location}</span>
                  </div>
                  <div className="detailItem">
                      <span className="itemKey">Fuel Type:</span>
                      <span className="itemValue">{data.fuel_type}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
              <h2>Time In/Out</h2>
                <CustomTable data={vehicle_time_in_out} columns={vehicle_time_in_outColumns} />
              </div>
            </div>
            <div className="section">
              <h2>Fueling Records</h2>
              <CustomTable data={fuelingData} columns={fuelingColumns} />
            </div>

            <div className="section">
              <h2>Roster</h2>
              <CustomTable data={rosterData} columns={rosterColumns} />
            </div>

            <div className="section">
              <h2>Routes</h2>
              <CustomTable data={routeData} columns={routeColumns} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiclesDetail;
