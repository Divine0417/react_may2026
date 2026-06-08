import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Http.css'

const Http = () => {
    const [allpost, setallpost] = useState([])

    useEffect(() => {
        fetch('https://dummyjson.com/post')
            .then((res) => res.json())
            .then((data) => {
                setallpost(data.posts)
            })
            .catch((err) => {
                console.error(err)
            })

        axios.get('https://dummyjson.com/post')
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    return (
        <div className="http-page">
            <header className="http-header">
                <h2>Latest Posts</h2>
                <p>Fetch and explore the latest post previews from the API.</p>
            </header>

            {allpost.length === 0 ? (
                <div className="http-empty">Loading posts, please wait...</div>
            ) : (
                <div className="http-list">
                    {allpost.map((post) => (
                        <article className="http-card" key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                            <Link to={`/onepost/${post.id}`}>View More</Link>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Http