import React, {useState} from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './LandingPage.css';


import vectorStar from '../assets/images/Vector.png'; 
import vectorPrev from '../assets/images/Vector 2.png'; 
import vectorNext from '../assets/images/Vector 3.png';
import backgroundImage from '../assets/images/Rectangle 4.png';
import corn from '../assets/images/corn.png';
import logo from '../assets/images/hausafarmer.jpeg';
import trackCrops from '../assets/images/image 3.png';
import monitorLivestock from '../assets/images/image 4.jpeg';
import weatherAlerts from '../assets/images/image 5.jpeg';
import network from '../assets/images/image 6.jpeg';
import createAccount from '../assets/images/star_rate 1.png';
import enterDetails from '../assets/images/star_rate 2.png';
import receiveData from '../assets/images/star_rate 3.png';
import shareExperiences from '../assets/images/star_rate 4.png';
import testimonialJohn from '../assets/images/Rectangle 31.png';
import testimonialJane from '../assets/images/Rectangle 32.png';
import testimonialAhmed from '../assets/images/Rectangle 33.png';
import cropTips from '../assets/images/Rectangle 10.png';
import livestockHealth from '../assets/images/Rectangle 11.png';
import sustainableFarming from '../assets/images/Rectangle 12.png';
import instagram from '../assets/images/instagram.png';
import pinterest from '../assets/images/pinterest.png';
import facebook from '../assets/images/facebook.png';
import behance from '../assets/images/behance.png';
import footerLogo from '../assets/images/hausafarmer2.jpeg';




function LandingPage () {

  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    { name: 'John Doe', role: 'Rice Farmer', feedback: 'iFarmr has revolutionized the way I manage my farm!', img: testimonialJohn },
    { name: 'Jane Smith', role: 'Poultry Farmer', feedback: 'The community feature has been a game-changer for me.', img: testimonialJane },
    { name: 'Ahmed Musa', role: 'Maize Farmer', feedback: 'Real-time weather updates saved my crops last season.', img: testimonialAhmed },
  ];

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };


  return (
    <div>
      <header>
        <div className="containerr">
          <div className="logoo">
            <img src={logo} alt="iFarmr Logo" />
            <h1>iFarmr</h1>
          </div>
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/features">Features</Link></li>
            </ul>
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-login">Login</Link>
              <Link to="/signup" className="btn btn-signup">Sign Up</Link>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero" style={{ backgroundImage: `url(${corn})` }}>
        <div className="hero-container">
          <h1>Empower Your Farm <br />
            <span>with iFarmr</span>
          </h1>
          <h2>Optimize your farming operations and connect with a community of experts.</h2>
          <div className="cta-buttons">
            <a href="#" className="btn-primary">Get Started</a>
            <a href="#" className="btn-secondary">Learn More</a>
          </div>
        </div>
      </section>

      <section className="why-choose">
        <div className="container-choose">
          <h2>Why Choose iFarmr?</h2>
          <p>Explore the Powerful Tools iFarmr Offers to Streamline <br /> Your Farming Operations.</p>
        </div>
        <div className="features">
          <div className="feature">
            <img src={trackCrops} alt="Track Crops" />
            <h3>Track and manage your crops efficiently</h3>
          </div>
          <div className="feature">
            <img src={monitorLivestock} alt="Monitor Livestock" />
            <h3>Monitor your livestock's health and growth</h3>
          </div>
          <div className="feature">
            <img src={weatherAlerts} alt="Weather Alerts" />
            <h3>Get real-time weather alerts for better planning</h3>
          </div>
          <div className="feature">
            <img src={network} alt="Network" />
            <h3>Join a supportive network of fellow farmers</h3>
          </div>
        </div>
      </section>

      
      <section
       className="cta" style={{backgroundImage: `url(${backgroundImage})` }}>
       <div className="containerrr">
         <div className="cta-content">
           <h2>Ready to Take Your Farm to the Next Level?</h2>
           <p>Join thousands of farmers optimizing their operations with iFarmr.</p>
           <div className="cta-buttons">
             <a href="#" className="btn-primary">Sign Up for Free</a>
             <a href="#" className="btn-secondary">Learn more</a>
           </div>
         </div>
       </div>
      </section>

      <section className="how-it-works">
        <div className="containerss">
          <div className="contents">
            <h2>How It Works?</h2>
            <p>From Sign-Up to Successful Farming—Follow <br /> These Simple Steps to Unlock the Full Potential of <br /> iFarmr and Transform Your Agricultural Practices.</p>
            <a href="#" className="btn">Learn More →</a>
          </div>
          <div className="stepss">
            <div className="steps">
              <div className="icon">
                <img src={createAccount} alt="Create Account" />
              </div>
              <p>Create your account in just a few clicks.</p>
            </div>
            <div className="steps">
              <div className="icon">
                <img src={enterDetails} alt="Enter Details" />
              </div>
              <p>Enter details about your crops and livestock.</p>
            </div>
            <div className="steps">
              <div className="icon">
                <img src={receiveData} alt="Receive Data" />
              </div>
              <p>Receive tailored tips and real-time data.</p>
            </div>
            <div className="steps">
              <div className="icon">
                <img src={shareExperiences} alt="Share Experiences" />
              </div>
              <p>Share experiences and get advice from peers.</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="testimonials">
        <div className="text-container">
          <h2>Testimonials</h2>
          <p>Hear From Farmers Who Have Transformed Their Operations-Discover <br /> How iFarmr is Making a Real Difference in the Lives of Agricultural <br /> Professionals Everywhere.</p>
        </div>
        <div className="testimonial-cards">
          <button className="prev" aria-label="Previous Testimonial" onClick={handlePrev}>
            <img src={vectorPrev} alt="Previous" />
          </button>
          <div className="cards-container">
            <div className="cards">
              <img src={testimonialJohn} alt="John Doe" />
                <div className="stars">
                  {[...Array(5)].map((_, index) => (
                 <img key={index} src={vectorStar} alt="Star" />
                  ))}
                </div>
              <h3>John Doe</h3>
              <p className="role">Rice Farmer</p>
              <p>"iFarmr has revolutionized the way I manage my farm!"</p>
            </div>
            <div className="cards middle-card">
              <img src={testimonialJane} alt="Jane Smith" />
                <div className="stars">
                  {[...Array(5)].map((_, index) => (
                 <img key={index} src={vectorStar} alt="Star" />
                  ))}
                </div>
              <h3>Jane Smith</h3>
              <p className="role">Poultry Farmer</p>
              <p>"The community feature has been a game-changer for me."</p>
            </div>
            <div className="cards">
              <img src={testimonialAhmed} alt="Ahmed Musa" />
                <div className="stars">
                 {[...Array(5)].map((_, index) => (
                 <img key={index} src={vectorStar} alt="Star" />
                 ))}
                </div>
              <h3>Ahmed Musa</h3>
              <p className="role">Maize Farmer</p>
              <p>"Real-time weather updates saved my crops last season."</p>
            </div>
          </div>
          <button className="next" aria-label="Next Testimonial" onClick={handleNext}>
            <img src={vectorNext} alt="Next" />
          </button>
        </div>
      </section>

      <section className="insights">
        <div className="insight-text">
          <h2>Insights & Stories from <br /> the Farming World</h2>
          <p>Stay Informed with the Latest Trends, Tips, and Success Stories— <br /> Handpicked Just for You.</p>
        </div>
        <div className="insight-cards">
          <div className="insight-card">
            <img src={cropTips} alt="Crop Management Tips" />
            <h3>Crop Management Tips for Better Yield</h3>
            <a href="#">Read More</a>
          </div>
          <div className="insight-card">
            <img src={livestockHealth} alt="Livestock Health" />
            <h3>Maintaining Livestock Health: A Complete Guide</h3>
            <a href="#">Read More</a>
          </div>
          <div className="insight-card">
            <img src={sustainableFarming} alt="Sustainable Farming" />
            <h3>Sustainable Farming Practices You Should Adopt Today</h3>
            <a href="#">Read More</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <div className="logoo">
              <img src={footerLogo} alt="iFarmr Logoo"/>
              <span>iFarmr</span>
            </div>
            <p>Optimize your farming operations and connect with a community of experts.</p>
            <div className="social-icons">
              <div className="icons">
                <img src={instagram} alt="Instagram" />
              </div>
              <div className="icons">
                <img src={pinterest} alt="Pinterest" />
              </div>
              <div className="icons">
                <img src={facebook} alt="Facebook" />
              </div>
              <div className="icons">
                <img src={behance} alt="Behance" />
              </div>
            </div>
          </div>

          <div className="footer-right">
            <div className="footer-column">
             <h4>About</h4>
             <a href="#">About Us</a>
             <a href="#">Our Team</a>
             <a href="#">Careers</a>
            </div>
            <div className="footer-column">
             <h4>Support</h4>
             <a href="#">Help Center</a>
             <a href="#">FAQs</a>
             <a href="#">Contact Us</a>
            </div>
            <div className="footer-column">
             <h4>Legal</h4>
             <a href="#">Privacy Policy</a>
             <a href="#">Terms of Service</a>
             <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
