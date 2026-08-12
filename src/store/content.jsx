import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_CONTENT, PALETTES } from '../data/content'

const STORAGE_KEY = 'trail_notes_content_v1'
const SESSION_KEY = 'trail_notes_session'

const ADMIN_CREDENTIALS = { username: 'kushblog', password: 'yokush18' }

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && parsed.site && Array.isArray(parsed.posts)) return parsed
    }
  } catch {
    /* ignore corrupt storage */
  }
  return JSON.parse(JSON.stringify(DEFAULT_CONTENT))
}

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(loadInitial)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
    } catch {
      /* storage may be unavailable */
    }
  }, [content])

  const value = useMemo(() => {
    const updateSite = updater => {
      setContent(prev => ({ ...prev, site: { ...prev.site, ...updater } }))
    }

    const addPost = post => {
      setContent(prev => ({ ...prev, posts: [...prev.posts, post] }))
    }

    const updatePost = (id, changes) => {
      setContent(prev => ({
        ...prev,
        posts: prev.posts.map(p => (p.id === id ? { ...p, ...changes } : p)),
      }))
    }

    const deletePost = id => {
      setContent(prev => ({ ...prev, posts: prev.posts.filter(p => p.id !== id) }))
    }

    const resetContent = () => {
      setContent(JSON.parse(JSON.stringify(DEFAULT_CONTENT)))
    }

    const importContent = data => {
      const next = data && data.site && Array.isArray(data.posts) ? data : JSON.parse(data)
      setContent({
        site: { ...DEFAULT_CONTENT.site, ...next.site },
        posts: Array.isArray(next.posts) ? next.posts : [],
      })
    }

    return {
      content,
      site: content.site,
      posts: content.posts,
      updateSite,
      addPost,
      updatePost,
      deletePost,
      resetContent,
      importContent,
    }
  }, [content])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within a ContentProvider')
  return ctx
}

/* ---- auth ---- */

export function useAuth() {
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')

  const login = (username, password) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setIsAuthed(true)
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setIsAuthed(false)
  }

  return { isAuthed, login, logout }
}

export function getPalette(id) {
  return PALETTES.find(p => p.id === id) || PALETTES[0]
}

export function makeIdFromTitle(title) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 48) || `note-${Date.now()}`
  )
}