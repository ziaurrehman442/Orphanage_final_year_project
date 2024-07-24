import React from "react";
import './Banner.css';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import './assets/css/font-awesome.min.css';
import './assets/css/remixicon.css';
import './assets/fonts/flaticon.css';
import './assets/css/animate.css';
import './assets/css/slick.css';
import './assets/css/off-canvas.css';
import './assets/css/magnific-popup.css';
import './assets/css/rsmenu-main.css';
import './assets/css/rs-spacing.css';
import './style.css';
import './assets/css/responsive.css';
import { Height } from "@mui/icons-material";


 
const Footer = () => {
	const {t, i18n} = useTranslation();
    return(
        <div>
		
		
		
            <hr />
            <footer id="rs-footer" class="rs-footer footer-main-home footer-style1">
			<div class="container custom8">
				<div class="footer-top">
					<div class="row">
						<div class="col-lg-4 md-mb-30">
							<div class="footer-logo">
								<a href="index"><img src="/assets/img/logo.png" alt="" /></a> 
							</div>
							<p class="description"> </p>
							<div class="contact-box">
								<div class="address-box mb-12 bgph">
									<div class="address-icon">
										<i class="ri-phone-line mti"></i>	            
									</div>
									<div class="address-text">
										<div class="text">
											<a href="tel:+923149501784" style={{fontSize: "20px"}}>+923149501784</a>
										</div>
									</div>
								</div>
								
								<div class="address-box mb-12">
									<div class="address-icon">
										<i class="ri-whatsapp-line"></i>	            
									</div>
									<div class="address-text">
										<div class="text">
											<div class="text">
											<a href="https://wa.me/+923149501784">+923149501784</a>
										</div>
										</div>
									</div>
								</div>
								<div class="address-box">
									<div class="address-icon">
										<i class="ri-mail-send-line"></i>		            
									</div>
									<div class="address-text">
										<div class="text">
											<a href="mailto:zia.rehman1010p@gmail.com">zia.rehman1010p@gmail.com</a>
										</div>
									</div>
								</div>
								
								<br/>
								<div class="address-box">
								<a href="https://maps.app.goo.gl/YEDxkmKanGMMUEsQ6" target="_blank" title="Open Google Maps">
									<div class="address-icon">
										<i class="ri-map-pin-line"></i>		            
									</div>
									<div class="address-text">
										<div class="text">
											<a>Preston University Islamabad</a>
										</div>
									</div>
									</a>
								</div>
							</div>
							
						</div>
						<div class="col-lg-4 pl-110 md-pl-15">
							<h5 class="footer-title">Quick Links</h5>
							<ul class="site-map">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/child">Child's</Link></li>
                                <li><Link to="/commingsoon">Compains</Link></li>
                                <li><Link to="/commingsoon">Orphanages</Link></li>
                            </ul>
						</div>
						
						<div class="col-lg-4">
							<h5 class="footer-title">Connect with Us</h5>
							<ul class="footer-social">  
                                <li><a href="https://www.facebook.com/" target="_blank"><img src="/assets/img/facebook.png" /></a></li>              
                                <li><a href="https://www.instagram.com/" target="_blank"><img src="/assets/img/instgram.png" /></a></li>              
                                <li><a href="https://twitter.com/" target="_blank"><img src="/assets/img/twitt.png" /></a></li>              
                                <li><a href="https://www.tiktok.com/" target="_blank"><img src="/assets/img/tiktok.png" /></a></li>              
                                <li><a href="#"><img src="/assets/img/youtube.png" /></a></li>              
                                <li><a href="https://www.linkedin.com/" target="_blank"><img src="/assets/img/linkdin.png" /></a></li>              
                          	</ul>
							<hr class="whtline" />
							<h5 class="footer-title">Payment Methods</h5>
							<ul class="footer-social">  
                                <li><a href="#"><img src="/assets/img/visa.png" /></a></li>              
                                <li><a href="#"><img src="/assets/img/master.png" /></a></li>              
                                <li><a href="#"><img src="/assets/img/card.png" /></a></li>              
                          	</ul>
							<hr class="whtline" />
						</div>
					</div>
				</div>
			</div>
			<div class="footer-bottom">
                <div class="container">                    
                    <div class="bottom-border">
                    	<div class="row y-middle">
                    	    <div class="col-lg-6">
                    	        <div class="copyright text-lg-start text-center">
                    	            <p>© 2024 Powerd By ZWA</p>
                    	        </div>
                    	    </div>
                    	</div>
                    </div>
                </div>
            </div>
		</footer>
    </div>
    )
}

export default Footer;