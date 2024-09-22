const express=require('express')
const mongoose=require('mongoose')
const multer  = require('multer')
const app=express()
const notesModal=require('./modals/notes')
const cors = require('cors')
const path=require('path')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use('/uploads', express.static('uploads')) 
const PORT=3001;

mongoose.connect('mongodb://127.0.0.1:27017/notesApp').then((res)=>{
    console.log('connected to mongo db')
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
     
      cb(null,`${Date.now()}-${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })

//   app.post('/upload',upload.array('files', 10),(req,res)=>{
//     console.log('req.body>>>>>',req.body)
//     console.log('req.files>>>>>',req.files)

//   })


app.get('/notes',async(req,res)=>{
    console.log('hello home')
    const fetchNotes=await notesModal.find();

    
    res.send(fetchNotes)
})

// creating notes api
app.post('/notes',upload.array('files', 10),async(req,res)=>{
    console.log('req>>>>',req.body)
    // res.send(req.body)
    const fileUrls = req.files.map(file => file.path); 
console.log('✌️fileUrls --->', fileUrls);

    const create=await notesModal.create({
        title:req.body.title,
        content:req.body.content,
        files: fileUrls
    })
    res.send(create)
})

app.put('/notes/:id', upload.array('files', 10), async (req, res) => {
    console.log('Update request:', req.body);

    const { title, content } = req.body;
console.log('✌️content --->', content);
console.log('✌️title --->', title);
 
    const id = String(req.params.id);
console.log('✌️id --->', id);
   const newFileUrls = req.files.map(file => file.path); // Get new file URLs
console.log('✌️newFileUrls --->', newFileUrls);

    try {
        // Find the existing note by ID
        const existingNote = await notesModal.findById(id);
        if (!existingNote) {
            return res.status(404).send({ error: 'Note not found' });
        }

        // Merge existing file URLs with new file URLs
        const updatedFileUrls = [...existingNote.files, ...newFileUrls];

        // Update the note with new title, content, and merged file URLs
        const updatedNote = await notesModal.findOneAndUpdate(
            { _id: id },
            { title, content, files: updatedFileUrls },
            { new: true } // Return the updated document
        );

        console.log('Updated Note:', updatedNote);
        res.send(updatedNote);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).send({ error: 'Failed to update note' });
    }
});

app.put('/notes/:id/pin',async(req,res)=>{
    const id=String(req.params.id);
    console.log(req.body);
    const {isPinned}=req.body;
console.log('✌️pinValue --->', isPinned);
console.log('✌️isPinned --->', typeof isPinned);

// is pinned holds the value that we need to 
const note=await notesModal.findById({_id:id})
console.log('✌️note --->', note);
// got the note now want to update isPinned feild of note
const updatedNote=await notesModal.findOneAndUpdate(
    {_id:id},
    {
        title: note.title,
        content: note.content,
        files: [...note.files],
        isPinned: isPinned // Update the isPinned field
    },
    {new:true}
)
res.send(updatedNote)
console.log('Updated Note:', updatedNote);
    
})

// app.put('/notes/:id',upload.array('files', 10),async(req,res)=>{
//     console.log('update request>>>>>>>>',req.body)
//     const {title,content}=req.body
//     const fileUrls = req.files.map(file => file.path);
//     const id=String(req.params.id);
// console.log('✌️id --->', id);

//     const updated=await notesModal.findOneAndUpdate({_id:id},{title:title,content:content},{new:true});
// console.log('✌️updated --->', updated);

//     res.send(updated)
    
// })

app.delete('/notes/:id',async(req,res)=>{
    const id=req.params.id;
    const deleteNote=await notesModal.findOneAndDelete({_id:id});
console.log('✌️deleteNote --->', deleteNote);
res.send(deleteNote)
    // res.status(204).end();

})

app.delete('/notes/:id/image',async(req,res)=>{
    const id=req.params.id
    const {url}=req.body;

    const note=await notesModal.findById(id);
    note.files=note.files.filter(oneUrl=>oneUrl!=url)

    await note.save()
    res.send(note)

})

app.listen(PORT,(res)=>{
    console.log(`port is up and running on port ${PORT}`)
})