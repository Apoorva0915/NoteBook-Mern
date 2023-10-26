const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser")
const Notes = require("../models/Notes")
const { body, validationResult } = require("express-validator");

// Route 1: Get all notes using GET /api/note/fetchnotes
router.get("/fetchnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error);
        res.status(500).send("some internal server error occured")
    }
})


// Route 2: add notes using POST /api/note/addnotes
router.post("/addnotes", fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "Description must be at least 8 characters").isLength({ min: 8 }),
], async (req, res) => {
    
    try {
        
        const {title,description,tag}=req.body;
        // if there are errors return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const note= new Notes({
            title,description,tag,user:req.user.id
        })
        const saveNote=await note.save()
        res.json([saveNote])
    } catch (error) {
        console.log(error);
    res.status(500).send("some internal server error occured")
    }
    })


    // Route 3: Update an existing note using POST "api/notes/updatenote" Login required

    router.put("/updatenote/:id", fetchuser, async (req, res) => {

        const {title,description,tag}=req.body;
        
        // create a newNote object
        const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=title}
        if(tag){newNote.tag=tag};


        //find the note to be updated and update it
       let note =await Notes.findById(req.params.id);
       if(!note){res.status(404).send("Not Found")}
       
       if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
       }

       note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
       res.json({note})

    })

 
    // Route 4: Delete an existing note using DELETE "api/notes/deletenote" Login Required

    router.delete("/deletenote/:id",fetchuser,async(req,res)=>{
        
        //find the note to be updated and delete it
       let note =await Notes.findById(req.params.id);
       if(!note){res.status(404).send("Not Found")}
       
    //    allow deletion if user owns this note
       if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
       }

       note=await Notes.findByIdAndDelete(req.params.id)
       res.json({"Succes":"Note has be deleted",note:note})

    })
    
module.exports = router