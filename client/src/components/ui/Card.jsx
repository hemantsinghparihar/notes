// import React, { useEffect, useRef, useState } from 'react'
// import { setNotes, setSingleNote, setEdit } from '../../features/notesSlice'
// import { useDispatch, useSelector } from 'react-redux'
// import notesApi from '../../services/notesService';
// import { Link } from 'react-router-dom'
// import '../../css/card.css'
// import pencil from '../../assets/pencil.png'
// import bin from '../../assets/bin.png'
// import { createSwapy } from 'swapy'

// function Card(props) {
//   const dispatch = useDispatch();
//   const notes = useSelector((state) => state.notes.notes)
//   const edit = useSelector((state) => state.notes.edit)
//   const containerRef = useRef(null);
//   const [swapyInstance, setSwapyInstance] = useState(null);

//   const truncate = (str, max) => {
//     if (str.length >= 100) {
//       return str.slice(0, max) + '...'
//     } else {
//       return str
//     }
//   }

//   useEffect(() => {
//     const initializeSwapy = () => {
//       if (containerRef.current && notes.length > 0) {
//         try {
//           const swapy = createSwapy(containerRef.current, {
//             animation: 'dynamic',
//             swapThreshold: 0.65,
//             fallbackOnBody: true,
//           });

//           swapy.onSwap((event) => {
//             console.log('New Order (Array):', event.data.array);
//           });

//           swapy.enable(true);
//           setSwapyInstance(swapy);
//         } catch (error) {
//           console.error("Failed to initialize Swapy:", error);
//         }
//       }
//     };

//     // Wait for the DOM to be fully rendered
//     setTimeout(initializeSwapy, 0);

//     return () => {
//       if (swapyInstance) {
//         swapyInstance.enable(false);
//       }
//     };
//   }, [notes]);

//   // ... (keep all other functions like handleDelete, handleEdit, handleImageDelete, handlePinning)

//   return (
//     <div ref={containerRef} className="card-container">
//       {notes && notes.map((note, index) => (
//           <div key={index} className={`section-${index}`} data-swapy-slot={`slot-${index}`}>
//         <div key={note._id} className="swapy-item" data-swapy-item={`note-${note._id}`}>
//           <div className="card">
//             <Link to={`/notes/${note._id}`} style={{ textDecoration: 'none', color: 'black' }}>
//               <div className="title">
//                 <h2>{note.title}</h2>
//               </div>
//               <span>date</span>
//               <div className="content">
//                 <p>{truncate(note.content, 100)} </p>
//               </div>

//               <div className="card-img-container">
//                 {note.files && note.files.map((file, fileIndex) => (
//                   <div key={fileIndex} className="single-card-image-wrapper">
//                     {file.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
//                       <>
//                         <img
//                           src={`http://localhost:3001/${file}`}
//                           alt={`File ${fileIndex + 1}`}
//                           className="card-image"
//                         />
//                         <button
//                           className='img-delete'
//                           onClick={(event) => { handleImageDelete(event, note._id, file) }}
//                         >
//                           <img src={bin} alt="Delete" />
//                         </button>
//                       </>
//                     ) : (
//                       <a href={`http://localhost:3001/${file}`} target="_blank" rel="noopener noreferrer">File {fileIndex + 1}</a>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </Link>

//             <div className="card-controlls">
//               <button type='button' onClick={(event) => { handlePinning(event, note._id, note.isPinned) }}>pin</button>
//               <button onClick={(event) => { handleEdit(event, note._id) }} className='edit'>
//                 <img src={pencil} alt="" />
//               </button>
//               <button onClick={(event) => { handleDelete(event, note._id) }} className='delete'>
//                 <img src={bin} alt="" />
//               </button>
//             </div>
//           </div>
//         </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default Card







// import React, {useEffect,useState,useRef} from 'react'
// import { setNotes,setSingleNote,setEdit } from '../../features/notesSlice'
// import { useDispatch,useSelector } from 'react-redux'
// import notesApi from '../../services/notesService';
// import {Link} from 'react-router-dom'
// import '../../css/card.css'
// import pencil from '../../assets/pencil.png'
// import bin from '../../assets/bin.png'


// function Card(props) {
// const dispatch=useDispatch();



// const notes=useSelector((state)=>state.notes.notes)
// // const [edit,setEdit]=useState(false)
// const edit=useSelector((state)=>state.notes.edit)
// const singleNote=useSelector((state)=>state.notes.singleNote)

// const truncate=(str,max)=>{
//     if(str.length>=100){
//         return str.slice(0,max)+'...'
//     }
//     else{
//         return str
//     }
// }



// const handleDelete=(event,id)=>{
//     event.preventDefault();
//     event.stopPropagation();
//     console.log('✌️id --->', id);
//         notesApi.deleteNotes(id).then((res)=>{
//             const filterDelete=notes.filter(one=>{
    
//                 return one._id!=res._id
//             })
//             console.log('✌️filterDelete --->', filterDelete);
//             // setNotes(filterDelete)
//             dispatch( setNotes(filterDelete))
//     })
//     }

//     const handleEdit=(event,id)=>{
//         event.preventDefault();
//         event.stopPropagation();
//         console.log('✌️id when we press edit button --->', id);
//             //open a form
//            dispatch(setEdit(!edit)) 
//             const note=notes.filter((one)=>{
//                 return  one._id===id
               
//             })
//             console.log('✌️note --->', note);
//             // setSingleNote(note[0])
//             dispatch(setSingleNote(note[0]))
//         }

//         const handleImageDelete=(event,id,url)=>{
//             event.preventDefault();
//             event.stopPropagation();
//         console.log('✌️url  inside of handel delete --->', url);
//             //i will call the services here 
//             console.log('id inside of handle image delete>>',id)
//             notesApi.deleteImages(id,url).then((updatedNote) => {
//                 console.log('Image deleted, updated note:', updatedNote);
        
//                 // Update the note in the Redux store or state
//                 dispatch(setNotes(
//                     notes.map(note => 
//                         note._id === id ? updatedNote : note // Only update the specific note with the updated images
//                     )
//                 ));
//             }).catch(err => {
//                 console.error('Error deleting image:', err);
//             }
//             )
//         }

//         const handlePinning=(event,id,pinValue)=>{
//             event.preventDefault()
//             event.stopPropagation()            
//             console.log('✌️pinValue in card.jsx--->', pinValue);
//             let newPinValue=!pinValue
// console.log('✌️newPinValue inside card.jsx --->', newPinValue);
//             notesApi.updatePin(id,{ isPinned: newPinValue }).then((res)=>{
//                 const updatedNotes = notes.map((note) =>
//                     note._id === res._id ? { ...note, isPinned: res.isPinned } : note
//                 );
//                 console.log('✌️updatedNotes --->', updatedNotes);
//                 dispatch(setNotes(updatedNotes))
//             }
                
                
//             )
            
//         }
//   return (
//     <div class="card-container">
//    {notes && notes.map((note, index) => (
//       <Link to={`/notes/${note._id}`} style={{ textDecoration: 'none', color: 'black' }}>
//          <div class="card">
//             <div class="title">
//                <h2>{note.title}</h2>
//             </div>
//             <span>date</span>
//             <div class="content">
//                <p>{truncate(note.content, 100)} </p>
//             </div>

//             <div class="card-img-container">
//                {note.files && note.files.map((file, index) => (
//                   <div key={index} class="single-card-image-wrapper">
//                      {file.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
//                         <>
//                            <img src={`http://localhost:3001/${file}`} alt={`File ${index + 1}`} class="card-image" />
//                            <button class='img-delete' onClick={(event) => { handleImageDelete(event, note._id, file) }}>
//                               <img src={bin} alt="Delete" />
//                            </button>
//                         </>
//                      ) : (
//                         <a href={`http://localhost:3001/${file}`} target="_blank" rel="noopener noreferrer">File {index + 1}</a>
//                      )}
//                   </div>
//                ))}
//             </div>

//             <div class="card-controlls">
//                <button type='button' onClick={(event) => { handlePinning(event, note._id, note.isPinned) }}>pin</button>
//                <button onClick={(event) => { handleEdit(event, note._id) }} class='edit'>
//                   <img src={pencil} alt="" />
//                </button>
//                <button onClick={(event) => { handleDelete(event, note._id) }} class='delete'>
//                   <img src={bin} alt="" />
//                </button>
//             </div>
//          </div>
//       </Link>
//    ))}
// </div>

//   )
// }

// export default Card










import React from 'react';
import { setNotes, setSingleNote, setEdit,setNote } from '../../features/notesSlice';
import { useDispatch, useSelector } from 'react-redux';
import notesApi from '../../services/notesService';
import { Link } from 'react-router-dom';
import '../../css/card.css';
import pencil from '../../assets/pencil.png';
import bin from '../../assets/bin.png';
import Masonry from 'react-masonry-css'; // Import Masonry for the layout

function Card(props) {
  const dispatch = useDispatch();
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
     

{sortedNotes &&
        sortedNotes.map((note, index) => (
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

export default Card;











// import React, {useEffect,useState,useRef} from 'react'
// import { setNotes,setSingleNote,setEdit } from '../../features/notesSlice'
// import { useDispatch,useSelector } from 'react-redux'
// import notesApi from '../../services/notesService';
// import {Link} from 'react-router-dom'
// import '../../css/card.css'
// import pencil from '../../assets/pencil.png'
// import bin from '../../assets/bin.png'


// function Card(props) {
// const dispatch=useDispatch();



// const notes=useSelector((state)=>state.notes.notes)
// // const [edit,setEdit]=useState(false)
// const edit=useSelector((state)=>state.notes.edit)
// const singleNote=useSelector((state)=>state.notes.singleNote)

// const truncate=(str,max)=>{
//     if(str.length>=100){
//         return str.slice(0,max)+'...'
//     }
//     else{
//         return str
//     }
// }



// const handleDelete=(event,id)=>{
//     event.preventDefault();
//     event.stopPropagation();
//     console.log('✌️id --->', id);
//         notesApi.deleteNotes(id).then((res)=>{
//             const filterDelete=notes.filter(one=>{
    
//                 return one._id!=res._id
//             })
//             console.log('✌️filterDelete --->', filterDelete);
//             // setNotes(filterDelete)
//             dispatch( setNotes(filterDelete))
//     })
//     }

//     const handleEdit=(event,id)=>{
//         event.preventDefault();
//         event.stopPropagation();
//         console.log('✌️id when we press edit button --->', id);
//             //open a form
//            dispatch(setEdit(!edit)) 
//             const note=notes.filter((one)=>{
//                 return  one._id===id
               
//             })
//             console.log('✌️note --->', note);
//             // setSingleNote(note[0])
//             dispatch(setSingleNote(note[0]))
//         }

//         const handleImageDelete=(event,id,url)=>{
//             event.preventDefault();
//             event.stopPropagation();
//         console.log('✌️url  inside of handel delete --->', url);
//             //i will call the services here 
//             console.log('id inside of handle image delete>>',id)
//             notesApi.deleteImages(id,url).then((updatedNote) => {
//                 console.log('Image deleted, updated note:', updatedNote);
        
//                 // Update the note in the Redux store or state
//                 dispatch(setNotes(
//                     notes.map(note => 
//                         note._id === id ? updatedNote : note // Only update the specific note with the updated images
//                     )
//                 ));
//             }).catch(err => {
//                 console.error('Error deleting image:', err);
//             }
//             )
//         }

//         const handlePinning=(event,id,pinValue)=>{
//             event.preventDefault()
//             event.stopPropagation()            
//             console.log('✌️pinValue in card.jsx--->', pinValue);
//             let newPinValue=!pinValue
// console.log('✌️newPinValue inside card.jsx --->', newPinValue);
//             notesApi.updatePin(id,{ isPinned: newPinValue }).then((res)=>{
//                 const updatedNotes = notes.map((note) =>
//                     note._id === res._id ? { ...note, isPinned: res.isPinned } : note
//                 );
//                 console.log('✌️updatedNotes --->', updatedNotes);
//                 dispatch(setNotes(updatedNotes))
//             }
                
                
//             )
            
//         }
//   return (
//     <div className="card-container">
//        {notes && notes.map((note,index)=>(
               
//                 <Link to={`/notes/${note._id}`} style={{textDecoration:'none',color:'black'}}>
//                     <div className="card">
//                         <div className="title">
//                             <h2>{note.title}</h2>
//                         </div>
//                          <span>date</span>
//                         <div className="content">
//                             <p>{truncate(note.content,100)} </p>
//                         </div>

//                         <div className="card-img-container">
//                             {note.files && note.files.map((file, index) => (
//                                 <div key={index} className="single-card-image-wrapper">
//                                     {file.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
//                                         <>
//                                             <img 
//                                                 src={`http://localhost:3001/${file}`} 
//                                                 alt={`File ${index + 1}`} 
//                                                 className="card-image"
//                                             />
//                                             <button 
//                                                 className='img-delete'
//                                                 onClick={(event) => { handleImageDelete(event, note._id, file) }}
//                                             >
//                                                 <img src={bin} alt="Delete" />
//                                             </button>
//                                         </>
//                                     ) : (
//                                         <a href={`http://localhost:3001/${file}`} target="_blank" rel="noopener noreferrer">File {index + 1}</a>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>

//                         {/* <div className="card-img-container">
//                         {note.files && note.files.map((file, index) => (
//                      <div key={index}>
                        
//                          {file.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
                            
//                                 <div className="single-card-image">
                                    
//                                 <img src={`http://localhost:3001/${file}`} alt={`File ${index + 1}`}  className='card-img' />
//                                 <button className='img-delete' onClick={(event)=>{handleImageDelete(event,note._id,file)}}>
//                                     <img src={bin} alt="" />
//                                 </button>
//                             </div>
                                

                           
                        
//                         )  : (
//                         <a href={`http://localhost:3001/${file}`} target="_blank" rel="noopener noreferrer">File {index + 1}</a>
//                         )}
//                         </div>
                   
                 
//                 ))}
//                  </div> */}
                 
//                     <div className="card-controlls">
//                         <button type='button' onClick={(event)=>{handlePinning(event,note._id,
//                             note.isPinned)}}>pin</button>
//                         <button onClick={(event)=>{handleEdit(event,note._id)}} className='edit'>
//                             <img src={pencil} alt="" />
//                         </button>

//                         <button onClick={(event)=>{handleDelete(event,note._id)}} className='delete'>
//                         <img src={bin} alt="" />
//                         </button>
//                     </div>

                       

//                         {/* <input type="file" multiple hidden  ref={imageRef} onChange={handleImageSelection} name='imageFile'/>
//                         <button onClick={()=>imageRef.current.click()}>click here to upload image</button> */}
//                      </div>
//                      </Link>
                   
//                 )
            
                 

//             )}
//     </div>
//   )
// }

// export default Card
