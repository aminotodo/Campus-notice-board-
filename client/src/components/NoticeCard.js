import React, { useState } from 'react';
import {motion} from 'framer-motion';

function NoticeCard({ title, description, date, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  // Handle click on card to toggle description
  const handleToggle = (e) => {
    e.stopPropagation();//dont trigger other clicks 
    setIsOpen((prev)=>!prev);
  };

  return (
    <motion.div
      initial={{opacity:0,y:30}}
      animate={{opacity:1,y:0}}
      whileHover={{scale:1.03}}
      transition={{duration:0.4}}
      style={{
        backgroundColor:'#fff9c4',
        border:'2px dashed #fbc02d',
        padding:'16px',
        borderRadius:'12px',
        marginBottom:'16px',
        maxWidth:'500px',
        margin:'0 auto',
        boxShadow:'4px 4px 12px rgba(0,0,0,0.15)',
        transform:'rotate(-1deg)',
        cursor:'pointer',
         }}
    >


      {/* ✅ Title +toggle arrow in flex row always visible */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <h3 style={{ marginBottom: '10px', color: '#333' }}>
        {title} </h3>
        <span onClick={handleToggle}
        style={{ fontSize: '12px',
          cursor:'pointer',
          padding:'4px 8px',
          borderRadius:'4px',
          userSelect:'none',
         }} title='Click to show/hide description'>{isOpen ? '▲' : '▼'}</span>
      </div>

      {/* ✅ Description shows only if open */}
      {isOpen && (
        <p style={{ color: '#444', marginBottom: '10px' }}>{description}</p>
      )}

      {/* ✅ Date — fixed rendering */}
      <p style={{ fontSize: '12px', color: '#777' }}>
        Posted on:{' '}
        {date
          ? new Date(date).toLocaleString()
          : 'Unknown'}
      </p>

      {/* ✅ Delete Button */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent toggle when clicking delete
            onDelete();
          }}
          style={{
            marginTop: '10px',
            backgroundColor: '#ff4d4f',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '6px 12px',
            cursor: 'pointer',
          }}
        >
          Delete
        </button>
      )}
    </motion.div>
  );
}

export default NoticeCard;