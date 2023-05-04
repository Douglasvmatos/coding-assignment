import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import ChildrenPage from '../Childrenpage/Childrenpage';

export default function Parentpage() {
  const [parents, setParents] = useState([]);
  const [id, setId] = useState(1);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:3001/parents?page=${page}`);
    setParents(response.data.data);
    setTotalPages(response.data.totalPages);

  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className='container'>
    <div className='form-input'>
      <h1 className='title'>Parents</h1>
      <table className="table">
        <thead >
          <tr id='content-title'>
            <th className='input-thead'>ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Total Amount</th>
            <th>Total Paid Amount</th>
         </tr>
    </thead>
    <tbody>
      {parents.map((parent) => (
        <tr key={parent.id}>
          <td>{parent.id}</td>
          <td>{parent.sender}</td>
          <td>{parent.receiver}</td>
          <td>{parent.totalAmount}</td>
          <td className='childrenPage'><a href='/details'className='button-amout' >{parent.totalPaidAmount}</a></td>
        </tr>
      ))}
    </tbody>
  </table>
  <div className='container-button'>
    <button onClick={handlePrevPage} disabled={page === 1} className='button'>
      Previous
    </button>
    <span>Page {page} of {totalPages}</span>
    <button onClick={handleNextPage} disabled={page === totalPages} className='button'>
      Next
    </button>
  </div>
</div>

</div>
);
}