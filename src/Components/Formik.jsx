import { useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import './Formik.css'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "../Redux/authSlice"

const Formik = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { users, loading, error } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            username: yup.string().min(3, "Username cannot be less than 3 characters").max(33, "Username is too long").required("Username cannot be empty"),
            email: yup.string().email("Invalid email address").required("Email cannot be empty").trim(),
            password: yup.string().min(8, "Password cannot be less than 8 characters").matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, "Password must contain a number, an uppercase, a special character").required("Password cannot be empty")
        }),
        onSubmit: (values, { resetForm }) => {            
            const exists = users.find(u => u.email === values.email || u.username === values.username)
            
            if (exists) {
                toast.error("User with this email or username already exists.")
                return
            }
            dispatch(fetchUsers())
            toast.success("User saved successfully!")
            resetForm()
            navigate("/login")
        }
    })

    return (
        <div className="formik-page">
            <form className="formik-form" onSubmit={formik.handleSubmit} noValidate>
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter username"
                        type="text"
                        className={"input " + (formik.touched.username && formik.errors.username ? 'input-error' : '')}
                    />
                    <small className="error">{formik.touched.username && formik.errors.username}</small>
                </div>

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

                <button type="submit" className="submit-btn">Sign Up</button>
            </form>
        </div>
    )
}

export default Formik
