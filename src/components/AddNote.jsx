import React, { useState } from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context =useContext(noteContext);
    const{addNote}=context;

    const [note,setNote]=useState({title:"",description:"",tag:""})
  
    const handleAdd=(e)=>{
        e.preventDefault();
      addNote(note.title,note.description,note.tag);
      setNote({title:"",description:"",tag:""})
      props.showAlert("Added successfully","success")
    }

    const onChange=(e)=>{
       setNote({...note,[e.target.name]:e.target.value})
    }


  return (
    <div>
      <div className="container">
    <h2 className='my-3'>Add a Note</h2>
    <form>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" name='title'  id="title" aria-describedby="titleHelp" value={note.title} onChange={onChange} minLength={8} required />
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" name="description" id="desription" value={note.description} onChange={onChange} minLength={8} required />
        </div>
        <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" name="tag" id="tag" value={note.tag} onChange={onChange} required />
        </div>
        <button disabled={note.title.length<8||note.description.length<8} type="submit" className="btn btn-primary" onClick={handleAdd} >Add Note</button>
    </form>
    </div>
    </div>
  )
}

export default AddNote


