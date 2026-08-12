import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SpotlightCard, AnimatedContent, ShinyText } from '../reactbits'
import { getPalette } from '../../store/content'
import LandscapeArt from './LandscapeArt'

const ART_VARIANTS = ['peak', 'pines', 'dunes', 'meadow']

export default function PostCard({ post, index }) {
  const navigate = useNavigate()
  const palette = getPalette(post.palette)
  const variant = ART_VARIANTS[index % ART_VARIANTS.length]

  return (
    <AnimatedContent distance={46} direction="vertical" duration={0.7} threshold={0.12}>
      <SpotlightCard
        spotlightColor="rgba(181,100,58,0.18)"
        className="group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
      >
        <button
          onClick={() => navigate('/post/' + post.id)}
          className="block w-full text-left"
          aria-label={`Read ${post.title}`}
        >
          <div className="relative mb-5 h-44 overflow-hidden rounded-xl">
            <LandscapeArt palette={palette} variant={variant} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-xs text-pine backdrop-blur">
              {post.readTime}
            </span>
          </div>
          <h3 className="text-xl text-pine transition-colors group-hover:text-clay">{post.title}</h3>
          <ShinyText text={post.date} speed={3} color="#8a8a78" shineColor="#b5643a" className="mt-1 text-sm" />
          <p className="mt-3 text-sm leading-relaxed text-ink/70">{post.excerpt}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map(t => (
              <span key={t} className="rounded-full bg-sage/40 px-3 py-1 text-xs text-pine">
                {t}
              </span>
            ))}
          </div>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-clay">
            Read the note
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </SpotlightCard>
    </AnimatedContent>
  )
}