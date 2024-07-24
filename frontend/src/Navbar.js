import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Language from './components/language';
import "./i18n"
import { useTranslation } from 'react-i18next';
import './components/css/style.css'
import { useNavigate} from 'react-router-dom';
import './components/css/font-awesome.css'

function Navbar() {
  const navigate = useNavigate();
  const [popup, setpopup] = useState('close');
  const [numberpop, setnumberpop] = useState('close');
  const [propertiespop, setPropertiespop] = useState('close');
  const [rentpop, setRentpop] = useState('close');
  const [surpluspop, setSurpluspop] = useState('close');
  const userData = sessionStorage.getItem('user');
  const defaultUser = {}; // Set default user object here
  const [user, setUser] = useState(userData ? JSON.parse(userData) : defaultUser);

  const [isMobile, setIsMobile] = useState(false);
useEffect (() => {
  const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
  };

  handleResize();

  window.addEventListener('resize', handleResize);

  return () => {
      window.removeEventListener('resize', handleResize);
  };
}, []);



  useEffect(() => {
    const userFromSession = JSON.parse(sessionStorage.getItem('user'));
    setUser(userFromSession || {});
  }, []);

  const close = () => {
    setnumberpop("close");
    setPropertiespop('close');
    setRentpop("close");
    setSurpluspop("close");
    setpopup("close");
  }

  const open = () => {
    switch(popup){
      case 'close':
        setnumberpop("close");
        setPropertiespop('close');
        setRentpop("close");
        setSurpluspop("close");
        setpopup("open");
          return;
      case 'open':
          setpopup("close");
          return;
      default: 
          setpopup("close");
          return;
  }
    
  }

  const number = () => {
    switch(numberpop){
      case 'close':
        setpopup('close');
        setPropertiespop('close');
        setRentpop("close");
        setSurpluspop("close");
        setnumberpop("open");
          return;
      case 'open':
        setnumberpop("close");
          return;
      default: 
      setnumberpop("close");
          return;
  }
    
  }

  const propertiespopbut = () => {
    switch(propertiespop){
      case 'close':
        setpopup('close');
        setPropertiespop('open');
        setRentpop("close");
        setSurpluspop("close");
        setnumberpop("close");
          return;
      case 'open':
        setPropertiespop("close");
          return;
      default: 
      setPropertiespop("close");
          return;
  }
    
  }

  const rentpopbtn = () => {
    switch(rentpop){
      case 'close':
        setpopup('close');
        setPropertiespop('close');
        setRentpop("open");
        setSurpluspop("close");
        setnumberpop("close");
          return;
      case 'open':
        setRentpop("close");
          return;
      default: 
      setRentpop("close");
          return;
  }
  }

  const surpluspopbtn = () => {
    switch(surpluspop){
      case 'close':
        setpopup('close');
        setPropertiespop('close');
        setRentpop("close");
        setSurpluspop("open");
        setnumberpop("close");
          return;
      case 'open':
        setSurpluspop("close");
          return;
      default: 
      setSurpluspop("close");
          return;
  }
  }

  
function Logout() {
  const user = {};
  sessionStorage.setItem('user', JSON.stringify(user));
  sessionStorage.setItem('admin', JSON.stringify(user));
  navigate('/');
}



const menuMainClickHandler = (e) => {
  const menu = document.querySelector(".menu");
  const menuMain = menu.querySelector(".menu-main");
  const goBack = menu.querySelector(".go-back");

  if (!menu.classList.contains("active")) {
      return;
  }

  if (e.target.closest(".menu-item-has-children")) {
      const hasChildren = e.target.closest(".menu-item-has-children");
      showSubMenu(hasChildren);
  }
};

const showSubMenu = (hasChildren) => {
  const subMenu = hasChildren.querySelector(".sub-menu");
  subMenu.classList.add("active");
  subMenu.style.animation = "slideLeft 0.5s ease forwards";
  const menuTitle = hasChildren.querySelector("i").parentNode.childNodes[0].textContent;
  const currentMenuTitle = document.querySelector(".current-menu-title");
  if (currentMenuTitle) {
      currentMenuTitle.innerHTML = menuTitle;
  }
  const mobileMenuHead = document.querySelector(".mobile-menu-head");
  if (mobileMenuHead) {
      mobileMenuHead.classList.add("active");
  }
};

const goBackClickHandler = () => {
  hideSubMenu();
};

const hideSubMenu = () => {
  const subMenu = document.querySelector(".sub-menu.active");
  if (subMenu) {
      subMenu.style.animation = "slideRight 0.5s ease forwards";
      setTimeout(() => {
          subMenu.classList.remove("active");
      }, 300);
  }
  const currentMenuTitle = document.querySelector(".current-menu-title");
  if (currentMenuTitle) {
      currentMenuTitle.innerHTML = "";
  }
  const mobileMenuHead = document.querySelector(".mobile-menu-head");
  if (mobileMenuHead) {
      mobileMenuHead.classList.remove("active");
  }
};

const toggleMenu = () => {
  const menu = document.querySelector(".menu");
  const menuOverlay = document.querySelector(".menu-overlay");
  menu.classList.toggle("active");
  if (menuOverlay) {
      menuOverlay.classList.toggle("active");
  }
};

const menuTriggerClickHandler = () => {
  toggleMenu();
};

const closeMenuClickHandler = () => {
  toggleMenu();
};

const menuOverlayClickHandler = () => {
  toggleMenu();
};

const {t} = useTranslation();
return (
  <header className="header bg-warning" >
      <div style={{paddingBottom: "10px"}}>
          <div className="row v-center"> 
              <div className="header-item item-left">
                  <Link to={"/"} className="navbar-brand">
                      <img src="/assets/img/logo.png" alt="Logo" height="40" style={{ marginRight: "20px",height:'70px',width:'70px', borderRadius: '50%' }} className="d-inline-block logo" />
                  </Link>
              </div>
              <div className="header-item item-center">
                  <div className="menu-overlay" onClick={menuOverlayClickHandler}></div>
                  <nav className="menu">
                      <div className="mobile-menu-head">
                          <div className="go-back" onClick={goBackClickHandler}><i className="fa fa-angle-left"></i></div>
                          <div className="current-menu-title"></div>
                          <div className="mobile-menu-close" onClick={closeMenuClickHandler}>&times;</div>
                      </div>
                      <ul className="menu-main" onClick={menuMainClickHandler}>
                          <li>
                              <Link to="/">{t("home")}</Link>
                          </li>
                          <li>
                              <Link to="/Orphanages">{t("Orphanages")}</Link>
                          </li>
                          <li>
                              <Link to="/Childs">{t("Childs")}</Link>
                          </li>
                          <li>
                              <Link to="/Campaigns">{t("Campaigns")}</Link>
                          </li>
                          <li>
                          <Link to={'/Donation'} className="btn btn-outline-warning " type="button">
                              {t('Donation')}
                        </Link>
                          </li>
                      </ul>
                    </nav>
              </div>
              <div className="header-item item-right">
              <div>
                              <Link to={'/contact_us'} className='btn bg-blue'>Contact us</Link>
                              <Link to={'/Complaint'} className='btn bg-blue'>Complaint</Link>
          </div>
                  <div className="mobile-menu-trigger" onClick={menuTriggerClickHandler}>
                      <span></span>
                  </div> 
              </div>
          </div>
      </div>
  </header>
);


}

export default Navbar;
