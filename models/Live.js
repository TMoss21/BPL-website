const test = require("./test.js");

// For outputting the live gw team

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

exports.getLiveScore = function(gameweek, elementID){

	const req = new XMLHttpRequest();

	req.open('GET', `https://fantasy.premierleague.com/api/event/${gameweek}/live/`, false);
	req.send(null);
	const data = req.responseText;
	const parsedData = JSON.parse(data);

	const elements = parsedData.elements;
	const player = elements.find(x => x.id === elementID);
	return player.stats.total_points
};

exports.getLiveTeamScore = function(gameweek, listofids){

	const req = new XMLHttpRequest();

	req.open('GET', `https://fantasy.premierleague.com/api/event/${gameweek}/live/`, false);
	req.send(null);
	const data = req.responseText;
	const parsedData = JSON.parse(data);
	const elements = parsedData.elements;

	const listoftotals = [];

	listofids.forEach((id)=>{

		const player = elements.find(x => x.id === elementID);
		listoftotals.push(player.stats.total_points)

	});

	return listoftotals
};

exports.getPlayersPlayed = function(gameweek, managerTableObjects){

	const req = new XMLHttpRequest();

	req.open('GET', `https://fantasy.premierleague.com/api/event/${gameweek}/live/`, false);
	req.send(null);
	const data = req.responseText;
	const parsedData = JSON.parse(data);
	
	const elements = parsedData.elements;

	listofobjects = [];
	played = 0

	managerTableObjects.forEach((object)=>{

		const player = elements.find(x => x.element === elements.id);

		if(player.minutes > 0 && object.multiplier > 0){
			played ++;
		};
	});
	return played
};




