module wordsquare {
	var boardElement = document.getElementById("board");
	var logElement = document.getElementById("log");
	var size = 4;
	var boxSize = 80;
	var board:any = {};
	var boardView;
	var offset = 0.40;
	var minX, maxX, minY, maxY; 

	var log = function (message) {
		logElement.innerHTML = message + "<br>" + logElement.innerHTML;
	};

	var selectedBoxes;
	var lastSelectedBox;

	boardElement.addEventListener("touchstart", (event) => {
		event.preventDefault();
		selectedBoxes = [];
		minX = minY = 1000000;
		maxX = maxY = -1000000;
	});

	boardElement.addEventListener("touchmove", (event:any) => {
		event.preventDefault();
		if (event.touches && event.touches.length == 1) {
			var touch = event.touches[0];
			var x = touch.clientX;
			var y = touch.clientY;
			if (x < minX || x > maxX || y < minY || y > maxY) {
				if (x >= boardView.left 
					&& x <= boardView.right
					&& y >= boardView.top
					&& y <= boardView.bottom) {
					var j = Math.floor((x - boardView.left) / boxSize);
					var i = Math.floor((y - boardView.top) / boxSize);
					var boxX = j * boxSize + boardView.left;
					var boxY = i * boxSize + boardView.top;
					minX = boxX - boxSize * offset;
					maxX = boxX + boxSize * (1 + offset);
					minY = boxY - boxSize * offset;
					maxY = boxY + boxSize * (1 + offset);
					
					if (i >= 0 && i < size && j >= 0 && j < size) {
						var boxView = boardView.boxesView[i][j];
						
						if (!boxView.selected) {
							//log(">" + i + "" + j);
							boxView.selected = true;
							var element = boxView.view;
							//log(element.textContent);
							element.className = "box selected";
							selectedBoxes.push(boxView);
						}
					}
				} else {
					for (var i = 0; i < selectedBoxes.length; i++) {
						selectedBoxes[i].view.className = "box";
						selectedBoxes[i].selected = false;
					}
					lastSelectedBox = null;
				}
			}
		}
	});

	boardElement.addEventListener("touchend", (event) => {
		if (event) event.preventDefault();
		for (var i = 0; i < selectedBoxes.length; i++) {
			selectedBoxes[i].view.className = "box";
			selectedBoxes[i].selected = false;
		}
		lastSelectedBox = null;
	});

	var createModel = function() {
		var boxes = []; 
		for (var i = 0; i < size; i++) {
			boxes[i] = []; 
			for (var j = 0; j < size; j++) {
				boxes[i][j] = i + "" + j;
			};	
		};
		board.boxes = boxes;
	};

	var createView = function() {
		var boxesView = [];
		for (var i = 0; i < size; i++) {
			boxesView[i] = [];
			for (var j = 0; j < size; j++) {
				var boxElement = document.createElement("div");
				boxElement.className = "box";
				boxElement.textContent = board.boxes[i][j];
				boardElement.appendChild(boxElement);
				var boxView = {
					view: boxElement,
					selected: false,
					i: i,
					j: j
				};
				boxesView[i][j] = boxView;
			};
			boardElement.appendChild(document.createElement("br"));
		};
		boardView = {
			view: boardElement,
			boxesView: boxesView,
			left: boardElement.offsetLeft,
			top: boardElement.offsetTop,
			right: boardElement.offsetWidth + boardElement.offsetLeft,
			bottom: boardElement.offsetHeight + boardElement.offsetTop 
		};
	};

	createView();	
	createModel();


}