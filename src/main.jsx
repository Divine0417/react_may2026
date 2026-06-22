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
import store from './Redux/Store'
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <App/>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)