const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const mongoose = require("mongoose")

// const Stat = require("./Schemas/StatsSchema")
const Moss = require("./Schemas/MossSchema");
const Marway = require("./Schemas/MarwaySchema");
const Jaspal = require("./Schemas/JaspalSchema");
const Kent = require("./Schemas/KentSchema");
const Docker = require("./Schemas/DockerSchema");
const Jalif = require("./Schemas/JalifSchema");
const Alka = require("./Schemas/AlkaSchema");
const Duke = require("./Schemas/DukeSchema");
const Rogers = require("./Schemas/RogersSchema");
const Quinn = require("./Schemas/QuinnSchema");
const Spav = require("./Schemas/SpavSchema");
const Aggarwal = require("./Schemas/AggarwalSchema");
const Pow = require("./Schemas/PowSchema");
const Speding = require("./Schemas/SpedingSchema");

const Theo = require("./Theo.js");
const Sajan = require("./Sajan.js");
const Ravi = require("./Ravi.js");
const Omar = require("./Omar.js");
const Ravz = require("./Ravz.js");
const Ali = require("./Ali.js");
const Nathan = require("./Nathan.js");
const George = require("./George.js");
const Alex = require("./Alex.js");
const Matt = require("./Matt.js");
const Luke = require("./Luke.js");
const Kieran = require("./Kieran.js");
const Louis = require("./Louis.js");
const Ethan = require("./Ethan.js");

const bootstrap = require("./Bootstrap.js");
const picks = require("./Picks.js");


exports.updateDatabase = function(){

	const req = new XMLHttpRequest();

	req.open('GET', 'https://fantasy.premierleague.com/api/bootstrap-static/', false);
	req.send(null);
	const data = req.responseText;
	const parsedData = JSON.parse(data);

	const previousArray = [];

	parsedData.events.forEach(function(event){

		previousArray.push(event.is_previous);
	});
	
	// Giving an array is [false, false, false, true, false ..etc] showing which gw was previous


	const managers = ["Moss", "Marway", "Jaspal", "Kent", "Jalif", "Docker", "Alka", "Duke", "Rogers", "Spav", "Quinn", "Aggarwal", "Pow", "Speding"];
	const managersIDs = [];


	// Get the index of the is-previous gw (this will be gw-1)
	const index = previousArray.indexOf(true);
	const gameweek = index + 1;
	// If found
	if (index !== -1){
		// Gives the complete list of stats one column with GW then the other of embedded schema of each manager
		Moss.find({}, function(err, foundStats){
			if(!err){
				// If the index = length of foundStats (this will be gw) then there is 1 more gw to be added
				if (foundStats.length === index){
					Theo.updateSchema(index);
					Sajan.updateSchema(index);
					Ravi.updateSchema(index);
					Omar.updateSchema(index);
					Ravz.updateSchema(index);
					Ali.updateSchema(index);
					Nathan.updateSchema(index);
					George.updateSchema(index);
					Alex.updateSchema(index);
					Matt.updateSchema(index);
					Luke.updateSchema(index);
					Kieran.updateSchema(index);
					Louis.updateSchema(index);
					Ethan.updateSchema(index);
				}	
			} else{
				console.log(err)
			}
		})
	}

};
