import { useFormik } from "formik"
import { useState, useEffect } from "react"
import * as yup from "yup"
import './Formik.css'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast, ToastContainer, Bounce } from "react-toastify";

const Login = () => {
    const [allUser, setAllUser] = useState([])
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const { email, password } = values;
                const existingUsers = await axios.get("http://localhost:4567/users")

                const userExists = existingUsers?.data.find(user => user.email === email)
                if (userExists && userExists.password === password) {
                    localStorage.setItem("loggedInUser", JSON.stringify({
                        id: userExists.id,
                        username: userExists.username
                    }))
                    toast.success("Login successful!")
                    toast.info("Redirecting to dashboard...")
                    setTimeout(() => {
                        navigate("/home")
                    }, 2000);
                    resetForm();
                } else {
                    toast.error("Invalid credentials.")
                }
            } catch (err) {
                console.error(err)
                const code = err?.code || err?.response?.status
                const message = err?.response?.data?.message || err.message || "Error saving user."
                toast.error(`${code ? code + ' - ' : ''}${message}`)
            }
        }
    })

    useEffect(() => {
        const saved = localStorage.getItem("Users")
        if (saved) {
            setAllUser(JSON.parse(saved))
        }
    }, [])

    return (
        <div className="formik-page">
            <form className="formik-form" onSubmit={formik.handleSubmit} noValidate action='/login' method="post">
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="you@example.com"
                        type="email"
                        className={"input " + (formik.touched.email && formik.errors.email ? 'input-error' : '')}
                    />
                    <small className="error">{formik.touched.email && formik.errors.email}</small>
                </div>

                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter a strong password"
                        type="password"
                        className={"input " + (formik.touched.password && formik.errors.password ? 'input-error' : '')}
                    />
                    <small className="error">{formik.touched.password && formik.errors.password}</small>
                </div>

                <button type="submit" className="submit-btn">Submit</button>
            </form>
            <ToastContainer position="top-right" autoClose={2000} transition={Bounce} />
        </div>
    )
}

export default Login