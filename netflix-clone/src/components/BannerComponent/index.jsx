import React, { useState, useRef, useEffect } from 'react'
import './BannerComponent.css';
import logo from '../../assets/nficon2023.ico'
import ClipLoader from 'react-spinners/ClipLoader';

const BannerComponent = () => {
  const [descripition, setDescription] = useState(false);
  const [loading, setLoading] = useState(false);
  const descriptionRef = useRef(null);

  const toggleDescription = () => {
    setDescription(!descripition);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  const closeDescription = () => {
    setDescription(false);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (descripition && descriptionRef.current && !descriptionRef.current.contains(event.target)) {
        closeDescription();
      }
    };

    if (descripition) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [descripition]);

  return (
    <div className='bannerComponent'>
      <div className="banner-inner">
        <div className="banner-image">
            <img src={logo} alt="" />
            <h1>SERIES</h1>
        </div>
        <div className="banner-headings">
          <div className="banner-main-text">
            <h1>THE PROTECTOR</h1>
          </div>
          <div className="banner-main-paragraph">
            <p>When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and a strange little girl.</p>
          </div>
          <div className="banner-btns">
            <div className="btnOne">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
                </svg>
                Play
              </button>
            </div>
            <div className="btnOne btnTwo">
              <button onClick={toggleDescription}>More Info</button>
            </div>
          </div>
        </div>
      </div>
      <div className="movie-description-container">
      {descripition && (
        <div className={`banner-movie-info-tab fade-in`} ref={descriptionRef}>
          {loading ? (
            <div className="spinner-container">
              <ClipLoader color="#ffffff" size={40} />
            </div>
          ) : (
            <>
              <div className="description-header">
                    <h2>Movie description</h2>
                  <svg onClick={closeDescription} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" fill='#e5e5e5'/>
                </svg>
              </div>
              <p>When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and a strange little girl.</p>
            </>
          )}
        </div>
      )}
      </div>
    </div>
  );
}

export default BannerComponent;
