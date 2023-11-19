import React, { useEffect, useState } from 'react';
import axios from "./axios";
import "./banner.css";
import requests from "./requests";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function Banner() {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [trailerUrl, setTrailerUrl] = useState("");

useEffect(() => {
    async function fetchData() {
        const request = await axios.get(requests.fetchTrending);
        setMovies(request.data.results);
    }

    fetchData();
}, []);


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        }, 7000);

        return () => clearInterval(interval);
    }, [movies]);

    function truncate(string, n) {
        return string?.length > n ? string.substring(0, n - 1) + '...' : string;
    }

    const currentMovie = movies[currentIndex];

    if (movies.length === 0) {
        return null;
    }

    const handleClick = async () => {
        try {
            const movieName = currentMovie?.title || currentMovie?.name || currentMovie?.original_name || "";
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

        const handleMoreInfoClick = async () => {
        try {
            const movieName = currentMovie?.title || currentMovie?.name || currentMovie?.original_name || "";
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
        height: "550",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <div>
            <header className='banner overflow-hidden'
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${currentMovie?.backdrop_path}")`,
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    transition: "background-image 0.6s ease-in-out"
                }}
            >
                <div className="banner-content ml-[10px] md:ml-[50px] ">
                    <h1 className='banner-title text-[1.2rem] sm:text-[3rem] righteous'>{currentMovie?.title || currentMovie?.name || currentMovie?.original_name}</h1>
                    <div className="banner-buttons ">
                        <button className='banner-button p-[10px] sm:p-[15px] sm:text-[16px] ' onClick={handleClick}>Play</button>
                        <button className='banner-button  p-[10px] sm:p-[15px] sm:text-[16px]  ' onClick={handleMoreInfoClick} >More Info...</button>
                    </div>
                    <h3 className='banner-description text-[15px] sm:text-[18px] '>{truncate(currentMovie?.overview, 150)}</h3>
                </div>
                <div className="banner--fadeBottom" />
            </header>

            {trailerUrl && (
                <div className="modal-background fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-[rgba(0,0,0,0.6)] ">
                    <div className="modal-video w-[1200px]  relative bg-black mb-2 mt-2">
                        <YouTube videoId={trailerUrl} opts={opts} />
                        <div className="close-button absolute w-[70px] top-[20px] right-[180px] cursor-pointer text-white  bg-blue-500 rounded px-3 py-1  font-bold " onClick={() => { setTrailerUrl(""); document.body.classList.remove("modal-open"); }}>Close</div>
                       
                    </div>
                </div>
            )}
        </div>
    );
}

export default Banner;


