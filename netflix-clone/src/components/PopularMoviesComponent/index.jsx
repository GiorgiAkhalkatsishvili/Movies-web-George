import React, { useEffect, useRef } from 'react'
import './PopularMoviesComponent.css'
import cards_data from '../../assets/cards-data/cards';


const PopularMoviesComponent = () => {

  return (
    <div className='popularMoviesComponent'>
      <div className="inner">
        <div className="main-heading">
          <h1>Popular on Netflix</h1>
        </div>
        <div className="cards-list">
          {cards_data.map((item, index) => (
          <div key={index} className="cards">
            <div className="cards-info">
              <img src={item.image} alt="" />
            <p>{item.name}</p>
            </div>
        </div>
      ))}
        </div>
        <div className="second-cards">
          <div className="bottom-heading">
          <h1>New On Netflix</h1>
        </div>
        <div className="cards-list">
          {cards_data.map((item, index) => (
          <div key={index} className="cards">
            <div className="cards-info">
              <img src={item.image} alt="" />
            <p>{item.name}</p>
            </div>
        </div>
      ))}
        </div>
        </div>
        <div className="second-cards">
          <div className="bottom-heading">
          <h1>Hollywood Movies</h1>
        </div>
        <div className="cards-list">
          {cards_data.map((item, index) => (
          <div key={index} className="cards">
            <div className="cards-info">
              <img src={item.image} alt="" />
            <p>{item.name}</p>
            </div>
        </div>
      ))}
        </div>
        </div>
        <div className="second-cards">
          <div className="bottom-heading">
          <h1>Horror Movies</h1>
        </div>
        <div className="cards-list">
          {cards_data.map((item, index) => (
          <div key={index} className="cards">
            <div className="cards-info">
              <img src={item.image} alt="" />
            <p>{item.name}</p>
            </div>
        </div>
      ))}
        </div>
        </div>
        <div className="second-cards">
          <div className="bottom-heading">
          <h1>Action Movies</h1>
        </div>
        <div className="cards-list">
          {cards_data.map((item, index) => (
          <div key={index} className="cards">
            <div className="cards-info">
              <img src={item.image} alt="" />
            <p>{item.name}</p>
            </div>
        </div>
      ))}
        </div>
        </div>
        <div className="second-cards">
          <div className="bottom-heading">
          <h1>Get In on the Action</h1>
        </div>
        <div className="cards-list">
          {cards_data.map((item, index) => (
          <div key={index} className="cards">
            <div className="cards-info">
              <img src={item.image} alt="" />
            <p>{item.name}</p>
            </div>
        </div>
      ))}
        </div>
        </div>
      </div>
    </div>
  )
}

export default PopularMoviesComponent
