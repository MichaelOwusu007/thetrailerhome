
import React, { useState } from 'react';
import Home from "./components/Home";
import "./styles/App.css";
import Contact from "./pages/Contact";
import Aboutus from "./pages/AboutUs";
import Movies from "./pages/Movies";
import Navbar from './components/Navbar';
import Search from './components/Search';
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