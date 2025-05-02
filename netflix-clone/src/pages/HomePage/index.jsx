import React from 'react'
import './HomePage.css'
import BannerComponent from '../../components/BannerComponent';
import PopularMoviesComponent from '../../components/PopularMoviesComponent';
import CardsComponent from '../../components/CardsComponent';

const HomePage = () => {
  return (
    <div className='homePage'>
      <BannerComponent />
      <PopularMoviesComponent />

    </div>
  )
}

export default HomePage
