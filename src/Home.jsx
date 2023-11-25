import React from 'react';
import Banner from './banner';
import requests from './requests';
import Row from './row';
import Aboutmoviebanner from './aboutmoviebanner';
import Footer from './footer';



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

                <Aboutmoviebanner />

                <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
                <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
                <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />

                <Footer />

            </main>
        </div>
    )
}

export default Home