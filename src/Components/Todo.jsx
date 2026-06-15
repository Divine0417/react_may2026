import { useFormik } from "formik"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import './Todo.css'

const Todo = () => {
  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  const [alltodo, setalltodo] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currenttodo, setCurrenttodo] = useState(null)
  const [user, setUser] = useState(null)
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem("loggedInUser"))

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("http://localhost:4567/users")
      const user = response.data.find(u => u.id === stored.id)
      setUser(user)

      if (!user) {
        navigate("/login")
        return
      }
    }
    fetchUser()
  }, [])

  const handleinput = (e) => {
    settitle(e.target.value)
  }
  const Add = () => {
    const todoinfo = {
      title,
      description
    }
    console.log(todoinfo);
    setalltodo([...alltodo, todoinfo])
  }
  const deleteTodo = (i) => {
    console.log(i);
    alltodo.splice(i, 1)
    setalltodo([...alltodo])
  }
  const editTodo = (i) => {
    setCurrentIndex(i)
    console.log(alltodo[i]);
    setCurrenttodo(alltodo[i])
  }

  const UpdateTodo = () => {
    alltodo[currentIndex] = currenttodo
    setalltodo([...alltodo])
  }
  return (
    <div>
      <h1 className="user_welcome">Welcome back, {user?.username || "User"}!</h1>
      <input onChange={handleinput} type="text" />
      <input onChange={(e) => setdescription(e.target.value)} type="text" />
      <button onClick={Add}>AddTodo</button>

      {alltodo.map((todo, index) => {
        return (
          <>
            <div key={index}>
              <p>{index + 1}</p>
              <p>{todo.title}</p>
              <p>{todo.description}</p>
              <button onClick={() => deleteTodo(index)} >delete</button>
              <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => editTodo(index)}>Edit</button>
            </div>
          </>
        )

      })

      }

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input value={currenttodo && currenttodo.title} className='form-control mt-3' onChange={(e) => setCurrenttodo({ ...currenttodo, title: e.target.value })} type="text" />
              <input value={currenttodo && currenttodo.description} className='form-control mt-3' onChange={(e) => setCurrenttodo({ ...currenttodo, description: e.target.value })} type="text" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={UpdateTodo} className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Todo