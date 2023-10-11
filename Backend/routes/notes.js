const express = require('express');
const fetchUser = require("../middleware/fetchUser")
const Note = require("../models/Note")
const { body, validationResult } = require('express-validator');

const route = express.Router();

// fetching all notes
route.get('/fetchnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Something Went Wrong")
    }
})

// create notes
route.post('/createnotes', fetchUser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tag } = req.body

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save(note)
        res.json(savednote)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Something Went Wrong")
    }
})

// update notes
route.put('/updatenotes/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body // destructuing

        const newnote = {} // creating object
        if(title){
            newnote.title = title
        }
        if(description){
            newnote.description = description
        }
        if(tag){
            newnote.tag = tag
        }

        let note = await Note.findById(req.params.id)
        if(!note) // note exixt or not
        {
            return res.status(404).send("not found")
        }
        if(note.user.toString() !== req.user.id) // note belongs to user or not 
        {
            return res.status(401).send("not allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id,{$set: newnote}, {new: true}) // updating

        res.json({note});
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Something Went Wrong")
    }
})

// delete notes
route.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id)
        if(!note) // note exixt or not
        {
            return res.status(404).send("not found")
        }
        if(note.user.toString() !== req.user.id) // note belongs to user or not 
        {
            return res.status(401).send("not allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id) // deleting

        res.json("Successfully deleted");
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Something Went Wrong")
    }
})

module.exports = route