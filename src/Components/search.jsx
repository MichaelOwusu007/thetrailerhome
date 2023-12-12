import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import './Search.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';



function Search({ searchResults }) {
  const { query } = useParams();
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Fetch data or perform any additional actions related to the search query if needed
    console.log(`Search page for query: ${query}`);
  }, [query]);

  const opts = {
    height: '500',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
      setSelectedMovie(null);
    } else {
      try {
        const movieName = movie?.title || movie?.name || movie?.original_name || '';
        const url = await movieTrailer(movieName);
        if (url) {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
          setSelectedMovie(movie);
        } else {
          // Handle case when trailer is not found
          console.log('Trailer not found for the selected movie.');
        }
      } catch (error) {
        console.error('Error fetching trailer: ', error);
      }
    }
  };

  return (
      <div className="text-white flex flex-col w-full">
          
      <main className="flex flex-1 h-[90vh] overflow-hidden">
        <section className="flex flex-1 h-[91vh]">
          <main className="flex flex-col flex-1 pt-20">
            <header className="input-header h-16 flex items-center justify-between lg:px-20 cursor-pointer">
              <i>
                {' '}
                <FaAngleDown className="w-[30px] h-[30px]" />
              </i>

              <i>
                {' '}
                <FaAngleUp className="w-[30px] h-[30px]" />
              </i>
            </header>
            <section className="p-4 h-[80vh] flex-1 overflow-y-scroll display-movies">
              <div className="flex justify-center px-6 gap-6 gap-y-10 flex-wrap h-full items-center">
                {searchResults.map((movie) => (
                  <div
                    key={movie.id}
                    className="movies cards max-w-[350px] rounded-md w-[280px] h-[400px] p-2 cursor-pointer bg-[rgba(169,169,169,0.2)]"
                    onClick={() => handleClick(movie)}
                    >
                        {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                      className="object-cover w-full h-[300px]"
                            />
                        ) : (
                        <img
                  src="/no_preview.jpg" // Assuming no_preview.jpg is in the public folder
                  alt="No Preview"
                  className="object-cover w-full h-[300px]"
                />
                        )}
                    <div className="p-2">
                      <p>{movie.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </section>
      </main>

      {trailerUrl && selectedMovie && (
        <div className="modal-background fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-[rgba(0,0,0,0.6)]">
        <div className="modal-video w-[1200px] lg:h-[720px] relative bg-black mb-2 mt-2">
            {trailerUrl !== 'error' ? (
            <YouTube videoId={trailerUrl} opts={opts} />
            ) : (
            <img
                src="/error.png" // Assuming error.png is in the public folder
                alt="Error"
                className="object-cover w-full h-[300px]"
              />
            )}
            <div
              className=" absolute w-[70px] top-[20px]  right-[180px]  cursor-pointer bg-blue-500 py-1 px-3 rounded  font-bold "
              onClick={() => {
                setTrailerUrl('');
                setSelectedMovie(null);
                document.body.classList.remove('modal-open');
              }}
            >
              Close
            </div>
            {/* additional movie data */}
            <div className="details-container px-20 py-5 righteous items-center hidden lg:flex ">
              <div className="title-overview">
                <h4 className="text-lg lg:text-2xl font-bold righteous">
                  {selectedMovie?.title || selectedMovie?.name || selectedMovie?.original_name}
                </h4>
                <p className="movie-overview">{selectedMovie?.overview || 'No overview available'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;