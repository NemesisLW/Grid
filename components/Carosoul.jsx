"use client"
import React, { useState } from 'react';

const images = [
  'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/4a15920a60df9af4.jpg?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/82fb6e04ef0bf250.jpg?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/d93e9db3b8c96929.jpg?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/5f478a106d047aba.jpg?q=20'
  // Add more image URLs here
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="flex items-center justify-center h-60">
       
      <div className="relative">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="w-full h-auto"
        />
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full"
        >
          &lt;
        </button>
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;