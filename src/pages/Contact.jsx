import React from 'react';
import "./Contact.css";
import Footer from '../components/Footer';

function contact() {
  return (
    <div className='contact-container'>
      
      <header className='contact-banner righteous text-[60px]'>
        <h1>Contact Us</h1>
      </header>
      
       <div className="contact-form grid  gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8 leading-8 px-4 text-[16px] ">
           <div className="Email us">
              <h2 className='font-bold text-[20px] '>Email us on:</h2>
              <h3>nanayawwiafe007@gmail.com</h3>
              <p>You can also send us an e-mail today and we will surely get you sorted out.</p>
        </div>
        <div className="Call us">
              <h2 className='font-bold text-[20px] '>Call us:</h2>
              <h3>0592515464</h3>
              <p>Contact us for more information.Reach us for all answers to your quetions.</p>
        </div>
        
            <div className="Locate us">
            <h2 className='font-bold text-[20px] '>Locate us:</h2>
              <h3>Right on your screen</h3>
          <p>Watch and relax at the comfort of your home right on your screen.</p>
            </div>
      </div>
      <Footer />
    </div>
  )
}

export default contact