import notecontext from './notecontext'
import React, { useState } from 'react'

const Notestate = (props) => {
  const HOST = "http://localhost:5000"
  const intialnotes = []

  const [notes, setnotes] = useState(intialnotes)

  // get all notes
  const getallnotes = async () => {
    const res = await fetch(`${HOST}/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("token")
      }
    })
    const json = await res.json();
    // console.log(json);
    setnotes(json)
  }

  // add new note
  const addnote = async (title, description, tag) => {
    // API call
    const res = await fetch(`${HOST}/api/notes/createnotes`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({title, description, tag})
    })

    const note = await res.json();
    setnotes(notes.concat(note))
  }

  // delete
  const deletenote = async (id) => {
    // API call
    const res = await fetch(`${HOST}/api/notes/deletenote/${id}`, {
      // eslint-disable-next-line
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("token"),
      }
    })
    console.log(res)

    // client rendering
    const newnotes = notes.filter((note) => {return (note._id !== id)})
    setnotes(newnotes)
  }

  // edit
  const editnote = async (title, description, tag, id) => {
    // API call
    const res = await fetch(`${HOST}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({title, description, tag})
    })
    const json = await res.json();
    console.log(json)

    // edit client
    let newnotes = JSON.parse(JSON.stringify(notes))          
    for (let index = 0; index < newnotes.length; index++) {
      if (newnotes[index]._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag
        break;
      }
    }
    setnotes(newnotes)
  }

  return (
    <notecontext.Provider value={{ notes, addnote, deletenote, editnote, getallnotes }}>
      {props.children}
    </notecontext.Provider>
  )
}

export default Notestate