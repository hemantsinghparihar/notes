import { createSlice } from "@reduxjs/toolkit";


export const notesSlice=createSlice({
    name:'notes',
    initialState:{
        notes:[],
        singleNote:{},
        filteredNotes:[],
        searchQuery:'',
        edit:false,
        note:false
    },
    reducers:{
        setNotes:(state,action)=>{
            state.notes=action.payload
        },
        setSingleNote:(state,action)=>{
            state.singleNote=action.payload
        },
        setFilteredNotes:(state,action)=>{
            state.filteredNotes=action.payload
        },
        setSearchQuery:(state,action)=>{
            state.searchQuery=action.payload
        },
        setEdit:(state,action)=>{
            state.edit=action.payload
        },
        setNote:(state,action)=>{
            state.note=action.payload
        }    
    }
})

export const {setNotes,setSingleNote,setFilteredNotes,setSearchQuery,setEdit,setNote}=notesSlice.actions
export default notesSlice.reducer