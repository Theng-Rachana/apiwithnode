import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
const App = () => {
  const [statusList, setStatusList] = useState([]);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/status');
      setStatusList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddStatus = async () => {
    try {
      const statusWithoutId = statusList.map(({ id, ...rest }) => rest);

      const newId = uuidv4();

      const newStatusItem = {
        id: newId,
        name: newStatus,
      };

      await axios.post('http://localhost:5000/status', newStatusItem);

      setStatusList([...statusWithoutId, newStatusItem]);

      setNewStatus('');
    } catch (error) {
      console.error('Error adding new status:', error);
    }
  };

  const handleDeleteStatus = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/status/${id}`);

      setStatusList(statusList.filter((status) => status.id !== id));
    } catch (error) {
      console.error('Error deleting status:', error);
    }
  };

  return (
    <div>
      <h1>Status List</h1>
      <ul>
        {statusList.map((status) => (
          <li key={status.id}>
            {status.name}
            <button onClick={() => handleDeleteStatus(status.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Add New Status</h2>
        <input
          type="text"
          placeholder="Enter status name"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        />
        <button onClick={handleAddStatus}>Add Status</button>
      </div>
    </div>
  );
};

export default App;
