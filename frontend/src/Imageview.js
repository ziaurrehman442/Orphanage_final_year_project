import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from './Navbar';

const ImageView = () => {
  const { id } = useParams(); // Accessing id from URL params
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Check session storage for the image URL
    const sessionImage = sessionStorage.getItem(id);
    if (sessionImage) {
      setImageSrc(sessionImage);
    } else {
      console.log(`Image for ID ${id} not found in session storage.`);
      // Handle case where image is not found, perhaps show a default image or message
    }
  }, [id]);

  return (
    <div >
        <Navbar />
        <div  align='center'>
      <img
        src={imageSrc}
        alt={`Image ${id}`}
        style={{ maxWidth: '500px' }}
      />
      </div>
    </div>
  );
};

export default ImageView;
