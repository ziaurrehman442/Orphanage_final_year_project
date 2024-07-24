import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css';

const Gallery = ({ id }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://backendauction.mydriven.ae/carsimages/${id}`)
     .then(response => {
        setImages(response.data);
        setLoading(false);
      })
     .catch(error => {
        console.error('Error fetching gallery:', error);
      });
  }, [id]);
  const handleNextClick = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevClick = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleImageClick = (image) => {
    // Handle image click event
  };

  return (
    <div className="gallery">
      {loading? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="image-container">
            <img src={images[currentIndex].Image} alt={`Image ${currentIndex + 1}`} onClick={() => handleImageClick(images[currentIndex])} />
          </div>
          <div className="button-container pb-3">
            {currentIndex > 0 && (
              <button className='btn btn-warning' onClick={handlePrevClick}>Previous</button>
            )}
            {currentIndex < images.length - 1 && (
              <button className='btn btn-warning' onClick={handleNextClick}>Next</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;