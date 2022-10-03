const express = require('express');
const activities = express.Router();
const axios = require('axios');
const {Country, Activity} = require("../db.js");
const { getActivities } = require('./functions.js');



activities.get("/", async (req,res) => {
    
    try {let allActivities = await getActivities()
        res.status(200).json(allActivities)
        
    } catch (error) {
        console.log(error)
        
    }

    
}


)





activities.post("/", async (req, res) => {

    const { name, difficulty, duration, season, country } = req.body;

    try { 
    
    if(name && difficulty && duration && season && country){   
    
    let newActivity = await Activity.create({name, difficulty, duration, season});
    
    let countryActivity = await Country.findAll({
        where : { name : country}
    })
    newActivity.addCountry(countryActivity);
    
    res.status(200).send("Activity created!")
        
    }
   else{
    return res.status(404).send('Missing field')
   }
} 
    
   
    catch (error) {
        console.log(error)
        res.status(400).send(error)
        
    }

})

module.exports = activities