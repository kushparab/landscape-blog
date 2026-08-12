import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ContentProvider } from './store/content'
import Home from './pages/Home'
import PostPage from './pages/PostPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <ContentProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </ContentProvider>
  )
}