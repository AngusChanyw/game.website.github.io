const boxSize = 25;
const boxColor = 150;
const borderColor = 150;
let columns;
let rows;
let firstBoard;
let secondBoard;
let slider;
let colorSlider;

let x = 4;
let y = 11;
let boo = false;
let mouseBoo = false;
let startKey = false;

function setup() {
    colorSlider = createSlider(50, 160, 350);
    colorSlider.position(95, windowHeight - 190);
    colorSlider.style('width', '100px');

    slider = createSlider(0, 15, 25);
    slider.position(410, windowHeight - 190);
    slider.style('width', '100px');

    const canvas = createCanvas(windowWidth, windowHeight - 150); 
    canvas.parent(document.querySelector('#canvas'));

    columns = floor(width / boxSize);
    rows = floor(height / boxSize) - 2;
    firstBoard = [];
    secondBoard = [];
    for (let i = 0; i < columns; i++) {
        firstBoard[i] = [];
        secondBoard[i] = [];
    }
    init();
}

function init() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            firstBoard[i][j] = 0;
            secondBoard[i][j] = 0;     
        }    
    }
}

function draw() {
    background(255);
    
    const fr = slider.value();
    const color = colorSlider.value();
    text('Box Color', colorSlider.width -100 + colorSlider.width -85, windowHeight - 180);
    text('Speed Control', slider.width + slider.width + 100, windowHeight - 180);
    
    frameRate(fr);
    if (startKey == true) {
        generate();
    }
    textSize(15);

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (firstBoard[i][j] == 1){
                fill(color);
            } else {
                fill(255)
            }
            stroke(borderColor);
            rect(i * boxSize, j * boxSize, boxSize, boxSize);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight - 150);
    
    columns = floor(width / boxSize);
    rows = floor(height / boxSize) - 2;
    firstBoard = [];
    secondBoard = [];
    for (let i = 0; i < columns; i++) {
        firstBoard[i] = [];
        secondBoard[i] = [];
    }
    init();
}

function generate() {
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            let otherBox = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if (i == 0 && j == 0) {
                        continue;
                    }
                    otherBox += firstBoard[(x + i + columns) % columns][(y + j + rows) % rows];
                }
            }
            if  (firstBoard[x][y] == 1 && otherBox < 2){
                secondBoard[x][y] = 0;
            } else if (firstBoard[x][y] == 1 && otherBox > 3) {
                secondBoard[x][y] = 0;
            } else if (firstBoard[x][y] == 0 && otherBox == 3) {
                secondBoard[x][y] = 1;
            } else {
                secondBoard[x][y] = firstBoard[x][y];
            }
        }
    }
    [firstBoard, secondBoard] = [secondBoard, firstBoard];
}

function mouseDragged() {

    if (mouseX > boxSize * columns || mouseY > boxSize * rows) {
        return;
    }
    const x = Math.floor(mouseX / boxSize);
    const y = Math.floor(mouseY / boxSize);
    if (mouseBoo == true) {
        firstBoard[x][y] = 1;
    // console.log(`x=${x}`)
    // console.log(`y=${y}`)
    fill(boxColor);
    stroke(borderColor);
    rect(x * boxSize, y * boxSize, boxSize, boxSize);
    }
}

function mousePressed() {
    if (startKey == true) {
        noLoop();
        mouseDragged();
    }  
}

function mouseReleased() {
    if (startKey == true) {
    loop();
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW && boo == true) {
        init()
        y--;
        testMode();
        checkWin();
    } else if (keyCode === DOWN_ARROW && boo == true){
        init();
        y++;
        testMode();
        checkWin();
    } else if (keyCode === LEFT_ARROW && boo == true){
        init();
        x--;
        testMode();
        checkWin();
    } else if (keyCode === RIGHT_ARROW && boo == true){
        init();
        x++;
        testMode();
        checkWin();
    }
}

function glider() {
    firstBoard[9][11] = 1;
    firstBoard[11][11] = 1;
    firstBoard[11][12] = 1;
    firstBoard[10][12] = 1;
    firstBoard[10][13] = 1;
}

function spaceship() {
    let x = 10;
    let y = 10;

    firstBoard[x - 5][y - 3] = 1;
    firstBoard[x - 4][y - 2] = 1;
    firstBoard[x - 4][y - 3] = 1;
    firstBoard[x - 4][y - 4] = 1;
    firstBoard[x - 3][y - 5] = 1;
    firstBoard[x - 3][y - 4] = 1;
    firstBoard[x - 2][y - 4] = 1;
    firstBoard[x - 1][y - 4] = 1;
    firstBoard[x][y - 4] = 1;
    firstBoard[x][y - 3] = 1;
    firstBoard[x + 1][y - 3] = 1;
    firstBoard[x + 1][y - 1] = 1;
    firstBoard[x + 3][y - 3] = 1;
    firstBoard[x + 4][y - 2] = 1;
    firstBoard[x + 3][y - 1] = 1;
    firstBoard[x - 2][y - 1] = 1;
    firstBoard[x - 3][y - 1] = 1;

    firstBoard[x - 2][y + 1] = 1;
    firstBoard[x - 3][y + 1] = 1;
    firstBoard[x - 4][y + 2] = 1;
    firstBoard[x - 5][y + 3] = 1;
    firstBoard[x - 4][y + 3] = 1;
    firstBoard[x - 4][y + 4] = 1;
    firstBoard[x - 3][y + 4] = 1;
    firstBoard[x - 3][y + 5] = 1;
    firstBoard[x - 2][y + 4] = 1;
    firstBoard[x - 1][y + 4] = 1;
    firstBoard[x][y + 4] = 1;
    firstBoard[x][y + 3] = 1;
    firstBoard[x + 1][y + 3] = 1;
    firstBoard[x + 1][y + 1] = 1;
    firstBoard[x + 3][y + 1] = 1;
    firstBoard[x + 4][y + 2] = 1;
    firstBoard[x + 3][y + 3] = 1;
}

function randomTwo() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            firstBoard[i][j] = random() > 0.8 ? 1 : 0;
            secondBoard[i][j] = 0;     
        }    
    }
}

function pacMan() {
    let x = 10;
    let y = 10;

    firstBoard[x - 9][y + 7] = 1;
    firstBoard[x - 8][y + 7] = 1;
    firstBoard[x - 7][y + 7] = 1;
    firstBoard[x - 7][y + 8] = 1;
    firstBoard[x - 7][y + 9] = 1;

    firstBoard[x - 6][y + 6] = 1;
    firstBoard[x - 5][y + 5] = 1;
    firstBoard[x - 4][y + 4] = 1;
    firstBoard[x - 3][y + 3] = 1;
    firstBoard[x - 2][y + 2] = 1;
    firstBoard[x - 1][y + 1] = 1;
    firstBoard[x][y] = 1;
    firstBoard[x + 1][y - 1] = 1;
    firstBoard[x + 2][y - 2] = 1;
    firstBoard[x + 3][y - 3] = 1;
    firstBoard[x + 4][y - 4] = 1;

    firstBoard[x + 5][y - 5] = 1;
    firstBoard[x + 6][y - 5] = 1;
    firstBoard[x + 6][y - 4] = 1;  
}


function testMode() {
    firstBoard[x + 1][y + 5] = 1;
    firstBoard[x + 2][y + 5] = 1;
    firstBoard[x + 1][y + 6] = 1;
    firstBoard[x + 2][y + 7] = 1;
    firstBoard[x + 3][y + 6] = 1;

    firstBoard[1][16] = 1;
    firstBoard[1][17] = 1;
    firstBoard[2][17] = 1;
    firstBoard[2][17] = 1;

    firstBoard[1][11] = 1;
    firstBoard[1][12] = 1;
    firstBoard[2][11] = 1;
    firstBoard[2][12] = 1;

    firstBoard[1][6] = 1;
    firstBoard[1][7] = 1;
    firstBoard[2][6] = 1;
    firstBoard[2][7] = 1;

    firstBoard[1][1] = 1;
    firstBoard[1][2] = 1;
    firstBoard[2][1] = 1;
    firstBoard[2][2] = 1;

    
    firstBoard[10][16] = 1;
    firstBoard[10][17] = 1;
    firstBoard[11][16] = 1;
    firstBoard[11][17] = 1;

    firstBoard[10][10] = 1;
    firstBoard[10][11] = 1;
    firstBoard[11][10] = 1;
    firstBoard[11][11] = 1;

    firstBoard[10][1] = 1;
    firstBoard[10][2] = 1;
    firstBoard[11][1] = 1;
    firstBoard[11][2] = 1;


    firstBoard[13][5] = 1;
    firstBoard[14][5] = 1;
    firstBoard[13][6] = 1;
    firstBoard[14][7] = 1;
    firstBoard[15][6] = 1;
}


let reset = document.querySelector('#reset-game');
reset.addEventListener('click', function() {
    init();
});

let ran = document.querySelector('#random');
ran.addEventListener('click', function(){
    randomTwo();
    startKey = false;
});

let gil = document.querySelector('#glider');
gil.addEventListener('click', function(){
    init();
    glider();
    startKey = false;
});

let space = document.querySelector('#spaceship');
space.addEventListener('click', function(){
    init();
    spaceship()
    startKey = false;
})

let pac = document.querySelector('#pac');
pac.addEventListener('click', function(){
    init();
    pacMan()
    startKey = false;
});

let gameSta = document.querySelector('#gameStart')
gameSta.addEventListener('click', function(){
    init();
    testMode();
    boo = true;
});

let gameSto = document.querySelector('#gameStop')
gameSto.addEventListener('click', function(){
    boo = false;
    init();
    x = 4
    y = 11
});

let start = document.querySelector('#start');
start.addEventListener('click', function(){
    startKey = true;
});

let stop = document.querySelector('#stop');
stop.addEventListener('click', function(){
    startKey = false;
});

let mouseSta = document.querySelector('#mouseStart')
mouseSta.addEventListener('click', function(){
    mouseBoo = true;
})

let mouseSto = document.querySelector('#mouseStop')
mouseSto.addEventListener('click', function(){
    mouseBoo = false;
    init();
})

function checkWin(){
    if (firstBoard[11][6] == 1){
        window.alert("you are win")
        init();
        boo = false;
        x = 4
        y = 11
    } else if (
        firstBoard[8][17] == 1 ||
        firstBoard[8][16] == 1 ||

        firstBoard[4][17] == 1 ||
        firstBoard[4][16] == 1 ||

        firstBoard[4][12] == 1 ||
        firstBoard[4][11] == 1 ||

        firstBoard[8][11] == 1 ||
        firstBoard[8][10] == 1 ||

        firstBoard[4][6] == 1 ||
        firstBoard[4][7] == 1 ||

        firstBoard[4][1] == 1 ||
        firstBoard[4][2] == 1 ||

        firstBoard[8][2] == 1 ||
        firstBoard[8][1] == 1 ||

        firstBoard[10][19] == 1 ||
        firstBoard[11][19] == 1 ||
        firstBoard[2][19] == 1 ||
        firstBoard[1][19] == 1 ||

        firstBoard[10][4] == 1 ||
        firstBoard[11][4] == 1 ||
        firstBoard[10][8] == 1 ||
        firstBoard[11][8] == 1
        ) {
        window.alert("you are lose")
        init();
        boo = false;
        x = 4
        y = 11
    }
}