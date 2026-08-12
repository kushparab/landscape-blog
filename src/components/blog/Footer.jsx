import React from 'react'
import { useContent } from '../../store/content'

export default function Footer() {
  const { site } = useContent()
  return (
    <footer className="border-t border-ink/10 bg-[#f3efe2] py-10 text-center">
      <p className="mx-auto max-w-xl px-6 text-sm text-ink/55">{site.footer}</p>
      <p className="mt-3 text-xs tracking-widest text-ink/35">
        © {new Date().getFullYear()} {site.name} · Crafted with React Bits animations
      </p>
    </footer>
  )
}