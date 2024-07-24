import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';

const OrphanageCard = ({ orphanage }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);
    useEffect(() => {
      const fetchDataForPosts = async () => {
        try {
          const [imagesResponse] = await Promise.all([
            fetch(`http://localhost:4000/orphanages_img/${orphanage.Orphanage_id}`)
          ]);
  
          if (!imagesResponse.ok) throw new Error(`HTTP error: Status ${imagesResponse.status}`);
          const imagesData = await imagesResponse.json();
          console.log(imagesData,orphanage);
  
          setImages(imagesData);
          setIsLoading(false);
        } catch (err) {
          console.error('Fetch error:', err.message);
          setIsLoading(false);
        }
      };
  
      fetchDataForPosts();
    }, [orphanage]);
  
      const ImageSlider = () => {
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
            }, 3000);
      
            return () => clearInterval(interval);
          }, [currentIndex, images.length]);
      
          return (
            <div className="slider" style={{ width: '400px', height: 'auto' }}>
              <button onClick={goToPrevious} className="left-arrow">❮</button>
              <div className="slide">
                <img src={images[currentIndex]?.image} alt={`Slide ${currentIndex}`} />
              </div>
              <button onClick={goToNext} className="right-arrow">❯</button>
            </div>
          );
        };
    return (
        <>

          <div className="row">
          <div className={`col-md-6`}>
        <div className="card mb-3">
            <div className="row">
                <div className="col-md-4">
                    <img src={orphanage.image} alt="Orphanage" />
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">{orphanage.name}</h5>
                        <p className="card-text" style={{color: 'black'}}><strong>City:</strong>{orphanage.city}</p>
                        <p className="card-text" style={{color: 'black'}}><strong>Email:</strong> {orphanage.email}</p>
                        <p className="card-text" style={{color: 'black'}}><strong>Contact:</strong> {orphanage.contact}</p>
                        <Link to="/Donation" className='btn btn-warning'>Donation</Link>
                    </div>
                </div>
        </div></div></div>
        <div className={`col-lg-6`} align="center">
                <div style={{ width: '400px', height: 'auto' }}>
                  <ImageSlider />
                </div></div>
        </div> 
        </>
    );
};

export default OrphanageCard;
