import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, RouterProvider,Route} from 'react-router-dom'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import Note from './pages/Note.jsx'


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/notes/:id' element={<Note/>}/>

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
   
  </StrictMode>,
)
