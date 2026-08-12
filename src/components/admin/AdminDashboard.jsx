import React, { useState } from 'react'
import { useContent, useAuth, makeIdFromTitle, getPalette } from '../../store/content'
import LandscapeArt from '../blog/LandscapeArt'
import { ShinyText, FadeContent, CountUp } from '../reactbits'

const ART_VARIANTS = ['peak', 'pines', 'dunes', 'meadow']

export default function AdminDashboard({ onEdit, onSettings, onLogout }) {
  const { site, posts, resetContent, deletePost } = useContent()
  const idRef = React.useRef(0)

  return (
    <div className="min-h-screen bg-cream px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-pine">Journal Dashboard</h1>
            <ShinyText text={`${site.name} — content studio`} speed={3} color="#8a8a78" shineColor="#b5643a" className="mt-1 text-sm" />
          </div>
          <div className="flex gap-3">
            <button onClick={onSettings} className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink/70 transition hover:bg-ink/5">
              Site settings
            </button>
            <button onClick={resetContent} className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink/70 transition hover:bg-ink/5">
              Reset to defaults
            </button>
            <button onClick={onLogout} className="rounded-full bg-ink px-4 py-2 text-sm text-cream transition hover:brightness-110">
              Log out
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {site.stats.map((s, i) => (
            <div key={i} className="rounded-2xl border border-ink/10 bg-white p-4 shadow-sm">
              <div className="text-2xl font-semibold text-pine"><CountUp to={s.value} duration={1.5} /></div>
              <div className="mt-1 text-xs uppercase tracking-widest text-ink/50">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between">
          <h2 className="text-2xl text-pine">Notes ({posts.length})</h2>
          <button
            onClick={() => {
              idRef.current += 1
              onEdit(null, {
                id: makeIdFromTitle('New trail note'),
                title: 'A New Trail Note',
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                readTime: '2 min read',
                excerpt: 'A short description of what waits on the trail ahead.',
                palette: 'dawn',
                tags: ['#new'],
                author: site.author || 'Mara Ellison',
                blocks: [{ type: 'lead', text: 'A first paragraph to set the scene.' }],
              })
            }}
            className="rounded-full bg-pine px-5 py-2.5 text-sm text-cream transition hover:brightness-110"
          >
            + New note
          </button>
        </div>

        <FadeContent blur duration={800} threshold={0}>
          <div className="mt-6 space-y-4">
            {posts.map((post, idx) => (
              <PostRow key={post.id + '-' + idx} post={post} index={idx} onEdit={() => onEdit(post.id)} onDelete={() => deletePost(post.id)} />
            ))}
            {posts.length === 0 && (
              <p className="rounded-2xl border border-dashed border-ink/20 p-10 text-center text-ink/50">
                No notes yet. Click “+ New note” to write the first one.
              </p>
            )}
          </div>
        </FadeContent>
      </div>
    </div>
  )
}

function PostRow({ post, index, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-ink/10 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl">
        <LandscapeArt palette={getPalette(post.palette)} variant={ART_VARIANTS[index % ART_VARIANTS.length]} className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-pine">{post.title}</h3>
        <p className="truncate text-sm text-ink/55">{post.date} · {post.readTime} · {post.blocks.length} blocks</p>
      </div>
      <div className="flex shrink-0 gap-2">
        <button onClick={onEdit} className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink/70 transition hover:bg-ink/5">Edit</button>
        <button onClick={onDelete} className="rounded-full border border-clay/25 px-4 py-2 text-sm text-clay transition hover:bg-clay/10">Delete</button>
      </div>
    </div>
  )
}