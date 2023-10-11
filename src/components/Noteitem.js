import React,{useContext} from 'react'
import notecontext from "../context/notes/notecontext"

function Noteitem(props) {
    const context = useContext(notecontext)
    const {deletenote} = context

    const { note, updatenote } = props
    return (
        <div className="col-md-3">
            <div className="card my-2">
                <div className="card-body">
                    <div className="d-flex align-item-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deletenote(note._id); props.showalert("Successfully Deleted note","success")}}></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
