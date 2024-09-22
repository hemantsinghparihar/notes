import React from 'react';
import { setNotes, setSingleNote, setEdit,setFilteredNotes } from '../../features/notesSlice';
import { useDispatch, useSelector } from 'react-redux';
import notesApi from '../../services/notesService';
import { Link } from 'react-router-dom';
import '../../css/card.css';
import pencil from '../../assets/pencil.png';
import bin from '../../assets/bin.png';
import Masonry from 'react-masonry-css';

function FilterCard(props) {
    const dispatch = useDispatch();
    const filteredNotes=useSelector((state)=>state.notes.filteredNotes)
    const notes = useSelector((state) => state.notes.notes);
    const edit = useSelector((state) => state.notes.edit);
    
    const truncate = (str, max) => {
      return str.length >= 100 ? str.slice(0, max) + '...' : str;
    };
  
    let sortedNotes = [...notes].sort((a, b) => b.isPinned - a.isPinned);
  console.log('✌️sortedNotes --->', sortedNotes);
  
  
  
    const handleDelete = (event, id) => {
      event.preventDefault();
      event.stopPropagation();
      notesApi.deleteNotes(id).then((res) => {
        const filterDelete = notes.filter((one) => one._id !== res._id);
        dispatch(setNotes(filterDelete));
      });
    };
  
    const handleEdit = (event, id) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch(setEdit(!edit));
      const note = notes.filter((one) => one._id === id);
      dispatch(setSingleNote(note[0]));
    };
  
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
  
    const handlePinning = (event, id, pinValue) => {
      event.preventDefault();
      event.stopPropagation();
      let newPinValue = !pinValue;
      notesApi.updatePin(id, { isPinned: newPinValue }).then((res) => {
        const updatedNotes = notes.map((note) =>
          note._id === res._id ? { ...note, isPinned: res.isPinned } : note
        );
        dispatch(setNotes(updatedNotes));
      });
    };
  
    // Masonry breakpoint configuration
    const breakpointColumnsObj = {
      default: 4, // 3 columns on large screens
      1200:3,
      1100: 2,    // 2 columns on medium screens
      700: 1      // 1 column on small screens
    };
  
    return (
      <Masonry
        breakpointCols={breakpointColumnsObj} // Pass the breakpoint configuration
        className="my-masonry-grid" // Class for the Masonry grid
        columnClassName="my-masonry-grid_column" // Class for the Masonry columns
      >
       
  
  {filteredNotes &&
          filteredNotes.map((note, index) => (
            <Link to={`/notes/${note._id}`} style={{ textDecoration: 'none', color: 'black' }} key={note._id}>
              <div className="card">
                <div className="title">
                  <h2>{note.title}</h2>
                </div>
                <span>date</span>
                <div className="content">
                  <p>{truncate(note.content, 100)}</p>
                </div>
  
                <div className="card-img-container">
                  {note.files &&
                    note.files.map((file, index) => (
                      <div key={index} className="single-card-image-wrapper">
                        {file.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
                          <>
                            <img
                              src={`http://localhost:3001/${file}`}
                              alt={`File ${index + 1}`}
                              className="card-image"
                            />
                            {/* <button
                              className="img-delete"
                              onClick={(event) => handleImageDelete(event, note._id, file)}
                            >
                              <img src={bin} alt="Delete" />
                            </button> */}
                          </>
                        ) : (
                          <a href={`http://localhost:3001/${file}`} target="_blank" rel="noopener noreferrer">
                            File {index + 1}
                          </a>
                        )}
                      </div>
                    ))}
                </div>
  
                <div className="card-controlls">
                  <button type="button" onClick={(event) => handlePinning(event, note._id, note.isPinned)}>
                    {note.isPinned?'Unpin':'pin'}
                  </button>
                  <button onClick={(event) => handleEdit(event, note._id)} className="edit">
                    <img src={pencil} alt="Edit" />
                  </button>
                  <button onClick={(event) => handleDelete(event, note._id)} className="delete">
                    <img src={bin} alt="Delete" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
      </Masonry>
    );
}

export default FilterCard
