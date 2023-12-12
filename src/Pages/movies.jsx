import React, { useEffect, useState } from 'react';
import './Movies.css';
import Footerside from '../components/Footer';
import MoviesBanner from '../components/MoviesBanner';
import requests from '../util/requests';
import { getRandomMovies } from '../util/movieUtils';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState("");

  const fetchMoviesByGenre = async (genreEndpoint) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.themoviedb.org/3${genreEndpoint}&api_key=13ed1ecfaf93ecd77dad082740d033a2`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch random movies when the component mounts
    getRandomMoviesData();
  }, []); 

  const getRandomMoviesData = async () => {
    try {
      const mixedMovies = await getRandomMovies();
      setMovies(mixedMovies);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreClick = (genreEndpoint) => {
    fetchMoviesByGenre(genreEndpoint);
  };

const handleClick = async (movie) => {
  try {
    const movieName = movie?.title || movie?.name || movie?.original_name || "";
    const url = await movieTrailer(movieName);
    if (url) {
      const urlParams = new URLSearchParams(new URL(url).search);
      setTrailerUrl(urlParams.get("v"));
      document.body.classList.add("modal-open");
    } else {
      console.log("Trailer not found for the selected movie.");
    }
  } catch (error) {
    console.error("Error fetching trailer: ", error);
  }
};


  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="allmovie-container flex flex-1 flex-col overflow-hidden">
      <div>
        <MoviesBanner />
      </div>

      <div className='genres xl:space-x-20  space-x-5  justify-center items-center hidden lg:flex'>
        <button className='btn 1' onClick={() => handleGenreClick(requests.fetchTrending)}>Trending</button>
        <button className='btn 2' onClick={() => handleGenreClick(requests.fetchHorrorMovies)}>Horror</button>
        <button className='btn 3' onClick={() => handleGenreClick(requests.fetchActionMovies)}>Action</button>
        <button className="btn 4" onClick={() => handleGenreClick(requests.fetchRomanceMovies)}>Romance</button>
      </div>

      <div className='movie-container cursor-pointer'>
        {loading ? <p className='load'><img src="loading.gif"  className=' bg-transparent w-[150px] ' alt="load" /></p> : movies.map((movie) => (
          <div key={movie.id} className='movie-item' onClick={() => handleClick(movie)}>
            <img src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
            <h3>{movie?.title || movie?.name || movie?.original_name}</h3>
          </div>
        ))}
      </div>

          {trailerUrl && (
      <div className="modal-background fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-[rgba(0,0,0,0.6)] ">
        <div className="modal-video w-[1200px]  relative bg-black mb-2 mt-2">
          <YouTube videoId={trailerUrl} opts={opts} />
            <div className="close-button absolute top-[20px] right-[180px] cursor-pointer text-white py-1 px-3 w-[70px] bg-blue-500 rounded  font-bold " onClick={() => { setTrailerUrl(""); document.body.classList.remove("modal-open"); }}>Close</div>
           
        </div>
      </div>
    )}

      <Footerside />
    </div>
  );
}

export default Movies;


