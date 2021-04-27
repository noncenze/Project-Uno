// ====================================================
// ESTABLISHING GLOBAL VARIABLES
// ====================================================
console.log("Linked");
const canvas = document.getElementById('canvas');           // Grabs the id="canvas" from the HTML
const ctx = canvas.getContext('2d');                        // Built-in HTML object that allows JavaScript to draw
canvas.width = 400;                                         // Establishes the canvas's width
canvas.height = 600;                                        // Establishes the canvas's height
let keyPressed = false;                                     // Establishing a keyPressed variable to use for moving the character up



// ====================================================
// CREATING THE CHARACTER
// ====================================================
class Character {
    constructor(){
        this.x = 25;
        this.y = canvas.height/2;
        this.width = 20;
        this.height = 20;
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
}
const character = new Character();




// ====================================================
// HELPER FUNCTIONS
// ====================================================
function clearCanvas() {                                    // Canvas clearing function
    ctx.clearRect(0, 0, canvas.width, canvas.height);       // Starts in the top left corner (0, 0)
}                                                           // and goes all the way to the canvas's width and height


document.addEventListener('keydown', function(e){           // Sets keyPressed variable to true when pressed
    if (e.code === 'Space') keyPressed = true;              // so character can go up when pressed
});
document.addEventListener('keyup', function(e){             // Sets keyPressed variable to false when released
    if (e.code === 'Space') keyPressed = false;             // so character can go down when not pressed
});




// ====================================================
// GAME SETUP
// ====================================================
function render(){                                          // Render function
    clearCanvas();                                          // Clears the screen beforehand
    character.update();                                     // Incorporates gravity to the Character via the character.update function
    character.draw();                                       // Draws the character onscreen via the character.draw function
    requestAnimationFrame(render);                          // Perform an animation with the render function
}
render();                                                   // Invokes the entire 'render' function



// COLLOSION DETECTION




// BIRD > PARTICLES > OBSTACLES > MAIN