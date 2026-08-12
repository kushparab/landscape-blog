import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContent, useAuth } from '../../store/content'
import { BlurText } from '../reactbits'

export default function Navbar() {
  const { site } = useContent()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-pine text-cream">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 20 L9 6 L15 20 M8 14 h6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <BlurText
            text={site.name}
            animateBy="words"
            delay={40}
            className="font-semibold tracking-wide text-pine"
          />
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <a href="#trails" className="hidden rounded-full px-4 py-2 text-pine transition hover:bg-sand/70 sm:inline-block">
            Trails
          </a>
          <a href="#about" className="hidden rounded-full px-4 py-2 text-pine transition hover:bg-sand/70 sm:inline-block">
            About
          </a>
          <button
            onClick={() => navigate('/admin')}
            className="rounded-full bg-clay px-4 py-2 text-cream transition hover:brightness-110"
          >
            Admin
          </button>
        </nav>
      </div>
    </header>
  )
}