// src/App.js

import React, { useState, useEffect } from 'react';
import ContourChart from './components/ContourChart';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch JSON data from a specific path
    fetch('../volcano.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching JSON:', error));
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          setData(jsonData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="App">
      <h1>Contour Chart with D3 and React</h1>
      <input type="file" accept=".json" onChange={handleFileUpload} />
      {data ? <ContourChart data={data} /> : <p>Loading data or please upload a JSON file.</p>}
    </div>
  );
};

export default App;

