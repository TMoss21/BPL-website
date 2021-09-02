const express = require('express');
const router = express.Router();
const _ = require("lodash");

const bootstrap = require("../models/Bootstrap.js")

// Home Page

const gameweek = _.upperCase(bootstrap.getUpcomingGW())
const deadline = bootstrap.getDeadline();
console.log(deadline)
router.get('/', function(req,res){
	res.render('index', {gameweek:gameweek, deadline:deadline});
})

module.exports = router