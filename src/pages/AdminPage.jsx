import React, { useEffect, useState } from 'react'
import { useAuth, useContent } from '../store/content'
import AdminLogin from '../components/admin/AdminLogin'
import AdminDashboard from '../components/admin/AdminDashboard'
import PostEditor from '../components/admin/PostEditor'
import SiteSettings from '../components/admin/SiteSettings'

export default function AdminPage() {
  const { isAuthed, logout } = useAuth()
  const { posts } = useContent()
  const [view, setView] = useState({ name: 'dashboard' })

  // lift editor state out of the post list so new notes can be passed in
  useEffect(() => {
    if (isAuthed) setView({ name: 'dashboard' })
  }, [isAuthed])

  if (!isAuthed) {
    return <AdminLogin onSuccess={() => setView({ name: 'dashboard' })} />
  }

  const handleEditRequest = (postId, newPost) => {
    if (newPost) {
      setView({ name: 'editor', post: newPost })
    } else {
      const post = posts.find(p => p.id === postId)
      setView({ name: 'editor', post })
    }
  }

  if (view.name === 'editor') {
    return (
      <PostEditor
        post={view.post}
        onCancel={() => setView({ name: 'dashboard' })}
        onSave={postId => {
          // after save, open the refreshed post in the editor
          const saved = posts.find(p => p.id === postId)
          setView(saved ? { name: 'editor', post: saved } : { name: 'dashboard' })
          setTimeout(() => setView({ name: 'dashboard' }), 250)
        }}
      />
    )
  }

  if (view.name === 'settings') {
    return <SiteSettings onBack={() => setView({ name: 'dashboard' })} />
  }

  return (
    <AdminDashboard
      onEdit={handleEditRequest}
      onSettings={() => setView({ name: 'settings' })}
      onLogout={logout}
    />
  )
}