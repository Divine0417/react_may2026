import { useFormik } from "formik"
import { useState, useEffect } from "react"
import * as yup from "yup"
import './Formik.css'


const Formik = () => {
    const [allUser, setAllUser] = useState([])

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            username: yup.string().min(3, "Username cannot be less then 3 characters").max(33, "Username is too long").required("Username cannot be empty"),
            email: yup.string().email("Invalid email address").required("Email cannot be empty").trim(),
            password: yup.string().min(8, "Password cannnot be less than 8 character.").matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, "Password must contain a number, an uppercase, a special character").required("Password cannot be empty")
        }),
        onSubmit: (values, { resetForm }) => {
            const updatedUser = [...allUser, values]
            setAllUser(updatedUser)
            localStorage.setItem("Users", JSON.stringify(updatedUser))
            resetForm()
            console.log("Saved Successful!", updatedUser);

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

                <button type="submit" className="submit-btn">Submit</button>
            </form>

            {allUser.length > 0 && (
                <div className="user-list">
                    {allUser.map((u, idx) => (
                        <div className="user-item" key={idx}>
                            <strong>{u.username}</strong> — <span>{u.email}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Formik