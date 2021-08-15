import image from './images/vitaly_white.svg'
import platformBackground from './images/Rectangle5.svg'
import space from './images/space.jpeg'
import "./Game.css"

//canvas and char/platform width/height
let canvas, context; 
let charPos = { x: 0, y: 0 }
let charWidth = 10;
let charHeight = 10;
let platformWidth = 130;
let platformHeight = 30;

//image set up
let platforms = [];
let charImage = new Image(charWidth, charHeight);
charImage.src = image;
let platformImage = new Image(platformWidth, platformHeight);
platformImage.src = platformBackground;
let spaceImg = new Image(700, 800);
spaceImg.src = space;

//other variables
let index = 0;
let gameRunning = false;
let score = 0
let highScore = 0;
document.querySelector(".score") //const scoreDiv = 

export const gameRunningUpdate = () => {
    gameRunning = true;

}
export const getContext = () => {
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
}
export const drawCharacter = () => {
    context.drawImage(charImage, charPos.x, charPos.y)
}
export const menu = () => {
    context.font = '100px Audiowide';
    context.fillText('Welcome', 125, 300);

    context.font = '60px Audiowide';
    context.fillText("High Score: " + localStorage.getItem("high score"), 90, 450)
}
export const gameLoop = () => {
    if (gameRunning === false) {
        context.clearRect(0, 0, 1000, 1000)
        return endMenu()
    }
    context.clearRect(0, 0, 700, 800)
    scoreCounter()
    fall()
    drawCharacter()
    movePlatforms()
    index++
    if (index === 90) {
        addPlatform()
        index = 0
    }
    drawPlatforms()
    collision()
    detectOffPage()
    window.requestAnimationFrame(gameLoop)
}
export const storeScore = () => {
    highScore = localStorage.getItem("high score")
    if (score > highScore) {
        localStorage.setItem("high score", JSON.stringify(score))
        post(score)
    }
}
const post = (score) => {
    let usernameForPost = localStorage.getItem("Username")
    if (usernameForPost) {
          fetch(`${process.env.API_URL}/updateScore`, {
        method: 'POST',
            body: JSON.stringify({
            username: usernameForPost,
            highScore: score,
        }),
        headers: {
         'Content-Type': 'application/json; charset=UTF-8',
        },
        })
          
          .then((response) => {
            return response.json()
        }) 
    }
         
}
export const movePlatforms = () => {
    platforms.forEach((platform) => {
        platform.y += 1;
    })

}
export const addPlatform = () => {
    platforms.push({x: getRandom(600), y: 0})
}

export const endMenu = () => {

    quit()

    context.clearRect(0, 0, 1000, 1000)

    context.font = '100px Audiowide';
    context.fillText('Game Over', 60, 300);

    context.font = '60px Audiowide';
    context.fillText("Score: " + score, 200, 450)

    context.font = '60px Audiowide';
    context.fillText("High Score: " + localStorage.getItem("high score"), 80, 550)
    score = 0; 
}
 
export const jump = () => {
    charPos.y -=2;
}
export const fall = () => {
    charPos.y += 2; 
}

export const drawPlatforms = () => {
    platforms.forEach((platform) => {
        context.drawImage(platformImage, platform.x, platform.y, platformWidth, platformHeight)
    })
}

export const startPlatforms = () => {
    for (let y = 0; y < 800; y += 80) {
        for (let x = 0; x < 700; x += 80) {
            let platform = { x: getRandom(x), y: y}
            platforms[y] = platform
        }
    }
}

const getRandom = (max) =>  {
    return Math.floor(Math.random() * (max))
}

export const moveLeft = () => {
    charPos.x -= 50;
}

export const moveRight = () => {
    charPos.x += 50;
}
export const moveUp = () => {
    charPos.y -= 50;
}
export const collision = () => {
  platforms.forEach((platform) => {
      
    if(
      charPos.x < platform.x + platformWidth &&
      charPos.x + 100 > platform.x &&
      charPos.y + 100 < platform.y + platformHeight &&
      charPos.y + 100 > platform.y
    ) {
        // loop to subtract and move up; add counter and if to check
        // change direction to up and then back to fall() after
        charPos.y -= 100
        charPos.x -= 10
        score += 10 //issue right now is that if you jump on a platform twice it counts it both times; so many score is by time or maybe it doesnt matter
    }
      
  });
}
export const scoreCounter = () => {
    context.font = '30px Audiowide';
    context.fillText("score: " + score, 5, 40, 400);
}
export const detectOffPage = () => {
    if (charPos.y > 800) {
        quit()
    }
}

export const quit = () => {
    gameRunning = false;
    charPos = {x: 0, y: 0}
    storeScore()
}
/*
TO DO:
    -Fix what it looks like on full page and smaller screen
    -fix differences between platforms 
*/
