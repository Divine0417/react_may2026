import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './Onepost.css'

const Onepost = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    axios
      .get(`https://dummyjson.com/posts/${id}`)
      .then((res) => {
        setPost(res.data)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load post')
      })
  }, [id])

  if (!post && !error) {
    return <div className="onepost-loading">Loading post...</div>
  }

  if (error) {
    return <div className="onepost-error">Error: {error}</div>
  }

  return (
    <div className="onepost-page">
      <header className="onepost-header">
        <h2 className="onepost-title">{post.title}</h2>
      </header>

      <p className="onepost-body">{post.body}</p>

      <div className="onepost-meta">
        <div className="onepost-meta-card">
          <strong>Views</strong>
          <span>{post.views}</span>
        </div>
        <div className="onepost-meta-card">
          <strong>User ID</strong>
          <span>{post.userId}</span>
        </div>
        <div className="onepost-meta-card">
          <strong>Tags</strong>
          <div className="onepost-tags">{post.tags?.join(', ')}</div>
        </div>
      </div>

      <div className="onepost-reactions">
        <strong>Reactions</strong>
        <ul>
          <li>Likes: {post.reactions?.likes ?? 'N/A'}</li>
          <li>Dislikes: {post.reactions?.dislikes ?? 'N/A'}</li>
        </ul>
      </div>
    </div>
  )
}

export default Onepost