import React,{useState,useRef,useEffect} from 'react'
import '../../css/addForm.css'
import { useDispatch,useSelector } from 'react-redux';
import { setNote } from '../../features/notesSlice';

function NoteCard() {
  const dispatch=useDispatch()

  const singleNote=useSelector((state)=>state.notes.singleNote)
console.log('✌️singleNote --->', singleNote);

  const formRef=useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        
        dispatch(setNote(false)); 
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setNote]);
  return (
    <div>
        <div className="add-form-container">
            <div className="inner-form-container" ref={formRef}>
            <div className="main-form">
            <div className="notes-container">
          <div className="note-title">
            <h2>{singleNote?.title}</h2>
            
          </div>
          <div className="notes-content">
            <p>{singleNote?.content}</p>
            
          </div>
          <div className="image">
          {singleNote?.files && singleNote.files.map((file, index) => (
                     <div className='img-wrapper' key={index}>
                         {file.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
                          <>
                           <img src={`http://localhost:3001/${file}`} alt={`File ${index + 1}`} style={{maxWidth: '200px'}}  className='card-img'/>

                        {/* <button
                            className="img-delete"
                            onClick={(event) => handleImageDelete(event, singleNote._id, file)}
                          >
                            <img src={bin} alt="Delete" />
                          </button> */}
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

        </div>
    </div>
  )
}

export default NoteCard
