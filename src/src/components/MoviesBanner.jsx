import React, { useState, useRef } from 'react';
import "./MoviesBanner.css";


function Moviesbanner() {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);


    return (
        <header className='movie-banner overflow-hidden w-screen '>
            <video
                ref={videoRef}
                className='banner-video w-full h-full object-cover'
                autoPlay
                muted={isMuted}
                loop
                playsInline
            
            >
                <source src="Expend4ble6.mp4" type="video/mp4" />
            </video>
            <div className="movie-banner-content md:pl-20 ">
                <h1 className='movie-banner-title'> </h1>
                <div className="movie-banner-buttons">
                    <button className='movie-banner-button' onClick={() => setIsMuted(!isMuted)}>
                        {isMuted ? 'Unmute' : 'Mute'}
                    </button>
                </div>
                <h3 className='movie-banner-descriptio text-4xl lg:font-extrabold lg:text-6xl righteous '>Expend4ble</h3>
                <p className=' font-sans text-[17px] max-w-[450px] mt-3 '>Armed with every weapon they can get their hands on and the skills to use them, The Expendables are the world’s last line of defense and the team that gets called when all other options are off the table. But new team members with new styles and tactics are going to give “new blood” a whole new meaning.</p>
            </div>
            <div className="banner--fadeBottom" />
        </header>
    );
}


export default Moviesbanner;
