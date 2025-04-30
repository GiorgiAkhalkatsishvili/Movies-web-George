import React, { useRef } from 'react'
import './PopularMoviesComponent.css'
import cards_data from '../../assets/cards-data/cards';


const PopularMoviesComponent = () => {
  const cardsRef = useRef();

  return (
    <div className='popularMoviesComponent'>
      <div className="inner">
        <div className="main-heading">
          <h1>Popular on Netflix</h1>
        </div>
        <div className="cards-list" ref={cardsRef}>
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
  )
}

export default PopularMoviesComponent
