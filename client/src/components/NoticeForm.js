import React, {useState} from 'react';
import axios from 'axios';

function NoticeForm({onSubmit}){
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const handleSubmit=async(e) =>{
    e.preventDefault();
    console.log("submitting:",noticeData);
    
    try{
      const res=await axios.post('http://localhost:5000/api/notices/add',
        {title, description
    });
    console.log(res.data);
    alert("Notice submitted");
    setTitle('');
    setDescription('');
  } catch(err){
    console.log("errro submitting the notice:",error);
    alert("something went wrong");
  }
};
 

  return(
    <form onSubmit={handleSubmit} style={{maxwidth:'40px', margin:'20px auto', backgroundColor:'ecf0f1'}}>
      <h3 style={{textAlign:'center',backgroundColor:'pink', color:'blue'}}>Add New Notice</h3>
      <input
       type="text"
       placeholder='Notice title'
       value={title}
       onChange={(e)=>setTitle(e.target.value)}
       required
       style={{width:'60%',padding:'8px',marginBottom:'10px',flex:'centre'}}
       />
       <textarea
       placeholder='Notice Description'
       value={description}
       onChange={(e) => setDescription(e.target.value)}
       required
       style={{width:'100%',padding:'8px', marginBottom:'10px'}}
       />
       <button type="submit" style={{padding:'8px 16px', border:'none', borderRadius:'10px',backgroundColor:'green', color:'white'}}>Post</button>
    </form>
  );
}

export default NoticeForm;