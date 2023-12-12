import requests from './requests';

const genres = [
  requests.fetchTrending,
  requests.fetchTopRated,
  requests.fetchActionMovies,
  requests.fetchComedyMovies,
  requests.fetchHorrorMovies,
  requests.fetchRomanceMovies,
  requests.fetchDocumentaries,
];

export async function getRandomMovies() {
  try {
    let mixedMovies = [];
    let selectedMovieIds = new Set();

    const fetchMoviesByGenre = async (genreEndpoint) => {
      try {
        const timestamp = new Date().getTime(); // Get current timestamp
        const response = await fetch(`https://api.themoviedb.org/3${genreEndpoint}?api_key=13ed1ecfaf93ecd77dad082740d033a2&timestamp=${timestamp}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          // Shuffle the movies array
          const shuffledMovies = data.results.sort(() => 0.5 - Math.random());

          // Select 5 unique movies
          for (const movie of shuffledMovies) {
            if (!selectedMovieIds.has(movie.id)) {
              mixedMovies.push(movie);
              selectedMovieIds.add(movie.id);
            }

            if (mixedMovies.length >= 20) {
              break;
            }
          }
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Error fetching movies');
      }
    };

    await Promise.all(genres.map(fetchMoviesByGenre));

    // Fetch additional movie details for each movie
    for (const movie of mixedMovies) {
      try {
        const detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=13ed1ecfaf93ecd77dad082740d033a2`);
        const videosResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=13ed1ecfaf93ecd77dad082740d033a2`);

        if (!detailsResponse.ok || !videosResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const detailsData = await detailsResponse.json();
        const videosData = await videosResponse.json();

        // Check if there is a video available for the movie
        if (videosData.results && videosData.results.length > 0 && videosData.results[0].site.toLowerCase() === 'youtube') {
          movie.videoKey = videosData.results[0].key;
        }

        // Populate additional movie details
        movie.overview = detailsData.overview;
        movie.original_language = detailsData.original_language;
        movie.production_countries = detailsData.production_countries;
      } catch (error) {
        console.error('Error fetching movie details:', error);
        throw new Error('Error fetching movie details');
      }
    } 

    return mixedMovies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw new Error('Error fetching movies');
  }
}
