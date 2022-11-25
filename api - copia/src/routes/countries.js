const express = require('express');
const countries = express.Router();
const axios = require('axios');
const {Country, Activity} = require("../db.js")
const {getApi, getDB} = require("./functions")


countries.get("/:id", async (req, res) => {
    let {id} = req.params;
    
    try {
      await getApi();
    let allCountries = await getDB();
   
    if (id) {
        let idCountry = await allCountries.filter(c => c.id.toLowerCase() === id.toLowerCase());
        idCountry.length?
        res.status(200).json(idCountry[0]):
        res.status(404).send("Country not found")
   
   
   
   }
    } catch (error) {
      console.log(error)
    }
    })


countries.get("/", async (req, res) => {
 let {name} = req.query;
 

 await getApi();
 
 try {
   let allCountries = await getDB();
   let countriesSend = [];
    allCountries.map((c) => {
   countriesSend.push({
     name : c.name,
     flag : c.flag,
     continent : c.continent,
     population: c.population,
     activities: c.activities,
     id : c.id,
  
   
   })
   })
  
   if (name) {
      let nameCountry = await allCountries.filter(c => c.name.toLowerCase() === name.toLowerCase());
      nameCountry.length?
      res.status(200).json(nameCountry):
      res.status(404).send("Country not found")
   }
   else{
      res.status(200).json(countriesSend)
   }
   
 } catch (error) {
   console.log(error)   
 }
 

})








module.exports = countries