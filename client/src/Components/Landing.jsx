import React from 'react';
import wall from '../Images/world.jpg'
import '../Styles/Landing.css'

function Landing() {
  return (
    <div className='landingDiv'>
      <div className='landingFilter'>
        </div>
      <img className='landingImage' src={wall} alt='Image not found'/>
      <a className='landingaButton' href={'/countries'}><button className='landingButton'>GET STARTED</button></a>
     
    <p className='landingp'>Countries!</p>
    </div>
  )
}

export default Landing