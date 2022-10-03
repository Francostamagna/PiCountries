import React, {useEffect, useState} from 'react'
import {BsSearch, BsXLg} from 'react-icons/bs'
import '../Styles/Searchbar.css'
import {useDispatch, useSelector} from 'react-redux'
import {getCountryByName, orderByName, orderByPopulation, filterByActivities, filterByContinent, getAllActivities, getAllCountries} from '../Actions/Actions'


function Searchbar({placeholder, data, setCurrentPage, setOrder}) {
 
  let dispatch = useDispatch();
 


 const [filteredData, setFilteredData] = useState([]);
 const [wordEntered, setWordEntered] = useState("");
 const [filteredActions, setFilteredActions] =  useState({continents : "All", activity : "All"})

 
 
 React.useEffect( () => {dispatch(getAllActivities());},[dispatch]);

 const activities = useSelector(state => state.activities);
 const display =  useSelector(state => state.display);


 

 let handleFilter = (e) => {
 const searchWord = e.target.value;
 setWordEntered(searchWord);
 const  newValue = data.filter((country) => {
  return country.name.toLowerCase().includes(searchWord.toLowerCase())
 })
 if (searchWord === ''){
  setFilteredData([])
 } else{
setFilteredData(newValue);

}}

let handleSearch = (name) => {
dispatch(getCountryByName(name));

}

let handleClose = () => {
  setFilteredData([]);
 setWordEntered('')
}

let handleSortName = (e) => {
  e.preventDefault();
  dispatch(orderByName(e.target.value))
  setCurrentPage(1);
  setOrder(`ordered by ${e.target.value}`)
}
let handleSortPopulation = (e) => {
  e.preventDefault();
  dispatch(orderByPopulation(e.target.value))
  setCurrentPage(1);
  setOrder(`ordered by ${e.target.value}`)}

 
  
  const continent = ["All","Africa", "Americas", "Asia", "Europe", "Oceania"]
  let  disable = display === 0? true: false;
  

  

  let handleFilterContinent =   (e) => {
    
    dispatch(filterByContinent(e.target.value))}
  
       
  

  let handleReload = () => {
    dispatch(getAllCountries())
  }

 

  let handleFilterActivities = (e) => {
   
   
    
    dispatch(filterByActivities(e.target.value))}


  return (
   <div className='navBar'>

     <div className='selects'>

      <div className='selectsSort'>
      <div className='selectsSortText'>
      <div className='orderSort'><p>Order By</p></div>
      <div className='orderSortTypes'><p>Alphabet</p>
      <p>Population</p></div>
      </div>
      
      <select  id='Sortname' disabled={disable} onChange={e => handleSortName(e)}>
        <option value="None"> None </option>
        <option value='asc'> A-Z </option>
        <option value='desc'> Z-A </option>
      </select>
      <select id='Sortpopulation' disabled={disable} onChange={e => handleSortPopulation(e)}>
        <option value="None"> None </option>
        <option value='asc'> Min-Max </option>
        <option value='desc'> Max-Min </option>
      </select>
      </div>
      
      <a className='reloadButton'>
        <button onClick={() => handleReload()} className='reloadButtonStyle'>RELOAD COUNTRIES</button></a>
     
        <a className='activityButton' href={'/countries/activities'}><button className='activityButtonStyle'>CREATE ACTIVITY</button></a>

      <div className='search'>
    
     <div className='searchInputs'>
        <input type='text' placeholder={placeholder} value={wordEntered} onChange={handleFilter}/>
        <div className='searchIcon'>{filteredData.length === 0?<BsSearch/>:<BsXLg id='clearButton' onClick={handleClose}/>}</div>
     </div>
    
     { filteredData.length !=0 && (
     <div className='searchResult'>
        {filteredData.slice(0,5).map((c) => <a className='dataItem' key={c.name} onClick={() => handleSearch(c.name)} ><p >{c.name}</p></a> )}
     </div>)}
    
    </div>
      <div className='selectsFilter'>
      <div className='selectsSortText'>
      <div className='orderSort'><p>Filter By</p></div>
      <div className='orderSortTypes'><p>Continent</p>
      <p>Activities</p></div>
      </div>
      
      <select  name='continents' onChange ={e => handleFilterContinent(e)}>
      
       {continent.map((c) => 
        <option key={c} value={c}> {c} </option>)}
      </select>

      <select  name='activity' onChange={e => handleFilterActivities(e)}>
      <option value="All"> All </option>
       {activities.map((c) => 
        <option key={c.name} value={c.name}> {c.name} </option>)}
      </select>
      </div>
     </div>
       
   
    
  </div>
  )
}

export default Searchbar