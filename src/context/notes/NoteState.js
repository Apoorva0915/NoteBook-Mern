import React, { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial =[]
  const [notes, setNotes] = useState(notesInitial);

  //  GET All a Note
  const getNotes = async () => {
    //  Api call
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
  
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  //  Add a Note
  const addNote = async (title, description, tag) => {
    //  Api call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });
 
    const note = await response.json()
    setNotes(notes.concat(note));
  
  }

  // Delete a Note  
  const deleteNote = async (id,title,description,tag) => {
    //  Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = response.json();
    // console.log(json)
   
    // console.log("note deleted" + id)
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote);
  }

  // Edit A Note

  const editNote = async (id, title, description, tag) => {
    //  Api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = await response.json()
    // console.log(json)

    
    let newNotes=JSON.parse(JSON.stringify(notes))


    // logic to edit in client

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }


  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;
