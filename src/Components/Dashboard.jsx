import Sidenav from './Sidenav'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../Redux/authSlice'
import { useEffect } from 'react'

const Dashboard = () => {
    const { users, loading, error } = useSelector(state => state.auth)
    let currentUser
    try {
        const raw = localStorage.getItem("username")
        currentUser = raw ? JSON.parse(raw) : null
    } catch (e) {
        currentUser = localStorage.getItem("username") || null
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchUsers())
        if (!currentUser) {
            navigate("/login")
        }
    }, [dispatch, navigate, currentUser])

    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>Error: {error}</p>
    }

    const handleLogout = () => {
        localStorage.removeItem("username")
        navigate("/login")
    }

    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Sidenav />
            <div style={{ backgroundColor: "bisque", width: "100%", height: "100vh", overflowY: "auto" }}>
                <Navbar />
                <div style={{ padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <h2>Welcome, {currentUser?.username || currentUser || "User"}!</h2>
                        <button onClick={handleLogout} className="submit-btn" style={{ width: "auto", padding: "8px 20px" }}>Logout</button>
                    </div>

                    <h3 style={{ marginBottom: "12px" }}>All Users</h3>
                    <div style={{ display: "grid", gap: "10px", maxWidth: "500px" }}>
                        {users.map(user => (
                            <div key={user.id} className="user-item" style={{ padding: "12px 14px", borderRadius: "10px", background: "#fff", border: "1px solid rgba(101,118,255,0.12)" }}>
                                <strong style={{ color: "#2b3561" }}>{user.username}</strong> — <span>{user.email}</span>
                            </div>
                        ))}
                    </div>

                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
