import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useContent, getPalette } from '../store/content'
import Navbar from '../components/blog/Navbar'
import Footer from '../components/blog/Footer'
import LandscapeArt from '../components/blog/LandscapeArt'
import { BlurText, FadeContent, SplitText, DecryptedText } from '../components/reactbits'

const ART_BY_INDEX = ['peak', 'pines', 'dunes', 'meadow']

export default function PostPage() {
  const { id } = useParams()
  const { posts } = useContent()
  const navigate = useNavigate()
  const index = Math.max(0, posts.findIndex(p => p.id === id))
  const post = posts.find(p => p.id === id)

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-lg text-pine">This trail note is missing.</p>
        <Link to="/" className="rounded-full bg-clay px-5 py-2 text-cream">Back home</Link>
      </div>
    )
  }

  const palette = getPalette(post.palette)
  const variant = ART_BY_INDEX[index % ART_BY_INDEX.length]

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <FadeContent blur duration={900} threshold={0}>
          <div className="mb-3 text-sm uppercase tracking-[0.3em] text-clay">
            <DecryptedText text={post.date + ' · ' + post.readTime} animateOn="view" revealDirection="start" sequential speed={30} />
          </div>
        </FadeContent>

        <BlurText
          text={post.title}
          animateBy="words"
          delay={60}
          className="text-4xl leading-tight text-pine sm:text-5xl"
        />

        <FadeContent blur duration={1200} delay={300} threshold={0}>
          <div className="mt-8 overflow-hidden rounded-2xl shadow-lg">
            <LandscapeArt palette={palette} variant={variant} className="h-64 w-full object-cover sm:h-80" />
          </div>
        </FadeContent>

        <div className="mt-12 space-y-7">
          {post.blocks.map((block, i) => (
            <FadeContent key={i} blur duration={900} delay={Math.min(i * 60, 400)} threshold={0.08}>
              <Block block={block} />
            </FadeContent>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-2">
          {post.tags.map(t => (
            <span key={t} className="rounded-full bg-sage/40 px-3 py-1 text-xs text-pine">{t}</span>
          ))}
        </div>

        <FadeContent blur duration={1000} threshold={0}>
          <div className="mt-12 flex items-center gap-5 rounded-2xl bg-sand/70 px-6 py-5">
            <span className="h-14 w-14 rounded-full bg-gradient-to-br from-[#d9a05b] to-[#7a4f2d] ring-2 ring-cream" />
            <div>
              <p className="font-semibold text-pine">{post.author || 'Mara Ellison'}</p>
              <p className="text-sm text-ink/60">{post.authorBio || 'Writer and weekend wanderer · Field notes from wherever the dirt ends'}</p>
            </div>
          </div>
        </FadeContent>

        <div className="mt-14 text-center">
          <SplitText text="— keep walking —" splitType="chars" duration={0.7} delay={30} className="text-pine/60" />
          <Link to="/" className="mt-6 inline-block rounded-full bg-pine px-6 py-3 text-cream transition hover:brightness-110">
            Back to all notes
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Block({ block }) {
  switch (block.type) {
    case 'lead':
      return (
        <p className="border-l-4 border-clay pl-4 text-xl italic leading-relaxed text-pine">{block.text}</p>
      )
    case 'paragraph':
      return <p className="text-[1.05rem] leading-[1.9] text-ink/80">{block.text}</p>
    case 'heading':
      return <h2 className="pt-4 text-2xl font-semibold text-pine">{block.title}</h2>
    case 'pullquote':
      return (
        <div className="relative my-8 rounded-2xl bg-sand/80 px-8 py-8 text-center italic text-pine">
          <span className="absolute -top-4 left-6 text-5xl text-clay">“</span>
          <p className="text-xl leading-relaxed">{block.text}</p>
        </div>
      )
    case 'blockquote':
      return (
        <blockquote className="rounded-r-2xl border-l-4 border-fern bg-[#f1eee1] px-6 py-5 italic text-moss">
          {block.text}
        </blockquote>
      )
    case 'list':
      return (
        <ul className="list-disc space-y-2 pl-6 marker:text-clay">
          {block.items.map((item, i) => (
            <li key={i} className="text-[1.05rem] leading-relaxed text-ink/80">{item}</li>
          ))}
        </ul>
      )
    case 'figure':
      return (
        <figure className="my-6">
          <div className="overflow-hidden rounded-2xl shadow-md">
            <LandscapeArt palette={getPalette('dawn')} variant="peak" className="h-56 w-full object-cover" />
          </div>
          {block.caption && (
            <figcaption className="mt-2 text-center text-sm italic text-ink/50">{block.caption}</figcaption>
          )}
        </figure>
      )
    default:
      return null
  }
}