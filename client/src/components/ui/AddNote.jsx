import React, { useState, useRef,useEffect } from 'react';
import { useForm } from "react-hook-form";
import { setNotes } from '../../features/notesSlice';
import notesApi from '../../services/notesService';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/addForm.css';
import bin from '../../assets/bin.png'

function AddNote(props) {
    console.log('component is re rendering')
    const dispatch = useDispatch();
    const { add, setAdd } = props;
    const [desiredImg, setDesiredImg] = useState([]);
console.log('✌️desiredImg --->', desiredImg);
    const notes = useSelector((state) => state.notes.notes);

    const { register, handleSubmit,reset,watch, formState: { errors } } = useForm();
   // We added watch to the destructured elements from useForm. This allows us to observe changes to form fields.
    const imageRef = useRef();

    const formRef = useRef();
    const title = watch('title'); 


     // Form submission handler
     const onSubmit = (data) => {
        console.log('this console is inside of on submit')
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);

        // Append the actual file objects to formData
        desiredImg.forEach(imgObj => {
            formData.append('files', imgObj.file); // Use the file object, not the preview URL
        });

        notesApi.createNotes(formData).then(res => {
            dispatch(setNotes([...notes, res]));
            props.setRender(!props.render);
            setAdd();
            reset();

            setDesiredImg([]);  // Reset the state for image previews
            imageRef.current.value = '';
        });
    };

    useEffect(() => {
        function handleClickOutside(event) {
          if (formRef.current && !formRef.current.contains(event.target)) {
            if (title) { // Check if the title is available
                handleSubmit(onSubmit)(); // Submit the form when clicked outside
            }
            setAdd(false); 
          }
        }
      
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [setAdd, handleSubmit, onSubmit,title]);

    // const textareaRef = useRef(null);

    // const contentValue = watch("content");

    // useEffect(() => {
    //     if (textareaRef.current) {
    //         textareaRef.current.style.height = "auto";
    //         textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    //     }
    // }, [contentValue]);

    // Handle image selection and preview
    const handleImageSelection = (e) => {
        const img = e.target.files;

        const newFiles = Array.from(img).map((file) => ({
            file, // Store the actual file object
            url: URL.createObjectURL(file), // Create a URL for preview
        }));

        setDesiredImg([...desiredImg, ...newFiles]);
       
    };

   

    const handleImageDelete=(e,url)=>{
        
        const filteredImages=desiredImg.filter((img)=>{

            return img.url!=url
        })
        console.log('✌️filteredImages --->', filteredImages);
        setDesiredImg(filteredImages)
    }

    const handleTextAreaInput = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div>
            {add && (
                <div className="add-form-container">
                    <div className="inner-form-container" ref={formRef}>
                        {/* <div className="back">
                            <button onClick={() => setAdd()}>← Go Back</button>
                        </div> */}
                        {/* <div className="back">
                        <button
                         onClick={() => {
                             handleSubmit(onSubmit)(); // Submit the form when "Go Back" is pressed
                             setAdd(); // Close the form
                            }}
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="34"  height="34"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-square-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" /><path d="M9 9l6 6m0 -6l-6 6" /></svg>

                        </button>
                         
                                

                    </div> */}

                        <div className="main-form">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="input-container">
                                <input
                                    type="text"
                                    className='gen-input'
                                    placeholder='Title'
                                    name='title'
                                    {...register("title", {
                                        required: true                                        
                                    })}
                                />
                                {errors.title?.type === "required" && (
                                    <small className='form-error-msg'>title is required</small>
                                )}

                                {/* <textarea
                                    id="content-text"
                                    placeholder='content'
                                    name='content'
                                    {...register("content")}
                                    ref={(e) => {
                                        textareaRef.current = e;
                                    }}
                                    style={{ overflow: 'hidden' }}
                                ></textarea> */}

                                 <textarea
                                  id="content-text"
                                  placeholder='Take a note...'
                                  {...register("content")}
                                  onInput={handleTextAreaInput}
                                  style={{ overflow: 'hidden' }}
                                />

                            <div className="image-preview-container">
                                    {desiredImg.map((img, index) => (
                                        <div className='preview-img-container'>
                                            <img
                                            key={index}
                                            src={img.url}
                                            alt={`Preview ${index}`}
                                            className="image-preview"
                                        />

                                        <button onClick={(event)=>{handleImageDelete(event,img.url)}} className='delete-img' type='button'>
                                             <img src={bin} alt="" />
                                        </button>
                                        </div>
                                        

                                        
                                    ))}
                                </div>

                                </div>
                               

                               

                                <div className="add-form-buttons">
                                <input
                                    type="file"
                                    multiple
                                    hidden
                                    ref={imageRef}
                                    onChange={handleImageSelection}
                                    name='imageFile'
                                />
                                <button
                                    type='button'
                                    onClick={() => imageRef.current.click()}
                                >
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" width="24"   height="24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>

                                </button>

                                {/* Display selected image previews */}
                               

                                <button type='submit' className='submit-btn'>Close</button>

                               

                                </div>

                               
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddNote;






// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
// </svg>


// import React,{useState,useEffect,useRef} from 'react'
// import { useForm } from "react-hook-form";
// import { setNotes } from '../../features/notesSlice';
// import notesApi from '../../services/notesService';
// import { useDispatch,useSelector } from 'react-redux';
// import '../../css/addForm.css'



// function AddNote(props) {
//     const dispatch=useDispatch();
//     const{add,setAdd}=props
//     const [desiredImg,setDesiredImg]=useState([])
//     const notes=useSelector((state)=>state.notes.notes)
//     // const [add,setAdd]=useState(false)

//     // const handleAdd=()=>{
//     //     setAdd(!add)
//     // }
//     const { register, handleSubmit,setValue } = useForm();

//     const imageRef=useRef();

//     const handleImageSelection=(e)=>{
//         const img=e.target.files;
// console.log('✌️img --->', img);

// const newFiles = Array.from(img).map((file) => ({
//     file, // Store the file object
//      url: URL.createObjectURL(file), // Create a URL for each file
// }));

// setDesiredImg([...desiredImg,...newFiles])

        
//     }

//     const onSubmit = (data) => {
//         console.log(data)
//         const formData = new FormData();
//          formData.append('title', data.title);
//          formData.append('content', data.content);
     
//          const files = imageRef.current.files;
//      console.log('✌️files inside of add  --->', files);
//          for (let i = 0; i < files.length; i++) {
//              formData.append('files', files[i]);
//          }
     
     
//          notesApi.createNotes(formData).then(res=>{
     
//              console.log('✌️res --->', res)
//              // setNotes([...notes,res])
//              dispatch( setNotes([...notes,res]))
//              props.setRender(!props.render)
//              setAdd()
//         })
//        }
     
//   return (
//     <div>
//            {add &&
//         <div className="add-form-container">
//             setAdd()
//                 <div className="inner-form-container">
//                 <div className="back"><button onClick={()=>{}}>←</button></div>
//                     <div className="main-form">
//                     <form action="" onSubmit={handleSubmit(onSubmit)}>
//                         {/* <label htmlFor="title" >title</label> */}
//                         <input type="text" className='gen-input' placeholder='title' name='title'  {...register("title")} />

//                         {/* <label htmlFor="content">content</label> */}

//                         {/* <input type="textarea"  placeholder='content' name='content'  {...register("content")}/> */}
//                         <textarea  id="content-text" placeholder='content' name='content'  {...register("content")}></textarea>

//                         {/* <input type="file" multiple hidden  ref={imageRef} onChange={handleImageSelection} name='imageFile'/> */}
//                         <input type="file" multiple hidden  ref={imageRef} onChange={handleImageSelection}  name='imageFile'/>
                       
//                         <button type='button' onClick={()=>imageRef.current.click()}>click here to upload image</button>

//                         <div className="image-preview-container">
//                                 {desiredImg.map((img, index) => (
//                                     <img
//                                         key={index}
//                                         src={img.url}
//                                         alt={`Preview ${index}`}
//                                         className="image-preview"
//                                     />
//                                 ))}
//                             </div>
//                         <button type='submit'>add</button>
//                     </form>
//                     </div>

//                 </div>
//         </div>
//         }
      
//     </div>
//   )
// }

// export default AddNote
