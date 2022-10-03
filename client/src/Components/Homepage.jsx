import React from 'react';
import {useDispatch, useSelector,} from 'react-redux';
import { useEffect, useState } from 'react';
import Card from './Card.jsx'
import {getAllCountries, getCountryByName} from '../Actions/Actions.js'
import Paginated from './Paginated.jsx';
import Searchbar from './Searchbar.jsx';
import '../Styles/Homepage.css'
import loading from '../Images/loadingRotate.png' 

function Homepage() {

  const dispatch = useDispatch();
  const display = useSelector(state => state.display)
  const countriesAll = useSelector(state => state.countriesAll)
  const [order, setOrder] = useState ('');
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setcountriesPerPage] = useState(10);
  const indexOfLastCountry = currentPage == 25? currentPage * countriesPerPage : currentPage * countriesPerPage -1;
  const indexOfFirstCountry = currentPage == 1? 0 : indexOfLastCountry - countriesPerPage;
  const currentCountries = display === 0? 0 :display.slice(indexOfFirstCountry, indexOfLastCountry);
  

  const paginated = (pageNumber) => {
    
   setCurrentPage(pageNumber)
  }
  
    
  
  React.useEffect( () => {dispatch(getAllCountries());},[dispatch])
  
  const activities = [];

 

  return (
    
    
    
    <div className='generalContainer'>

  {
    
  
  
    currentCountries.length === 0?
      <div className=''>
        <img className='displayLoading' src={loading}/>
        <p className='loadingText'>Loading Countries...</p>
       </div> :
      
      
      <div className='displayContainer'>
      <Searchbar placeholder='Search a Country'
       data={countriesAll} setCurrentPage={setCurrentPage} setOrder={setOrder} />

      <div className='cardsContainer'>
         { currentCountries === 0? <div className='noMatches'> NO MATCHES </div> : currentCountries && currentCountries.map((c) => { return (
         
         <Card  key={c.id} id={c.id} flag ={c.flag} name={c.name} continent={c.continent}/>  )  } )}
             
      </div>  

      <div className='paginatedContainer'>
        <Paginated 
        countriesPerPage={countriesPerPage}
        display={display.length - 9}
        paginated ={paginated}></Paginated>
        


      </div>
</div>}
</div>
  )
}

export default Homepage