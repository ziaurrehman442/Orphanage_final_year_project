import React, { useState, useEffect } from 'react';
import './Card.css';
import AuctionCard from './AuctionCard';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

const AllCard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState('');
  const [documentcate, setdocumentcate]=useState();

  const [lenght, setlength] = useState();

  const { t } = useTranslation();
  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        // Fetch data from endpoint 1: auction items
        const response1 = await fetch(
          `https://backendauction.mydriven.ae/auction-classic`
        );
        if (!response1.ok) {
          throw new Error(`HTTP error: Status ${response1.status}`);
        }
        // Extract JSON data from response
        let auctionsData = await response1.json();
        // Update state with fetched data
        setData(auctionsData);
        setlength(auctionsData.length); // Set length of auctionsData array
        setItem(auctionsData[0]?.expiry_date || ''); // Set expiry date from first item
  
        // Fetch data from endpoint 2: catalog items
        const response2 = await fetch(
          `https://backendauction.mydriven.ae/catelog1`
        );
        if (!response2.ok) {
          throw new Error(`HTTP error: Status ${response2.status}`);
        }
        // Extract JSON data from response
        let catalogData = await response2.json();
        // Update state with fetched catalog data
        setdocumentcate(catalogData[0].catelog);
        console.log(documentcate)
      } catch (err) {
        console.log(err.message);
      } 
    };
  
    // Fetch data immediately on component mount
    fetchDataForPosts();
  
    // Set interval to fetch data every 20 seconds
    const intervalId = setInterval(() => {
      fetchDataForPosts();
    }, 20000);
  
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  

  

  const calculateTimeLeft = () => {
    const difference = +new Date(item) - +new Date();
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

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, [item]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]}{interval} {":"}
      </span>
    );
  });

  return (
    <div className="styles_auctionsLayoutList__2WnvP col-md-9">
      <div style=
        {{
          width: '100%',
          gap: '1rem',
          alignItems: 'flex-start',
          display: 'flex',
          marginBottom: '1rem'
        }}
      >
        <div className='styles_ListHeaderContainer__Wj9_d'>
          <div>
            <div className='raw-html-embed'>
              <h1 style={{ fontSize: '1.1rem' }}>
                Vehicles & Machinery
              </h1>
            </div>
            <p>
              <span style={{ color: '#e51937' }}>
                <strong>{lenght} </strong>
              </span>
              Available Item
            </p>
          </div>
          {!isMobile && 
            <div className='styles_ListHeaderImagesContainer__T7mFd'>
            <span
              style={{ 
                boxSizing: 'border-box',
                display: 'inline-block',
                overflow: 'hidden',
                width: 'initial',
                height: 'initial',
                background: 'none',
                opacity: 1,
                border: '0px',
                margin: '0px',
                padding: '0px',
                position: 'relative',
                maxWidth: '100%'
               }}
            >
              <span
                style={{
                  boxSizing: 'border-box',
                  display: 'block',
                  width: 'initial',
                  height: 'initial',
                  background: 'none',
                  opacity: 1,
                  border: '0px',
                  margin: '0px',
                  padding: '0px',
                  maxWidth: '100%'
                }}
              >
                <img 
                  alt
                  aria-hidden="true"
                  src='data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2777%27%20height=%2770%27/%3e'
                  style={{
                    padding: '0px',
                    border: '0px',
                    margin: '0px',
                    display: 'block',
                    width: 'initial',
                    height: 'initial',
                    background: 'none',
                    opacity: 1,
                    maxWidth: '100%',
                  }}
                />
              </span>
              <img alt="logo" src="./images(29).png" 
              style={{
                position: 'absolute', 
                inset: '0px',
                boxSizing: 'border-box',
                padding: '0px', 
                border: 'none',
                margin: 'auto',
                display: 'block',
                width: '0px',
                height: '0px', 
                minWidth: '100%', 
                maxWidth: '100%', 
                minHeight: '100%', 
                maxHeight: '100%'
              }}
            />
            </span> 
            <span
              style={{ 
                boxSizing: 'border-box',
                display: 'inline-block',
                overflow: 'hidden',
                width: 'initial',
                height: 'initial',
                background: 'none',
                opacity: 1,
                border: '0px',
                margin: '0px',
                padding: '0px',
                position: 'relative',
                maxWidth: '100%'
               }}
            >
              <span
                style={{
                  boxSizing: 'border-box',
                  display: 'block',
                  width: 'initial',
                  height: 'initial',
                  background: 'none',
                  opacity: 1,
                  border: '0px',
                  margin: '0px',
                  padding: '0px',
                  maxWidth: '100%'
                }}
              >
                <img 
                  alt
                  aria-hidden="true"
                  src='data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2777%27%20height=%2770%27/%3e'
                  style={{
                    padding: '0px',
                    border: '0px',
                    margin: '0px',
                    display: 'block',
                    width: 'initial',
                    height: 'initial',
                    background: 'none',
                    opacity: 1,
                    maxWidth: '100%',
                  }}
                />
              </span>
              <img alt="logo" src="./images(29).png" 
              style={{
                position: 'absolute', 
                inset: '0px',
                boxSizing: 'border-box',
                padding: '0px', 
                border: 'none',
                margin: 'auto',
                display: 'block',
                width: '0px',
                height: '0px', 
                minWidth: '100%', 
                maxWidth: '100%', 
                minHeight: '100%', 
                maxHeight: '100%'
              }}
            />
            </span>
            <span
              style={{ 
                boxSizing: 'border-box',
                display: 'inline-block',
                overflow: 'hidden',
                width: 'initial',
                height: 'initial',
                background: 'none',
                opacity: 1,
                border: '0px',
                margin: '0px',
                padding: '0px',
                position: 'relative',
                maxWidth: '100%'
               }}
            >
              <span
                style={{
                  boxSizing: 'border-box',
                  display: 'block',
                  width: 'initial',
                  height: 'initial',
                  background: 'none',
                  opacity: 1,
                  border: '0px',
                  margin: '0px',
                  padding: '0px',
                  maxWidth: '100%'
                }}
              >
                <img 
                  alt
                  aria-hidden="true"
                  src='data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2777%27%20height=%2770%27/%3e'
                  style={{
                    padding: '0px',
                    border: '0px',
                    margin: '0px',
                    display: 'block',
                    width: 'initial',
                    height: 'initial',
                    background: 'none',
                    opacity: 1,
                    maxWidth: '100%',
                  }}
                />
              </span>
              <img alt="logo" src="./images(29).png" 
              style={{
                position: 'absolute', 
                inset: '0px',
                boxSizing: 'border-box',
                padding: '0px', 
                border: 'none',
                margin: 'auto',
                display: 'block',
                width: '0px',
                height: '0px', 
                minWidth: '100%', 
                maxWidth: '100%', 
                minHeight: '100%', 
                maxHeight: '100%'
              }}
            />
            </span>
            <span
              style={{ 
                boxSizing: 'border-box',
                display: 'inline-block',
                overflow: 'hidden',
                width: 'initial',
                height: 'initial',
                background: 'none',
                opacity: 1,
                border: '0px',
                margin: '0px',
                padding: '0px',
                position: 'relative',
                maxWidth: '100%'
               }}
            >
              <span
                style={{
                  boxSizing: 'border-box',
                  display: 'block',
                  width: 'initial',
                  height: 'initial',
                  background: 'none',
                  opacity: 1,
                  border: '0px',
                  margin: '0px',
                  padding: '0px',
                  maxWidth: '100%'
                }}
              >
                <img 
                  alt
                  aria-hidden="true"
                  src='data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2777%27%20height=%2770%27/%3e'
                  style={{
                    padding: '0px',
                    border: '0px',
                    margin: '0px',
                    display: 'block',
                    width: 'initial',
                    height: 'initial',
                    background: 'none',
                    opacity: 1,
                    maxWidth: '100%',
                  }}
                />
              </span>
              <img alt="logo" src="./images(29).png" 
              style={{
                position: 'absolute', 
                inset: '0px',
                boxSizing: 'border-box',
                padding: '0px', 
                border: 'none',
                margin: 'auto',
                display: 'block',
                width: '0px',
                height: '0px', 
                minWidth: '100%', 
                maxWidth: '100%', 
                minHeight: '100%', 
                maxHeight: '100%'
              }}
            />
            </span>
            <span
              style={{ 
                boxSizing: 'border-box',
                display: 'inline-block',
                overflow: 'hidden',
                width: 'initial',
                height: 'initial',
                background: 'none',
                opacity: 1,
                border: '0px',
                margin: '0px',
                padding: '0px',
                position: 'relative',
                maxWidth: '100%'
               }}
            >
              <span
                style={{
                  boxSizing: 'border-box',
                  display: 'block',
                  width: 'initial',
                  height: 'initial',
                  background: 'none',
                  opacity: 1,
                  border: '0px',
                  margin: '0px',
                  padding: '0px',
                  maxWidth: '100%'
                }}
              >
                <img 
                  alt
                  aria-hidden="true"
                  src='data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2777%27%20height=%2770%27/%3e'
                  style={{
                    padding: '0px',
                    border: '0px',
                    margin: '0px',
                    display: 'block',
                    width: 'initial',
                    height: 'initial',
                    background: 'none',
                    opacity: 1,
                    maxWidth: '100%',
                  }}
                />
              </span>
              <img alt="logo" src="./images(29).png" 
              style={{
                position: 'absolute', 
                inset: '0px',
                boxSizing: 'border-box',
                padding: '0px', 
                border: 'none',
                margin: 'auto',
                display: 'block',
                width: '0px',
                height: '0px', 
                minWidth: '100%', 
                maxWidth: '100%', 
                minHeight: '100%', 
                maxHeight: '100%'
              }}
            />
            </span>
            <span
              style={{ 
                boxSizing: 'border-box',
                display: 'inline-block',
                overflow: 'hidden',
                width: 'initial',
                height: 'initial',
                background: 'none',
                opacity: 1,
                border: '0px',
                margin: '0px',
                padding: '0px',
                position: 'relative',
                maxWidth: '100%'
               }}
            >
              <span
                style={{
                  boxSizing: 'border-box',
                  display: 'block',
                  width: 'initial',
                  height: 'initial',
                  background: 'none',
                  opacity: 1,
                  border: '0px',
                  margin: '0px',
                  padding: '0px',
                  maxWidth: '100%'
                }}
              >
                <img 
                  alt
                  aria-hidden="true"
                  src='data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2777%27%20height=%2770%27/%3e'
                  style={{
                    padding: '0px',
                    border: '0px',
                    margin: '0px',
                    display: 'block',
                    width: 'initial',
                    height: 'initial',
                    background: 'none',
                    opacity: 1,
                    maxWidth: '100%',
                  }}
                />
              </span>
              <img alt="logo" src="./images(29).png" 
              style={{
                position: 'absolute', 
                inset: '0px',
                boxSizing: 'border-box',
                padding: '0px', 
                border: 'none',
                margin: 'auto',
                display: 'block',
                width: '0px',
                height: '0px', 
                minWidth: '100%', 
                maxWidth: '100%', 
                minHeight: '100%', 
                maxHeight: '100%'
              }}
            />
            </span>
          </div>
          }
        </div>
      </div>
      <div className="styles_filterContainer__mUPQ6">
        <div className="styles_ListHeaderContainer__dy9Lq">
          <div className="styles_flex__MxPTO">
            <img src="./alarmV2.png" alt="logo" style={{width: '20px', height: '20px'}}/>
            <span className="styles_font18_500__c6Jn4">Ending In: </span>
          </div>
          <div className="styles_wrapper__Esa60">
            <div className="styles_item__jnNtb">
              <p className="styles_number__v738w">{timerComponents.length ? timerComponents : <span>Time's up!</span>}</p>
            </div>
          </div>
        </div>
        <a href={`${documentcate}`} download="filename.pdf" style={{color: 'red'}}>{t('catelog')}</a>

        {!isMobile && <div className="styles_SearchSort__idHUq">
          <div className="styles_DisFlex__3n4ez">
            <div></div>
            <div className="styles_DisFlex2__R2wG2  ">
              <div className="styles_main__f3mw5 ">
                <div className="styles_hasSearch__5k8YO ">
                  <input id="Search" type="text" className="styles_formControl__Kj_hE" placeholder="Search ..." value=""/>
                  <div className="styles_imgContain__e5H3K">
                    <img className="styles_formControlFeedback__grud3" src="./filterSearch.png" alt="Search filter icon" title="Search using filters"/>
                  </div>
                </div>
              </div>
              <button type="button" className="styles_btnFilter__loYk_">
                <img src="./Filter.svg" width="18" height="18" alt="filter icon"/>
              </button>
              <div>
                <button type="button" className="styles_btnSort__oU457">
                  <img src="./arrows.svg" alt="sort" width="16" height="16" loading="lazy" rel="preload"/>
                  <span className="styles_HiddenSm__SEE0f">Sort</span>
                </button>
              </div>
              <div className="styles_toggleBtns__a_eC4">
                <div>
                  <button type="button" className="styles_btnSort2__TQ_3_" aria-label="Grid View" style={{backgroundColor: 'rgb(255, 255, 255)'}}>
                    <img src="./grid-view-black.svg" alt="Grid view icon" title="Switch to grid view"/>
                  </button>
                </div>
                <div>
                  <button type="button" className="styles_btnSortFilter__Io_Si" aria-label="List View" style={{backgroundColor: 'rgb(229, 25, 55)'}}>
                    <img src="./list-view-white.svg" alt="List view icon" title="Switch to list view" width="24" height="24" loading="lazy" rel="preload"/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        }
      </div>
      {data?.map((item) => (<AuctionCard item={item}/>))}
    </div>
  )
}

export default AllCard