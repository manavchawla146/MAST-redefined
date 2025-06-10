import React, { useEffect, useState } from 'react';
import './Catalogue.css';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const Catalogue = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [categoryData, setCategoryData] = useState({
    title: 'Loading...',
    images: []
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Updated categories to match Category.jsx
  const categories = {
    'three-piece': {
      title: 'Three Piece Suits',
      images: [
        '/src/assets/images/1.jpg',
        '/src/assets/images/2.jpg',
        '/src/assets/images/3.jpg',
        '/src/assets/images/4.jpg',
        '/src/assets/images/5.jpg'
      ]
    },
    'stitched-kurti': {
      title: 'Stitched Kurtis',
      images: [
        '/src/assets/images/1.jpg',
        '/src/assets/images/2.jpg',
        '/src/assets/images/3.jpg',
        '/src/assets/images/4.jpg'
      ]
    },
    'unstitched-kurti': {
      title: 'Unstitched Kurtis',
      images: [
        '/src/assets/images/1.jpg',
        '/src/assets/images/2.jpg',
        '/src/assets/images/3.jpg',
        '/src/assets/images/4.jpg'
      ]
    },
    'designer-collection': {
      title: 'Designer Collection',
      images: [
        '/src/assets/images/1.jpg',
        '/src/assets/images/2.jpg',
        '/src/assets/images/3.jpg',
        '/src/assets/images/4.jpg'
      ]
    }
  };

  useEffect(() => {
    if (id && categories[id]) {
      setCategoryData(categories[id]);
      setIsLoading(false);
    } else {
      // Fallback to default collection
      setCategoryData({
        title: 'Featured Collection',  // This is where "Featured Collection" comes from
        images: categories['three-piece'].images
      });
      setIsLoading(false);
    }
  }, [id]);

  const handleBackToCategory = () => {
    navigate('/category');
  };

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <>
      <div className="catalogue-container">
        <header className="catalogue-header">
          <h1 className="category-title">{categoryData?.title}</h1>
        </header>
        <div className="catalogue-content">
          {isLoading ? (
            <div className="catalogue-loader">
              <div className="loader-spinner"></div>
            </div>
          ) : (
            <div className="masonry">
              {categoryData?.images.map((imageUrl, index) => (
                <motion.div 
                  className="grid" 
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                >
                  <img src={imageUrl} alt={`${categoryData.title} ${index + 1}`} />
                  <div className="grid__body">
                    <h1 className="grid__title">
                      {categoryData.title} {index + 1}
                    </h1>
                    <div className="relative">
                      <a className="grid__link" target="_blank" href="/" rel="noopener noreferrer"></a>
                      <h1 className="grid__title">{id ? `${id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} ${index + 1}` : `Collection ${index + 1}`}</h1>
                      <p className="grid__author">MAST Fashion</p>
                    </div>
                    <div className="mt-auto">
                      <span className="grid__tag">#fashion{index + 1}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Catalogue;