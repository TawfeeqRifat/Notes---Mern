import note from '../models/Note.js';

export async function getAllNotes(_,res){
    try{
        const notes = await note.find().sort({createdAt: -1}); //show newest first
        res.status(200).json(notes);
    }catch(error){
        console.log("Error in getAllNotes Controller ",error);
        res.status(500).json({message: "Internal Server Error"})

    }
}

export async function getNote(req,res){
    try{
        const notes = await note.findById(req.params.id);
        if (!notes) return res.status(404).json({message: "Note not foundd"});
        res.status(200).json(notes);
    }catch(error){
        console.log("Error in getNote Controller ",error);
        res.status(500).json({message: "Internal Server Error"})

    }
}

export async function createNote(req,res){
     try{
        const {title, content} = req.body;
        const Note = new note({title,content});

        const savedNote = await Note.save();
        res.status(201).json(savedNote);
    }catch(error){
        console.log("Error in createNote Controller ",error);
        res.status(500).json({message: "Internal Server Error"})

    }
}

export async function updateNote(req,res){
    try{
        const {title, content} = req.body;
        const updatedNote = await note.findByIdAndUpdate(req.params.id, {title,content}, {new: true});
        if (!updatedNote) return res.status(404).json({message: "Note not found"});
        
        res.status(200).json(updatedNote);
    }catch(error){
        console.log("Error in updateNote Controller ",error);
        res.status(500).json({message: "Internal Server Error"})

    }
}

export async function deleteNote(req,res){
     try{
        const deleteNote = await note.findByIdAndDelete(req.params.id);
        if (!deleteNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json({message: "Note delted"});
    }catch(error){
        console.log("Error in delteNote Controller ",error);
        res.status(500).json({message: "Internal Server Error"})

    }
}