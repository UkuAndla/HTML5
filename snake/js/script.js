$(document).ready(function () {
    // Define Vars
    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    var cw = 15;
    var d;
    var food;
    var score;
    var color = "blue";
    var speed = 50;
    var tail;

    // Snake Array
    var snake_array;

    // Initializer
    function init() {
        d="right";
        create_snake();
        createFood();
        score = 0;

        if (typeof game_loop != "undefined") {
            clearInterval(game_loop);
        }
        game_loop = setInterval(paint, speed);
    }

    init();

    // Create Snake
    function create_snake() {
        var length = 5;
        snake_array = [];
        for (var i = length - 1; i >= 0; i--) {
            snake_array.push({x: i, y: 0});
        }
    }

    // Create Food
    function createFood() {
        food = {
            x: Math.round(Math.random() * (w - cw) / cw),
            y: Math.round(Math.random() * (h - cw) / cw)
        };
    }

    function paint() {
        // Paint The Canvas
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "white";
        ctx.strokeRect(0, 0, w, h);

        var nx = snake_array[0].x;
        var ny = snake_array[0].y;

        if (d == 'right') {
            nx++;
        }
        else if (d == 'left') {
            nx--;
        }
        else if (d == 'up') {
            ny--;
        }
        else if (d == 'down') {
            ny++;
        }

        // Collision code
        if (nx == -1 || nx == w / cw || ny == -1 || ny == h / cw || checkCollision(nx, ny, snake_array)) {
            // init();

            // Insert Final Score
            $('#final_score').html(score);

            // Show Overlay
            $('#overlay').fadeIn(300);
            return;
        }

        if (nx == food.x && ny == food.y) {
            tail = {x: nx, y: ny};
            score++;

            // Create Food
            createFood();
        } else {
            tail = snake_array.pop();
            tail.x = nx;
            tail.y = ny;
        }

        snake_array.unshift(tail);

        for (var i = 0; i < snake_array.length; i++) {
            var c = snake_array[i];
            paint_cell(c.x, c.y);
        }
        // Paint Cell
        paint_cell(food.x, food.y);

        // Check Score
        checkScore(score);

        // Display Current Score
        $('#score').html('Your score: '+ score);
    }
    // Paint Cell function
    function paint_cell(x,y){
        ctx.fillStyle = color;
        ctx.fillRect(x*cw,y*cw,cw,cw);
        ctx.strokeStyle ="white";
        ctx.strokeRect(x*cw,y*cw,cw,cw);
    }
    // function
    function checkCollision(x, y, array){
        for(var i = 0; i < array.length; i++){
            if (array[i].x == x && array[i].y == y){
                return true;
            }
        }
        return false;
    }

    function checkScore(score){
        if(localStorage.getItem('highscore')=== null){
            // If there is no high score
            localStorage.setItem('highscore',score);
        } else {
            // If there is a high score
            if(score> localStorage.getItem('highscore')){
                localStorage.setItem('highscore',score);
            }
        }

        $('#high_score').html('High Score: ' + localStorage.highscore);
    }

    // Keyboard Controller
    $(document).keydown(function(e){
        var key = e.which;
        if(key == "37" && d !="right"){
            d="left";
        }
        else if(key == "38" && d !="down"){
            d="up";
        }
        else if(key == "39" && d !="left"){
            d="right";
        }
        else if(key == "40" && d !="up"){
            d="down";
        }
    });
});

function resetScore(){
    localStorage.highscore = 0;
    // Display High Score
    highscoreDiv = document.getElementById('high_score');
    highscoreDiv.innerHTML = 'High Score: 0';
}