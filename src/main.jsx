import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App"
// import Home from './Home'
// import Landingpage from './Landingpage'
// import Variables from './Components/Variables'
// import Todo from './Components/Todo'
// import Sportify from './Components/Sportify'
// import Addtodo from './Components/Addtodo'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>,
)