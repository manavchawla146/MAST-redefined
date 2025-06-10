import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Category.css';
import img3 from '../assets/images/3.jpg';
import img4 from '../assets/images/4.jpg';

const Category = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'card-1', image: img3, name: 'Three Piece Suits' },
    { id: 'card-2', image: img4, name: 'Stitched Kurtis' },
    { id: 'card-3', image: img3, name: 'Unstitched Kurtis' },
    { id: 'card-4', image: img4, name: 'Readymade Dresses' }
  ];

  // Helper function to convert category name to URL-friendly ID
  const getCategoryId = (name) => {
    // Map category names to the exact keys used in Catalogue.jsx
    const categoryMap = {
      'Three Piece Suits': 'three-piece',
      'Stitched Kurtis': 'stitched-kurti',
      'Unstitched Kurtis': 'unstitched-kurti',
      'Readymade Dresses': 'designer-collection'
    };
    
    return categoryMap[name] || name.toLowerCase().replace(/\s+/g, '-');
  };

  // Handle card click to navigate to Catalogue page
  const handleCardClick = (name) => {
    const categoryId = getCategoryId(name);
    navigate(`/catalogue/${categoryId}`);
  };

  return (
    <section className="category-section">
      <h2 className="collection-title">Explore our collection</h2>
      <div className="card-container">
        {categories.map((category) => (
          <div
            className="card"
            key={category.id}
            onClick={() => handleCardClick(category.name)}
            style={{ cursor: 'pointer' }}
          >
            <img src={category.image} alt={category.name} className="card-image" />
            <div className="card-title">{category.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;