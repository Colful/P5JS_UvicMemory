let diff;
let tema;

// Game variables
// --------------------------
let tiles = [];

let direccio = "right";
const iniciX = 0;
const iniciY = 550;
let xCor = [];
let yCor = [];

let numRows = 3;
let numColumns = 4;

let faceDownImage;
let faceUpImages = [];
let bombImage;
let bombsound;

let imagesDeck = [];
let flippedTiles = [];
let delayStartFC = null;

let numTries = 0;

let objjson;

// Tile Object
// --------------------------
class Tile {
    constructor(x, y, faceUpImage) {
        this.x = x;
        this.y = y;
        this.width = 120;
        this.faceDownImage = faceDownImage;
        this.faceUpImage = faceUpImage;
        this.isFaceUp = false;
    }

    render() {
        fill(93, 81, 124);
        stroke(255, 255, 255);
        strokeWeight(4);
        rect(this.x, this.y, this.width, this.width, 20);

        if (this.isFaceUp === true) {
            image(this.faceUpImage, this.x, this.y, this.width, this.width);
        } else {
            image(this.faceDownImage, this.x, this.y, this.width, this.width);
        }
    }

    setIsFaceUp(isFaceUp) {
        this.isFaceUp = isFaceUp;
    }

    isUnderMouse(x, y) {
        return x >= this.x && x <= this.x + this.width  &&
            y >= this.y && y <= this.y + this.width;
    }
}

// Game functions
// --------------------------
function createTiles() {
    for (let i = 0; i < numColumns; i++) {
        for (let j = 0; j < numRows; j++) {
            tiles.push(new Tile(i * 120 + 40, j * 120 + 40, imagesDeck.pop()));
        }
    }
}

function updateGameLogic() {
    if (delayStartFC && (frameCount - delayStartFC) > 4) {
        for (let i = 0; i < tiles.length; i++) {
            if (!tiles[i].isMatch && tiles[i].isFaceUp) {
                tiles[i].setIsFaceUp(false);
            }
        }
        flippedTiles = [];
        delayStartFC = null;
    }
}

function createImagesDeck(images) {
    for (let i = 0; i < faceUpImages.length; i++) {
        imagesDeck.push(images[i]);
        imagesDeck.push(images[i]);
    }

    imagesDeck.sort(function() {
        return 0.5 - random();
    })
}

function drawScoringMessage() {
    let foundAllMatches = true;

    for (let i = 0; i < tiles.length; i++) {
        foundAllMatches = foundAllMatches && tiles[i].isMatch;
    }

    if (foundAllMatches) {
        window.location.href = "end.html?fin=1&tries="+numTries;
        // fill(0, 0, 0);
        // text("You found them all in " + numTries + " tries", 20, 360);
    }
}

function getAtributes() {
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
    diff = getUrlParameter('diff');
    tema = getUrlParameter('topic');
}
function preload(){
    objjson = loadJSON('../Json/json.json');
    soundFormats('mp3', 'ogg');
}
function gameVariables(diff,tema) {
	if (tema == 'M') {
		if (diff == 1){
			for ( var i=0;i<6;i++){
				 faceUpImages[i] = loadImage( objjson["temas"].multimedia[i]);
			}
			numColumns = objjson["dificultat"].facil.columns;
			numRows = objjson["dificultat"].facil.rows;
			frameRate(objjson["dificultat"].facil.framerate);
		}
		else if (diff == 2) {
			for (var i = 0;i<10;i++){
				faceUpImages[i] = loadImage(  objjson["temas"].multimedia[i]);
			}
			numColumns = objjson["dificultat"].normal.columns;
			numRows = objjson["dificultat"].normal.rows;
			frameRate(objjson["dificultat"].normal.framerate);
		}
	}
	else if (tema == 'B') {
		if (diff == 1){
			for (var i=0;i<6;i++){
				faceUpImages[i] = loadImage(  objjson["temas"].biologia[i]);
			}
			numColumns = objjson["dificultat"].facil.columns;
			numRows = objjson["dificultat"].facil.rows;
			frameRate(objjson["dificultat"].facil.framerate);
		}
		else if (diff == 2) {
			for (var i = 0;i<10;i++){
				faceUpImages[i] = loadImage( objjson["temas"].biologia[i]);
			}
			numColumns = objjson["dificultat"].normal.columns;
			numRows = objjson["dificultat"].normal.rows;
			frameRate(objjson["dificultat"].normal.framerate);
		}
	}
	else if (tema == 'C') {
		if (diff == 1){
			for (var i=0;i<6;i++){
				faceUpImages[i] = loadImage( objjson["temas"].esport[i]);
			}
			numColumns = objjson["dificultat"].facil.columns;
			numRows = objjson["dificultat"].facil.rows;
			frameRate(objjson["dificultat"].facil.framerate);
		}
		else if (diff == 2) {
			for (var i = 0;i<10;i++){
				faceUpImages[i] = loadImage(  objjson["temas"].esport[i] );
			}
			numColumns = objjson["dificultat"].normal.columns;
			numRows = objjson["dificultat"].normal.rows;
			frameRate(objjson["dificultat"].normal.framerate);
		}
	}
	faceDownImage = loadImage(  objjson["temas"].faceDownImage );
	bombImage = loadImage( objjson["temas"].bomba );
	bombsound = loadSound(objjson["temas"].bombsound);
}

// p5.js functions
// --------------------------
function setup() {
    getAtributes();
    var myCanvas = createCanvas(800, 600);
    myCanvas.parent("game");
    gameVariables(diff,tema);
    createImagesDeck(faceUpImages);
    createTiles();

    stroke(255);
    strokeWeight(10);
    for (let i = 0; i<800; i++){
        xCor.push(iniciX + i * diff);
        yCor.push(iniciY);
    }

}

function draw() {
    timers();
    memory();
}

function memory() {
    updateGameLogic();

    for (let i = 0; i < tiles.length; i++) {
        tiles[i].render();
    }

    drawScoringMessage();
}

function timers() {
    // fill(0);
    // rect(iniciX,iniciY,800,50);
    // fill(0);
    background(0);
    for(let i=0;i < 800; i++){
        line(xCor[i],yCor[i],xCor[i+1],yCor[i+1]);
    }
    image(bombImage,700,500,100,100);
    updatePosicio();
    if (xCor[1] > 700 && xCor[1] < 710){
        bombsound.play();
    }
    if (xCor[1]>720 || checkCollision()){
        //Ha collisionat, per tant, fi del joc.
        console.log("FIIIIIIIIN");
        window.location.href = "end.html?fin=0";
        // alert('Hol');
    }
}

function mouseClicked() {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].isUnderMouse(mouseX, mouseY)) {
            if (flippedTiles.length < 2 && !tiles[i].isFaceUp) {
                tiles[i].setIsFaceUp(true);
                flippedTiles.push(tiles[i]);
                if (flippedTiles.length === 2) {
                    numTries++;
                    if (flippedTiles[0].faceUpImage === flippedTiles[1].faceUpImage) {
                        flippedTiles[0].isMatch = true;
                        flippedTiles[1].isMatch = true;
                    }
                    delayStartFC = frameCount;
                }
            }
        }
    }
}


function updatePosicio(){
    for (let i = 0; i < 800 - 1; i++) {
        xCor[i] = xCor[i + 1];
        yCor[i] = yCor[i + 1];
    }
    switch (direccio) {
        case 'right':
            xCor[800-1] = xCor[800-1] + diff;
            yCor[800-1] = yCor[800-1];
            break;
    }
}
function checkCollision(){
    const extremX = xCor[xCor.length-1];
    const extremY = yCor[yCor.length-1];
    for (let i = 0; i<xCor.length -1; i++){
        if (xCor[i] === extremX && yCor[i] === extremY){
            return true;
        }
    }
}

