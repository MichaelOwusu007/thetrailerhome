
import React, { useState } from 'react';
import Home from "./Components/Home";
import "./Styles/App.css";
import Contact from "./Pages/contact";
import Aboutus from "./Pages/aboutus";
import Movies from "./Pages/movies";
import Navbar from './Components/Navbar';
import Search from './Components/search';
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