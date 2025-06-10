import React, { useRef, useState, useEffect } from 'react';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import { Link, useLocation } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const location = useLocation();
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

  // Best sellers data (assuming .heic images are converted to .jpg for compatibility)
  const bestSellers = [
    { image: '/src/assets/images/1.jpg' },
    { image: '/src/assets/images/2.jpg' },
    { image: '/src/assets/images/3.jpg' },
    { image: '/src/assets/images/4.jpg' },
    { image: '/src/assets/images/5.jpg' },
    { image: '/src/assets/images/6.jpg' },
    { image: '/src/assets/images/7.jpg' },
    { image: '/src/assets/images/8.jpg' },
    { image: '/src/assets/images/9.jpg' },
    { image: '/src/assets/images/10.jpg' },
  ];

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
            <source src="/src/assets/videos/3.mp4" type="video/mp4" />
          </video>
          <h2 className="video-text">Party Wear</h2>
        </div>
        <div
          className={`hero-image right ${activeVideo !== video2Ref.current ? 'inactive' : ''}`}
          onMouseEnter={() => handleVideoHover(video2Ref)}
        >
          <video ref={video2Ref} muted loop playsInline className="hero-video">
            <source src="/src/assets/videos/2.mp4" type="video/mp4" />
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
            <p className="about-description">Mast crafts stylish, high-quality clothing for women, blending timeless elegance with modern trends. Our premium fabrics and expert craftsmanship ensure every piece is durable and fashionable.</p>
            <p className="about-mission">We're passionate about empowering you to express your unique style with confidence.</p>
          </div>
          <div className="about-us-image">
            <img src="/src/assets/images/mast2.jpg" alt="Mast Garments Premium Collection" />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
