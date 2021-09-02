const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


exports.getDeadline = function (){

	const req = new XMLHttpRequest();

	req.open('GET', 'https://fantasy.premierleague.com/api/bootstrap-static/', false);
	req.send(null);
	const data = req.responseText;
	const parsedData = JSON.parse(data);

	const deadlines = [];
	const activeDeadlines = []
	parsedData.events.forEach(function(event){
		deadlines.push(event.deadline_time);
	});

	deadlines.forEach(function(deadline){
		let workingDate = new Date(deadline);
		let today = new Date();
		if (today<workingDate){
			activeDeadlines.push(workingDate)
		};		
	})

	return activeDeadlines[0]
}

exports.getAllDeadlines = function(){
	try{
		const req = new XMLHttpRequest();
		req.open('GET', 'https://fantasy.premierleague.com/api/bootstrap-static/', false);
		req.send(null);
		const data = req.responseText;
		const parsedData = JSON.parse(data);

		const deadlines = [];

		parsedData.events.forEach(function(event){
			deadlines.push(event.deadline_time);
		});
		return deadlines
	} catch(err){
		console.log(err)
	}
}

exports.getActiveGW = function (){

	const req = new XMLHttpRequest();

	req.open('GET', 'https://fantasy.premierleague.com/api/bootstrap-static/', false);
	req.send(null);
	const data = req.responseText;
	const parsedData = JSON.parse(data);

	const listOfActives = []

	parsedData.events.forEach(function(event){
		listOfActives.push(event.is_current)
	})

	const index = listOfActives.indexOf(true);
	if (index !== -1){
		return index + 1;
	} else {
		return -1
	}
}

exports.getUpcomingGW = function (){

	const req = new XMLHttpRequest();

	req.open('GET', 'https://fantasy.premierleague.com/api/bootstrap-static/', false);
	req.send(null);
	const data = req.responseText;
	const parsedData = JSON.parse(data);

	const listOfNext = []

	parsedData.events.forEach(function(event){
		listOfNext.push(event.is_next)
	})

	const index = listOfNext.indexOf(true);

	return index + 1;	
}

exports.getFinishedGW = function (){

	const req = new XMLHttpRequest();

	req.open('GET', 'https://fantasy.premierleague.com/api/bootstrap-static/', false);
	req.send(null);
	const data = req.responseText;
	const parsedData = JSON.parse(data);

	const listOfFinished = [];

	parsedData.events.forEach(function(event){
		listOfFinished.push(event.is_previous);
	})

	const index = listOfFinished.indexOf(true);

	return index + 1;	
}

exports.getPlayer = function(code){

		const req = new XMLHttpRequest();

		req.open('GET', 'https://fantasy.premierleague.com/api/bootstrap-static/', false);
		req.send(null);
		const data = req.responseText;
		const parsedData = JSON.parse(data);
		const elements = parsedData.elements

		const player = elements.find(x => x.id === code)
		return player
}	

exports.getPlayerName = function(code){


		try{
			const req = new XMLHttpRequest();

			req.open('GET', 'https://fantasy.premierleague.com/api/bootstrap-static/', false);
			req.send(null);
			const data = req.responseText;
			const parsedData = JSON.parse(data);
			const elements = parsedData.elements
			const player = elements.find(x => x.id === code)
			return `${player.first_name} ${player.second_name}`
		}catch(err){
			console.log(err)
		}
}	