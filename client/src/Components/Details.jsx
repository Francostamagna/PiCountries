import React from 'react'
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useParams, Link} from 'react-router-dom';
import {getCountryById, emptyDisplay} from '../Actions/Actions'
import loadingPic from '../Images/loadingRotate.png'
import '../Styles/Details.css'




function Details() {
 
 let {id} = useParams();
 
 const dispatch = useDispatch();
 const countryId = useSelector(state => state.countryDetail)
 console.log(countryId)
 
 useEffect( () => {
  dispatch(getCountryById(id));},[dispatch])

 let handleBack = () => dispatch(emptyDisplay());
 
 return (
   <div className='generalDetails'>
    {  !countryId.name? 
    
    <div >
    <img className='displayLoading' src={loadingPic}/>
    <p className='loadingTextDetails'>Loading Details...</p>
   </div> :

    <div className='detailCardContainer'>
     <div id='blueNav'></div>
     <div className='detailUpperSection'> 
       <div className='imagedetailContainer'>
        <img src={countryId.flag} alt='Img not found'/>
        
       </div>
       <h1>{countryId.name}</h1>
     </div>
    
    
      <div className='detailMediumSection'>
     
       
      <div className='generalDetailCardData'> 
       
       <h1>Country Info</h1>
      
       <div className='detailCardData'>
       
        
        <div className='detailDataHeaders'>
         <h4> I.D. :</h4> 
         <h4>Capital :</h4>
         <h4>Continent :</h4>
         <h4>Subregion :</h4>
         <h4>Population :</h4>
         <h4>Area :</h4>
       
        </div>
        
        <div className='detailDataInfo'>
        <h4>{countryId.id}</h4>
        {countryId.capital.map((c) => <h4>  {c}</h4>)}
        <h4> {countryId.continent}</h4>
        <h4> {countryId.subregion}</h4>
        <h4>  {countryId.population}</h4>
        <h4>  {countryId.area} Km²</h4>
        </div>
      
        </div>
      </div>
      
       
       <div className='activitiesDetailCard'>
        <h1>Activities</h1>
        <div className='activitiesMapSection'>
        {countryId.activities.map((a) => 
        
        <div className='detailActivityGeneral'>
       
        <h3>{a.name}</h3>
       
       
       <div className='detailActivityContainer'>
        <div className='detailActivityHeader'> 
          <h4>Duration :</h4>
          <h4>Difficulty :</h4>
          <h4>Season :</h4>
        </div>
        <div className='detailActivityInfo'>
          <p> {a.duration +''+''} Days</p>
          <p> level  {''+''+ a.difficulty}</p>
          <p> {a.season} </p>
        </div>
        </div>
        </div>
        )}
        </div>
       </div>
      </div> 
        <div className='detailsBackButtonDiv'>
        <Link to={'/countries'}> <button className='detailsBackButton' onClick={() => handleBack()}> Back </button></Link>
        </div>
    </div>
     


    } 

  
  



    


   </div>

    )
}

export default Details