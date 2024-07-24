import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuctionCard.css';
import Gallery from './Gallery';
import axios from 'axios';
import GalleryPop from './popup';
import Cars from '../../admin-panel/pages/cars/Cars';

const AuctionCard = ({ item }) => {
  const navigate = useNavigate();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [bidsCount, setBidsCount] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const userData = sessionStorage.getItem('user');
  const defaultUser = {};
  const [user, setUser] = useState(userData? JSON.parse(userData) : defaultUser);

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
    const auctionId = item.id;

    try {
      const response = await axios.get(`https://backendauction.mydriven.ae/wishlist/${userId}/${auctionId}`);
      const isInWishlist = response.data.isInWishlist;
      setIsInWishlist(isInWishlist);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  };

  useEffect(() => {
    checkWishlistStatus();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const breakpoint = 768;

  useEffect(() => {
    const fetchDataForPosts = async () => {
        try {
            const response = await fetch(`https://backendauction.mydriven.ae/bidsnew/${item.id}`);
            if (!response.ok) {
                throw new Error(`HTTP error: Status ${response.status}`);
            }
            let bidsCount = await response.json();
            setBidsCount(bidsCount.count);
        } catch (err) {
            console.log(err.message);
        }
    };

    fetchDataForPosts(); // Initial fetch

    // Set interval to fetch data every 10 seconds
    const interval = setInterval(fetchDataForPosts, 1000); // 10000 milliseconds = 10 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval);
}, []);


  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(`https://backendauction.mydriven.ae/bidsnew/${item.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let bidsCount = await response.json();
        setBidsCount(bidsCount.count);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchDataForPosts();
  }, []);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const calculateTimeLeft = () => {
    const difference = +new Date(item.expiry_date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        D: Math.floor(difference / (1000 * 60 * 60 * 24)),
        H: Math.floor((difference / (1000 * 60 * 60)) % 24),
        M: Math.floor((difference / 1000 / 60) % 60),
        S: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [item.createdAt]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval} {":"}
      </span>
    );
  });

  const handleClick = () => {
    const carId = item.id;
    navigate(`/auction/motors/${item.id}`, { state: carId });
  };

  return (
        <>
            {isPopupVisible && <GalleryPop auctionId={item.id} onClose={togglePopup}/>}
            <div style={{ cursor: 'pointer' }} className='auctions-wrap'>
                <div className='page-content'>
                    <div className='vehicle-wrap'>
                        <div className='styles_auctionsList__i4K01'>
                            <div id="CARD_GRID_477467" className="styles_listItemContainer__34R8_" style={{outline: '0px', boxShadow: 'rgba(78, 78, 78, 0.14) 0px 5px 15px'}}>
                                <div className="styles_listImg__4ia1l">
                                    <div className="styles_imageWrapper__WhasL">
                                        <a onClick={handleClick}>
                                            <img src={item.feature_image} alt="2019 Mercedes GT 63 S" title="2019 Mercedes GT 63 S" className="styles_cardImg__peZtj" width="218" height="122" loading="lazy"/>
                                        </a>
                                        <div className="styles_addToFavorite__O4hNZ">
                                            <div className="styles_wrapper__ofM1O">
                                                <div className="styles_smallIcon__drxJ4 styles_listIcon__KeCMP" onClick={() => {addwishlist(item.id)}}>
                                                    {
                                                        isInWishlist ? <img src="./1r.png" alt="favorite"  width="16" height="16" loading="lazy" rel="preload" aria-label="Add to Watchlist" className=""/> :
                                                        <img src="./1.png" alt="favorite"  width="16" height="16" loading="lazy" rel="preload" aria-label="Add to Watchlist" className=""/>
                                                    }
                                                    
                                                </div>
                                                <div className="styles_smallOption__6M8gc styles_listIcon__i__CM">
                                                    <img onClick={togglePopup} src="./2.png" alt="option" aria-label="Photos" className=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="styles_listDetails__Du48R">
                                    {/* <div className="styles_exactDotsMenu____Rfo">
                                        <div className="styles_smallIcon__0BJ8U">
                                            <img src="./dots_icon.svg" alt="menu" width="16" height="16" loading="lazy" rel="preload"/>
                                        </div>
                                    </div> */}
                                    <div className="styles_listStatus__BH4qo"></div>
                                    <a target="_self" onClick={handleClick}>
                                        <h3 id="title" className="styles_cardTitle__yML2U styles_cardTitleLarge__GN874" aria-label="2019 Mercedes GT 63 S">{item.title}</h3>
                                    </a>
                                    <div className="styles_productStatus__Aiv_Y">
                                        <div className="styles_cartBadge__yFUpO">Lot # {item.id}</div>
                                        <div className="styles_productStatus__3yo_H">
                                            <label className="styles_labelStatus__LlNtn" style={{backgroundColor: 'rgba(26, 63, 63, 0.247)', color: 'rgb(63, 63, 63)', marginInlineEnd: '6px', fontSize: '12px'}}>
                                                <img className="styles_tagImg__WItpE" src="https://cdn.emiratesauction.com/static/AppsAssets/Tags/Meter@3x.png" alt="Distance indicator" title="Visual represntation of distance in kilometers or miles" style={{width: '12px', height: '12px'}}/>
                                                <span>{item.mileage} Km</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="styles_wrapper__4w_5e">
                                        {windowWidth >= breakpoint && <div className="styles_listWrapper__mlWdq styles_wrapper__6swlq">
                                            <img className="" src="./calender_icon.svg" alt="End Date " width="16" height="16" loading="lazy" rel="preload"/>
                                            <span className="styles_text__GSIbG  ">End Date :</span>
                                            <span className="styles_data__HPULm styles_listData__5uy5S">{item.expiry_date}</span>
                                        </div>}
                                        <div className="styles_divider__mLML4"></div>
                                        <div className="styles_listWrapper__mlWdq styles_wrapper__6swlq ">
                                            <img className="" src="./remaining.svg" alt="Time Left " width="16" height="16" loading="lazy" rel="preload"/>
                                            <span className="styles_text__GSIbG  ">Time Left :</span>
                                            <span className="styles_data__HPULm styles_listData__5uy5S ">
                                                <span className="styles_large__zr9ao " style={{display: 'flex'}}>{timerComponents.length ? timerComponents : <span>Time's up!</span>}</span>
                                            </span>
                                        </div>
                                        <div className="styles_divider__mLML4"></div>
                                        <div className="styles_biddingCount__xU8XR">
                                            <div className="styles_listWrapper__mlWdq styles_wrapper__6swlq itemBorderAnimation">
                                                <img className="styles_white__rdPYA iconBidWhite" src="./bids.svg" alt="Bids " width="16" height="16" loading="lazy" rel="preload"/>
                                                <img className="styles_black__BBy8T iconBidBlack" src="./bids-white.svg" alt="Bids " width="16" height="16" loading="lazy" rel="preload"/>
                                                <span className="styles_text__GSIbG  priceFlash">Bids :</span>
                                                <span className="styles_data__HPULm styles_listData__5uy5S priceFlash">{bidsCount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="styles_divider__mLML4"></div>
                                <div className="styles_wrapperList__KKOXU itemBorderAnimation">
                                    <div className="styles_smallPrice__mlvXY priceFlash">
                                        <span className="styles_currency__qIwfP priceFlash">AED</span>
                                        <span>{item.price}</span>
                                    </div>
                                    <button className="styles_btn__KTmso BidBtnFlash">
                                        <div className="biddingIconsContainer">
                                            <img className="styles_white__RZ_zn iconWhite" src="./Bidding_icon-white.svg" alt="bid icon" width="18" height="18" loading="lazy" rel="preload"/>
                                            <img className="styles_black__tl8HL iconBlack" src="./Bidding_icon_black.svg" alt="bid icon" width="18" height="18" loading="lazy" rel="preload"/>
                                        </div>
                                        <span onClick={handleClick}>Bid Now</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className='styles_gridCardWrapper__t5glg row'>
  <div id="CARD_GRID_466623 col-md-4" class="styles_gridContainer__eUs4_"
    style={{outline: '0px', boxShadow: 'rgba(78, 78, 78, 0.14) 0px 5px 15px'}}><img src="/assets/card/card_pinned.svg"
      alt="cardPinned" class="styles_cardPinned__ROJvv" />
    <div class="styles_cardMedia__Vw3jF">
      <div class="styles_cardImageWrap__jyKL_"><a href="/auctions/vehicles/466623/4/2017-bentley-bentayga">
          <div class="styles_cardImgWrapper__IUng0"><img
              src="https://cdn.emiratesauction.com/media/2nzfwvwey1erfqfm9pf8aab0r3xxpwigqe5f8pgxs78h2e01fs/t_,w_250,h_140,wm_1/images.jpg"
              alt="2017 Bentley Bentayga" width="250" height="140" loading="lazy" rel="preload" /></div>
        </a></div>
      <div class="styles_lotContainer__5b2Wd styles_lotPinContainer__rmb6d">
        <div class="styles_wrapper__r5che"><span>Lot # 466623</span></div>
      </div>
      <div class="styles_cardOptionsWrapper__hpAtG">
        <div></div>
        <div class="styles_wrapper__S69Ge">
          <div class="styles_largeOption__SDDGA"><img src="/assets/card/gallery_icon.svg" alt="option"
              aria-label="Photos" class="" /></div>
          <div class="styles_largeIcon__GIu_j"><img src="/assets/card/add-favorite.svg" alt="favorite" width="16"
              height="16" loading="lazy" rel="preload" aria-label="Add to Watchlist" class="" /></div>
          <div class="styles_largeIcon__Xoe5i"><img src="/assets/card/dots_icon.svg" alt="menu" width="16" height="16"
              loading="lazy" rel="preload" /></div>
        </div>
      </div>
    </div>
    <div class="styles_cardContentContainer__waZ5W">
      <div class="styles_cardContent__O6xZL"><a target="_self" href="/auctions/vehicles/466623/4/2017-bentley-bentayga">
          <h3 id="title" class="styles_cardTitle__yML2U" aria-label="2017 Bentley Bentayga">2017 Bentley Bentayga</h3>
        </a>
        <div style={{height: '24px'}}>
          <div class="styles_productStatus__3yo_H"><label class="styles_labelStatus__LlNtn"
              style={{backgroundColor: 'rgba(26, 63, 63, 0.247)', color: 'rgb(63, 63, 63)', marginInlineEnd: '6px', fontSize: '12px'}}><img
                class="styles_tagImg__WItpE" src="https://cdn.emiratesauction.com/static/AppsAssets/Tags/Meter@3x.png"
                alt="Distance indicator" title="Visual represntation of distance in kilometers or miles"
                style={{width: '12px', height: '12px'}} /><span>153,715 Km</span></label></div>
        </div>
      </div>
      <div class="styles_wrapper___wCTH">
        <div class="styles_wrapper__6swlq
"><img class="" src="/assets/card/remaining.svg" alt="Time Left " width="16" height="16" loading="lazy"
            rel="preload" /><span class="styles_data__HPULm "><span id="" class="styles_small__4V8A9 "
              style={{display: 'flex'}}>09h : 56m</span></span></div>
        <div class="styles_biddingCount__8tvlS itemBorderAnimation">
          <div class="styles_wrapper__6swlq
"><img class="styles_white__rdPYA iconBidWhite" src="/assets/card/bids.svg" alt="Bids " width="16" height="16"
              loading="lazy" rel="preload" /><img class="styles_black__BBy8T iconBidBlack"
              src="/assets/card/bids-white.svg" alt="Bids " width="16" height="16" loading="lazy" rel="preload" /><span
              class="styles_largeData__fFCxz priceFlash">0</span></div>
        </div>
      </div>
      <div class="styles_wrapper__PR9i0 itemBorderAnimation">
        <div class="styles_largePrice__sBoL1 priceFlash"><span
            class="styles_currency__qIwfP priceFlash">AED</span><span>200,000</span></div><button class="styles_largeBtn__rc32r BidBtnFlash">
          <button className="styles_btn__KTmso BidBtnFlash m-3">
                                        <div className="biddingIconsContainer">
                                            <img className="styles_white__RZ_zn iconWhite" src="./Bidding_icon-white.svg" alt="bid icon" width="18" height="18" loading="lazy" rel="preload"/>
                                            <img className="styles_black__tl8HL iconBlack" src="./Bidding_icon_black.svg" alt="bid icon" width="18" height="18" loading="lazy" rel="preload"/>
                                        </div>
                                        <span onClick={handleClick}>Bid Now</span>
                                    </button>
        </button>
      </div>
    </div>
  </div>
</div> */}

<div className='card-wrapper'>
      <div className="card-container">
        <img src="/assets/card/card_pinned.svg" alt="cardPinned" className="card-pinned" />
        <div className="card-media">
          <div className="card-image-wrap">
            <a href={`/auctions/vehicles/${item.id}/4/2017-bentley-bentayga`}>
              <div className="card-img-wrapper">
                <img src={item.feature_image} alt={item.title} width="250" height="140" loading="lazy" />
              </div>
            </a>
          </div>
          <div className="lot-container">
            <div className="lot-wrapper"><span>Lot # {item.id}</span></div>
          </div>
          <div className="card-options-wrapper">
            <div className="card-options">
              <div className="large-option"><img src="/assets/card/gallery_icon.svg" alt="Photos" /></div>
              <div className="large-icon"><img src="/assets/card/add-favorite.svg" alt="favorite" width="16" height="16" loading="lazy" /></div>
              <div className="large-icon"><img src="/assets/card/dots_icon.svg" alt="menu" width="16" height="16" loading="lazy" /></div>
            </div>
          </div>
        </div>
        <div className="card-content-container">
          <div className="card-content">
            <a href={`/auctions/vehicles/${item.id}/4/2017-bentley-bentayga`}>
              <h3 className="card-title">{item.title}</h3>
            </a>
            <div style={{ height: '24px' }}>
              <div className="product-status">
                <label className="label-status">
                  <img src="https://cdn.emiratesauction.com/static/AppsAssets/Tags/Meter@3x.png" alt="Distance indicator" title="Visual representation of distance in kilometers or miles" />
                  <span>{item.mileage} Km</span>
                </label>
              </div>
            </div>
          </div>
          <div className="wrapper">
            <div className="wrapper-item">
              <img src="/assets/card/remaining.svg" alt="Time Left" width="16" height="16" loading="lazy" />
              <span className="data"><span className="small">{timerComponents.length ? timerComponents : <span>Time's up!</span>}</span></span>
            </div>
            <div className="bidding-count itemBorderAnimation">
              <div className="wrapper-item">
                <img className="iconBidWhite" src="/assets/card/bids.svg" alt="Bids" width="16" height="16" loading="lazy" />
                <img className="iconBidBlack" src="/assets/card/bids-white.svg" alt="Bids" width="16" height="16" loading="lazy" />
                <span className="largeData priceFlash">{bidsCount}</span>
              </div>
            </div>
          </div>
          <div className="wrapper itemBorderAnimation">
            <div className="largePrice priceFlash">
              <span className="currency priceFlash">AED</span><span>{item.price}</span>
            </div>
            <button className="largeBtn BidBtnFlash">
              <div className="biddingIconsContainer">
                <img className="iconWhite" src="/assets/icons/Bidding_icon-white.svg" alt="bid icon" width="18" height="18" loading="lazy" />
                <img className="iconBlack" src="/assets/card/Bidding_icon_black.svg" alt="bid icon" width="18" height="18" loading="lazy" />
              </div>
              <span>Bid Now</span> 
            </button>
          </div>
        </div>
      </div>
    </div>

                </div>
            </div>
        </> 
    )
    }
    
    export default AuctionCard