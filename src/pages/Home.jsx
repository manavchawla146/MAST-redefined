import React, { useRef, useState, useEffect } from 'react';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import { Link, useLocation } from 'react-router-dom';
import './Home.css';

// Import images
import img1 from '../assets/images/1.jpg';
import img2 from '../assets/images/2.jpg';
import img3 from '../assets/images/3.jpg';
import img4 from '../assets/images/4.jpg';
import img5 from '../assets/images/5.jpg';
import img6 from '../assets/images/6.jpg';
import img7 from '../assets/images/7.jpg';
import img8 from '../assets/images/8.jpg';
import img9 from '../assets/images/9.jpg';
import img10 from '../assets/images/10.jpg';
import mast2 from '../assets/images/mast2.jpg';

// Import videos
import video1 from '../assets/videos/3.mp4';
import video2 from '../assets/videos/2.mp4';

const Home = () => {
  const location = useLocation();
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

  // Best sellers data with imported images
  const bestSellers = [
    { image: img1 },
    { image: img2 },
    { image: img3 },
    { image: img4 },
    { image: img5 },
    { image: img6 },
    { image: img7 },
    { image: img8 },
    { image: img9 },
    { image: img10 },
  ];

  // Ensure page starts at top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (video2Ref.current) {
      video2Ref.current.play();
      setActiveVideo(video2Ref.current);
    }
    if (video1Ref.current) video1Ref.current.pause();
  }, []);

  // Handle scrolling to sections based on navigation state
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const handleVideoHover = (videoRef) => {
    if (activeVideo && activeVideo !== videoRef.current) activeVideo.pause();
    videoRef.current.play();
    setActiveVideo(videoRef.current);
  };

  const handleMouseLeave = () => {
    if (video1Ref.current) video1Ref.current.pause();
    if (video2Ref.current) {
      video2Ref.current.play();
      setActiveVideo(video2Ref.current);
    }
  };

  return (
    <div className="home-container">
      <section className="hero-section" onMouseLeave={handleMouseLeave}>
        <div
          className={`hero-image left ${activeVideo !== video1Ref.current ? 'inactive' : ''}`}
          onMouseEnter={() => handleVideoHover(video1Ref)}
        >
          <video ref={video1Ref} muted loop playsInline className="hero-video">
            <source src={video1} type="video/mp4" />
          </video>
          <h2 className="video-text">Party Wear</h2>
        </div>
        <div
          className={`hero-image right ${activeVideo !== video2Ref.current ? 'inactive' : ''}`}
          onMouseEnter={() => handleVideoHover(video2Ref)}
        >
          <video ref={video2Ref} muted loop playsInline className="hero-video">
            <source src={video2} type="video/mp4" />
          </video>
          <h2 className="video-text">Kurti set</h2>
        </div>
      </section>
      <section className="best-seller-section" id="best-seller">
        <h2 className="section-title">Collection</h2>
        <Gallery items={bestSellers} autoplay={true} pauseOnHover={true} />
      </section>
      <section className="about-us-section" id="about-us">
        <div className="about-us-content">
          <div className="about-us-text">
            <h2 className="section-title">About Us</h2>
            <p className="about-description">
              MAST<span className="trademark">®</span> crafts stylish, high-quality clothing for women, blending timeless elegance with modern trends. Our premium fabrics and expert craftsmanship ensure every piece is durable and fashionable.
            </p>
            <p className="about-mission">
              We're passionate about empowering you to express your unique style with confidence.
            </p>
          </div>
          <div className="about-us-image">
            <img src={mast2} alt="MAST Garments Premium Collection" />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;