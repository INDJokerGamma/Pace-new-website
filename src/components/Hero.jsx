// components/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Hero = ({ onExploreClick }) => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center relative">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/assets/FullBoard.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[0.4px]"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 text-center px-4">
          {/* Top Left Text */}
          <div className="absolute top-5 left-5 text-xs md:text-sm font-light tracking-widest text-white">

          </div>

          {/* Logo and Main Content */}
          <div className="flex justify-center items-center mb-6">
            <img
              src="/PACE.png"
              alt="PACE Logo"
              className="h-24 md:h-40 w-auto object-contain"
            />
          </div>



          {/* Divider with star */}
          <div className="flex items-center justify-center space-x-4 my-6">
            <hr className="w-12 md:w-16 border-gray-300" />
            <div className="text-xl md:text-2xl text-yellow-400 animate-pulse">★</div>
            <hr className="w-12 md:w-16 border-gray-300" />
          </div>

          {/* Description */}
          <p className="text-gray-200 mt-4 max-w-2xl mx-auto text-xs md:text-base leading-relaxed px-2">
            Personality Advancement Circle of Engineers is a student organization started in 1994...
          </p>


          {/*Top Right Button*/}
          <section className=" text-white py-24 text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to Pace </h1>
            <p className="text-xl mb-10">National Level Management Fest by PACE</p>

            <Link to="/JoinForm">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-xl transition duration-300">
                Join Now
              </button>
            </Link>
          </section>

          {/* Explore Events Button */}
          <button
            onClick={onExploreClick}
            className="mt-8 px-5 py-2 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition text-xs md:text-base"
          >
            Explore Events
          </button>

          {/* Scroll Down Animation */}
          {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 animate-bounce">
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-yellow-400"></div>
          <p className="text-[10px] md:text-xs text-gray-300">Scroll Down</p>
        </div> */}
        </div>
      </div>
    </>

  );
};