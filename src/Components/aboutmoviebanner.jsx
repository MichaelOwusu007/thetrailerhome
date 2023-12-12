import React, { useEffect, useState } from 'react';
import "./AboutMovieBanner.css";
import { FiShare2 } from "react-icons/fi";
import requests from "../util/requests";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function AboutMovieBanner() {
    const [movie, setMovie] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState(null);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const timestamp = new Date().getTime();
                const response = await fetch(`https://api.themoviedb.org/3${requests.fetchTrending}&api_key=13ed1ecfaf93ecd77dad082740d033a2&timestamp=${timestamp}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const filteredMovies = data.results.filter(movie => movie.poster_path && movie.backdrop_path);
                const randomMovie = filteredMovies[Math.floor(Math.random() * filteredMovies.length)];

                setMovie(randomMovie);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchMovieData();
    }, []);

    function truncate(string, maxLength) {
        return string?.length > maxLength ? string.substring(0, maxLength - 1) + '...' : string;
    }

    function getFullLanguageName(code) {
        const languageMap = {
            en: 'English',
            es: 'Spanish',
            fr: 'French',
            de: 'German',
            it: 'Italian',
            ja: 'Japanese',
            ko: 'Korean',
            zh: 'Chinese',
            hi: 'Hindi',
            ru: 'Russian',
            ar: 'Arabic',
            pt: 'Portuguese',
            tr: 'Turkish'
        };
        return languageMap[code] || 'N/A';
    }

    const opts = {
        height: '500',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = async () => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            try {
                const movieName = movie?.title || movie?.name || movie?.original_name || "";
                const url = await movieTrailer(movieName);
                if (url) {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                } else {
                    console.log("Trailer not found for the selected movie.");
                }
            } catch (error) {
                console.error("Error fetching trailer: ", error);
            }
        }
    };

    return (
        <header className='aboutmovie-banner'
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            {movie && (
                <div className="aboutmovie-banner-content max-w-[px] righteous ">
                    {/* Left Content */}
                    <div className="left-content">
                        <div className="left-image w-[500px] ml-[150px] hidden xl:block ">
                            <img src={`https://image.tmdb.org/t/p/original/${movie?.poster_path || movie?.backdrop_path}`} alt="banner" />
                        </div>
                    </div>
                    {/* Center Content */}
                    <div className="center-content xl:ml-[-30px] lg:ml-[80px]  ">
                        <h1 className='text-[22px] sm:text-[30px] text-center lg:text-[40px] sm:text-start '>{movie?.title || movie?.name || movie?.original_name}</h1>
                        <div className=" hidden sm:flex sm:items-center subtitle-content">
                            <button className='HD-button'>HD 4K</button>
                            <p className='status'>{movie?.release_date || 'Released'}</p>
                            <span>{movie.origin_country || 'N/A'}</span>
                            <span>{movie.vote_average || 'N/A'} </span>
                        </div>
                        <h3 className='banner-description text-center ml-[10px] sm:ml-0 sm:text-start text-[15px] w-[350px] sm:w-[500px] sm:text-[18px] space-grotesk'>{truncate(movie?.overview, 200)}</h3>
                        <div className="center-bottom flex items-center justify-center sm:justify-start sm:bg-[#040720]">
                            <div className='share-icon hidden sm:block '>
                                <i><FiShare2 /></i>
                            </div>
                            <hr className=' hidden sm:block ' />
                            <h3 className='language hidden sm:block '>{getFullLanguageName(movie.original_language) || 'N/A'}</h3>

                            <div className="center-bottom-button rounded-3xl bg-red-600  ">
                                <button onClick={handleClick}>Watch</button>
                            </div>
                        </div>
                    </div>
                    {/* Right Content */}
                    <div className="right-content hidden lg:block">
                        <a href="/Aboutus">
                            <button className='download bg-white text-black xl:ml-[-80px] '>THE TRAILER HOME</button>
                        </a>
                    </div>
                </div>
            )}

            {/* Trailer Modal */}
            {trailerUrl && (
                <div className="modal-background fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-[rgba(0,0,0,0.6)]">
                    <div className="modal-video w-[1200px] relative bg-black mb-2 mt-2">
                        <YouTube videoId={trailerUrl} opts={opts} />
                        <div
                            className="close-button absolute w-[70px] right-[180px] top-[20px]  cursor-pointer bg-blue-500 py-1 px-3 rounded  font-bold "
                            onClick={() => {
                                setTrailerUrl('');
                                document.body.classList.remove('modal-open');
                            }}
                        >
                            Close
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default AboutMovieBanner;


