import React from 'react';
import "./AboutUs.css";
import Home from "../assets/home.jpg";
import Footer from '../components/Footer';

function about() {
  return (
    <div className='aboutus-container'>
      
      <header className='header-banner righteous text-[60px] '>
        <h1>About Us</h1>
      </header>
      <div className="aboutus-maincontent xl:py-20 py-10 px-4">
        <div className='grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center'>
        <div className="aboutus-leftcontent">
            <h2 className='text-xl lg:text-3xl mb-4 font-semibold righteous '>Welcome to TapFlix</h2>
            
          <p className='mt-3 text-[16.5px] leading-8 '>Tapflix is not just another movie app, it's your personal gateway to the world of cinema through carefully curated trailers. Why settle for a brief synopsis or a static poster when you can experience the essence of a movie in motion? Tapflix brings you an extensive collection of trailers, offering a sneak peek into the heart and soul of each film. Immerse yourself in the magic of storytelling and visual mastery before deciding on your next cinematic adventure.Tapflix goes beyond the conventional by harnessing the power of intelligent algorithms. Our recommendation engine analyzes your viewing history, preferences, and trending movies to provide you with personalized suggestions.Tapflix keeps you in the loop with the latest movie releases and industry buzz. Be the first to know about upcoming blockbusters, exclusive premieres, and the hottest trends in the world of cinema. </p>
          <div className="about-rate grid md:grid-cols-2 gap-6 mt-8 ">
            <div className="about-rate-left">
              <h2 className='font-bold text-[20px] '>10K</h2>
              <h3>Listed movies</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ut debitis voluptates repellendus neque exercitation.</p>
            </div>
            <div className="about-rate-right">
            <h2 className='font-bold text-[20px]'>12K</h2>
              <h3>Listed users</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ut debitis voluptates repellendus neque exercitation.</p>
            </div>
          </div>
        </div>
        <div className="aboutus-rightcontent hidden xl:block ">
          <img className='aboutus-image' src={Home} alt="" />
        </div>
        </div>
        </div>
       <footer> <Footer /></footer>
    </div>
    
  )
}

export default about