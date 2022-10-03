
import axios from 'axios'

export function getAllCountries() {
  return async function(dispatch) {
    let allCountries = await axios.get('http://localhost:3001/countries')
  
  return dispatch({
    type : "GET_COUNTRIES",
    payload : allCountries.data
  })
}};


export  function getCountryByName(name) {
  return async function (dispatch) {
    let countryName = await axios.get(`http://localhost:3001/countries?name=${name}`)

  return dispatch({
    type: "GET_COUNTRY",
    payload: countryName.data
  })

  }};

  export function getCountryById(id){
    return async function(dispatch){
      let countryId = await axios.get(`http://localhost:3001/countries/${id}`)
    
      return dispatch({
      type: "GET_ID",
      payload: countryId.data
    }) 
  
    }};

    export function postActivity (activity) {
      return async function (dispatch) {
        let newActivity = await axios.post('http://localhost:3001/activities', activity)
      return newActivity;
      
      }};

      export function emptyDetails (){
        return {
          type: "EMPTY_DETAILS"
        }
      }
    
      export function emptyDisplay (){
        return {
          type: "EMPTY_DISPLAY"
        }
      }
     export function orderByName (payload){
      return {
        type:"ORDER_NAME",
        payload
      }
    }

    export function orderByPopulation (payload){
      return {
        type:"ORDER_POPULATION",
        payload
      }
    }
   
     export function filterByContinent (payload){
      return {
        type:"FILTER_CONTINENT",
        payload
      }
    }
    export function filterByActivities (payload){
      return {
        type:"FILTER_ACTIVITIES",
        payload
      }
    }
    export function getAllActivities() {
      return async function(dispatch) {
        let allActivities = await axios.get('http://localhost:3001/activities')
      
      return dispatch({
        type : "GET_ACTIVITIES",
        payload : allActivities.data
      })
    }};