const bootstrap = require("./Bootstrap.js");
const test = require("./test.js");

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

exports.getGWPoints = function(manager, gameweek){

	const managerIDs = {"Moss": 11436 , "Marway":8098  , "Jaspal": 12345  , "Kent":107019  , "Jalif":727712  , "Docker":3269  , "Alka":50055  , "Duke":33544  , "Rogers":176051  , "Spav": 1292035 , "Quinn":1245567  , "Aggarwal":759064  , "Pow":1245965  , "Speding":15185 }

	const ID = managerIDs.manager;

	const req = new XMLHttpRequest();

	req.open('GET', `https://fantasy.premierleague.com/api/entry/${ID}/event/${gameweek}/picks/`, false);
	req.send(null);
	const data = req.responseText;
	const parsedData = JSON.parse(data);

	return parsedData.entry_history.points

}

exports.getTotalPoints = function(manager, gameweek){

	const managerIDs = {"Moss": 11436 , "Marway":8098  , "Jaspal": 12345  , "Kent":107019  , "Jalif":727712  , "Docker":3269  , "Alka":50055  , "Duke":33544  , "Rogers":176051  , "Spav": 1292035 , "Quinn":1245567  , "Aggarwal":759064  , "Pow":1245965  , "Speding":15185 }

	const ID = managerIDs.manager;

	const req = new XMLHttpRequest();

	req.open('GET', `https://fantasy.premierleague.com/api/entry/${ID}/event/${gameweek}/picks/`, false);
	req.send(null);
	const data = req.responseText;
	const parsedData = JSON.parse(data);

	return parsedData.entry_history.total_points

}

exports.getCaptain = function(manager, gameweek){

  const managerIDs = {"Moss": 11436 , "Marway":8098  , "Jaspal": 12345  , "Kent":107019  , "Jalif":727712  , "Docker":3269  , "Alka":50055  , "Duke":33544  , "Rogers":176051  , "Spav": 1292035 , "Quinn":1245567  , "Aggarwal":759064  , "Pow":1245965  , "Speding":15185 }

  const ID = managerIDs[manager];
  let element = 0
  try{
    const req = new XMLHttpRequest();
    req.open('GET', `https://fantasy.premierleague.com/api/entry/${ID}/event/${gameweek}/picks/`, false);
    req.send(null);
    const data = req.responseText;
    const parsedData = JSON.parse(data);

    const picks = parsedData.picks

    picks.forEach((pick)=>{
      if (pick.multiplier === 2){
        element =  pick.element;
      };
    })
    return element
  } catch(e){
      console.log(e);
  }
}


exports.getPointsSpent = function(manager, gameweek){

	const managerIDs = {"Moss": 11436 , "Marway":8098  , "Jaspal": 12345  , "Kent":107019  , "Jalif":727712  , "Docker":3269  , "Alka":50055  , "Duke":33544  , "Rogers":176051  , "Spav": 1292035 , "Quinn":1245567  , "Aggarwal":759064  , "Pow":1245965  , "Speding":15185 }

	const ID = managerIDs[manager]

	const req = new XMLHttpRequest();

	req.open('GET', `https://fantasy.premierleague.com/api/entry/${ID}/event/${gameweek}/picks/`, false);
	req.send(null);
	const data = req.responseText;
	const parsedData = JSON.parse(data);

	return parsedData.entry_history.event_transfer_cost

};

exports.getChipUsed = function(manager, gameweek){

	const managerIDs = {"Moss": 11436 , "Marway":8098  , "Jaspal": 12345  , "Kent":107019  , "Jalif":727712  , "Docker":3269  , "Alka":50055  , "Duke":33544  , "Rogers":176051  , "Spav": 1292035 , "Quinn":1245567  , "Aggarwal":759064  , "Pow":1245965  , "Speding":15185 }

	const ID = managerIDs[manager]

	const req = new XMLHttpRequest();

	req.open('GET', `https://fantasy.premierleague.com/api/entry/${ID}/event/${gameweek}/picks/`, false);
	req.send(null);
	const data = req.responseText;
	const parsedData = JSON.parse(data);

	return parsedData.active_chip

}

exports.getBank = function(manager, gameweek){

	const managerIDs = {"Moss": 11436 , "Marway":8098  , "Jaspal": 12345  , "Kent":107019  , "Jalif":727712  , "Docker":3269  , "Alka":50055  , "Duke":33544  , "Rogers":176051  , "Spav": 1292035 , "Quinn":1245567  , "Aggarwal":759064  , "Pow":1245965  , "Speding":15185 }

	const ID = managerIDs.manager;

	const req = new XMLHttpRequest();

	req.open('GET', `https://fantasy.premierleague.com/api/entry/${ID}/event/${gameweek}/picks/`, false);
	req.send(null);
	const data = req.responseText;
	const parsedData = JSON.parse(data);

	return parsedData.entry_history.bank

}

exports.getOverallRank = function(manager, gameweek){

	const managerIDs = {"Moss": 11436 , "Marway":8098  , "Jaspal": 12345  , "Kent":107019  , "Jalif":727712  , "Docker":3269  , "Alka":50055  , "Duke":33544  , "Rogers":176051  , "Spav": 1292035 , "Quinn":1245567  , "Aggarwal":759064  , "Pow":1245965  , "Speding":15185 }

	const ID = managerIDs.manager;

	const req = new XMLHttpRequest();

	req.open('GET', `https://fantasy.premierleague.com/api/entry/${ID}/event/${gameweek}/picks/`, false);
	req.send(null);
	const data = req.responseText;
	const parsedData = JSON.parse(data);

	return parsedData.entry_history.overall_rank
}

exports.getPicks = function(manager, gameweek){

	const managerIDs = {"Moss": 11436 , "Marway":8098  , "Jaspal": 12345  , "Kent":107019  , "Jalif":727712  , "Docker":3269  , "Alka":50055  , "Duke":33544  , "Rogers":176051  , "Spav": 1292035 , "Quinn":1245567  , "Aggarwal":759064  , "Pow":1245965  , "Speding":15185 }
	const ID = managerIDs[manager]
	try{
		const req = new XMLHttpRequest();
		req.open('GET', `https://fantasy.premierleague.com/api/entry/${ID}/event/${gameweek}/picks/`, false);
		req.send(null);
		const data = req.responseText;
		const parsedData = JSON.parse(data);
		return parsedData.picks
	} catch(err){
		console.log(err)
	}
};

exports.getNewTeam = function(manager, gameweek){

	const managerIDs = {"Moss": 11436 , "Marway":8098  , "Jaspal": 12345  , "Kent":107019  , "Jalif":727712  , "Docker":3269  , "Alka":50055  , "Duke":33544  , "Rogers":176051  , "Spav": 1292035 , "Quinn":1245567  , "Aggarwal":759064  , "Pow":1245965  , "Speding":15185 }
	const ID = managerIDs[manager];

	const elementsNew = [];

	try{
		const req = new XMLHttpRequest();
		req.open('GET', `https://fantasy.premierleague.com/api/entry/${ID}/event/${gameweek}/picks/`, false);
		req.send(null);
		const data = req.responseText;
		const parsedData = JSON.parse(data);
		const picks = parsedData.picks
		picks.forEach(function(pick){
			elementsNew.push(pick.element);
		});

		return elementsNew

	} catch(err){
		console.log(err)
	}
};

exports.getOldTeam = function(manager, gameweek){

	const managerIDs = {"Moss": 11436 , "Marway":8098  , "Jaspal": 12345  , "Kent":107019  , "Jalif":727712  , "Docker":3269  , "Alka":50055  , "Duke":33544  , "Rogers":176051  , "Spav": 1292035 , "Quinn":1245567  , "Aggarwal":759064  , "Pow":1245965  , "Speding":15185 }
	const ID = managerIDs[manager];

	const oldgameweek = gameweek - 1;
	const elementsOld = [];

	try{
		const req = new XMLHttpRequest();
		req.open('GET', `https://fantasy.premierleague.com/api/entry/${ID}/event/${gameweek}/picks/`, false);
		req.send(null);
		const data = req.responseText;
		const parsedData = JSON.parse(data);
		const picks = parsedData.picks;

		picks.forEach(function(pick){
			elementsOld.push(pick.element);
		});

		return elementsOld

	} catch(err){
		console.log(err)
	}
}


exports.getManagerOrder = function(gameweek){

	const managerIDs = {"Moss": 11436 , "Marway":8098  , "Jaspal": 12345  , "Kent":107019  , "Jalif":727712  , "Docker":3269  , "Alka":50055  , "Duke":33544  , "Rogers":176051  , "Spav": 1292035 , "Quinn":1245567  , "Aggarwal":759064  , "Pow":1245965  , "Speding":15185 };
	const managers = ["Moss", "Marway", "Jaspal", "Kent", "Jalif", "Docker", "Alka", "Duke", "Rogers", "Spav", "Quinn", "Aggarwal", "Pow", "Speding"];

	var listOfObjects = [];

	managers.forEach(function(manager) {

		let activeID = managerIDs.manager;

		const req = new XMLHttpRequest();
		req.open('GET', `https://fantasy.premierleague.com/api/entry/${activeID}/event/${gameweek}/picks/`, false);
		req.send(null);
		const data = req.responseText;
		const parsedData = JSON.parse(data);

    	let singleObj = {};
    	singleObj['name'] = manager;
    	singleObj['points'] = parsedData.entry_history.total_points;
    	listOfObjects.push(singleObj);
	});

	listOfObjects.sort((a,b)=>(b.points - a.points));

	return listOfObjects
}

exports.getPlayersPlaying = function(gameweek, manager){

	const managerIDs = {"Moss": 11436 , "Marway":8098  , "Jaspal": 12345  , "Kent":107019  , "Jalif":727712  , "Docker":3269  , "Alka":50055  , "Duke":33544  , "Rogers":176051  , "Spav": 1292035 , "Quinn":1245567  , "Aggarwal":759064  , "Pow":1245965  , "Speding":15185 }

	let sumofmultipliers = 0;

	const ID = managerIDs[manager]

	const req = new XMLHttpRequest();
	req.open('GET', `https://fantasy.premierleague.com/api/entry/${gameweek}/event/${gameweek}/picks/`, false);
	req.send(null);
	const data = req.responseText;
	const parsedData = JSON.parse(data);
	const picks = parsedData.picks

    picks.forEach((pick)=>{
    	sumofmultipliers += pick.multiplier;
    });

	return sumofmultipliers
};

	
