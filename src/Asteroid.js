import React from 'react';
import key from './key';
import "./Asteroid.css" 
import { Link } from "react-router-dom";

class Asteroid extends React.Component {
    constructor(props) { //added props here and below, not sure if it makes a difference but saw it in an example
        super(props)
        this.state = {
          data: {},
          isLoaded: false, // added bbc also saw in an example, probably useful
          items:[], //added this to see if it's easier to render this way
          picture: {},
          start: "",
          end: "",
        };
       
    }

    async componentDidMount() {
        let image = await this.getPictureOfTheDay()
        let imageResponse = await image.json()

    this.setState({ picture: imageResponse })
    }

    getPictureOfTheDay() {
        return fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_KEY}`)
    }

    async getAsteroidData(start, end) {
        let data = await this.fetchAsteroidData(start, end)
        let parsedData = await data.json()

        let earth_objects
        let dates = []

        if(parsedData.near_earth_objects) {
            earth_objects = Object.keys(parsedData.near_earth_objects)
            earth_objects.map(date => {
                dates.push(parsedData.near_earth_objects[date])
               
            })
        }
        this.setState({items: dates, data: parsedData.near_earth_objects})  

    }

    fetchAsteroidData(start, end) {
        return fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${process.env.REACT_APP_NASA_KEY}`)
    }


    handleStartInput(e) {
        this.setState({start: e.target.value})
    }

    handleEndInput(e) {
        this.setState({end: e.target.value})
    }

    handleSubmitClick(e) {
        e.preventDefault()
        this.getAsteroidData(this.state.start, this.state.end)
        
    }



    renderError() {
        if ((Date.parse(this.state.end)-Date.parse(this.state.start)) > 604800000) {
            return <div>Dates should be no more than 7 days apart</div>
        }
    }

    renderInputs() {
        return <div>
            <h4 className="subtitle">Input Dates for Desired Time Span to Find Near Earth Asteroids</h4>
            <form className="form" onSubmit={(e) => this.handleSubmitClick(e)}>
                <div className="start">
                    <label htmlFor= "startDate">Start Date:</label>
                    <input id="startDate" type="date" onChange={(e) => this.handleStartInput(e)}>
                    </input>
                </div>
                <div className="end">
                    <label htmlFor= "endDate">End Date:</label>
                    <input id="endDate" type="date" onChange={(e) => this.handleEndInput(e)}>
                    </input>
                </div>
                {this.renderError()}
                <button className="submit">Submit</button>
            </form>
        </div>
    }


renderAsteroids() {
    return this.state.items.map((date, index) => {
        return (
            <div className="date" key={index}>
                {date.map((asteroid, index) =>{
                    return(
                        <div className="asteroid" key={index}>
                            <p className="asteroid-name">NAME: {asteroid.name}</p>
                            <p>ABSOLUTE MAGNITUDE: {asteroid.absolute_magnitude_h}</p>
                            <p>ID NUMBER: {asteroid.id}</p>
                            <p>ROUNDED DIAMETER: {Math.round(asteroid.estimated_diameter.feet.estimated_diameter_max)} ft</p>
                        </div>)
                })}
            </div>
        )
    })
}
renderMediaOfTheDay() {
    if(this.state.picture.media_type == "video") {
        return <iframe className="image" src={this.state.picture.url} />
    } else {
        return <img className="image" src={this.state.picture.url} />
    }
}

    render() {
        return (
            <div className="container">
                <header>
                    <h1 id="title" className="subtitle">Picture of the Day!</h1>
                    <h3 id="picture-name" className="subtitle">{this.state.picture.title}</h3>
                    {this.renderMediaOfTheDay()}
                </header>
                {this.renderInputs()}
                <div className="asteroidsRendered">
                    {this.renderAsteroids()}
                </div>
            </div>

        );
    }
}
export default Asteroid;  