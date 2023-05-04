import React from 'react';
import Parentpage from './pages/Parentpage/Parentpage';
import ChildrenPage from './pages/Childrenpage/Childrenpage';
import { BrowserRouter as Router, Routes, Route, useParams  } from 'react-router-dom';
import './App.css';


function App() {


  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Parentpage/>}/>
        <Route path="/details" element={<ChildrenPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
