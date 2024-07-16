// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContourChart from './components/ContourChart';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch JSON data from FastAPI backend
    axios.get('http://localhost:8000/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching JSON:', error));
  }, []);

  return (
    <div className="App">
      <h1>Contour Chart with D3 and React</h1>
      {data ? <ContourChart data={data} /> : <p>Loading data...</p>}
    </div>
  );
};

export default App;
