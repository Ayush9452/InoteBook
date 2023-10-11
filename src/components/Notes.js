import React, { useContext, useEffect, useRef, useState } from 'react'
import notecontext from "../context/notes/notecontext"
import Noteitems from "./Noteitem"
import Addnotes from "../components/Addnotes";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(notecontext)
  const { notes, getallnotes, editnote } = context

  let Navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem("token")){
      getallnotes()
    }else{
      Navigate("/login")
    }
    
    // eslint-disable-next-line
  }, [])

  const handelclick = (e) => {
    e.preventDefault();
    editnote(note.etitle,note.edescription,note.etag,note.id)
    refclose.current.click()
    props.showalert("Note Updated successfully",'success')
  }

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  const [note, setnote] = useState({ etitle: "", edescription: "", etag: "" })

  const updatenote = (currnote) => {
    ref.current.click()
    setnote({etitle: currnote.title, edescription: currnote.description, etag: currnote.tag,id: currnote._id})
  }

  const ref = useRef(null)
  const refclose = useRef(null)

  return (
    <>
      <Addnotes showalert={props.showalert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control"  value={note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label" value={note.edescription}>Description</label>
                  <input type="text" className="form-control"  value={note.edescription} id="edescription" name="edescription" onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label" >Tag</label>
                  <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onchange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handelclick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="row my-3">
          <h1>Your notes</h1>
          <div className="container mx-2">
            {notes.length === 0 && 'No notes to display'}
          </div>
          {notes.map((note) => {
            return <Noteitems updatenote={updatenote} showalert={props.showalert} key={note._id} note={note} />
          })}
        </div>
      </div>
    </>
  )
}

export default Notes;
