import React, {useEffect,useState,useRef} from 'react'
import { setFilteredNotes,setNotes,setSingleNote } from '../features/notesSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useParams,useNavigate } from 'react-router-dom'
import notesApi from '../services/notesService'
import bin from '../assets/bin.png'
import '../css/home.css'
import '../css/note.css'

function Note() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [note,setNote]=useState({})


  const notes=useSelector((state)=>state.notes.notes)
console.log('✌️notes inside note component--->', notes);

const {id}=useParams()
console.log('✌️id --->', id);

const handleBack=()=>{
  navigate(-1)
}

const handleImageDelete = (event, id, url) => {
  event.preventDefault();
  event.stopPropagation();
  notesApi.deleteImages(id, url).then((updatedNote) => {
    dispatch(
      setNotes(
        notes.map((note) => (note._id === id ? updatedNote : note))
      )
    );
  });
};

const singleNote=notes.filter(one=>one._id===id)
console.log('✌️singleNote --->', singleNote);
// setNote(singleNote[0])

  return (
    <div className='note-main-container'>
       <div className="back-bar" onClick={handleBack}>
          previous
        </div>
      <div className="display-note-container">
       
        <div className="notes-container">
          <div className="note-title">
            <h2>{singleNote[0]?.title}</h2>
            
          </div>
          <div className="notes-content">
            <p>{singleNote[0]?.content}</p>
            
          </div>
          <div className="image">
          {singleNote[0]?.files && singleNote[0].files.map((file, index) => (
                     <div className='img-wrapper' key={index}>
                         {file.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
                          <>
                           <img src={`http://localhost:3001/${file}`} alt={`File ${index + 1}`} style={{maxWidth: '200px'}}  className='card-img'/>

                        <button
                            className="img-delete"
                            onClick={(event) => handleImageDelete(event, singleNote[0]._id, file)}
                          >
                            <img src={bin} alt="Delete" />
                          </button>
                          </>
                       
                        ) : (
                        <a href={`http://localhost:3001/${file}`} target="_blank" rel="noopener noreferrer">File {index + 1}</a>
                        )}
                    </div>
                 
                ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Note
