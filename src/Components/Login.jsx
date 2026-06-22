import { useEffect } from "react"
import { useFormik } from "formik"
import './Formik.css'
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer, Bounce } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "../Redux/authSlice"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { users, loading, error } = useSelector(state => state.auth)


    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values, { resetForm }) => {
            const user = users.find(u => u.email === values.email && u.password === values.password)
            if (user) {
                localStorage.setItem('username', user.username ?? user.email)
                dispatch(fetchUsers())
                toast.success("Login successful!")
                // toast.info("Redirecting to dashboard...")
                setTimeout(() => navigate("/home"), 2000)
                resetForm()
            } else {
                toast.error("Invalid credentials.")
            }
        }
    })

    return (
        <div className="formik-page">
            <form className="formik-form" onSubmit={formik.handleSubmit} noValidate>
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
                        placeholder="Enter your password"
                        type="password"
                        className={"input " + (formik.touched.password && formik.errors.password ? 'input-error' : '')}
                    />
                    <small className="error">{formik.touched.password && formik.errors.password}</small>
                </div>

                <button type="submit" className="submit-btn">Login</button>
            </form>
            <ToastContainer position="top-right" autoClose={2000} transition={Bounce} />
        </div>
    )
}

export default Login
