import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import './Gallery.css';

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

// Default images (fallback if no items provided)
const IMGS = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10
];

const Gallery = ({ items, autoplay = false, pauseOnHover = false }) => {
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(window.innerWidth <= 768);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent));

  // Use provided items or fallback to default images
  const galleryItems = items || IMGS.map(url => ({ image: url }));
  // Duplicate items if fewer than 8 for a fuller carousel
  const displayedItems = galleryItems.length < 8 ? [...galleryItems, ...galleryItems] : galleryItems;
  const faceCount = displayedItems.length;

  // Layout calculations
  const getLayoutParams = () => {
    if (window.innerWidth <= 480) {
      return { cylinderWidth: 900 * (faceCount / 8), maxFaceWidth: 180, dragFactor: 0.07 };
    } else if (window.innerWidth <= 768) {
      return { cylinderWidth: 1200 * (faceCount / 8), maxFaceWidth: 200, dragFactor: 0.06 };
    } else {
      return { cylinderWidth: 1800 * (faceCount / 8), maxFaceWidth: 400, dragFactor: 0.04 };
    }
  };

  const [layoutParams, setLayoutParams] = useState(getLayoutParams());
  const faceWidth = Math.min((layoutParams.cylinderWidth / faceCount) * 1.5, layoutParams.maxFaceWidth);
  const radiusMultiplier = isScreenSizeSm ? 1.2 : 1;
  const radius = (layoutParams.cylinderWidth / (2 * Math.PI)) * radiusMultiplier;

  // Animation setup
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  // Drag handlers
  const handleDragStart = () => {
    setIsDragging(true);
    controls.stop();
  };

  const handleDrag = (_, info) => {
    if (isDragging) rotation.set(rotation.get() + info.delta.x * layoutParams.dragFactor);
  };

  const handleDragEnd = (_, info) => {
    setIsDragging(false);
    const momentum = info.velocity.x * layoutParams.dragFactor * 0.5;
    const newRotation = rotation.get() + momentum;
    rotation.set(newRotation);
    if (autoplay && !isPaused && !enlargedImage) startAutoplay(newRotation);
  };

  // Autoplay system
  const startAutoplay = (startValue = rotation.get()) => {
    controls.start({
      rotateY: startValue - 360,
      transition: {
        rotateY: { repeat: Infinity, duration: 20, ease: 'linear' },
      },
    });
  };

  // Responsive setup
  useEffect(() => {
    const handleResize = () => {
      setIsScreenSizeSm(window.innerWidth <= 768);
      setIsMobile(window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent));
      setLayoutParams(getLayoutParams());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay management
  useEffect(() => {
    if (autoplay && !isDragging && !isPaused && !enlargedImage) startAutoplay();
    return () => controls.stop();
  }, [autoplay, isDragging, isPaused, enlargedImage, controls]);

  // Hover controls (desktop only)
  const handleMouseEnter = () => {
    if (isMobile) return; // Skip hover on mobile
    if (autoplay && pauseOnHover) {
      setIsPaused(true);
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return; // Skip hover on mobile
    if (autoplay && pauseOnHover && !isDragging && !enlargedImage) {
      setIsPaused(false);
      startAutoplay();
    }
  };

  // Touch controls for mobile
  const handleTouchStart = () => {
    if (!isMobile) return;
    if (autoplay) {
      setIsPaused(true);
      controls.stop();
    }
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    if (autoplay && !isDragging && !enlargedImage) {
      setIsPaused(false);
      startAutoplay();
    }
  };

  // Handle image click to enlarge
  const handleImageClick = (image) => {
    setEnlargedImage(image);
    setIsPaused(true);
    controls.stop();
  };

  // Close modal
  const handleCloseModal = () => {
    setEnlargedImage(null);
    if (autoplay && !isDragging) {
      setIsPaused(false);
      startAutoplay();
    }
  };

  return (
    <div className="gallery-container">
      <div className="gallery-gradient gallery-gradient-left"></div>
      <div className="gallery-gradient gallery-gradient-right"></div>
      <div className="gallery-content">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          className="gallery-track"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            rotateY: rotation,
            width: layoutParams.cylinderWidth,
            transformStyle: 'preserve-3d',
          }}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {displayedItems.map((item, i) => (
            <div
              key={i}
              className="gallery-item"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleImageClick(item.image)}
            >
              <img
                src={item.image}
                alt={item.name || `Gallery item ${i + 1}`}
                className="gallery-img"
                loading="lazy"
              />
              {item.name && (
                <div className="gallery-info">
                  <h3>{item.name}</h3>
                </div>
              )}
              {item.name && item.price && (
                <div className="gallery-info">
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
      {enlargedImage && (
        <div className="image-modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseModal}>
              ×
            </span>
            <img src={enlargedImage} alt="Enlarged gallery item" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;