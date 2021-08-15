import { Component } from "react";
import key from './key';
import "./Home.css"

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pictures: [],
        };
        
    }
    async componentDidMount() {
        let image = await this.getPictureOfTheDay()
        let imageResponse = await image.json()
    this.setState({ pictures: imageResponse })
    }
//update date 
    getPictureOfTheDay() {
        return fetch(`https://api.nasa.gov/planetary/apod?start_date=2021-07-20&api_key=${key}`)
    }
    renderMediaOfTheDay(image, index) {
    if(image.media_type == "video") {
        return <iframe className="image" src={image.url} key={index} />
    } else {
        return (
            <div>
                <img className="image" src={image.url} key={index} />
                <p className="subtitle">{ image.title }</p>
            </div>
            
        )
    }
    }
    renderMedia() {
        if (this.state.pictures) {
            return this.state.pictures.map((image, index) => {
            return this.renderMediaOfTheDay(image, index)
        });
        }
    }
    render() {
        return (
            <div className="container">
                <h1 className="title" >Pictures of the Day!</h1>
                <div>
                    {this.renderMedia()}
                </div>
            </div>

        );
    }
}
export default Home; 