// import React from 'react'

// function EditNote() {
//   return (
//     <div>
//       <div className="add-form-container">
//                 <div className="inner-form-container">
//                 <div className="back"><button onClick={()=>{dispatch(setEdit(false))}}>←</button></div>
//                 <div className="main-form">
//                     <form action="" onSubmit={handleSubmit(onSubmitEdit)}>
//                         <label htmlFor="title" >title</label>
//                         <input type="text"  className='gen-input' placeholder='title' name='title'  {...register("title")} />
//                         <label htmlFor="content">content</label>
//                         {/* <input type="textarea"  placeholder='content' name='content'  {...register("content")}/> */}
//                         <textarea  id="content-text"  placeholder='content' name='content'  {...register("content")}></textarea>
//                         <input type="file" multiple hidden  ref={imageRef}  name='imageFile'/>
//                         <button type='button' onClick={()=>imageRef.current.click()}>click here to upload image</button> 
//                         <button type='submit'>update</button>
//                     </form>
//                     </div>
//                 </div>
//             </div>
//     </div>
//   )
// }

// export default EditNote
