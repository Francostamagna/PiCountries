const initialState = {
  countriesAll : [],
  display: [],
  continentFilter:"All",
  activityFilter:"All",
  activities:[],
  countryDetail: {},
}





export default function rootReducers(state= initialState, action) {
  switch (action.type){

    case "GET_COUNTRIES" : return{
      ...state, countriesAll : action.payload, display : action.payload
    };
    case "GET_COUNTRY" : return {
      ...state, display: action.payload
    };
    case "GET_ID" : return {
      ...state, countryDetail: action.payload
    };
    case "EMPTY_DETAILS" : return {
      ...state, countryDetail: initialState.countryDetail
    };
    case "EMPTY_DISPLAY" : return {
      ...state, display: initialState.display
    };
    case "ORDER_NAME" : 
     
       
      let sortedName = action.payload === "asc"?
      state.display.sort(function(a,b){
        if(a.name > b.name){
          return 1
        }
        if (a.name < b.name) {
          return -1
        }
        return 0
      }) :
     state.display.sort(function (a, b) {
      if (a.name > b.name) {
        return -1
      }
      if (a.name < b.name) {
        return 1
      }
      return 0
     })
     return {
      ...state, display : sortedName
     }

     case "ORDER_POPULATION" :
      let sortedPopulation = action.payload === "asc"?
      state.display.sort(function(a,b){
        if(a.population > b.population){
          return 1
        }
        if (a.population < b.population) {
          return -1
        }
        return 0
      }) :
     state.display.sort(function (a, b) {
      if (a.population > b.population) {
        return -1
      }
      if (a.population < b.population) {
        return 1
      }
      return 0
     })
     return {
      ...state, display : sortedPopulation
     }

    


     case "FILTER_CONTINENT" :
     const allCountries = state.countriesAll;
     const activity = state.activityFilter;
      
      let filteredContinent = action.payload === "All"? allCountries : allCountries.filter((c) => c.continent === action.payload)
      
      if (activity ===  "All"){
      
      return {
        ...state, display : filteredContinent , continentFilter : action.payload
      }}

      else{
      const bothFiltersContinent =  filteredContinent.filter((c) =>{return  c.activities.find((a) => {return a.name === activity})  })
      

      if(bothFiltersContinent.length === 0){
        return{
          ...state, display: 0, continentFilter : action.payload
        }}

        else{ 
          return {
            ...state, display: bothFiltersContinent, continentFilter : action.payload
           }
        }
      
      }
      
      case "FILTER_ACTIVITIES" :
        
        const everyCountry = state.countriesAll;
        const continent = state.continentFilter;
         
         let filteredContinentActivity = continent === "All"? everyCountry : everyCountry.filter((c) => c.continent === continent)
                  
         if (action.payload ===  "All"){
         
         return {
           ...state, display : filteredContinentActivity , activityFilter : action.payload
         }}
         else{
          let filteredActivity = filteredContinentActivity.filter((c) =>{return  c.activities.find((a) => {return a.name === action.payload})  })
         
          if(filteredActivity.length === 0){
            return{
              ...state, display: 0, activityFilter : action.payload
            }}
    
            else{ 
              return {
                ...state, display: filteredActivity, activityFilter : action.payload
               }
            }
        
        }
   



         

      case "GET_ACTIVITIES" : return{
          ...state, activities : action.payload
        }; 
 

default : return {...state}
}
   
  
}

        