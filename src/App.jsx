import "./App.css"
import { Route, Routes } from "react-router-dom"
import Landingpage from "./Landingpage"
import Home from "./Home"
import Sportify from "./Components/Sportify"
import Notfound from "./Components/Notfound"
import Navbar from "./Components/Navbar"
import { useLocation } from "react-router-dom"
import Dashboard from "./Components/Dashboard"
import Todo from "./Components/Todo"
import Variables from "./Components/Variables"
import Http from "./Components/Http"
import Onepost from "./Components/Onepost"
import Formik from "./Components/Formik"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'



function App() {

  const location = useLocation()
  // console.log(location);
  const pathnames = ['/landingpage', '/', '/sportify']

  // const username = "lola"
  //  const sty ={
  //    backgroundColor:"blue",
  //    color:"black",
  //    fontSize:"56px"
  //  }
  return (
    <div>
      {/* <h1>May Cohort {Math.random()}</h1>
      <p className="ptag">Personal css file</p>
      <p style={{color:"green", fontWeight:"bold" , fontFamily:"monospace"}}>Inline styling</p>
      <p style={sty}>{username}</p> */}
      {pathnames.includes(location.pathname) && <Navbar />}
      <ToastContainer />
      <Routes>
        <Route path="/landingpage" element={<Landingpage />} />
        <Route path="/http" element={<Http />} />
        <Route path="/onepost/:id" element={<Onepost />} />
        <Route path="/" element={<Home />} />
        <Route path="/sportify" element={<Sportify />} />
        <Route path="/form" element={<Formik />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/home" element={<Dashboard />} >
          <Route path="/home/profile" element={<Todo />} />
          <Route path="/home/variables" element={<Variables />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App