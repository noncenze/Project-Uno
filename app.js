// ========================================================
//              ESTABLISHING GLOBAL VARIABLES
// ========================================================
console.log("Linked");
const canvas = document.getElementById('canvas');           // Grabs the id="canvas" from the HTML
const ctx = canvas.getContext('2d');                        // Built-in HTML object that allows JavaScript to draw
canvas.width = 400;                                         // Establishes the canvas's width
canvas.height = 600;                                        // Establishes the canvas's height
const obstaclesArray = [];                                  // Establishing an array placeholder that will be used in the Obstacles function
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




// ========================================================
//                  CREATING THE OBSTACLES
// ========================================================
class Obstacle {
    constructor() {
        this.top = (Math.random() * canvas.height/3) + 40;  // From top of the canvas to the middle; the length of the top obstacle
        this.bottom = (Math.random() * canvas.height/3) + 40;     // From middle of the canvas to the bottom; the length of the bottom obstacle
        this.width = canvas.width;                          // Obstacle's width
        this.size = 80;                                     // Obstacle's size
        this.color = 'black';                               // Obstacle's color
        this.speed = 3;                                     // Obstacle's speed
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.width, 0, this.size, this.top);
        ctx.fillRect(this.width, canvas.height - this.bottom, this.size, this.bottom);
    }
    update(){
        this.width -= this.speed;                           // Moves the obstacle to left based on the speed variable
        this.draw();
    }
}

function moveObstacles(){                                   // moveObstacle function
    if (frame % 80 === 0) {                                 // Every number divisible by 80 with remainder of 0 adds a new obstacle
        obstaclesArray.unshift(new Obstacle);               // Adds a new Obstacle into the array based on the frame
    }
    for (let i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray[i].update();
    }
    if (obstaclesArray.length > 5){                         // Remove the last obstacle once the array is greater than 5
        obstaclesArray.pop(obstaclesArray[0]);
    }
}




// ========================================================
//                     HELPER FUNCTIONS
// ========================================================
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




// ========================================================
//                        GAME SETUP
// ========================================================
function render(){                                          // Render function
    clearCanvas();                                          // Clears the screen beforehand
    character.update();                                     // Continuously invokes the update() function for gravity simulation
    character.draw();                                       // Invokes the character.draw function to create the character
    requestAnimationFrame(render);                          // Perform an animation with the render function
    moveObstacles();                                        // Invokes the createObstacle function
    frame++;                                                // Continously a frame to the 
}
render();                                                   // Invokes the entire 'render' function




// ========================================================
//                    COLLOSION DETECTION
// ========================================================
