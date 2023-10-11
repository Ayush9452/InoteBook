import React, { useContext, useState } from 'react'
import notecontext from "../context/notes/notecontext"

function Addnotes(props) {
    const context = useContext(notecontext)
    const { addnote } = context

    const [note, setnote] = useState({ title: "", description: "", tag: "" })

    const handelclick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag)
        setnote({ title: "", description: "", tag: "" })
        props.showalert("Notes Added successfully",'success')
    }

    const onchange = (e) => {
        // console.log(note)
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h1>Add a note</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} />
                </div>
                {/* <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div> */}
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handelclick}>Add note</button>
            </form>
        </>
    )
}

export default Addnotes