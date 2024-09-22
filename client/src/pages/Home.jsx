import React ,{useState,useEffect,useRef} from 'react'
import { useForm } from "react-hook-form";
import '../css/home.css'
import notesApi from '../services/notesService'
import { useDispatch, useSelector } from "react-redux";
import { setNotes,setSingleNote,setFilteredNotes,setSearchQuery,setEdit} from '../features/notesSlice';
import Card from '../components/ui/Card';
import AddNote from '../components/ui/AddNote';
import MagicGrid from "magic-grid";
import bin from '../assets/bin.png'
import pencil from '../assets/pencil.png'
import FilterCard from '../components/ui/FilterCard';
import TextareaAutosize from 'react-textarea-autosize';



function Home() {
const dispatch=useDispatch()
    const notes=useSelector((state)=>state.notes.notes)
    const singleNote=useSelector((state)=>state.notes.singleNote)
    const filteredNotes=useSelector((state)=>state.notes.filteredNotes)
    const searchQuery=useSelector((state)=>state.notes.searchQuery)
    const edit=useSelector((state)=>state.notes.edit)
    const note=useSelector((state=>state.notes.note))

console.log('✌️notes coming from redux --->', notes);
    const [add,setAdd]=useState(false)
    const [render,setRender]=useState(false)
    // const [edit,setEdit]=useState(false)
    // const [notes,setNotes]=useState([])
    // const[singleNote,setSingleNote]=useState({})
    // const [searchQuery,setSearchQuery]=useState('')
    // const [filteredNotes,setFilteredNotes]=useState([])
    // const [fileUploadData,setFileUploadData]=useState(null)

    console.log('✌️searchQuery --->', searchQuery);

console.log('✌️notes --->', notes);
// const [notesData,setNotesData]=useState([])

    const { register, handleSubmit,setValue } = useForm();

    const imageRef=useRef();

    const formRef=useRef()
    const gridRef = useRef(null);

    // const cardContainerRef=useRef(null)

    
    useEffect(()=>{
        const handleClickOutside=(event)=>{
            if (formRef.current && !formRef.current.contains(event.target)){
                dispatch(setEdit(false))

            }
        }
   

        document.addEventListener("mousedown",handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
    },[setEdit])

    useEffect(()=>{
        notesApi.getNotes().then((res)=>{
            return(
                // setNotes(res)
                dispatch( setNotes(res))
            )
        })
    },[])

    
    useEffect(() => {
        // Set default values when singleNote changes
        if (singleNote) {
          setValue('title', singleNote.title);
          setValue('content', singleNote.content);
        }
      }, [singleNote, setValue]);


const handleAdd=()=>{
    setAdd(!add)
}


// const onSubmit = (data) => {
//    console.log(data)
//    const formData = new FormData();
//     formData.append('title', data.title);
//     formData.append('content', data.content);

//     const files = imageRef.current.files;
// console.log('✌️files inside of add  --->', files);
//     for (let i = 0; i < files.length; i++) {
//         formData.append('files', files[i]);
//     }


//     notesApi.createNotes(formData).then(res=>{

//         console.log('✌️res --->', res)
        
//         dispatch( setNotes([...notes,res]))
//    })
//   }


//    setNotesData(notesData)
//    notesApi.createNotes(data).then(res=>{

//         console.log('✌️res --->', res)
//         setNotes([...notes,res])
//    })
//   }
//the genral part of adding the note happend now i have to make- 1 editing functionality 2-deltetion 3-search bar based on title after that uploading documents like drag anddrop feature

// const handleEdit=(id)=>{
// console.log('✌️id when we press edit button --->', id);
//     //open a form
//     setEdit(!edit)
//     const note=notes.filter((one)=>{
//         return  one._id===id
       
//     })
//     console.log('✌️note --->', note);
//     // setSingleNote(note[0])
//     dispatch(setSingleNote(note[0]))
// }

const onSubmitEdit=(data)=>{
    

    console.log('✌️data --->', data);
  const id=singleNote._id
    console.log('✌️single note.id --->', id);
    const editFormData=new FormData()

    editFormData.append('title',data.title);
    editFormData.append('content',data.content);

    // editFormData.append('_id',id)

    const files = imageRef.current.files;
    console.log('✌️files inside of edit  --->', files);
    for(let i=0; i< files.length; i++){
        editFormData.append('files',files[i])
    }
    
 const formData2={...data,id}
    console.log('✌️formData2 --->', formData2);

    console.log('✌️editFormData inside edit form submit--->', editFormData);

    notesApi.updateNotes(id,editFormData).then((res)=>{
     console.log('edit response',res)
     console.log('notes inside of notes if accesible>.......',notes)
    const newNotes= notes.map(one=>

        one._id === id ? { ...one, ...res } : one
    )

        console.log('✌️newNotes --->', newNotes);
    //     // setNotes(newNotes)
        dispatch( setNotes(newNotes))
    })
}

const handleTextAreaInput = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
};


  
  return (
    <div className='main-container'>
        <div className="container">

        {/* <input type="text" placeholder='search'  value={searchQuery} onChange={(e)=>handleSearchQuery(e)} style={{width:'100%',height:'60px'}}/> */}

            {/* <div className="card-container" ref={gridRef}>
             {filteredNotes?.map((note) => (

                        <div className="card" key={note.id}>
                            <div className="title">
                                <h2>{note.title}</h2>
                            </div>
                            <span>date</span>
                            <div className="content">
                                <p>{note.content}</p>
                            </div>
                            <button onClick={() => handleEdit(note._id)}>Edit</button>
                            <button onClick={()=>{handleDelete(note._id)}}>delete</button>
                        </div>
                        
                    ))}

                <Card />
           

            </div> */}
             {filteredNotes && <FilterCard />}
                <br />
          
            <Card />

        </div>



        <AddNote add={add} setAdd={setAdd} setRender={setRender} render={render}/>

        {edit && singleNote &&
            <div className="add-form-container">
                <div className="inner-form-container" ref={formRef}>
                {/* <div className="back"><button onClick={()=>{dispatch(setEdit(false))}}>←</button></div> */}
                <div className="main-form">
                    <form action="" onSubmit={handleSubmit(onSubmitEdit)}>
                       <div className="input-container">
                        
                            <input type="text"  className='gen-input' placeholder='Title'   {...register("title")} />
                        
                            {/* <input type="textarea"  placeholder='content' name='content'  {...register("content")}/> */}
                            {/* <textarea  id="content-text"  placeholder='Content' name='content'  {...register("content")} onInput={handleTextAreaInput}></textarea> */}
                            
                            <TextareaAutosize
                              id="content-text"
                                placeholder='Content'
                                name='content'
                                 {...register("content")}
                             />

                            <div className="image-preview-container">
                                
                            </div>
                        </div>

                        <div className="add-form-buttons">
                        <input type="file" multiple hidden  ref={imageRef}  name='imageFile'/>

                        <button type='button' onClick={()=>imageRef.current.click()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" width="24"   height="24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>    
                        </button> 
                        <button type='submit'>Close</button>
                        </div>
                       
                        
                    </form>
                    </div>
                </div>
            </div>
        }

        <div className="add-note" >
            {/* <button onClick={handleAdd}>+</button> */}
            {/* <button onClick={handleAdd} class="group flex h-10 w-10 select-none items-center justify-center rounded-lg border border-zinc-100 bg-white leading-8 text-zinc-950 shadow-[0_-1px_0_0px_#d4d4d8_inset,0_0_0_1px_#f4f4f5_inset,0_0.5px_0_1.5px_#fff_inset] hover:bg-zinc-50 hover:via-zinc-900 hover:to-zinc-800 active:shadow-[-1px_0px_1px_0px_#e4e4e7_inset,1px_0px_1px_0px_#e4e4e7_inset,0px_0.125rem_1px_0px_#d4d4d8_inset]" aria-label="Change language"><span class="flex items-center group-active:[transform:translate3d(0,1px,0)]"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-zinc-950"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></span></button> */}

            <button class="custom-button" onClick={handleAdd} aria-label="Change language">
             <span class="custom-button-content">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="custom-icon">
            <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
            </svg>
            </span>
        </button>

        </div>
        

      
    </div>
  )
}

export default Home



// =================================================end







 {/* {notes && notes.map((note)=>(
                    <div className="card">
                        <div className="title">
                            <h2>{note.title}</h2>
                        </div>
                         <span>date</span>
                        <div className="content">
                            <p>{note.content}</p>
                        </div>

                        {note.files && note.files.map((file, index) => (
                     <div key={index}>
                         {file.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
                        <img src={`http://localhost:3001/${file}`} alt={`File ${index + 1}`} style={{maxWidth: '200px'}} />
                        ) : (
                        <a href={`http://localhost:3001/${file}`} target="_blank" rel="noopener noreferrer">File {index + 1}</a>
                        )}
                    </div>
                ))}


                        <button onClick={()=>{handleEdit(note._id)}}>edit</button>
                        <button onClick={()=>{handleDelete(note._id)}}>delete</button>

                       
                     </div>
                )
            
                 

            )} */}    

// const handleSearchQuery=(e)=>{
//     const input=e.target.value;
//     console.log('✌️input --->', input);
//     // setSearchQuery(input)
//     dispatch(setSearchQuery(input))

//     const filtered = notes.filter(note =>
//         note.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     if(input===''){
//      // setFilteredNotes([])
//         dispatch(setFilteredNotes([]))
//     }
//     else{
//      // setFilteredNotes(filtered)
//         dispatch( setFilteredNotes(filtered))
//     }
  
// }

// const filteredNotes = notes.filter(note =>
//     note.title.toLowerCase().includes(searchQuery.toLowerCase())
// );

// const handleDelete=(id)=>{
// console.log('✌️id --->', id);
//     notesApi.deleteNotes(id).then((res)=>{
//         const filterDelete=notes.filter(one=>{

//             return one._id!=res._id
//         })
//         console.log('✌️filterDelete --->', filterDelete);
//         // setNotes(filterDelete)
//         dispatch( setNotes(res))
// })
// }

// const handleImageSelection=(e)=>{
//     const files=e.target.files;
//     console.log('✌️file --->', files);
//     setFileUploadData(files)

//     const formData = new FormData();
//     for (let i = 0; i < files.length; i++) {
//         formData.append('files', files[i]);
//     }

//     for (let [key, value] of formData.entries()) {
//         console.log(`formdata>>>>>>>>${key}:`, value);
//     }
//     console.log('✌️formData --->', formData);

//     notesApi.uploadImage(formData)
// }


// {add &&
//     <div className="add-form-container">
//             <div className="inner-form-container">
//                 <div className="main-form">
//                 <form action="" onSubmit={handleSubmit(onSubmit)}>
//                     <label htmlFor="title" >title</label>
//                     <input type="text" className='gen-input' placeholder='title' name='title'  {...register("title")} />
//                     <label htmlFor="content">content</label>
//                     {/* <input type="textarea"  placeholder='content' name='content'  {...register("content")}/> */}
//                     <textarea  id="content-text" placeholder='content' name='content'  {...register("content")}></textarea>

//                     {/* <input type="file" multiple hidden  ref={imageRef} onChange={handleImageSelection} name='imageFile'/> */}
//                     <input type="file" multiple hidden  ref={imageRef}  name='imageFile'/>
//                     <button type='button' onClick={()=>imageRef.current.click()}>click here to upload image</button>

//                     <button type='submit'>add</button>
//                 </form>
//                 </div>

//             </div>
//     </div>
//     }