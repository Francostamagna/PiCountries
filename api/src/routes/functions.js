const axios = require('axios');
const {Country, Activity} = require("../db.js")


const getApi = async () => {

    let allCountries = []

    await axios('https://restcountries.com/v3/all')
    .then((data) => data.data)
    .then(data => data.map((c) =>{allCountries.push({
        
        name : c.name.common,
        id: c.cca3,
        capital : c.capital || ["Not available"],
        continent: c.region,
        subregion : c.subregion || "Not available",
        area : c.area,
        flag : c.flags[1] || "Not available",
        population : c.population

   
    
    })}))
    
    try {  
        allCountries.map((c) => {Country.findOrCreate({
        where: {
            name: c.name,
            id: c.id,
        },
        defaults: {
            continent: c.continent,
            flag: c.flag,
            capital: c.capital,
            subregion: c.subregion,
            area: c.area,
            population: c.population
 
 }})

})
        
    } catch (error) {
        console.log(error)
        
    }
   
}
    
    
const getDB = async () =>{
    
    
    try {
        
        return await Country.findAll({
        include: {
            model: Activity,
            attributes: ["id", "name", "duration","difficulty", "season"],
            through : {attributes : [],},
       
        }
    })
        
    } catch (error) {
        console.log(error)
    } 
}
const getActivities = async () =>{

    try {
        return await Activity.findAll({
       
    })
        
    } catch (error) {
        console.log(error)
        
    }
    
}

module.exports = {getDB, getApi, getActivities}