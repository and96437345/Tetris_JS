const canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
ctx.fillRect(0, 0, 500, 900);
ctx.clearRect(10,0,480,890);
ctx.strokeRect(10,0,480,890);
ctx.font = '28pt Calibri';
        
const gameMap = [];

const createGameMap = () => {
    for (let i = 0; i < 21; i++) {
        gameMap[i] = [];
        for (let j = 0; j < 10; j++) {
            gameMap[i][j] = ' ';
        }        
    }
    gameMap[20] = ['[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]'];
}

const clearGameMap = () => {
    ctx.clearRect(10,0,480,890);
}

const displayGameMap = () => {
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 10; j++) {
            ctx.fillText(gameMap[i][j], 30 + (j * 47), 40 + (i * 44));
        }       
    }    
}

const figureO = [
    [0, 1, 1],
    [0, 1, 1]
];
const figureT = [
    [1, 1, 1],
    [0, 1, 0],
];
const figureS = [
    [0, 1, 1],
    [1, 1, 0]
];
const figureZ = [
    [1, 1, 0],
    [0, 1, 1]
];
const figureJ = [
    [1, 1, 1],
    [0, 0, 1]
];
const figureL = [
    [1, 1, 1],
    [1, 0, 0]
];
const figureI = [
    [1, 1, 1, 1],
    
];

const displayFigure = (figureArr, x, y) => {
    for (let i = 0; i < figureArr.length; i++) {
        for (let j = 0; j < figureArr[i].length + 0; j++) {
            if (figureArr[i][j] == 1) {
                gameMap[i+y][j+x] = '[]';
            }
        }       
    }    
}

const clearFigure = (figureArr, x, y) => {
    for (let i = 0; i < figureArr.length; i++) {
        for (let j = 0; j < figureArr[i].length + 0; j++) {
            if (figureArr[i][j] == 1) {
                gameMap[i+y-1][j+x] = '';
            }
        }       
    }  
}

const collisionDetection = (figureArr, x, y) => {
    for (let i = figureArr.length - 1; i < figureArr.length; i++) {
        for (let j = 0; j < figureArr[i].length + 0; j++) {
            if (figureArr[i][j] == 1) {
                if (gameMap[i+y+1][j+x] == '[]') {
                    return true;
                }
            }
        }       
    }  
}

const changeFigure = () => {
    figure = Math.floor(Math.random() * 7);
    if (figure == 0) return figureO;
    if (figure == 1) return figureT;
    if (figure == 2) return figureS;
    if (figure == 3) return figureZ;
    if (figure == 4) return figureJ;
    if (figure == 5) return figureL;
    if (figure == 6) return figureI;
}

const rotateFigure = (figure) => {
    for (let i = 0; i < figure.length; i++) {
        for (let j = 0; j < figure[i].length + 0; j++) {
            figure[i][j] = figure[j][i];
        }       
    }
    return figure;
}

let y = 0;
let x = 3;
let figure;
let timerId;
document.addEventListener('keydown', function(event) {
    console.log(event.code);
    if (event.code == 'ArrowLeft') {
        x -= 1;
    }
    if (event.code == 'ArrowRight') {
        x += 1;
    }
    if (event.code == 'ArrowUp') {
        figure = rotateFigure(figure);
    }
    if (event.code == 'ArrowDown') {
        y += 1;
    }
  });
const moveDown = (figure) => {
    
    clearGameMap();
    
    displayFigure(figure, x, y);
    
    if (y < 19 && collisionDetection(figure, x, y) !== true ) {
        y++;
    } else {
        y = 0;
        clearInterval(timerId);
        gameLoop();
    }

    displayGameMap();
    clearFigure(figure, x, y);
        
};
const gameLoop = () => {
    figure = changeFigure();
    timerId = setInterval(() => moveDown(figure), 500);
// 
}

createGameMap();
gameLoop();


// clearGameMap();
console.log(gameMap);
