import React from 'react';
import {Link} from 'react-router-dom';

function Navbar(){
  return(
    <nav style={{padding:'10px', backgroundColor:'#1abc9c'}}>
    <p style={{color:''}}>Go-to</p>
      <Link to="/" style={{marginRight:'20px', color:''}}>Home</Link>
      < Link to="/add">Add Notice</Link>
    </nav>
  );

}
export default Navbar;