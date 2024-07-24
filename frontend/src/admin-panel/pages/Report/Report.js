import React, { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios';
import List from '../list/List';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './ReportComponent.css'; // Import the CSS file for styling

const ReportComponent = () => {
  const [reportType, setReportType] = useState('child');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [selectedFilter, setSelectedFilter] = useState('');

  const reportEndpoints = {
    child: 'http://localhost:4000/child',
    orphanage: 'http://localhost:4000/orphanages',
    staff: 'http://localhost:4000/staff',
    orphanage_Branhes: 'http://localhost:4000/orphanagebranch',
    Donation: 'http://localhost:4000/donations',
    donor: 'http://localhost:4000/donor'
  };

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(reportEndpoints[reportType]);
        // Convert numeric fields to numbers
        const transformedData = response.data.map(item => {
          if (item.id) item.id = Number(item.id); // Handle additional numeric fields as needed
          return item;
        });
        setData(transformedData);
        setFilteredData(transformedData);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [reportType]);

  // Handle changes in filter inputs
  const handleFilterChange = (filterName, value) => {
    // Convert value to number if filterName is related to id
    if (filterName.includes('id') || filterName.includes('date')) {
      value = value instanceof Date ? value.toISOString() : Number(value);
    }
    setFilterOptions((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  // Apply filters to the data
  useEffect(() => {

    const applyFilters = () => {
      let tempData = [...data];

      Object.keys(filterOptions).forEach((key) => {
        const filterValue = filterOptions[key];
        const baseKey = key.split('-')[0]; // Extract base key (e.g., `child_id`)

        if (filterValue) {
          // Handle date filters
          if (key.includes('date') || key.includes('DOB')) {
            const start = filterOptions[`${baseKey}-start`] ? new Date(filterOptions[`${baseKey}-start`]) : null;
            const end = filterOptions[`${baseKey}-end`] ? new Date(filterOptions[`${baseKey}-end`]) : null;

            tempData = tempData.filter((item) => {
              const itemDate = new Date(item[baseKey]);
              return (!start || start <= itemDate) && (!end || itemDate <= end);
            });
          }
          // Handle ID filters
          else if (baseKey.includes('id')) {
            const min = filterOptions[`${baseKey}-start`] ? Number(filterOptions[`${baseKey}-start`]) : 0;
            const max = filterOptions[`${baseKey}-end`] ? Number(filterOptions[`${baseKey}-end`]) : Infinity;

            tempData = tempData.filter((item) => {
              const itemValue = Number(item[baseKey]);
              // Ensure itemValue is a number and within the specified range
              return !isNaN(itemValue) && itemValue >= min && itemValue <= max;
            });
          }
          // Handle other text filters
          else {
            tempData = tempData.filter((item) =>
              item[baseKey]?.toString().toLowerCase().includes(filterValue.toString().toLowerCase())
            );
          }
        }
      });
      setFilteredData(tempData);
    };

    applyFilters();
  }, [filterOptions, data]);

  // Handle filter field selection
  const handleSelectedFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    setFilterOptions({});
  };

  // Print function to generate and print the report
  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Report</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('table { width: 100%; border-collapse: collapse; }');
    printWindow.document.write('th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }');
    printWindow.document.write('th { background-color: #f4f4f4; }');
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1>Report</h1>');
    printWindow.document.write('<table><thead><tr>');

    // Generate headers
    columns.forEach((col) => {
      printWindow.document.write(`<th>${col.headerName}</th>`);
    });
    printWindow.document.write('</tr></thead><tbody>');

    // Generate rows
    filteredData.forEach((row) => {
      printWindow.document.write('<tr>');
      columns.forEach((col) => {
        printWindow.document.write(`<td>${row[col.field]}</td>`);
      });
      printWindow.document.write('</tr>');
    });
    printWindow.document.write('</tbody></table>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  // Generate column definitions
  const generateColumns = (data) => {
    if (data.length === 0) return [];

    const keys = Object.keys(data[0]);
    return keys
      .filter((key) => key !== 'image') // Exclude the image field
      .map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: 150,
      }));
  };

  // Generate filter fields
  const generateFilters = (data) => {
    if (data.length === 0) return {};

    const keys = Object.keys(data[0]);
    const filters = {};
    keys
      .filter((key) => key !== 'image') // Exclude the image field
      .forEach((key) => {
        filters[key] = { label: key.charAt(0).toUpperCase() + key.slice(1) };
      });
    return filters;
  };

  const columns = generateColumns(data);
  const filters = generateFilters(data);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="filter-row">
          <div className="report-selector">
            <label>Select Report Type: </label>
            <select className="styled-select" onChange={(e) => setReportType(e.target.value)} value={reportType}>
              <option value="child">Child</option>
              <option value="orphanage">Orphanage</option>
              <option value="staff">Staff</option>
              <option value="orphanage_Branhes">Orphanage Branches</option>
              <option value="Donation">Donation's</option>
              <option value="donor">Donor</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="filter-selector">
            <label>Select Filter Field: </label>
            <select className="styled-select" onChange={handleSelectedFilterChange} value={selectedFilter}>
              <option value="">Select Field</option>
              {Object.keys(filters).map((filterKey) => (
                <option key={filterKey} value={filterKey}>{filters[filterKey].label}</option>
              ))}
            </select>
          </div>
        </div>
        {selectedFilter && (
          <div className="filter-inputs">
            {selectedFilter.includes('date') || selectedFilter.includes('DOB') || selectedFilter.includes('id') ? (
              <>
                <div className="filter-item">
                  <label>From:</label>
                  {selectedFilter.includes('date') || selectedFilter.includes('DOB') ? (
                    <DatePicker
                      selected={filterOptions[`${selectedFilter}-start`] ? new Date(filterOptions[`${selectedFilter}-start`]) : null}
                      onChange={(date) => handleFilterChange(`${selectedFilter}-start`, date)}
                    />
                  ) : (
                    <input
                      type="number"
                      value={filterOptions[`${selectedFilter}-start`] || ''}
                      onChange={(e) => handleFilterChange(`${selectedFilter}-start`, e.target.value)}
                    />
                  )}
                </div>
                <div className="filter-item">
                  <label>To:</label>
                  {selectedFilter.includes('date') || selectedFilter.includes('DOB') ? (
                    <DatePicker
                      selected={filterOptions[`${selectedFilter}-end`] ? new Date(filterOptions[`${selectedFilter}-end`]) : null}
                      onChange={(date) => handleFilterChange(`${selectedFilter}-end`, date)}
                      maxDate={new Date()}
                    />
                  ) : (
                    <input
                      type="number"
                      value={filterOptions[`${selectedFilter}-end`] || ''}
                      onChange={(e) => handleFilterChange(`${selectedFilter}-end`, e.target.value)}
                    />
                  )}
                </div>
              </>
            ) : (
              <div className="filter-item">
                <label>{filters[selectedFilter].label}:</label>
                <input
                  type="text"
                  value={filterOptions[selectedFilter] || ''}
                  onChange={(e) => handleFilterChange(selectedFilter, e.target.value)}
                />
              </div>
            )}
          </div>
        )}
        <button className="print-button" onClick={handlePrint}>Print Report</button>
        {isLoading ? (
          <div className="loading-spinner">
            <Circles height="80" width="80" color="#FFC107" ariaLabel="circles-loading" visible={true} />
          </div>
        ) : (
          <List
            data={filteredData}
            link={reportType}
            columns={columns}
            setData={setFilteredData}
            title={`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`}
          />
        )}
      </div>
    </div>
  );
  
  
};

export default ReportComponent;
