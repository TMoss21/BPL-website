const express = require('express');
const router = express.Router();
const _ = require("lodash");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const bootstrap = require("../models/Bootstrap.js")

const history = require("../models/History.js")
const live = require("../models/Live.js")
const picks = require("../models/Picks.js")

const theo = require("../models/Theo.js");
const sajan = require("../models/Sajan.js");
const ravi = require("../models/Ravi.js");
const omar = require("../models/Omar.js");
const ravz = require("../models/Ravz.js");
const nathan = require("../models/Nathan.js");
const ali = require("../models/Ali.js");
const george = require("../models/George.js");
const alex = require("../models/Alex.js");
const matt = require("../models/Matt.js");
const luke = require("../models/Luke.js");
const kieran = require("../models/Kieran.js");
const louis = require("../models/Louis.js");
const ethan = require("../models/Ethan.js")


function APIsearch(activeGW){

	// Picks
	const managerIDs = {"Moss": 11436 , "Marway":8098  , "Jaspal": 12345  , "Kent":107019  , "Jalif":727712  , "Docker":3269  , "Alka":50055  , "Duke":33544  , "Rogers":176051  , "Spav": 1292035 , "Quinn":1245567  , "Aggarwal":759064  , "Pow":1245965  , "Speding":15185 }
	const managers = ["Moss","Marway","Jaspal","Kent","Jalif","Docker","Alka","Duke","Rogers","Spav","Quinn","Aggarwal","Pow","Speding"];

	managerIDs.forEach((manager)=>{

		const ID = managerIDs[manager];

		try{
			const req = new XMLHttpRequest();
			req.open('GET', `https://fantasy.premierleague.com/api/entry/${ID}/event/${activeGW}/picks/`, false);
			req.send(null);
			const data = req.responseText;
			const parsedData = JSON.parse(data);

			const managerPicks = {"Moss": [] , "Marway":[]  , "Jaspal": []  , "Kent":[]  , "Jalif":[]  , "Docker":[]  , "Alka":[]  , "Duke":[]  , "Rogers":[]  , "Spav": [] , "Quinn":[]  , "Aggarwal":[]  , "Pow":[]  , "Speding":[] };

			managerPicks.manager = parsedData.picks;

		} catch(err){
			console.log(err);
		};

	});
	
	return managerPicks
};




// Theo Moss
async function moss(activeGW){

	let mossTable = {"name": "Moss", "new_position": 1, "old_position":1, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};

	const mossPicks = await picks.getPicks("Moss", activeGW);

	let mossCaptainID = 0;
	mossPicks.forEach(async (pick)=>{
		if (pick.is_captain){
			mossCaptainID = pick.element;
		};
	});
	let mossFinalPicks = [];
	mossPicks.forEach(async (pick)=>{
		let livescore = await live.getLiveScore(activeGW, pick.element);
		let playerObject = await bootstrap.getPlayer(pick.element);
		pick['first_name'] = playerObject.first_name;
  			pick['second_name'] = playerObject.second_name;
 				pick['picture_url'] = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${pick.element}.png`;
 				pick['live_points'] = livescore;
 				mossFinalPicks.push(pick)
	})
	let mossGWTotal = 0;
	mossFinalPicks.forEach((item)=>{
		mossGWTotal += (item.live_points * item.multiplier);
	});
	mossTable.base_total = await history.getSumOfPrevious("Moss", activeGW);
	mossTable.gw_points = mossGWTotal;
	mossTable.total_points = mossTable.base_total + mossTable.gw_points;
	mossTable.players = `${await live.getPlayersPlayed(activeGW, mossPicks)}/${await picks.getPlayersPlaying(activeGW, "Moss")}`;

	mossTable.captain = await bootstrap.getPlayerName(mossCaptainID);
	mossTable.points_spent = await picks.getPointsSpent("Moss", activeGW);
	mossTable.chips = await picks.getChipUsed("Moss", activeGW);

	return [mossTable, mossPicks]
}


// Ravi Jaspal
async function jaspal(activeGW){
	let jaspalTable = {"name": "Jaspal", "new_position": 1, "old_position":3, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
	const jaspalPicks = await picks.getPicks("Jaspal", activeGW);
	let jaspalFinalPicks = [];
	jaspalPicks.forEach(async (pick)=>{
		let livescore = await live.getLiveScore(activeGW, pick.element)
		let playerObject = await bootstrap.getPlayer(pick.element);
		pick['first_name'] = playerObject.first_name;
  			pick['second_name'] = playerObject.second_name;
 				pick['picture_url'] = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${pick.element}.png`;
 				pick['live_points'] = livescore;
 				jaspalFinalPicks.push(pick)
	})
	let jaspalGWTotal = 0;
	jaspalFinalPicks.forEach((item)=>{
		jaspalGWTotal += (item.live_points * item.multiplier);
	});
	jaspalTable.base_total = await history.getSumOfPrevious("Jaspal", activeGW);
	jaspalTable.gw_points = jaspalGWTotal;
	jaspalTable.total_points = jaspalTable.base_total + jaspalTable.gw_points;
	jaspalTable.players = `${await live.getPlayersPlayed(activeGW, jaspalPicks)}/${await picks.getPlayersPlaying(activeGW, "Jaspal")}`;

	let jaspalCaptainID = await picks.getCaptain("Jaspal", activeGW);
	jaspalTable.captain = await bootstrap.getPlayerName(jaspalCaptainID);
	jaspalTable.points_spent = await picks.getPointsSpent("Jaspal", activeGW);
	jaspalTable.chips = await picks.getChipUsed("Jaspal", activeGW);

	return [jaspalTable, jaspalPicks]
}


// Sajan Marway
async function marway(activeGW){
	let marwayTable = {"name": "Marway", "new_position": 1, "old_position":2, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
	const marwayPicks = await picks.getPicks("Marway", activeGW);
	let marwayFinalPicks = [];
	marwayPicks.forEach(async (pick)=>{
		let livescore = await live.getLiveScore(activeGW, pick.element)
		let playerObject = await bootstrap.getPlayer(pick.element);
		pick['first_name'] = playerObject.first_name;
  			pick['second_name'] = playerObject.second_name;
 				pick['picture_url'] = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${pick.element}.png`;
 				pick['live_points'] = livescore;
 				marwayFinalPicks.push(pick)
	})
	let marwayGWTotal = 0;
	marwayFinalPicks.forEach((item)=>{
		marwayGWTotal += (item.live_points * item.multiplier);
	});
	marwayTable.base_total = await history.getSumOfPrevious("Marway", activeGW);
	marwayTable.gw_points = marwayGWTotal;
	marwayTable.total_points = marwayTable.base_total + marwayTable.gw_points;
	marwayTable.players = `${await live.getPlayersPlayed(activeGW, marwayPicks)}/${await picks.getPlayersPlaying(activeGW, "Marway")}`;
	
	let marwayCaptainID = await picks.getCaptain("Marway", activeGW);
	marwayTable.captain = await bootstrap.getPlayerName(marwayCaptainID);
	marwayTable.points_spent = await picks.getPointsSpent("Marway", activeGW);
	marwayTable.chips = await picks.getChipUsed("Marway", activeGW);

	return [marwayTable, marwayPicks]
}


// Omar Kent
async function kent(activeGW){
	let kentTable = {"name": "Kent", "new_position": 1, "old_position":4, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
	const kentPicks = await picks.getPicks("Kent", activeGW);
	let kentFinalPicks = [];
	kentPicks.forEach(async (pick)=>{
		let livescore = await live.getLiveScore(activeGW, pick.element)
		let playerObject = await bootstrap.getPlayer(pick.element);
		pick['first_name'] = playerObject.first_name;
  			pick['second_name'] = playerObject.second_name;
 			pick['picture_url'] = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${pick.element}.png`;
 			pick['live_points'] = livescore;
 			kentFinalPicks.push(pick)
	})
	let kentGWTotal = 0;
	kentFinalPicks.forEach((item)=>{
		kentGWTotal += (item.live_points * item.multiplier);
	});
	kentTable.base_total = await history.getSumOfPrevious("Kent", activeGW);
	kentTable.gw_points = kentGWTotal;
	kentTable.total_points = kentTable.base_total + kentTable.gw_points;
	kentTable.players = `${await live.getPlayersPlayed(activeGW, kentPicks)}/${await picks.getPlayersPlaying(activeGW, "Kent")}`;

	let kentCaptainID = await picks.getCaptain("Kent", activeGW);
	kentTable.captain = await bootstrap.getPlayerName(kentCaptainID);
	kentTable.points_spent = await picks.getPointsSpent("Kent", activeGW);
	kentTable.chips = await picks.getChipUsed("Kent", activeGW);

	return [kentTable, kentPicks]
}


// Ravi Jalif
async function jalif(activeGW){
	let jalifTable = {"name": "Jalif", "new_position": 1, "old_position":5, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
	const jalifPicks = await picks.getPicks("Jalif", activeGW);
	let jalifFinalPicks = [];
	jalifPicks.forEach(async (pick)=>{
		let livescore = await live.getLiveScore(activeGW, pick.element)
		let playerObject = await bootstrap.getPlayer(pick.element);
		pick['first_name'] = playerObject.first_name;
   		pick['second_name'] = playerObject.second_name;
  			pick['picture_url'] = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${pick.element}.png`;
  			pick['live_points'] = livescore;
  			jalifFinalPicks.push(pick)
	})
	let jalifGWTotal = 0;
	jalifFinalPicks.forEach((item)=>{
		jalifGWTotal += (item.live_points * item.multiplier);
	});
	jalifTable.base_total = await history.getSumOfPrevious("Jalif", activeGW);
	jalifTable.gw_points = jalifGWTotal;
	jalifTable.total_points = jalifTable.base_total + jalifTable.gw_points;
	jalifTable.players = `${await live.getPlayersPlayed(activeGW, jalifPicks)}/${await picks.getPlayersPlaying(activeGW, "Jalif")}`;
	
	let jalifCaptainID = await picks.getCaptain("Jalif", activeGW);
	jalifTable.captain = await bootstrap.getPlayerName(jalifCaptainID);
	jalifTable.points_spent = await picks.getPointsSpent("Jalif", activeGW);
	jalifTable.chips = await picks.getChipUsed("Jalif", activeGW);

	return [jalifTable, jalifPicks]
}


// Ali Alka
async function alka(activeGW){
	let alkaTable = {"name": "Alka", "new_position": 1, "old_position":6, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
	const alkaPicks = await picks.getPicks("Alka", activeGW);
	let alkaFinalPicks = [];
	alkaPicks.forEach(async (pick)=>{
		let livescore = await live.getLiveScore(activeGW, pick.element)
		let playerObject = await bootstrap.getPlayer(pick.element);
		pick['first_name'] = playerObject.first_name;
   		pick['second_name'] = playerObject.second_name;
  			pick['picture_url'] = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${pick.element}.png`;
  			pick['live_points'] = livescore;
  			alkaFinalPicks.push(pick)
	})
	let alkaGWTotal = 0;
	alkaFinalPicks.forEach((item)=>{
		alkaGWTotal += (item.live_points * item.multiplier);
	});
	alkaTable.base_total = await history.getSumOfPrevious("Alka", activeGW);
	alkaTable.gw_points = alkaGWTotal;
	alkaTable.total_points = alkaTable.base_total + alkaTable.gw_points;
	alkaTable.players = `${await live.getPlayersPlayed(activeGW, alkaPicks)}/${await picks.getPlayersPlaying(activeGW, "Alka")}`;
		
	let alkaCaptainID = await picks.getCaptain("Alka", activeGW);
	alkaTable.captain = await bootstrap.getPlayerName(alkaCaptainID);
	alkaTable.points_spent = await picks.getPointsSpent("Alka", activeGW);
	alkaTable.chips = await picks.getChipUsed("Alka", activeGW);

	return [alkaTable, alkaPicks]
}


// Nathan Docker
async function docker(activeGW){
	let dockerTable = {"name": "Docker", "new_position": 1, "old_position":7, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
	const dockerPicks = await picks.getPicks("Docker", activeGW);
	let dockerFinalPicks = [];
	dockerPicks.forEach(async (pick)=>{
		let livescore = await live.getLiveScore(activeGW, pick.element)
		let playerObject = await bootstrap.getPlayer(pick.element);
		pick['first_name'] = playerObject.first_name;
   		pick['second_name'] = playerObject.second_name;
  			pick['picture_url'] = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${pick.element}.png`;
  			pick['live_points'] = livescore;
  			dockerFinalPicks.push(pick)
	})
	let dockerGWTotal = 0;
	dockerFinalPicks.forEach((item)=>{
		dockerGWTotal += (item.live_points * item.multiplier);
	});
	dockerTable.base_total = await history.getSumOfPrevious("Docker", activeGW);
	dockerTable.gw_points = dockerGWTotal;
	dockerTable.total_points = dockerTable.base_total + dockerTable.gw_points;
	dockerTable.players = `${await live.getPlayersPlayed(activeGW, dockerPicks)}/${await picks.getPlayersPlaying(activeGW, "Docker")}`;
	
	let dockerCaptainID = await picks.getCaptain("Docker", activeGW);
	dockerTable.captain = await bootstrap.getPlayerName(dockerCaptainID);
	dockerTable.points_spent = await picks.getPointsSpent("Docker", activeGW);
	dockerTable.chips = await picks.getChipUsed("Docker", activeGW);

	return [dockerTable, dockerPicks]
}


// Alex Rogers
async function rogers(activeGW){
	let rogersTable = {"name": "Rogers", "new_position": 1, "old_position":8, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
	const rogersPicks = await picks.getPicks("Rogers", activeGW);
	let rogersFinalPicks = [];
	rogersPicks.forEach(async (pick)=>{
		let livescore = await live.getLiveScore(activeGW, pick.element)
		let playerObject = await bootstrap.getPlayer(pick.element);
		pick['first_name'] = playerObject.first_name;
   		pick['second_name'] = playerObject.second_name;
  			pick['picture_url'] = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${pick.element}.png`;
  			pick['live_points'] = livescore;
  			rogersFinalPicks.push(pick)
	})
	let rogersGWTotal = 0;
	rogersFinalPicks.forEach((item)=>{
		rogersGWTotal += (item.live_points * item.multiplier);
	});
	rogersTable.base_total = await history.getSumOfPrevious("Rogers", activeGW);
	rogersTable.gw_points = rogersGWTotal;
	rogersTable.total_points = rogersTable.base_total + rogersTable.gw_points;
	rogersTable.players = `${await live.getPlayersPlayed(activeGW, rogersPicks)}/${await picks.getPlayersPlaying(activeGW, "Rogers")}`;
	
	let rogersCaptainID = await picks.getCaptain("Rogers", activeGW);
	rogersTable.captain = await bootstrap.getPlayerName(rogersCaptainID);
	rogersTable.points_spent = await picks.getPointsSpent("Rogers", activeGW);
	rogersTable.chips = await picks.getChipUsed("Rogers", activeGW);

	return [rogersTable, rogersPicks]
}


// George Duke
async function duke(activeGW){
	let dukeTable = {"name": "Duke", "new_position": 1, "old_position":9, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
	const dukePicks = await picks.getPicks("Duke", activeGW);
	let dukeFinalPicks = [];
	dukePicks.forEach(async (pick)=>{
		let livescore = await live.getLiveScore(activeGW, pick.element)
		let playerObject = await bootstrap.getPlayer(pick.element);
		pick['first_name'] = playerObject.first_name;
   		pick['second_name'] = playerObject.second_name;
  			pick['picture_url'] = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${pick.element}.png`;
  			pick['live_points'] = livescore;
  			dukeFinalPicks.push(pick)
	})
	let dukeGWTotal = 0;
	dukeFinalPicks.forEach((item)=>{
		dukeGWTotal += (item.live_points * item.multiplier);
	});
	dukeTable.base_total = await history.getSumOfPrevious("Duke", activeGW);
	dukeTable.gw_points = dukeGWTotal;
	dukeTable.total_points = dukeTable.base_total + dukeTable.gw_points;
	dukeTable.players = `${await live.getPlayersPlayed(activeGW, dukePicks)}/${await picks.getPlayersPlaying(activeGW, "Duke")}`;
	
	let dukeCaptainID = await picks.getCaptain("Duke", activeGW);
	dukeTable.captain = await bootstrap.getPlayerName(dukeCaptainID);
	dukeTable.points_spent = await picks.getPointsSpent("Duke", activeGW);
	dukeTable.chips = await picks.getChipUsed("Duke", activeGW);

	return [dukeTable, dukePicks]
}


// Matt Spav
async function spav(activeGW){
	let spavTable = {"name": "Spav", "new_position": 1, "old_position":10, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
	const spavPicks = await picks.getPicks("Spav", activeGW);
	let spavFinalPicks = [];
	spavPicks.forEach(async (pick)=>{
		let livescore = await live.getLiveScore(activeGW, pick.element)
		let playerObject = await bootstrap.getPlayer(pick.element);
		pick['first_name'] = playerObject.first_name;
   		pick['second_name'] = playerObject.second_name;
  			pick['picture_url'] = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${pick.element}.png`;
  			pick['live_points'] = livescore;
  			spavFinalPicks.push(pick)
	})
	let spavGWTotal = 0;
	spavFinalPicks.forEach((item)=>{
		spavGWTotal += (item.live_points * item.multiplier);
	});
	spavTable.base_total = await history.getSumOfPrevious("Spav", activeGW);
	spavTable.gw_points = spavGWTotal;
	spavTable.total_points = spavTable.base_total + spavTable.gw_points;
	spavTable.players = `${await live.getPlayersPlayed(activeGW, spavPicks)}/${await picks.getPlayersPlaying(activeGW, "Spav")}`;
	
	let spavCaptainID = await picks.getCaptain("Spav", activeGW);
	spavTable.captain = await bootstrap.getPlayerName(spavCaptainID);
	spavTable.points_spent = await picks.getPointsSpent("Spav", activeGW);
	spavTable.chips = await picks.getChipUsed("Spav", activeGW);

	return [spavTable, spavPicks]
}


// Luke Quinn
async function quinn(activeGW){
	let quinnTable = {"name": "Quinn", "new_position": 1, "old_position":11, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
	const quinnPicks = await picks.getPicks("Quinn", activeGW);
	let quinnFinalPicks = [];
	quinnPicks.forEach(async (pick)=>{
		let livescore = await live.getLiveScore(activeGW, pick.element)
		let playerObject = await bootstrap.getPlayer(pick.element);
		pick['first_name'] = playerObject.first_name;
   		pick['second_name'] = playerObject.second_name;
  			pick['picture_url'] = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${pick.element}.png`;
  			pick['live_points'] = livescore;
  			quinnFinalPicks.push(pick)
	})
	let quinnGWTotal = 0;
	quinnFinalPicks.forEach((item)=>{
		quinnGWTotal += (item.live_points * item.multiplier);
	});
	quinnTable.base_total = await history.getSumOfPrevious("Quinn", activeGW);
	quinnTable.gw_points = quinnGWTotal;
	quinnTable.total_points = quinnTable.base_total + quinnTable.gw_points;
	quinnTable.players = `${await live.getPlayersPlayed(activeGW, quinnPicks)}/${await picks.getPlayersPlaying(activeGW, "Quinn")}`;
	
	let quinnCaptainID = await picks.getCaptain("Quinn", activeGW);
	quinnTable.captain = await bootstrap.getPlayerName(quinnCaptainID);
	quinnTable.points_spent = await picks.getPointsSpent("Quinn", activeGW);
	quinnTable.chips = await picks.getChipUsed("Quinn", activeGW);

	return [quinnTable, quinnPicks]
}


// Kieran Aggarwal
async function aggarwal(activeGW){
	let aggarwalTable = {"name": "Aggarwal", "new_position": 1, "old_position":12, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
	const aggarwalPicks = await picks.getPicks("Aggarwal", activeGW);
	let aggarwalFinalPicks = [];
	aggarwalPicks.forEach(async (pick)=>{
		let livescore = await live.getLiveScore(activeGW, pick.element)
		let playerObject = await bootstrap.getPlayer(pick.element);
		pick['first_name'] = playerObject.first_name;
   		pick['second_name'] = playerObject.second_name;
  			pick['picture_url'] = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${pick.element}.png`;
  			pick['live_points'] = livescore;
  			aggarwalFinalPicks.push(pick)
	})
	let aggarwalGWTotal = 0;
	aggarwalFinalPicks.forEach((item)=>{
		aggarwalGWTotal += (item.live_points * item.multiplier);
	});
	aggarwalTable.base_total = await history.getSumOfPrevious("Aggarwal", activeGW);
	aggarwalTable.gw_points = aggarwalGWTotal;
	aggarwalTable.total_points = aggarwalTable.base_total + aggarwalTable.gw_points;
	aggarwalTable.players = `${await live.getPlayersPlayed(activeGW, aggarwalPicks)}/${await picks.getPlayersPlaying(activeGW, "Aggarwal")}`;
	
	let aggarwalCaptainID = await picks.getCaptain("Aggarwal", activeGW);
	aggarwalTable.captain = await bootstrap.getPlayerName(aggarwalCaptainID);
	aggarwalTable.points_spent = await picks.getPointsSpent("Aggarwal", activeGW);
	aggarwalTable.chips = await picks.getChipUsed("Aggarwal", activeGW);

	return [aggarwalTable, aggarwalPicks]
}


// Louis Pow
async function pow(activeGW){
	let powTable = {"name": "Pow", "new_position": 1, "old_position":13, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
	const powPicks = await picks.getPicks("Pow", activeGW);
	let powFinalPicks = [];
	powPicks.forEach(async (pick)=>{
		let livescore = await live.getLiveScore(activeGW, pick.element)
		let playerObject = await bootstrap.getPlayer(pick.element);
		pick['first_name'] = playerObject.first_name;
   		pick['second_name'] = playerObject.second_name;
  			pick['picture_url'] = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${pick.element}.png`;
  			pick['live_points'] = livescore;
  			powFinalPicks.push(pick)
	})
	let powGWTotal = 0;
	powFinalPicks.forEach((item)=>{
		powGWTotal += (item.live_points * item.multiplier);
	});
	powTable.base_total = await history.getSumOfPrevious("Pow", activeGW);
	powTable.gw_points = powGWTotal;
	powTable.total_points = powTable.base_total + powTable.gw_points;
	powTable.players = `${await live.getPlayersPlayed(activeGW, powPicks)}/${await picks.getPlayersPlaying(activeGW, "Pow")}`;
	
	let powCaptainID = await picks.getCaptain("Pow", activeGW);
	powTable.captain = await bootstrap.getPlayerName(powCaptainID);
	powTable.points_spent = await picks.getPointsSpent("Pow", activeGW);
	powTable.chips = await picks.getChipUsed("Pow", activeGW);

	return [powTable, powPicks]
}


// Ethan Speding
async function speding(activeGW){
	let spedingTable = {"name": "Speding", "new_position": 1, "old_position":14, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
	const spedingPicks = await picks.getPicks("Speding", activeGW);
	let spedingFinalPicks = [];
	spedingPicks.forEach(async (pick)=>{
		let livescore = await live.getLiveScore(activeGW, pick.element)
		let playerObject = await bootstrap.getPlayer(pick.element);
		pick['first_name'] = playerObject.first_name;
   		pick['second_name'] = playerObject.second_name;
  			pick['picture_url'] = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${pick.element}.png`;
  			pick['live_points'] = livescore;
  			spedingFinalPicks.push(pick)
	})
	let spedingGWTotal = 0;
	spedingFinalPicks.forEach((item)=>{
		spedingGWTotal += (item.live_points * item.multiplier);
	});
	spedingTable.base_total = await history.getSumOfPrevious("Speding", activeGW);
	spedingTable.gw_points = spedingGWTotal;
	spedingTable.total_points = spedingTable.base_total + spedingTable.gw_points;
	spedingTable.players = `${await live.getPlayersPlayed(activeGW, spedingPicks)}/${await picks.getPlayersPlaying(activeGW, "Speding")}`;
	
	let spedingCaptainID = await picks.getCaptain("Speding", activeGW);
	spedingTable.captain = await bootstrap.getPlayerName(spedingCaptainID);
	spedingTable.points_spent = await picks.getPointsSpent("Speding", activeGW);
	spedingTable.chips = await picks.getChipUsed("Speding", activeGW);

	return [spedingTable, spedingPicks]
}


// Live Page

router.get('/live', async function(req,res){

	const managerIDs = {"Moss": 11436 , "Marway":8098  , "Jaspal": 12345  , "Kent":107019  , "Jalif":727712  , "Docker":3269  , "Alka":50055  , "Duke":33544  , "Rogers":176051  , "Spav": 1292035 , "Quinn":1245567  , "Aggarwal":759064  , "Pow":1245965  , "Speding":15185 };
	const managers = ["Moss", "Marway", "Jaspal", "Kent", "Jalif", "Docker", "Alka", "Duke", "Rogers", "Spav", "Quinn", "Aggarwal", "Pow", "Speding"];


	const deadlines = await bootstrap.getAllDeadlines();

	const today = new Date();



	if (today<new Date(deadlines[0])){

		let mossTable = {"name": "Moss", "new_position": 1, "old_position":1, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
		let marwayTable = {"name": "Marway", "new_position": 1, "old_position":2, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
		let jaspalTable = {"name": "Jaspal", "new_position": 1, "old_position":3, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
		let kentTable = {"name": "Kent", "new_position": 1, "old_position":4, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
		let jalifTable = {"name": "Jalif", "new_position": 1, "old_position":5, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
		let alkaTable = {"name": "Alka", "new_position": 1, "old_position":6, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
		let dockerTable = {"name": "Docker", "new_position": 1, "old_position":7, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
		let rogersTable = {"name": "Rogers", "new_position": 1, "old_position":8, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
		let dukeTable = {"name": "Duke", "new_position": 1, "old_position":9, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
		let spavTable = {"name": "Spav", "new_position": 1, "old_position":10, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
		let quinnTable = {"name": "Quin", "new_position": 1, "old_position":11, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
		let aggarwalTable = {"name": "Aggarwal", "new_position": 1, "old_position":12, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
		let powTable = {"name": "Pow", "new_position": 1, "old_position":13, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
		let spedingTable = {"name": "Speding", "new_position": 1, "old_position":14, "gw_points":0, "players":"0/12", "total_points":0, "captain":"", "points_spent": 0, "chips": 0};
		
		let mossPick = {"first_name":"Bruno", "second_name":"foq", "url":"https://resources.premierleague.com/premierleague/photos/players/110x140/p141746.png"}
		let marwayPick = {"first_name":"Bruno", "second_name":"foq", "url":"https://resources.premierleague.com/premierleague/photos/players/110x140/p141746.png"}
		let jaspalPick = {"first_name":"Bruno", "second_name":"foq", "url":"https://resources.premierleague.com/premierleague/photos/players/110x140/p141746.png"}
		let kentPick = {"first_name":"Bruno", "second_name":"foq", "url":"https://resources.premierleague.com/premierleague/photos/players/110x140/p141746.png"}
		let jalifPick = {"first_name":"Bruno", "second_name":"foq", "url":"https://resources.premierleague.com/premierleague/photos/players/110x140/p141746.png"}
		let alkaPick = {"first_name":"Bruno", "second_name":"foq", "url":"https://resources.premierleague.com/premierleague/photos/players/110x140/p141746.png"}
		let dockerPick = {"first_name":"Bruno", "second_name":"foq", "url":"https://resources.premierleague.com/premierleague/photos/players/110x140/p141746.png"}
		let rogersPick = {"first_name":"Bruno", "second_name":"foq", "url":"https://resources.premierleague.com/premierleague/photos/players/110x140/p141746.png"}
		let dukePick = {"first_name":"Bruno", "second_name":"foq", "url":"https://resources.premierleague.com/premierleague/photos/players/110x140/p141746.png"}
		let spavPick = {"first_name":"Bruno", "second_name":"foq", "url":"https://resources.premierleague.com/premierleague/photos/players/110x140/p141746.png"}
		let quinnPick = {"first_name":"Bruno", "second_name":"foq", "url":"https://resources.premierleague.com/premierleague/photos/players/110x140/p141746.png"}
		let aggarwalPick = {"first_name":"Bruno", "second_name":"foq", "url":"https://resources.premierleague.com/premierleague/photos/players/110x140/p141746.png"}
		let powPick = {"first_name":"Bruno", "second_name":"foq", "url":"https://resources.premierleague.com/premierleague/photos/players/110x140/p141746.png"}
		let spedingPick = {"first_name":"Bruno", "second_name":"foq", "url":"https://resources.premierleague.com/premierleague/photos/players/110x140/p141746.png"}

		let mossPicks = [mossPick, mossPick, mossPick, mossPick, mossPick, mossPick, mossPick, mossPick, mossPick, mossPick, mossPick, mossPick, mossPick, mossPick, mossPick]
		let marwayPicks = [marwayPick, marwayPick, marwayPick, marwayPick, marwayPick, marwayPick, marwayPick, marwayPick, marwayPick, marwayPick, marwayPick, marwayPick, marwayPick, marwayPick, marwayPick]
		let jaspalPicks = [jaspalPick, jaspalPick, jaspalPick, jaspalPick, jaspalPick, jaspalPick, jaspalPick, jaspalPick, jaspalPick, jaspalPick, jaspalPick, jaspalPick, jaspalPick, jaspalPick, jaspalPick]
		let kentPicks = [kentPick, kentPick, kentPick, kentPick, kentPick, kentPick, kentPick, kentPick, kentPick, kentPick, kentPick, kentPick, kentPick, kentPick, kentPick]
		let jalifPicks = [jalifPick, jalifPick, jalifPick, jalifPick, jalifPick, jalifPick, jalifPick, jalifPick, jalifPick, jalifPick, jalifPick, jalifPick, jalifPick, jalifPick, jalifPick]
		let alkaPicks = [alkaPick, alkaPick, alkaPick, alkaPick, alkaPick, alkaPick, alkaPick, alkaPick, alkaPick, alkaPick, alkaPick, alkaPick, alkaPick, alkaPick, alkaPick]
		let dockerPicks = [dockerPick, dockerPick, dockerPick, dockerPick, dockerPick, dockerPick, dockerPick, dockerPick, dockerPick, dockerPick, dockerPick, dockerPick, dockerPick, dockerPick, dockerPick]
		let rogersPicks = [rogersPick, rogersPick, rogersPick, rogersPick, rogersPick, rogersPick, rogersPick, rogersPick, rogersPick, rogersPick, rogersPick, rogersPick, rogersPick, rogersPick, rogersPick]
		let dukePicks = [dukePick, dukePick, dukePick, dukePick, dukePick, dukePick, dukePick, dukePick, dukePick, dukePick, dukePick, dukePick, dukePick, dukePick, dukePick]
		let spavPicks = [spavPick, spavPick, spavPick, spavPick, spavPick, spavPick, spavPick, spavPick, spavPick, spavPick, spavPick, spavPick, spavPick, spavPick, spavPick]
		let quinnPicks = [quinnPick, quinnPick, quinnPick, quinnPick, quinnPick, quinnPick, quinnPick, quinnPick, quinnPick, quinnPick, quinnPick, quinnPick, quinnPick, quinnPick, quinnPick]
		let aggarwalPicks = [aggarwalPick, aggarwalPick, aggarwalPick, aggarwalPick, aggarwalPick, aggarwalPick, aggarwalPick, aggarwalPick, aggarwalPick, aggarwalPick, aggarwalPick, aggarwalPick, aggarwalPick, aggarwalPick, aggarwalPick]
		let powPicks = [powPick, powPick, powPick, powPick, powPick, powPick, powPick, powPick, powPick, powPick, powPick, powPick, powPick, powPick, powPick]
		let spedingPicks = [spedingPick, spedingPick, spedingPick, spedingPick, spedingPick, spedingPick, spedingPick, spedingPick, spedingPick, spedingPick, spedingPick, spedingPick, spedingPick, spedingPick, spedingPick]

		res.render('live', {
			mossTable:mossTable,
			marwayTable:marwayTable,
			jaspalTable:jaspalTable,
			kentTable:kentTable,
			jalifTable:jalifTable,
			alkaTable:alkaTable,
			dockerTable:dockerTable,
			rogersTable:rogersTable,
			dukeTable:dukeTable,
			spavTable:spavTable,
			quinnTable:quinnTable,
			aggarwalTable:aggarwalTable,
			powTable:powTable,
			spedingTable:spedingTable,
			mossPicks:mossPicks,
			marwayPicks:mossPicks,
			jaspalPicks:jaspalPicks,
			kentPicks:kentPicks,
			jalifPicks:jalifPicks,
			alkaPicks:alkaPicks,
			dockerPicks:dockerPicks,
			rogersPicks:rogersPicks,
			dukePicks:dukePicks,
			spavPicks:spavPicks,
			quinnPicks:quinnPicks,
			aggarwalPicks:aggarwalPicks,
			powPicks:powPicks,
			spedingPicks:spedingPicks
			});

	} else {

		// Find out which gameweek to use
	
		let deadlinesBefore = [];
		deadlines.forEach((deadline)=>{
			if (today > new Date (deadline)){
				deadlinesBefore.push(deadline);
			}
		});

		const activeGW = deadlines.indexOf(deadlinesBefore[deadlinesBefore.length-1]) + 1;

		// Get the manager table elements
		
		let table1 = moss(activeGW)
		let table2 = marway(activeGW)
		let table3 = jaspal(activeGW)
		let table4 = kent(activeGW)
		let table5 = jalif(activeGW)
		let table6 = alka(activeGW)
		let table7 = docker(activeGW)
		let table8 = rogers(activeGW)
		let table9 = duke(activeGW)
		let table10 = spav(activeGW)
		let table11 = quinn(activeGW)
		let table12 = aggarwal(activeGW)
		let table13 = pow(activeGW)
		let table14 = speding(activeGW)

		let values = await Promise.all([
			table1,
			table2,
			table3,
			table4,
			table5,
			table6,
			table7,
			table8,
			table9,
			table10,
			table11,
			table12,
			table13,
			table14
			])

		let mossTable = values[0][0]
		let marwayTable = values[1][0]
		let jaspalTable = values[2][0]
		let kentTable = values[3][0]
		let jalifTable = values[4][0]
		let alkaTable = values[5][0]
		let dockerTable = values[6][0]
		let rogersTable = values[7][0]
		let dukeTable = values[8][0]
		let spavTable = values[9][0]
		let quinnTable = values[10][0]
		let aggarwalTable = values[11][0]
		let powTable = values[12][0]
		let spedingTable = values[13][0]

		let mossPicks = values[0][1]
		let marwayPicks = values[1][1]
		let jaspalPicks = values[2][1]
		let kentPicks = values[3][1]
		let jalifPicks = values[4][1]
		let alkaPicks = values[5][1]
		let dockerPicks = values[6][1]
		let rogersPicks = values[7][1]
		let dukePicks = values[8][1]
		let spavPicks = values[9][1]
		let quinnPicks = values[10][1]
		let aggarwalPicks = values[11][1]
		let powPicks = values[12][1]
		let spedingPicks = values[13][1]

		const listofobjects = [
		mossTable,
		marwayTable,
		jaspalTable,
		kentTable,
		jalifTable,
		alkaTable,
		dockerTable,
		rogersTable,
		dukeTable,
		spavTable,
		quinnTable,
		aggarwalTable,
		powTable,
		spedingTable
		];

		listofobjects.sort((a,b)=>(b.total_points - a.total_points));

		const listofnewnames = [];

		listofobjects.forEach((object)=>{
			listofnewnames.push(object.name);
		});

		mossTable.new_position = listofnewnames.indexOf("Moss")+1;
		jaspalTable.new_position = listofnewnames.indexOf("Jaspal")+1;
		marwayTable.new_position = listofnewnames.indexOf("Marway")+1;
		kentTable.new_position = listofnewnames.indexOf("Kent")+1;
		alkaTable.new_position = listofnewnames.indexOf("Alka")+1;
		jalifTable.new_position = listofnewnames.indexOf("Jalif")+1;
		dockerTable.new_position = listofnewnames.indexOf("Docker")+1;
		rogersTable.new_position = listofnewnames.indexOf("Rogers")+1;
		dukeTable.new_position = listofnewnames.indexOf("Duke")+1;
		spavTable.new_position = listofnewnames.indexOf("Spav")+1;
		quinnTable.new_position = listofnewnames.indexOf("Quinn")+1;
		aggarwalTable.new_position = listofnewnames.indexOf("Aggarwal")+1;
		spedingTable.new_position = listofnewnames.indexOf("Speding")+1;
		powTable.new_position = listofnewnames.indexOf("Pow")+1;

		listofobjects.sort((a,b)=>(b.base_total - a.base_total));

		const listofoldnames = [];

		listofobjects.forEach((object)=>{
			listofoldnames.push(object.name);
		});

		mossTable.old_position = listofoldnames.indexOf("Moss")+1;
		jaspalTable.old_position = listofoldnames.indexOf("Jaspal")+1;
		marwayTable.old_position = listofnewnames.indexOf("Marway")+1;
		kentTable.old_position = listofoldnames.indexOf("Kent")+1;
		alkaTable.old_position = listofoldnames.indexOf("Alka")+1;
		jalifTable.old_position = listofoldnames.indexOf("Jalif")+1;
		dockerTable.old_position = listofoldnames.indexOf("Docker")+1;
		rogersTable.old_position = listofoldnames.indexOf("Rogers")+1;
		dukeTable.old_position = listofoldnames.indexOf("Duke")+1;
		spavTable.old_position = listofoldnames.indexOf("Spav")+1;
		quinnTable.old_position = listofoldnames.indexOf("Quinn")+1;
		aggarwalTable.old_position = listofoldnames.indexOf("Aggarwal")+1;
		spedingTable.old_position = listofoldnames.indexOf("Speding")+1;
		powTable.old_position = listofoldnames.indexOf("Pow")+1;


		res.render('live', {
			mossTable:mossTable,
			marwayTable:marwayTable,
			jaspalTable:jaspalTable,
			kentTable:kentTable,
			jalifTable:jalifTable,
			alkaTable:alkaTable,
			dockerTable:dockerTable,
			rogersTable:rogersTable,
			dukeTable:dukeTable,
			spavTable:spavTable,
			quinnTable:quinnTable,
			aggarwalTable:aggarwalTable,
			powTable:powTable,
			spedingTable:spedingTable,
			mossPicks:mossPicks,
			marwayPicks:mossPicks,
			jaspalPicks:jaspalPicks,
			kentPicks:kentPicks,
			jalifPicks:jalifPicks,
			alkaPicks:alkaPicks,
			dockerPicks:dockerPicks,
			rogersPicks:rogersPicks,
			dukePicks:dukePicks,
			spavPicks:spavPicks,
			quinnPicks:quinnPicks,
			aggarwalPicks:aggarwalPicks,
			powPicks:powPicks,
			spedingPicks:spedingPicks
			});

	}


})

module.exports = router