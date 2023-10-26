import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'


const NotesItem = (props) => {
    const context=useContext(noteContext)
    const {deleteNote}=context
    const { notes , updateNote} = props
    return (
        <div className='col md-3'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    <p className="card-text">{notes.description}</p>
                    <i className='far fa-trash-alt ' onClick={()=>{deleteNote(notes._id);props.showAlert("Deleted Successfully","success")}}></i>
                    <i className=' far fa-edit mx-3' onClick={()=>{updateNote(notes)}}></i>
                </div>
            </div>
        </div>
    )
}

export default NotesItem;