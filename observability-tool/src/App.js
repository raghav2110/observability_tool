import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from "recharts";
import "./App.css";
import { format } from "date-fns";
import data from "./data";
import moment from 'moment'; 


const App = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedEndpoints, setSelectedEndpoints] = useState(["Home", "Product", "Contact"]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showSpecialRequests, setShowSpecialRequests] = useState(false);

  const handleFilter = () => {
    let filtered = data;
    if (startDate && endDate) {
      filtered = filtered.filter((entry) => {
        const timestamp = new Date(entry.time);
        return timestamp >= startDate && timestamp <= endDate;
      });
    }
    if (selectedEndpoints.length > 0) {
      filtered = filtered.filter((entry) => selectedEndpoints.includes(entry.endpoint));
    }
    if (showSpecialRequests) {
      filtered = filtered.filter((entry) => entry.special);
    }
    setFilteredData(filtered);
  };

  const formatTooltipTime = (time) => {
    return moment(time).format('ddd MMM D yyyy'); // Customize the date format here
  };

  return (
    <div className="container">
      <div className="filters">
        <div className="date-filter">
          <input type="date" onChange={(e) => setStartDate(new Date(e.target.value))} />
          <input type="date" onChange={(e) => setEndDate(new Date(e.target.value))} />
        </div>
        <div className="endpoint-filter">
          {["Home", "Product", "Contact"].map((endpoint) => (
            <label key={endpoint}>
              <input
                type="checkbox"
                value={endpoint}
                checked={selectedEndpoints.includes(endpoint)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedEndpoints([...selectedEndpoints, e.target.value]);
                  } else {
                    setSelectedEndpoints(selectedEndpoints.filter((ep) => ep !== e.target.value));
                  }
                }}
              />
              {endpoint}
            </label>
          ))}
        </div>
        <div className="checkbox-label">
          <input
            type="checkbox"
            id="showSpecial"
            checked={showSpecialRequests}
            onChange={() => setShowSpecialRequests(!showSpecialRequests)}
          />
          <label htmlFor="showSpecial">Show Special Requests</label>
        </div>
        <button className="apply-button" onClick={handleFilter}>Apply Filters</button>
      </div>
      <div className="chart">
        <div className="header"><h3 className="heading">Connection Details</h3><h5>06/10/2023 - 08/10/2023</h5></div>
        <LineChart width={800} height={400} data={filteredData}>
          <CartesianGrid strokeDasharray="1" />
          <XAxis dataKey="time" padding={{ left: 40 }} allowDuplicatedCategory={false} tickFormatter={(tick) => format(new Date(tick), "eee MMM dd yyyy")}/>
          <YAxis>
            <Label value="Request Count" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip labelFormatter={formatTooltipTime}/>
          <Legend />
          {selectedEndpoints.map((endpoint, index) => (
            <Line
              key={index}
              type="basic"
              dataKey="requests"
              data={filteredData.filter((entry) => entry.endpoint === endpoint)}
              name={endpoint}
              stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            />
          ))}
        </LineChart>
      </div>
    </div>
  );
};

export default App;