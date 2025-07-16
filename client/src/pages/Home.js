import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoticeCard from '../components/NoticeCard';

function Home({ notices, setNotices, deleteNotice }) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load all notices from backend when page loads
    const fetchNotices = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/notices`);
        setNotices(res.data); // Set notices from DB
      } catch (err) {
        console.error('Failed to fetch notices:', err);
      }
    };
    fetchNotices();
  }, [setNotices]);

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>📢 Campus Notice Board</h2>

      {/* Clear All Notices (Frontend-only) */}
      {filteredNotices.length > 0 && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button
            onClick={() => setNotices([])}
            style={{
              backgroundColor: '#ff4d4f',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            🧹 Clear All Notices (Local)
          </button>
        </div>
      )}

      {/* Search Input */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search notice here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px',
            width: '80%',
            maxWidth: '400px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '14px',
          }}
        />
      </div>

      {/* Notices List */}
      {filteredNotices.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No Notices yet.</p>
      ) : (
        <div style={{ padding: '24px' }}>
          {filteredNotices.map((notice, idx) => (
            <NoticeCard
              key={notice._id || idx}
              title={notice.title}
              description={notice.description}
              date={notice.date}
              onDelete={() => deleteNotice(notice._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;