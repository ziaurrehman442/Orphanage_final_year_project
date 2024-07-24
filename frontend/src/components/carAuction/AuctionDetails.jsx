import React, { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../../Navbar';
import "./auctiondetails.css";
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { useTranslation } from 'react-i18next';

const AuctionDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const carId = id;
  const [cars, setCars] = useState(null);
  const [carContentAr, setCarContentAr] = useState(null);
  const [carContentEn, setCarContentEn] = useState(null);
  const [carContent, setCarContent] = useState({});
  const [carImages, setCarImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupVisible1, setIsPopupVisible1] = useState(false);
  const [feature_image, setFeatureImage] = useState('');
  const [documents, setDocument] = useState('');
  const [carprice, setcarprice] = useState();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const userData = sessionStorage.getItem('user');
  const defaultUser = {};
  const [user, setUser] = useState(userData? JSON.parse(userData) : defaultUser);
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const togglePopup1 = () => {
    setIsPopupVisible1(!isPopupVisible1);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };


  const addwishlist = (id) => {
    if (isInWishlist) {
      handleRemoveFromWishlist(id);
    } else {
      handleAddWishlist(id);
    }
  };

  const handleAddWishlist = async (auctionId) => {
    const userId = user.data && user.data[0]?.id;
    if (!userId) {
      alert('Please Login first!');
      return;
    }
    if (!auctionId) {
      console.error('Auction ID not found');
      return;
    }

    try {
      const response = await axios.post('https://backendauction.mydriven.ae/wishlist', { auctionId, userId });
      console.log('Added to wishlist successfully', response.data);
      setIsInWishlist(true);
      checkWishlistStatus();
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const handleRemoveFromWishlist = async (auctionId) => {
    const userId = user.data && user.data[0]?.id;

    try {
      const response = await axios.delete(`https://backendauction.mydriven.ae/wishlist/${userId}/${auctionId}`);
      setIsInWishlist(false);
      checkWishlistStatus();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const checkWishlistStatus = async () => {
    const userId = user.data && user.data[0]?.id;
    const auctionId = carId;

    try {
      const response = await axios.get(`https://backendauction.mydriven.ae/wishlist/${userId}/${auctionId}`);
      const isInWishlist = response.data.isInWishlist;
      setIsInWishlist(isInWishlist);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  };

  useEffect(() => {
    const fetchCarData = async (url, setter) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const carData = await response.json();
        setter(carData);
      } catch (err) {
        console.log(err.message);
      }
    };
    const fetchDataForPosts = async () => {
      setIsLoading(true);
      await fetchCarData(`https://backendauction.mydriven.ae/cars/${carId}`, setCars);
      await fetchCarData(`https://backendauction.mydriven.ae/carsen/${carId}`, setCarContentEn);
      await fetchCarData(`https://backendauction.mydriven.ae/carsar/${carId}`, setCarContentAr);
      await fetchCarData(`https://backendauction.mydriven.ae/carsimages/${carId}`, setCarImages);
      setIsLoading(false);
    };

    fetchDataForPosts();
  }, [carId]);

  const handleChange = async () => {
    try {
      const response = await axios.get(`https://backendauction.mydriven.ae/car_price/${carId}`);
      if (response.data && response.data.length > 0) {
        setCarContent(prevContent => ({
          ...prevContent,
          price: response.data[0].price
        }));
        setcarprice(response.data[0].price);
      } else {
        console.log('No data found');
      }
    } catch (error) {
      console.error(error);
      console.log('Failed to fetch car price');
    }
  };

  useEffect(() => {
    const fetchPrice = async () => {
      handleChange();
    };

    fetchPrice();
    const intervalId = setInterval(fetchPrice, 10000);

    return () => clearInterval(intervalId);
  }, [carId]);

  useEffect(() => {
    if (!isLoading) {
      setCarContent(i18n.language === 'ar' ? carContentAr : carContentEn);
    }
  }, [i18n.language, isLoading, carContentAr, carContentEn]);

  const BidPopup = ({ onClose }) => {
    const [user] = useState(JSON.parse(sessionStorage.getItem('user')) || {});
    const users = user.data ? user.data[0] : {};
    const payment = users.payment;
    const userId = users.id;
    const navigate = useNavigate();

    useEffect(() => {
      if (!userId) {
        navigate('/login');
      }
    }, [userId, navigate]);

    const [formData, setFormData] = useState({
      BidAmount: '',
      BidEndTime: cars?.[0]?.expiry_date || '',
      UserID: userId,
      AuctionID: cars?.[0]?.id || ''
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const bidAmount = parseFloat(formData.BidAmount);
      const userPayment = payment / 0.3;

      if (bidAmount < cars?.[0]?.previous_price) {
        alert(`Please add minimum Incremental Amount ${cars?.[0]?.previous_price}`);
        return;
      }

      if (bidAmount > userPayment) {
        alert('Insufficient balance. Please recharge your account.');
      } else {
        try {
          await axios.post('https://backendauction.mydriven.ae/bids', formData);
          alert("Bid Successfully!");
          onClose();
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    return (
      <div id="popup" style={{ backgroundColor: 'white', minWidth: '90%', minHeight: '200px', zIndex: 999, borderRadius: '20px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', position: 'absolute', paddingRight: '50px' }}>
        <div align="right">
          <button onClick={onClose} className="m-3 btn btn-danger">Close</button>
          <button onClick={handleSubmit} className="m-3 btn btn-danger">Submit</button>
        </div>
        <div className="row">
          <div style={{ width: '300px', margin: '0px auto' }}>
            <label className="form-label m-3" htmlFor="cnumber">Bid Amount</label>
            <br />
            <span style={{ marginLeft: '20px' }}>Minimum Increment: {cars?.[0]?.previous_price}</span>
            <input
              onChange={handleChange}
              type="number"
              className="form-control m-3 w-80"
              name="BidAmount"
              id="cnumber"
              placeholder='Enter Incremental Bid Amount'
            />
          </div>
        </div>
      </div>
    );
  };

  const Buypopup = ({ onClose }) => {
    const [user] = useState(JSON.parse(sessionStorage.getItem('user')) || {});
    const users = user.data ? user.data[0] : {};
    const userId = users.id;
    const navigate = useNavigate();

    useEffect(() => {
      if (!userId) {
        navigate('/login');
      }
    }, [userId, navigate]);

    const [formData, setFormData] = useState({
      BidAmount: '',
      BidEndTime: cars?.[0]?.expiry_date || '',
      UserID: userId,
      AuctionID: cars?.[0]?.id || ''
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post('https://backendauction.mydriven.ae/buynowrequest', formData);
        alert("Buy Now request submitted successfully!");
        onClose();
      } catch (error) {
        console.error('Error:', error);
      }
    };

    return (
      <div id="popup" style={{ backgroundColor: 'white', minWidth: '90%', minHeight: '200px', zIndex: 999, borderRadius: '20px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', position: 'absolute', paddingRight: '50px' }}>
        <div align="right">
          <button onClick={onClose} className="m-3 btn btn-danger">Close</button>
          <button onClick={handleSubmit} className="m-3 btn btn-danger">Submit</button>
        </div>
        <div className="row">
          <div style={{ width: '300px', margin: '0px auto' }}>
            <label className="form-label m-3" htmlFor="cnumber">Buy Amount</label>
            <input
              onChange={handleChange}
              type="number"
              className="form-control m-3 w-80"
              name="BidAmount"
              id="cnumber"
              placeholder='Enter Buy Now Amount'
            />
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }


  const newfeature_image = '' ? cars[0]?.feature_image : feature_image
const images = [
  
];


function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? carImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === carImages.length - 1;
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
    <div className="slider2">
      <button onClick={goToPrevious} className="left-arrow">
        ❮
      </button>
      <div className="slide">
        <img src={carImages[currentIndex].Image} alt={`Slide ${currentIndex}`} />
      </div>
      <button onClick={goToNext} className="right-arrow">
        ❯
      </button>
    </div>
  );
}





  const description = carContent[0]?.description || carContent.description;
  const terms = carContent[0]?.terms || carContent.terms;

  return (
    <div>
      <Navbar />
     
      {isLoading && carprice !== '' ?
        (
          <div style=
            {{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              position: 'fixed'
            }}>
            <Circles
              height="80"
              width="80"
              color="#FFC107"
              ariaLabel="circles-loading"
              wrapperclassName=""
              visible={true}
            />
          </div>
          
        ) : (cars &&
          <div class="my-12 auction-details">
          <div class="container mx-auto px-4">
              <div class="flex justify-between items-center gap-4">
                  <div>
                      <h4 class="text-2xl md:text-4xl font-bold">{carContent[0] == null ? carContent.title : carContent[0].title}</h4>
                      <p class="mt-3 text-[12px]">{t('Lot')} # <span class="text-warning font-semibold">{cars[0].id}</span> | {t('End_Date')}: <span>{cars[0].expiry_date ? new Date(cars[0].expiry_date).toISOString().split('T')[0] : ''} </span></p>
                  </div>
                  <div><button onClick={() => {addwishlist(carId)}}
                          class={`border text-warning ${isInWishlist ? 'bg-danger' : 'border-yellow-800'} hover:text-black duration-300 rounded py-1.5 px-3 flex justify-center items-center gap-x-1`}><svg
                              stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em"
                              width="1em" xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z">
                              </path>
                          </svg></button></div>
              </div>
              {!isMobile && isPopupVisible && <BidPopup onClose={togglePopup}/>}
              {!isMobile && isPopupVisible1 && <Buypopup onClose={togglePopup1}/>}
              <div class="flex flex-col lg:flex-row items-start gap-4 lg:gap-8 max-w-full overflow-hidden mt-12">
                  <div class="w-full lg:w-[45%]">
                      <div class="w-full h-auto">
                          <div class="all-initial"
                              style={{cursor: 'crosshair', width: 'auto', height: 'auto', fontSize: '0px', position: 'relative', userSelect: "none"}}>
                                <ImageSlider />
                              {/* <img alt="Vehicle photo" class="all-initial"
                                  src={feature_image === '' ? cars[0]?.feature_image : feature_image}
                                  style={{width: '100%', height: 'auto', display: 'block', pointerEvents: "none"}} /> */}
                              <div>
                              <div style={{width: '100%', height: '37px', inset: '103px auto auto', display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'absolute', opacity: '0', transition: 'opacity 300ms ease-in 0s'}}>
                                  </div>
                                  <div
                                      style={{width: '0px', height: '66px', inset: '103px auto auto', display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'absolute', opacity: '0', transition: 'opacity 300ms ease-in 0s'}}>
                                  </div>
                                  <div
                                      style={{width: '225px', height: '66px', inset: '103px auto auto', display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'absolute', opacity: '0', transition: 'opacity 300ms ease-in 0s'}}>
                                  </div>
                                  <div
                                      style={{width: '100%', height: '154px', inset: '103px auto auto', display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'absolute', opacity: '0', transition: 'opacity 300ms ease-in 0s'}}>
                                  </div>
                              </div>
                          </div>
                          <div class="mt-10 mb-10 grid grid-cols-4 gap-2 h-[230px] overflow-y-auto">
                          
                {carImages.map((car) => (
                  <div key={car.ID} className="car-image-group">
                          <div key={car.ID} className="rounded-md cursor-pointer">
                          <img
                            onClick={() => setFeatureImage(car.Image)}
                            alt={`car-${car.ID}-image-${car.CarID}`}
                            loading="lazy"
                            width="400"
                            height="400"
                            decoding="async"
                            data-nimg="1"
                            className="w-full object-cover rounded-md cursor-pointer"
                            src={car.Image}
                            srcSet={car.Image}
                            style={{ color: 'transparent' }}
                        />
                          </div>
                  </div>
              ))}
                          </div>
                      </div>

                      <ul class="nav nav-pills mb-3 bg-warning" id="pills-tab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">{t('Details')}</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">{t('Term')}</button>
  </li>
</ul>
<div class="tab-content" id="pills-tabContent">
  <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
  <h4 className='text-2xl md:text-4xl font-bold' style={{textDecoration: 'underline'}}>
                    
                  </h4>
                  <p style={{paddingLeft: '20px'}} dangerouslySetInnerHTML={{ __html: description }} />
  </div>
  <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
  <h4 className='text-2xl md:text-4xl font-bold' style={{textDecoration: 'underline'}}>
                  </h4>
                  <p style={{paddingLeft: '20px'}} dangerouslySetInnerHTML={{ __html: terms }} />
  </div>
</div>


                      
                  
                  </div>

                  
                  <div class="w-full lg:w-[30%]">
                      <div class="border border-warning rounded overflow-hidden">
                          <div class="bg-warning text-black rounded p-3">
                              <h4 class="text-lg font-semibold">{t('Vehicle_Informations')}</h4>
                          </div>
                          <div class="p-3">
                              <div>
                                  <div class="flex flex-col">
                                      <div>
                                          <div class="flex justify-between gap-x-1 py-1">
                                              <p class="font-semibold text-sm">{t("Vin")}:</p>
                                              <p class="font-semibold text-sm">{cars[0].Vin_Number}</p>
                                          </div>
                                          <div class="bg-warning w-full h-[1px] my-1 bg-opacity-20"></div>
                                      </div>
                                      
                                  </div>
                              </div>
                              <div>
                                  <div class="flex flex-col">
                                      <div>
                                          <div class="flex justify-between gap-x-1 py-1">
                                              <p class="font-semibold text-sm">{t("brands")}:</p>
                                              <p class="font-semibold text-sm">{carContent[0] == null ? carContent.brand : carContent[0].brand}</p>
                                          </div>
                                          <div class="bg-warning w-full h-[1px] my-1 bg-opacity-20"></div>
                                      </div>
                                      
                                  </div>
                              </div>
                              <div>
                                  <div class="flex flex-col">
                                      <div>
                                          <div class="flex justify-between gap-x-1 py-1">
                                              <p class="font-semibold text-sm">{t("models")}:</p>
                                              <p class="font-semibold text-sm">{carContent[0] == null ? carContent.car_model : carContent[0].car_model}</p>
                                          </div>
                                          <div class="bg-warning w-full h-[1px] my-1 bg-opacity-20"></div>
                                      </div>
                                      
                                  </div>
                              </div>
                              <div>
                                  <div class="flex flex-col">
                                      <div>
                                          <div class="flex justify-between gap-x-1 py-1">
                                              <p class="font-semibold text-sm">{t("Power")}:</p>
                                              <p class="font-semibold text-sm">{carContent[0] == null ? carContent.Power : carContent[0].Power}</p>
                                          </div>
                                          <div class="bg-warning w-full h-[1px] my-1 bg-opacity-20"></div>
                                      </div>
                                      
                                  </div>
                              </div>

                              <div>
                                  <div class="flex flex-col">
                                      <div>
                                          <div class="flex justify-between gap-x-1 py-1">
                                              <p class="font-semibold text-sm">{t("Year")}:</p>
                                              <p class="font-semibold text-sm">{cars[0].year}</p>
                                          </div>
                                          <div class="bg-warning w-full h-[1px] my-1 bg-opacity-20"></div>
                                      </div>
                                      
                                  </div>
                              </div>
                              <div>
                                  <div class="flex flex-col">
                                      <div>
                                          <div class="flex justify-between gap-x-1 py-1">
                                              <p class="font-semibold text-sm">{t("Engine_cylinders")}:</p>
                                              <p class="font-semibold text-sm">{carContent[0] == null ? carContent.Engine_cylinders : carContent[0].Engine_cylinders}</p>
                                          </div>
                                          <div class="bg-warning w-full h-[1px] my-1 bg-opacity-20"></div>
                                      </div>
                                      
                                  </div>
                              </div>
                              <div>
                                  <div class="flex flex-col">
                                      <div>
                                          <div class="flex justify-between gap-x-1 py-1">
                                              <p class="font-semibold text-sm">{t("Specs")}:</p>
                                              <p class="font-semibold text-sm">{carContent[0] == null ? carContent.Specs : carContent[0].Specs}</p>
                                          </div>
                                          <div class="bg-warning w-full h-[1px] my-1 bg-opacity-20"></div>
                                      </div>
                                  </div>
                              </div>
                              <div>
                                  <div class="flex flex-col">
                                      <div>
                                          <div class="flex justify-between gap-x-1 py-1">
                                              <p class="font-semibold text-sm">{t("Exterior")}:</p>
                                              <p class="font-semibold text-sm">{carContent[0] == null ? carContent.Exterior_color : carContent[0].Enterior_color}</p>
                                          </div>
                                          <div class="bg-warning w-full h-[1px] my-1 bg-opacity-20"></div>
                                      </div>
                                      
                                  </div>
                              </div>
                              <div>
                                  <div class="flex flex-col">
                                      <div>
                                          <div class="flex justify-between gap-x-1 py-1">
                                              <p class="font-semibold text-sm">{t("Warranty")}:</p>
                                              <p class="font-semibold text-sm">{carContent[0] == null ? carContent.Warranty : carContent[0].Warranty}</p>
                                          </div>
                                          <div class="bg-warning w-full h-[1px] my-1 bg-opacity-20"></div>
                                      </div>
                                      
                                  </div>
                              </div>
                              <div>
                                  <div class="flex flex-col">
                                      <div>
                                          <div class="flex justify-between gap-x-1 py-1">
                                              <p class="font-semibold text-sm">{t("Interior")}:</p>
                                              <p class="font-semibold text-sm">{carContent[0] == null ? carContent.Interior_color : carContent[0].Interior_color}</p>
                                          </div>
                                          <div class="bg-warning w-full h-[1px] my-1 bg-opacity-20"></div>
                                      </div>
                                      
                                  </div>
                              </div>
                              <div>
                                  <div class="flex flex-col">
                                      <div>
                                          <div class="flex justify-between gap-x-1 py-1">
                                              <p class="font-semibold text-sm">{t("Body")}:</p>
                                              <p class="font-semibold text-sm">{carContent[0] == null ? carContent.bodu_type : carContent[0].body_type}</p>
                                          </div>
                                          <div class="bg-warning w-full h-[1px] my-1 bg-opacity-20"></div>
                                      </div>
                                      
                                  </div>
                              </div>
                              <div>
                                  <div class="flex flex-col">
                                      <div>
                                          <div class="flex justify-between gap-x-1 py-1">
                                              <p class="font-semibold text-sm">{t("Transmission_type")}:</p>
                                              <p class="font-semibold text-sm">{carContent[0] == null ? carContent.transmission_type : carContent[0].transmission_type}</p>
                                          </div>
                                          <div class="bg-warning w-full h-[1px] my-1 bg-opacity-20"></div>
                                      </div>
                                      
                                  </div>
                              </div>
                              <div>
                                  <div class="flex flex-col">
                                      <div>
                                          <div class="flex justify-between gap-x-1 py-1">
                                              <p class="font-semibold text-sm">{t("Fuel_type")}:</p>
                                              <p class="font-semibold text-sm">{carContent[0] == null ? carContent.fuel_type : carContent[0].fuel_type}</p>
                                          </div>
                                          <div class="bg-warning w-full h-[1px] my-1 bg-opacity-20"></div>
                                      </div>
                                      
                                  </div>
                              </div>
                              <div>
                                  <div class="flex flex-col">
                                      <div>
                                          <div class="flex justify-between gap-x-1 py-1">
                                              <p class="font-semibold text-sm">{t("Car_Condition")}:</p>
                                              <p class="font-semibold text-sm">{carContent[0] == null ? carContent.car_condition : carContent[0].car_condition}</p>
                                          </div>
                                          <div class="bg-warning w-full h-[1px] my-1 bg-opacity-20"></div>
                                      </div>
                                  </div>
                              </div>
                              <div>
                                  <div class="flex flex-col">
                                      <div>
                                          <div class="flex justify-between gap-x-1 py-1">
                                              <p class="font-semibold text-sm">{t("Power")}:</p>
                                              <p class="font-semibold text-sm">{carContent[0] == null ? carContent.category : carContent[0].category}</p>
                                          </div>
                                          <div class="bg-warning w-full h-[1px] my-1 bg-opacity-20"></div>
                                      </div>
                                      
                                  </div>
                              </div>
                              {/* <div>
                                  <div class="flex flex-col">
                                      <div>
                                          <div class="flex justify-between gap-x-1 py-1">
                                              <p class="font-semibold text-sm">{t("address")}:</p>
                                              <p class="font-semibold text-sm">{carContent ? (carContent[0] == null ? carContent.address : carContent[0].address) : ''}</p>
                                          </div>
                                          <div class="bg-warning w-full h-[1px] my-1 bg-opacity-20"></div>
                                      </div>
                                      
                                  </div>
                              </div> */}
                              <div>
                                  <div class="flex flex-col">
                                      <div>
                                          <div class="flex justify-between gap-x-1 py-1">
                                              <p class="font-semibold text-sm">{t("documents")}:</p>
                                              <p class="font-semibold text-sm"><a href={`${documents}`} download="filename.pdf" className='btn btn-warning'>Download</a>                                              </p>
                                          </div>
                                          <div class="bg-warning w-full h-[1px] my-1 bg-opacity-20"></div>
                                      </div>
                                      
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <div class="w-full lg:w-[25%]">
                      <div class="border border-warning rounded overflow-hidden mb-2">
                          <div class="bg-warning text-black rounded p-3">
                              <h4 class="text-lg font-semibold">{t('Vehicle')}</h4>
                          </div>
                          <div class="p-3">
                              <div class="flex flex-col gap-4 justify-center items-center">
                                  <h1 class="text-xl font-semibold">{t('Current_Price')} : AED {carprice}</h1>
                                  <div style={{display: "flex"}}> 
                                  <button
                                      class="bg-warning p-1 text-black rounded-md hover:bg-opacity-70 duration-200" onClick={togglePopup1}>{t('Buy_now')}</button>
                                      <button
                                      class="bg-warning p-1 mx-1 text-black rounded-md hover:bg-opacity-70 duration-200" onClick={togglePopup}>{t('Bid_now')}
                                      </button>
                                      
                                      </div>
                              </div>
                          </div>
                      </div>
                      {isMobile && isPopupVisible && <BidPopup onClose={togglePopup}/>}
                  {isMobile && isPopupVisible1 && <Buypopup onClose={togglePopup1}/>}
                      <div class="border border-warning rounded overflow-hidden mt-4">
                          <div class="bg-warning text-black rounded p-2">
                              <h4 class="text-lg font-semibold">{t('Contact_us_for_more_information')}</h4>
                          </div>
                          <div class="p-3">
                              <div class="flex flex-col md:flex-row justify-center gap-2">
                                  <div class="flex bg-warning p-1 item-ceter rounded-md text-black w-[140px]">
                                      <div class="mt-2 px-1"><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                              viewBox="0 0 448 512" height="1em" width="1em"
                                              xmlns="http://www.w3.org/2000/svg">
                                              <path
                                                  d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z">
                                              </path>
                                          </svg></div><a class="m-1" target="_blank"
                                          href={`https://wa.me/97126459507`}>{t('WhatsApp')}</a>
                                  </div>
                                  <div class="flex bg-warning p-1 p-y-2 item-ceter rounded-md text-black ">
                                      <div class="mt-2 px-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                              viewBox="0 0 576 512" height="1em" width="1em"
                                              xmlns="http://www.w3.org/2000/svg">
                                              <path
                                                  d="M160 448c-25.6 0-51.2-22.4-64-32-64-44.8-83.2-60.8-96-70.4V480c0 17.67 14.33 32 32 32h256c17.67 0 32-14.33 32-32V345.6c-12.8 9.6-32 25.6-96 70.4-12.8 9.6-38.4 32-64 32zm128-192H32c-17.67 0-32 14.33-32 32v16c25.6 19.2 22.4 19.2 115.2 86.4 9.6 6.4 28.8 25.6 44.8 25.6s35.2-19.2 44.8-22.4c92.8-67.2 89.6-67.2 115.2-86.4V288c0-17.67-14.33-32-32-32zm256-96H224c-17.67 0-32 14.33-32 32v32h96c33.21 0 60.59 25.42 63.71 57.82l.29-.22V416h192c17.67 0 32-14.33 32-32V192c0-17.67-14.33-32-32-32zm-32 128h-64v-64h64v64zm-352-96c0-35.29 28.71-64 64-64h224V32c0-17.67-14.33-32-32-32H96C78.33 0 64 14.33 64 32v192h96v-32z">
                                              </path>
                                          </svg></div><a class="m-1" href="mailto:help@driven.llc">{t('Mail')}</a>
                                  </div>
                                  <div class="flex bg-warning p-1 p-y-2 item-ceter rounded-md text-black ">
                                      <div class="mt-2 px-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                              viewBox="0 0 576 512" height="1em" width="1em"
                                              xmlns="http://www.w3.org/2000/svg">
                                              <path
                                                  d="M160 448c-25.6 0-51.2-22.4-64-32-64-44.8-83.2-60.8-96-70.4V480c0 17.67 14.33 32 32 32h256c17.67 0 32-14.33 32-32V345.6c-12.8 9.6-32 25.6-96 70.4-12.8 9.6-38.4 32-64 32zm128-192H32c-17.67 0-32 14.33-32 32v16c25.6 19.2 22.4 19.2 115.2 86.4 9.6 6.4 28.8 25.6 44.8 25.6s35.2-19.2 44.8-22.4c92.8-67.2 89.6-67.2 115.2-86.4V288c0-17.67-14.33-32-32-32zm256-96H224c-17.67 0-32 14.33-32 32v32h96c33.21 0 60.59 25.42 63.71 57.82l.29-.22V416h192c17.67 0 32-14.33 32-32V192c0-17.67-14.33-32-32-32zm-32 128h-64v-64h64v64zm-352-96c0-35.29 28.71-64 64-64h224V32c0-17.67-14.33-32-32-32H96C78.33 0 64 14.33 64 32v192h96v-32z">
                                              </path>
                                          </svg></div><a class="m-1" target="_blank" href="tel:800888555">{t('Contact')}</a>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div class="border border-warning rounded overflow-hidden mt-4">
                          <div class="bg-warning text-black rounded p-2">
                              <h4 class="text-lg font-semibold">{t('address')}</h4>
                          </div>
                          <iframe src={carContent ? (carContent[0] == null ? carContent.address : carContent[0].address) : ''} width="100%" height="auto" style={{border:'0', minHeight:'300px'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                      </div>
                  </div>
              </div>
          </div>
          
      </div>
          )}
    <div>

    </div>
    </div>

  )
}

export default AuctionDetails;