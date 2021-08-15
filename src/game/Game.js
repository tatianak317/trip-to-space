import { Component } from "react";
import "./Game.css";
import { getContext, gameLoop, startPlatforms, moveLeft, moveRight, menu, gameRunningUpdate, endMenu, moveUp, quit} from "./logicHelper";


class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            score: 0,
            highScore: 0,
        };
        this.handleKey = this.handleKey.bind(this);
    }
    componentDidMount() {
        document.addEventListener("keydown", this.handleKey)
        getContext()
        menu()
        startPlatforms()
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKey)
        quit()
    }
    handleKey(e) {
        e.preventDefault()
        switch (e.key) {
            case 'ArrowRight':
                moveRight()
                break;
            case 'ArrowLeft':
                moveLeft()
                break;
            case 'ArrowUp':
                moveUp()
                break;
            default:
                console.log('not an expected key')
        }
    }

    startGame() { // doesn't restart after ended
        gameRunningUpdate()
        gameLoop()
    }

    endGame() {
        this.updateHighScore()
        endMenu()
    }

    updateHighScore(score) {
        this.setState({ highScore: score })
    }
        render() {
            return (
                <div className="body">
                    <button className="menu" id="start" onClick={() => { this.startGame() }}>Start Game</button>
                    <canvas width="700" height="790" id="canvas">
                    </canvas>
                    <button className="menu" id="start" onClick={() => { this.endGame() }}>End Game</button>
                </div>)
        }
}
export default Game
