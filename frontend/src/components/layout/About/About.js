// src/pages/About.js
import React from "react";
//just a sample will work more on it 

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center px-8 py-16">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="max-w-2xl text-center text-lg leading-relaxed mb-8">
        Welcome to <span className="font-semibold text-indigo-600">YourStore</span> — 
        your one-stop destination for amazing products and seamless online shopping. 
        We’re passionate about delivering quality, innovation, and trust to every customer.
      </p>
      <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300">
        Learn More
      </button>
    </div>
  );
};

export default About;
