import React from 'react'
import './HomePage.css'
import BannerComponent from '../../components/BannerComponent';
import PopularMoviesComponent from '../../components/PopularMoviesComponent';

const HomePage = () => {
  return (
    <div className='homePage'>
      <BannerComponent />
      <PopularMoviesComponent/>
    </div>
  )
}

export default HomePage
