const test = require("./test.js")

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

exports.getSumOfPrevious = function(manager, gameweek){

	const managerIDs = {"Moss": 11436 , "Marway":8098  , "Jaspal": 12345  , "Kent":107019  , "Jalif":727712  , "Docker":3269  , "Alka":50055  , "Duke":33544  , "Rogers":176051  , "Spav": 1292035 , "Quinn":1245567  , "Aggarwal":759064  , "Pow":1245965  , "Speding":15185 }

	const ID = managerIDs[manager]

	const req = new XMLHttpRequest();
	req.open('GET', `https://fantasy.premierleague.com/api/entry/${ID}/history/`, false);
	req.send(null);
	const data = req.responseText;
	const parsedData = JSON.parse(data);
	const current = parsedData.current;
	const listofgws = [];

	if (gameweek === 1){

		return 0
	} else {

		current.forEach(function(item){
		listofgws.push(item.event)
		});

	const index = listofgws.indexOf(gameweek-1)

	console.log(listofgws)

	return listofgws[index].total_points

	}
};



// Need to test history