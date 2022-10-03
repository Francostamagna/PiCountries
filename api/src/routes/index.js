const express = require('express');
const router = express.Router();
const countries = require("./countries.js");
const activities = require("./activities.js")


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


router.use(express.json());

router.use("/countries",countries)
router.use("/activities",activities)


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
