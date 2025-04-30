import React from 'react'
import './BannerComponent.css';
import netflixLogo from '../../assets/netflix-logo.png'

const BannerComponent = () => {
  return (
    <div className='bannerComponent'>
      <div className="banner-inner">
        <div className="banner-image">
            <img src={netflixLogo} alt="" />
            <h1>SERIES</h1>
          </div>
        <div className="banner-headings">
          <div className="banner-main-text">
            <h1>THE PROTECTOR</h1>
          </div>
          <div className="banner-main-paragraph">
            <p>When a young boy vanishes, a small town uncovers a mystry involving secret experiments, terrifying supernatural forces and a strange little girl.</p>
          </div>
          <div className="banner-btns">
            <div className="btnOne">
              <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>Play</button>
            </div>
            <div className="btnOne btnTwo">
              <button>More Info</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerComponent
