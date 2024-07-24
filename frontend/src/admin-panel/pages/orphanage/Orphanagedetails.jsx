import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Circles } from 'react-loader-spinner';
import { Link, useNavigate, useParams } from 'react-router-dom';

const OrphanageDetails = () => {
  const { userId } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleImage = (id, data1) => {
    sessionStorage.setItem(id, data1);
    navigate(`/image/${id}`);
  };

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

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const [userResponse, imagesResponse] = await Promise.all([
          fetch(`http://localhost:4000/orphanages/${userId}`),
          fetch(`http://localhost:4000/orphanages_img/${userId}`)
        ]);

        if (!userResponse.ok) throw new Error(`HTTP error: Status ${userResponse.status}`);
        if (!imagesResponse.ok) throw new Error(`HTTP error: Status ${imagesResponse.status}`);

        const userData = await userResponse.json();
        const imagesData = await imagesResponse.json();

        setData(userData);
        setImages(imagesData);
        setIsLoading(false);
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchDataForPosts();
  }, [userId]);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {isLoading ? (
          <div className="loading-spinner">
            <Circles height="80" width="80" color="#FFC107" ariaLabel="circles-loading" />
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="content">
            <div className="top">
              <div className="left">
                <h1 className="title">Information</h1>
                <div className="item">
                  <img src={data.image} alt={data.name} className="itemImg" />
                  <div className="details mx-5 px-3">
                    <h1 className="itemTitle" align="center">{data.name}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue"><a href={`mailto:${data.email}`}>{data.email}</a></span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Phone:</span>
                      <span className="itemValue"><a href={`tel:${data.contact}`}>{data.contact}</a></span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Address:</span>
                      <span className="itemValue">{data.address}.</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Licence No:</span>
                      <span className="itemValue">{data.licence_no}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Web:</span>
                      <span className="itemValue"><a href={data.web}>{data.web}</a></span>
                    </div>
                  </div>
                </div>
                <h1 className="title">Licence Image</h1>
                <img src={data.Licence_img} onClick={() => handleImage('Licence_img', data.Licence_img)} alt="Licence" />
              </div>
              <div className="right" align="center">
                <div style={{ width: '400px', height: 'auto' }}>
                  <ImageSlider />
                </div>
                <div style={{ width: '300px', height: 'auto' }}>
                  <h1 className="title">Bank Details Image</h1>
                  <img src={data.bank_details_img} onClick={() => handleImage('bank_details_img', data.bank_details_img)} alt="Bank Details" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrphanageDetails;
