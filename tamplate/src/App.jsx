import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [statusList, setStatusList] = useState([]);

  useEffect(() => {
    // Fetch data from the Node.js API when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Replace 'http://localhost:5000' with the actual URL of your Node.js server
      const response = await axios.get('http://localhost:5000/status');
      setStatusList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Status List</h1>
      <ul>
        {statusList.map((status) => (
          <li key={status.id}>
            <strong>ID:</strong> {status.id}, <strong>Name:</strong> {status.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
