const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const mongoose = require("mongoose");

const Speding = require("./Schemas/SpedingSchema");

const picks = require("./Picks.js");
const bootstrap = require("./Bootstrap.js");
const live = require("./Live.js");
const history = require("./History.js");





exports.updateSchema = async function(gameweek){

	const oldteam = await picks.getNewTeam("Speding", gameweek);
	const newteam = await picks.getOldTeam("Speding", gameweek);


	const notinNew = oldteam.filter(x => !newteam.includes(x));
	const notinOld = newteam.filter(x => !oldteam.includes(x));

	const newPlayers = [];
	const oldPlayers = [];

	notinNew.forEach(function(code){
		const playerObject = bootstrap.getPlayer(code)
		let name = playerObject.first_name + playerObject.second_name
		oldPlayers.push(name)
	});

	notinOld.forEach(function(code){
		const playerObject = bootstrap.getPlayer(code)
		let name = playerObject.first_name +" "+ playerObject.second_name
		newPlayers.push(name)
	});

	const newSpeding = new Speding({
		gameweek: gameweek,
		gameweekPoints: picks.getGWPoints("Speding", gameweek),
		totalPoints: picks.getTotalPoints("Speding", gameweek),
		transfersIn: newPlayers,
		transfersOut: oldPlayers,
		pointsSpent: picks.getPointsSpent("Speding", gameweek),
		chipsUsed: picks.getChipUsed("Speding", gameweek),
		bank: picks.getBank("Speding", gameweek),
		overallRank: picks.getOverallRank("Speding", gameweek),
	});

	newSpeding.save()

};

exports.addToPicks = async function(pick, gameweek){

	try{
		let playerObject = await bootstrap.getPlayer(pick.element);
		let livescore = await live.getLiveScore(gameweek, pick.element);
		pick['first_name'] = playerObject.first_name;
    	pick['second_name'] = playerObject.second_name;
    	pick['picture_url'] = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${pick.element}.png`;
    	pick['live_points'] = livescore;
    	return pick
	} catch(e){
		console.log(e);
	}	

}
	
	