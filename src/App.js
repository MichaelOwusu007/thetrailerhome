
import React, { useState } from 'react';
import Home from "./Home";
import "./App.css";
import Contact from "./contact";
import Aboutus from "./aboutus";
import Movies from "./movies";
import Navbar from './Navbar';
import Search from './search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  // This function will be used to update searchResults in App component
  const updateSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <Router>

      <Routes>
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/" element={<Home />} />

      
        <Route path="/search/:query" element={<Search searchResults={searchResults} />} />
      </Routes>

    
      <Navbar updateSearchResults={updateSearchResults} />
    </Router>
  );
}

export default App;