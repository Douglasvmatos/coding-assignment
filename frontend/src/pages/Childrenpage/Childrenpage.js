import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './style.css';

export default  function ChildrenPage() {
  const { parentId } = useParams();
  const [children, setChildren] = useState([]);

  
  const fetchData = async () => {
    const response = await axios.get(`http://localhost:3001/parents/1/children`);
    setChildren(response.data);
    
    console.log(response)
    
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='container'>
      <h1>Children of Parent {parentId}</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Parent ID</th>
            <th>Paid Amount</th>
          </tr>
        </thead>
        <tbody>
          {children.map((child) => (
            <tr key={child.id}>
              <td>{child.id}</td>
              <td>{child.parentId}</td>
              <td>{child.paidAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
