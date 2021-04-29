// ========================================================
//              ESTABLISHING GLOBAL VARIABLES
// ========================================================
console.log("Linked");
const canvas = document.getElementById('canvas');           // Grabs the id="canvas" from the HTML
const ctx = canvas.getContext('2d');                        // Built-in HTML object that allows JavaScript to draw
canvas.width = 400;                                         // Establishes the canvas's width
canvas.height = 600;                                        // Establishes the canvas's height
const obstacles = [];                                       // Establishing an array placeholder that will be used in the Obstacles function
let keyPressed = false;                                     // Establishing a keyPressed variable to use for moving the character up
let score = 0;
let frame = 0;




// ========================================================
//                   CREATING THE CHARACTER
// ========================================================
class Character {
    constructor(){
        this.x = 25;
        this.y = canvas.height/2;
        this.width = 40;
        this.height = 40;
        this.velocity = 0;
        this.gravity = 0.5;
    }
    update(){
        if (this.y > canvas.height - this.height) {         // Setting a bottom limit
            this.y = canvas.height - this.height;
            this.velocity = 0;
        } else {
            this.velocity += this.gravity;                  // <--- A function that will endlessly add 'this.gravity' to the
            this.y += this.velocity;                        //      top of the Character - 'this.y' - simulating gravity
        }
        if (this.y < 0 + this.height) {                     // Setting a top limit
            this.y = 0 + this.height;
            this.velocity = 0;
        }
        if (keyPressed) this.jump();                        // Activates the jump function whenever 'Space' is pressed
    }
    draw(){
        ctx.fillStyle = 'blue';                             // Draws a blue square based on the variables established above
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    jump(){
        this.velocity -= 2;                                 // Moves the character up
    }
    click(){
        this.velocity -= 5;
    }
}
const character = new Character();




// ========================================================
//                  CREATING THE OBSTACLES
// ========================================================
class Obstacle {
    constructor() {
        this.top = (Math.random() * canvas.height/2.5) + 40;     // From top of the canvas to the middle; the length of the top obstacle
        this.bottom = (Math.random() * canvas.height/2.5) + 40;  // From middle of the canvas to the bottom; the length of the bottom obstacle
        this.x = canvas.width;                              // Where the obstacles start at on the x-axis
        this.size = 80;                                     // Obstacle's size
        this.color = 'black';                               // Obstacle's color
        this.speed = 3;                                     // Obstacle's speed
        this.score = false;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.size, this.top);       // Draw the top obstacle
        ctx.fillRect(this.x, canvas.height - this.bottom, this.size, this.bottom);  // Draw the bottom obstacle
    }
    update(){
        this.x -= this.speed;                               // Moves the obstacle to left based on the speed variable
        if (!this.score && this.x < character.x){           // <--- Keeps count of the score by seeing if the obstacle's x-axis
            score++;                                        //      is less than the character's x-axis meaning it has successfully passed the obstacle
            this.score = true;                              // Prevents the passed obstacle from being scored again
        }
        this.draw();
    }
}

function moveObstacles(){                                   // moveObstacle function
    if (frame % 80 === 0) {                                 // Every number divisible by 80 with remainder of 0 adds a new obstacle
        obstacles.unshift(new Obstacle);                    // Adds a new Obstacle into the array based on the frame
    }
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].update();
    }
    if (obstacles.length > 5){                              // Remove the last obstacle within the array once it contains greater than 5 obstacles
        obstacles.pop(obstacles[0]);
    }
}




// ========================================================
//                     HELPER FUNCTIONS
// ========================================================
function clearCanvas(){                                     // Canvas clearing function
    ctx.clearRect(0, 0, canvas.width, canvas.height);       // <--- Starts in the top left corner (0, 0)
}                                                           //      and goes all the way to the canvas's width and height

function displayScore(){
    ctx.fillStyle = 'lightgreen';
    ctx.font = '64px Arial';
    ctx.strokeText(score, 10, 60);
    ctx.fillText(score, 10, 60);
}


document.addEventListener('keydown', function(e){           // <--- Sets keyPressed variable to true when pressed
    if (e.code === 'Space') keyPressed = true;              //      so character can go up when pressed
});
document.addEventListener('keyup', function(e){             // <--- Sets keyPressed variable to false when released
    if (e.code === 'Space') keyPressed = false;             //      so character can go down when not pressed
});


document.addEventListener('click', function(){              // Registers clicks
    character.click();
});




// ========================================================
//                    COLLOSION DETECTION
// ========================================================
function gameOver(){
    for (let i = 0; i < obstacles.length; i++){
        if (character.x < obstacles[i].x + obstacles[i].size &&
            character.x + character.width > obstacles[i].x &&
            ((character.y < 0 + obstacles[i].top && character.y + character.height > 0) ||
            (character.y > canvas.height - obstacles[i].bottom &&
            character.y + character.height < canvas.height))){
                ctx.font = 'bold 36px sans-serif';
                ctx.fillStyle = 'pink';
                ctx.fillText("GAME OVER", 85, canvas.height/2);
                return true;
            }
    }
}




// ========================================================
//                        GAME SETUP
// ========================================================
function render(){                                          // Render function
    clearCanvas();                                          // Clears the screen beforehand
    character.update();                                     // Continuously invokes the update() function for gravity simulation
    character.draw();                                       // Invokes the character.draw function to create the character
    moveObstacles();                                        // Invokes the createObstacles function
    displayScore();                                         // Displays the score
    gameOver();                                             // Invokes the hitObstacles function whenever character runs into an obstacle
    if (gameOver()) return;                                 // Stops the game once an impact is detected
    requestAnimationFrame(render);                          // Perform an animation with the render function
    frame++;                                                // Continously increment the frame by 1 for every 'render' loop cycle
}
render();                                                   // Invokes the entire 'render' function









/*
// ===========================================================================================================================
// ===========================================================================================================================
// ===========================================================================================================================

class Character {
    constructor(){
        this.x = 25;
        this.y = canvas.height/2;
        this.width = 40;
        this.height = 40;
        this.velocity = 0;
        this.gravity = 0.5;
    }
    update(){
        if (this.y > canvas.height - this.height) {         // Setting a bottom limit
            this.y = canvas.height - this.height;
            this.velocity = 0;
        } else {
            this.velocity += this.gravity;                  // A function that will endlessly add 'this.gravity' to the
            this.y += this.velocity;                        // top of the Character - 'this.y' - simulating gravity
        }
        if (this.y < 0 + this.height) {                     // Setting a top limit
            this.y = 0 + this.height;
            this.velocity = 0;
        }
        if (keyPressed) this.jump();                        // Activates the jump function whenever 'Space' is pressed
    }
    draw(){
        ctx.fillStyle = 'blue';                             // Draws a blue square based on the variables established above
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    jump(){
        this.velocity -= 2;                                 // Moves the character up
    }
    click(){
        this.velocity -= 5;
    }
}
const character = new Character();



class Obstacle {
    constructor() {
        this.top = (Math.random() * canvas.height/2.5) + 40 ;     // From top of the canvas to the middle; the length of the top obstacle
        this.bottom = (Math.random() * canvas.height/2.5) + 40;  // From middle of the canvas to the bottom; the length of the bottom obstacle
        this.x = canvas.width;                              // Where the obstacles start at on the x-axis
        this.size = 80;                                     // Obstacle's size
        this.color = 'black';                               // Obstacle's color
        this.speed = 3;                                     // Obstacle's speed
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.size, this.top);       // Draw the top obstacle
        ctx.fillRect(this.x, canvas.height - this.bottom, this.size, this.bottom);  // Draw the bottom obstacle
    }
    update(){
        this.x -= this.speed;                           // Moves the obstacle to left based on the speed variable
        this.draw();
    }
}

function moveObstacles(){                                   // moveObstacle function
    if (frame % 80 === 0) {                                 // Every number divisible by 80 with remainder of 0 adds a new obstacle
        obstacles.unshift(new Obstacle);               // Adds a new Obstacle into the array based on the frame
    }
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].update();
    }
    if (obstacles.length > 5){                         // Remove the last obstacle within the array once it contains greater than 5 obstacles
        obstacles.pop(obstacles[0]);
    }
}



function clearCanvas(){                                     // Canvas clearing function
    ctx.clearRect(0, 0, canvas.width, canvas.height);       // Starts in the top left corner (0, 0)
}                                                           // and goes all the way to the canvas's width and height



document.addEventListener('keydown', function(e){           // Sets keyPressed variable to true when pressed
    if (e.code === 'Space') keyPressed = true;              // so character can go up when pressed
});
document.addEventListener('keyup', function(e){             // Sets keyPressed variable to false when released
    if (e.code === 'Space') keyPressed = false;             // so character can go down when not pressed
});


document.addEventListener('click', function(){              // Registers clicks
    character.click();
});



function render(){                                          // Render function
    clearCanvas();                                          // Clears the screen beforehand
    // clearRect(0, 0, canvas.width, canvas.height);
    character.update();                                     // Continuously invokes the update() function for gravity simulation
    character.draw();                                       // Invokes the character.draw function to create the character
    // hitDetection();
    moveObstacles();                                        // Invokes the createObstacle function
    handleCollisions();
    // hitObstacles();
    // if (hitObstacles()) return;
    if (handleCollisions()) return;
    requestAnimationFrame(render);                          // Perform an animation with the render function
    frame++;                                                // Continously increment the frame by 1 for every 'render' loop cycle
}
render();                                                   // Invokes the entire 'render' function


function hitObstacles(){
    for (let i = 0; i < obstacles.length; i++){
        if (character.x < obstacles[i].x + obstacles[i].size &&
            character.x + character.width > obstacles[i].x &&
            ((character.y < 0 + obstacles[i].top && character.y + character.height > 0) ||
            (character.y > canvas.height - obstacles[i].bottom &&
            character.y + character.height < canvas.height))){
                return true;
            }
    }
}
*/