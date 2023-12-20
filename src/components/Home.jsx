import React from 'react';
import Banner from './Banner';
import requests from '../util/requests';
import Row from './Row';
import AboutMovieBanner from './AboutMovieBanner';
import Footer from './Footer';



function Home() {
    return (
        <div className='homesreen flex flex-col w-full overflow-hidden '>

            <Banner />
            <main className=' '>

                <Row
                    title='ACTION MOVIES'
                    fetchUrl={requests.fetchActionMovies}
                    isLargeRow
                />
                <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
                <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
                <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} />
                <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />

                <AboutMovieBanner />

                <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
                <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
                <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />

                <Footer />

            </main>
        </div>
    )
}

export default Home