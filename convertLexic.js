var characterValues = 
{
	a: 1, //
	b: 4, //
	c: 3, //
	d: 4, //
	e: 1, //
	f: 5, //
	g: 4, //
	h: 5, //
	i: 1, //
	j: 9, //
	k: 10, //
	l: 3, //
	m: 4, //
	n: 2, //
	o: 2, //
	p: 4, //
	q: 6, //
	r: 2, //
	s: 1, //
	t: 2, //
	u: 3, //
	v: 6, //
	w: 12, //
	x: 8, //
	y: 7, //
	z: 5 //
};

var sizeBonus = {
	3: 1,
	4: 1,
	5: 1.5,
	6: 2,
	7: 2,
	8: 2.5,
	9: 2.5,
	10: 2.5,
	11: 2.5,
	12: 2.5,
	13: 2.5,
	14: 2.5,
	15: 2.5,
	16: 2.5
};


/////////////

function toTree(t) {
	var len = t.length;
	var d = {};
	for (var i=0; i < len; i++) {
		var dt = d;
		var w = t[i];
		for (var k=0; k < w.length; k++){
			var l = w[k];
			if (!dt[l]) dt[l] = {end: false};
			dt = dt[l];
		}
		dt.end = true;
	}
	return d;
}

////////////////

function count(value) {
	var r = 0;
	for (var l in value){
		var next = value[l];
		r += 1 + count(next);
	}
	return r;
}

///////////////


sample = 
[
	["u","o","r","e"],
	["t","g","i","s"],
	["u","e","r","k"],
	["a","u","a","a"]
];

sample = 
[
	["e","n","d","s"],
	["s","p","t","r"],
	["e","s","a","e"],
	["e","x","e","a"]
];

/////////////////

function randomize(characterValues) {
	var choices = [];
	var max = 100;
	for (var k in characterValues) {
		var value = characterValues[k];
		var end = Math.floor(max / (value * 2));
		for (var i = 0; i < end; i++) {
			choices.push(k);
		};
	};
	return choices;
}


function createGrid(choices) {
	var grid = [];
	var length = choices.length;
	for (var i = 0; i < 4; i++)	{
		var row = [];
	 	for (var j = 0; j < 4; j++) {
	 		row[j] = choices[Math.floor(Math.random() * length)];
	 	};
	 	grid[i] = row;
	};
	return grid;
}

function printGrid(grid) {
	var result = "\n";
	var gridValue = 0;
	for (var i = 0; i < 4; i++)	{
		result += "| ";
	 	for (var j = 0; j < 4; j++) {
	 		var letter = grid[i][j];
	 		result += letter + " | ";
	 		gridValue += characterValues[letter];
	 	};
	 	result += "\n";
	};
	return result + gridValue;
}

printGrid(createGrid(randomize(characterValues)));

////////////////

function searchWords(grid, d) {
	var words = [];
	var caseViewed = 
	[
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false]
	];
	var search = function search(i, j, word, node, path, score) {
		if (i >= 0 && i < 4 && j >= 0 && j < 4 && !caseViewed[i][j]) {
			var letter = grid[i][j];
			node = node[letter];
			//console.log(word + " " + letter);
			if (node) {
				word += letter;
				path.push({i: i, j: j});
				score += characterValues[letter];
				if (node.end) {
					if (words.indexOf(word) < 0) {
						//console.log("#> " + word);
						words.push({word: word, path: path.concat(), score: score});
					}
				}
				caseViewed[i][j] = true;
				search(i,   j-1, word, node, path, score);
				search(i,   j+1, word, node, path, score);
				search(i,   j  , word, node, path, score);
				search(i-1, j  , word, node, path, score);
				search(i-1, j-1, word, node, path, score);
				search(i-1, j+1, word, node, path, score);
				search(i+1, j  , word, node, path, score);
				search(i+1, j-1, word, node, path, score);
				search(i+1, j+1, word, node, path, score);
				caseViewed[i][j] = false;
				path.pop();
			}
		}
	}

	for (var i = 0; i < 4; i++)	{
	 	for (var j = 0; j < 4; j++) {
	 		search(i, j, "", d, [], 0);
	 	};
	};
	console.log("found " + words.length + " words!")
	return words;
}

function sortByScore(a, b) {
	return b.score - a.score;
}

function print(wordWithScore) {
	console.log(wordWithScore.word + "  " + wordWithScore.score);
}

searchWords(sample,d).sort(sortByScore).forEach(print);


