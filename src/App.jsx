import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ContentProvider, AuthProvider } from './store/content'
import Home from './pages/Home'
import PostPage from './pages/PostPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <ContentProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </AuthProvider>
    </ContentProvider>
  )
}