// init
const CANVAS = document.getElementById("grid");
const ctx = CANVAS.getContext("2d");
let size = 80;
let grid;
let nextGrid

// reset grid
function reset() {
    grid = [];
    for(let i = 0; i < size; i++)
        grid.push(Array.from({length: size}, () => Math.floor(Math.random() *2)));
}

// draw grid
function draw() {
    ctx.beginPath();
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height)
    ctx.fillStyle = "white";
    let cellSize = CANVAS.width / size;
    for(let x = 0; x < size; x++)
        for(let y = 0; y < size; y++) 
            if (grid[x][y] == 1)
            ctx.fillRect(x*cellSize+1, y*cellSize+1, cellSize-2, cellSize-2);
}

function update() {
    draw();
    next_gen();
    grid = nextGrid;

    setTimeout(update, 100);
}
reset();
update();

// progress to the next generation
function next_gen() {
    nextGrid = [];
    for(let x = 0; x < size; x++) {
        nextGrid.push(new Array(size));
        for(let y = 0; y < size; y++) {
            nextGrid[x][y] = check_neighbours(x, y);
        }
    }
}

function check_neighbours(x, y) {
    let neighbourList = [[x-1,y-1],[x,y-1],[x+1,y-1],[x-1,y],[x+1,y],[x-1,y+1],[x,y+1],[x+1,y+1]];
    
    let count = 0;
    neighbourList.forEach(i => {
        i[0] < 0? i[0] = size-1 : i[0];
        i[0] > size-1? i[0] = 0 : i[0];
        i[1] < 0? i[1] = size-1 : i[1];
        i[1] > size-1? i[1] = 0 : i[1];
        if (grid[i[0]][i[1]] == 1) count++;
    });
    switch(count) {
        case 2: return grid[x][y];
        case 3: return 1;
        default: return 0;
    }
}
