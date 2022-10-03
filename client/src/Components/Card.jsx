import React from 'react';
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {emptyDetails} from '../Actions/Actions'
import '../Styles/Card.css'


function Card({id, flag, name, continent}) {

const dispatch = useDispatch();

  return (
    <div className='cardBox'>
         
         <div className='image'><img className='img' src={flag}  alt= 'image not found'/></div>

        
         <h1 className='cardName'> {name}</h1>
         <h1 className='continentName'> {continent} </h1>
         
         <Link to={`/countries/details/${id}`}>
          <button className='cardButton' onClick={() => dispatch(emptyDetails())}>Details</button></Link>
         
    </div>
  )
}

export default Card