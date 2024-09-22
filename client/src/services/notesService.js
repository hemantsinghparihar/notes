import axios from 'axios'

const baseUrl='http://localhost:3001/'

const getNotes=async()=>{
    const response=await axios.get(`${baseUrl}notes`);
    console.log('✌️response.data --->', response.data);
    return response.data

}

const createNotes=async(note)=>{
console.log('✌️note --->', note);
    const response=await axios.post(`${baseUrl}notes`,note)
    return response.data
}

// const uploadImage=async (formData)=>{
//     const response=await axios.post(`${baseUrl}upload`,formData)
//     return response.data
// }

const updateNotes=async (id,formData)=>{
console.log('✌️id --->', id);
console.log('✌️edit formData inside services --->', formData);
    const response=await axios.put(`${baseUrl}notes/${id}`,formData)
console.log('✌️response --->', response);
    return response.data
}

const updatePin=async(id,pinData)=>{
console.log('✌️pinData --->', pinData);
    const response=await axios.put(`${baseUrl}notes/${id}/pin`, pinData, {
        headers: { 'Content-Type': 'application/json' }
    });
    console.log('✌️response.data --->', response.data);
    return response.data

}

const deleteNotes=async (id)=>{
    const response=await axios.delete(`${baseUrl}notes/${id}`)
    return response.data
}

const deleteImages=async(id,url)=>{
    console.log('calling from delete images')
    const response=await axios.delete(`${baseUrl}notes/${id}/image`, {
        data: { url } // Include the url in the `data` object
    });
    return response.data;
}



const notesApi={
    getNotes,
    createNotes,
    updateNotes,
    deleteNotes,
    deleteImages ,
    updatePin
    
}

export default notesApi;