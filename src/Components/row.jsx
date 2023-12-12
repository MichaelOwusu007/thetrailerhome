import React, { useEffect, useState } from 'react';
import "./Row.css";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const base_url = "http://image.tmdb.org/t/p/original/";

    const fetchMoviesData = async () => {
        try {
            const timestamp = new Date().getTime(); // Get current timestamp
            const response = await fetch(`https://api.themoviedb.org/3${fetchUrl}&api_key=13ed1ecfaf93ecd77dad082740d033a2&timestamp=${timestamp}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMovies(data.results.filter(movie => movie.poster_path && movie.backdrop_path));
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchMoviesData();
    }, [fetchUrl]);

    const opts = {
        height: "500",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = async (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            try {
                const movieName = movie?.title || movie?.name || movie?.original_name || "";
                const url = await movieTrailer(movieName);
                if (url) {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                    setSelectedMovie(movie);
                } else {
                    console.log("Trailer not found for the selected movie.");
                }
            } catch (error) {
                console.error("Error fetching trailer: ", error);
            }
        }

    }

    function truncate(string, n) {
        return string?.length > n ? string.substring(0, n - 1) + '...' : string;
    }

    const truncateTitle = (string) => {
        return truncate(string, 50);
    };

    return (
        <div className='row'>
            <h2 className='righteous text-xl lg:text-2xl'>{title}</h2>
            <div className='row_posters'>
                {movies.map(movie => (
                    movie.poster_path && (
                        <div className='image-background' key={movie.id} onClick={() => handleClick(movie)}>
                            {movie.poster_path ? (
                                <img
                                    className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                    alt={movie.name || movie.title}
                                />
                            ) : (
                                <img
                                    className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                                    src="/no_preview.jpg"
                                    alt="No Review"
                                />
                            )}
                            <div className="row-content">
                                <h2 className='row-title'>{truncateTitle(movie?.title || movie?.name || movie?.original_name)}</h2>
                            </div>
                        </div>
                    )
                ))}
            </div>

            {trailerUrl && selectedMovie && (
                <div className="modal-background fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-[rgba(0,0,0,0.6)] ">
                    <div className="modal-video w-[1200px] lg:h-[720px] relative bg-black mb-2 mt-2">
                        <YouTube videoId={trailerUrl} opts={opts} />
                        <div className="py-1 px-3 w-[70px] rounded bg-blue-500 right-[180px] top-[20px] absolute  font-bold cursor-pointer " onClick={() => { setTrailerUrl(""); document.body.classList.remove("modal-open"); }}>Close</div>
                        <div className='details-container px-20 py-5 righteous items-center hidden lg:flex '>
                            <div className='title-overview'>
                                <h4 className='text-lg lg:text-2xl font-bold righteous'>{selectedMovie?.title || selectedMovie?.name || selectedMovie?.original_name}</h4>
                                <p className='movie-overview'>{selectedMovie?.overview || "No overview available"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Row;

