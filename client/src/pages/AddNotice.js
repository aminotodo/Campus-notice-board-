// client/src/pages/AddNotice.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddNotice({ addNotice }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNotice = {
      title,
      description,
      //date: new Date().toLocaleDateString(),
    };

    await addNotice(newNotice); // Add notice to MongoDB
    navigate('/'); // Go back to homepage
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '30px' }}>
      <h2>Add a New Notice</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Notice Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '15px' }}
        />
        <textarea
          placeholder="Notice Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '15px' }}
        ></textarea>
        <button
          type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}
        >
          Add Notice
        </button>
      </form>
    </div>
  );
}

export default AddNotice;