import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import Model from './Model';
import { FaSearch } from "react-icons/fa";





function Navbar({updateSearchResults}) {
    const [navbarVisible, setNavbarVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
      const [isModelVisible, setIsModelVisible] = useState(false); // Step 1
    
    const navigate = useNavigate();
    const API_KEY = "13ed1ecfaf93ecd77dad082740d033a2"


      const fetchMovies = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}`);
            const data = await response.json();
            const results = data.results;

             console.log('Fetched Results:', results);

            updateSearchResults(results);

            // Redirect to the search page with the search results
            navigate(`/search/${searchQuery}`);
        } catch (error) {
            console.error(error);
        }
      };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchMovies();
    };
 

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            setNavbarVisible(true);
        } else {
            setNavbarVisible(false);
        }
    };



    useEffect(() => {
        transitionNavBar();

        window.addEventListener('scroll', transitionNavBar);

        return () => {
            window.removeEventListener('scroll', transitionNavBar);
        };
    }, []);

     const handleSignInSignUpClick = () => {
    setIsModelVisible(!isModelVisible); // Step 2
  };

    return (
        <div className={`nav ${navbarVisible ? 'show' : 'hide'}`}>
            <div className="nav-content px-2 righteous">
                <div className="left-content">
                    <a href='/'>
                        <h3 className=' relative text-2xl '>TapFlix</h3>
                    </a>
                    <div className="search-input hidden lg:block">
                        <form onSubmit={handleSubmit}
                            className=''
                        >
                            <input
                                type="text"
                                name="search"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => {
                                setSearchQuery(e.target.value);
                                }}
                            />
                            <button type="submit"><i src="search.png" className=' searchit cursor-pointer flex items-center justify-center px-3 text-[25px] text-white' alt="search"> <FaSearch /> </i></button>
                        </form>
                    </div>
                </div>
                <div className="right-content flex items-center justify-center space-x-5">
                    <div className='xl:block text-white font-bold text-xl space-x-10 hidden ml-[-50px] tracking-[1px] '>
                        <a href="/">Home</a>
                        <a href="/Movies">Movies</a>
                        <a href="/Aboutus">AboutUs</a>
                        <a href="/Contact">Contact</a>
                    </div>
                    <div className="">
                        <button onClick={handleSignInSignUpClick} className='text-white bg-blue-500 rounded py-1 px-2'>Login</button>
                    </div>
                </div>
            </div>
              {isModelVisible && <Model />}  {/*Step 3 and Step 4 */}
        </div>
    );
}

export default Navbar;  