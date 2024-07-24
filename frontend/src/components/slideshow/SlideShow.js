import React, { useEffect, useState } from 'react';
import './slick.css';

const images = [
  '1714395269.jpg',
  '1716449438.jpg','istockphoto-802985622-612x612.jpg','team.jpg'
];

function ImageSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };
  
    const goToNext = () => {
      const isLastSlide = currentIndex === images.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        goToNext();
      }, 3000); // Change image every 3 seconds
  
      return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [currentIndex]); // Only re-run the effect if currentIndex changes
  
    return (
      <div className="slider">
        <button onClick={goToPrevious} className="left-arrow">
          ❮
        </button>
        <div
          className="slide"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        ></div>
        <button onClick={goToNext} className="right-arrow">
          ❯
        </button>
      </div>
    );
}

export default ImageSlider;
