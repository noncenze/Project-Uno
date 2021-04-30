# FLYING SQUARE GAME

## Introductions
A Flappy Bird-esque game with the objective of navigating your `square` through the opening between the top and bottom obstacles to score a point. <br/>
As long as player's do not touch one of the many spawning objects, they will continue to accrue points. See how far you can go before you get touch one of the obstacles.

## Project Status
The core functionality of the game is completed, for the most part. <br/>
However, I do plan on updating it as time goes on to improve on it and build a completely new game out of it.



# GAME SETUP

## Installation Guide
1. Navigate to [this](https://github.com/noncenze/Project-Uno) respository
2. `fork` the repository
3. Locate the `code` button and copy the provided `URL`
4. Navigate to a directory where the files will be cloned to
5. `clone` to your local machine with the following command:
```
git clone https://github.com/noncenze/Project-Uno
```
6. Go to the `Project-Uno` directory
7. Open the `index.html` file in any browser

## How to play
Players can use either the `Spacebar` on their keyboard or `left-click` with your mouse to make the `square` to fly. <br/>
Navigate through the opening and try not to touch any of the obstacles to see how high of a score you can achieve.



# UNDER THE HOOD

Most the development for this game was done in JavaScript with some HTML and CSS elements. I wanted to limit majority of the development and functionality to JavaScript as I felt it was easier to construct and manipulate for any future updates. Initially, I approached the project by breaking it down into small pieces with the character, the top/bottom obstacles, and detecting collision being the core components of the game. I'll go into more detail about how I approached each component.

## Creating the Character
The first thing I created was the character as I wanted to address the gravity feature. In other words, if the players took no actions in making the character fly, they would simply fall to the bottom of the screen. Afterwards, I wanted to allow players two different methods of playing the game: either with a keyboard or a mouse. I had to set two different velocity speeds for each input because the velocity wasn't strong enough to accomodate a mouse click. Thus, the easiest way to alleviate that was by setting two different amount for each input.

![Character Creation Code](/Screenshots/char_code.png)

## Creating the Obstacles
The next thing I had to create was the obstacles and make them 'spawn' a certain amount. I was able to facilitate that with a frame conditional that allowed them to replicate every 100 frames, which I felt was a good amount. Afterwards, I was able to incorporate a score tracking system by comparing the x-axis of the character and obstacles. If the character's x-axis was greater than the obstacle's x-axis, it meant they had successfully jumped past it which the score would increase by 1. Once that was done, that specific obstacle would be set to 'true' so it couldn't be scored again if player's were able to go past it again.

![Obstacles Code](/Screenshots/obstacles_code.png)

## Hit Detection
The hit detection coding proved to be the most difficult as I had to deal with two different obstacles and the character. After much experimentation and researching, I was able to figure something out by ducting a bunch of code together into a hideous conditional code. If your brain hurts or eyes burns from reading it, I apologize; but if it works, it works. 🤷‍♂️

![Hit Detection Code](/Screenshots/hit_code.png)



# ADDITIONAL INFORMATION

## Planning Process
Fancy doodle of me trying to figure out how to address collosion detection.

![Box Sketch](/Screenshots/sketch.jpeg)

## Early Versions
Early attempts of trying to fine tune the creation of obstacles lead to some difficult/impossible variations. I've debated leaving it this way since it worked. 

![Difficult Obstacles](/Screenshots/difficult.png)

![Impossible Obstacles](/Screenshots/impossible.png)

## Future Considerations
* Implement a better way to randomize the gap size, obstacle size, and location
* Add some enemies or varying obstacles
* Add special powers abilities
* Add a multiplayer function to allow players to compete or battle each other
* Add sprites and images
* Add nifty background music and sound effects
* Add a 'Start' menu