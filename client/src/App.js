import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddNotice from './pages/AddNotice';
import axios from 'axios';

function App() {
  const [notices, setNotices] = useState([]);

  // ✅ 1. Fetch all notices on first load
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/notices`);
        setNotices(res.data);
      } catch (err) {
        console.error('Error fetching notices:', err);
      }
    };
    fetchNotices();
  }, []);

  // ✅ 2. Add notice to database
  const addNotice = async (newNotice) => {
    try {
      console.log('sending notice:',newNotice);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/notices`, newNotice);
      setNotices((prev) => [res.data, ...prev]); // update UI immediately
    } catch (err) {
      console.error('Error adding notice:', err);
    }
  };

  // ✅ 3. Delete notice by ID
  const deleteNotice = async (id) => {
    console.log('Deleting notice with ID:', id);

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/notices/${id}`);
      setNotices((prev) => prev.filter(notice => notice._id !== id));
    } catch (err) {
      console.error('Error deleting notice:', err);
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              notices={notices}
              setNotices={setNotices}
              deleteNotice={deleteNotice}
            />
          }
        />
        <Route
          path="/add"
          element={<AddNotice addNotice={addNotice} />}
        />
      </Routes>
    </Router>
  );
}

export default App;