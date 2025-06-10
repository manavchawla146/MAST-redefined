import React, { useEffect, useState } from 'react';
import './Loader.css';

const Loader = ({ onFinished }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Wait for animation to complete + pause time
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Wait for fade out animation to complete
      setTimeout(() => {
        if (onFinished) onFinished();
      }, 500); // Match CSS transition duration
    }, 2800); // 2s animation + 800ms pause

    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className={`loader ${fadeOut ? 'fade-out' : ''}`}>
      <span className="loader-text">Mast</span>
    </div>
  );
};

export default Loader;
