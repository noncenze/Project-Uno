// GLOBAL DOM VARIABLES
console.log("Linked");
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 600;



// ESTABLISHING CONSTANTS AND VARIABLES
let spaceKey = false;
let angel = 0;
let hue = 0;
let frame = 0;



// CREATING THE CHARACTER
class Character {
    constructor(){
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.width = 20;
        this.height = 20;
        this.gravity = 1;
    }
    update(){
        this.vy += this.gravity;
        this.y += this.vy;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    flap(){
        this.vy -= 2;
    }
}
const character = new Character();



// GAME SETUP
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    character.update();
    character.draw();
    requestAnimationFrame(animate);
}
animate();


window.addEventListener('keydown', function(e){
    if (e.code === 'Space') spacePressed = true;
    console.log(e);
});




// HELPER FUNCTIONS




// COLLOSION DETECTION




// BIRD > PARTICLES > OBSTACLES > MAIN