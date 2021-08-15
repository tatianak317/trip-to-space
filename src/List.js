import React from 'react';
import { Link } from "react-router-dom";
import './Asteroid.css';


const noteUrl = "http://localhost:3030/insertNote"
class List extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      body: '',
      notes: []
    }
  }
  updateText(e, noteType) {
    let inputText = e.target.value;
    if (noteType === "title") {
      this.setState({ title: inputText });
    } else {
      this.setState({ body: inputText });
    }
  }
  addNote() {
    let notes = this.state.notes;
    let note = { title: this.state.title, body: this.state.body }
    let newNotes = notes.push(note);
    this.setState({ notes: notes });
      
    this.postNote(note)
      
  }
  
  async postNote(note) {
    // Example POST method implementation:
    // Default options are marked with *
    const response = await fetch(noteUrl, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit  
      headers: {
        'Content-Type':  'text/html;charset=utf-8'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(note) // body data type must match "Content-Type" header
    });
    // return response.json() // parses JSON response into native JavaScript objects
  }
  renderNotes() {
    if (this.state.notes.length) {
      return (
        <div className="subtitle">
          {this.state.notes.map((note, i) => <div key={i}> <p>Body: {note.body.title}</p> </div>)}
        </div>
      )
    }
  }
  async getNotes() {
    const noteFetch = await (await fetch('http://localhost:3030/notes')).json()
   
    if (noteFetch) {
      this.setState({ notes: noteFetch })
    }
  }
  componentDidMount() {
    this.getNotes();
  }

  render() {
    return (
      <div className="container-note">
        <h3 className="subtitle">Notes</h3>
        <input className='note' onChange={(e) => this.updateText(e, "title")}></input>
        <input className='note' onChange={(e) => this.updateText(e, "body")}></input>
        <button className='submit' onClick={() => this.addNote()}>Add Note</button>
  
        {this.renderNotes()}
      </div>
    )
  }
}

export default List;