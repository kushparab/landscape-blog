import React, { useState } from 'react'
import { PALETTES } from '../../data/content'
import { useContent, getPalette, makeIdFromTitle } from '../../store/content'
import { ShinyText } from '../reactbits'

const BLOCK_TYPES = [
  { value: 'lead', label: 'Lead' },
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'heading', label: 'Heading' },
  { value: 'pullquote', label: 'Pull Quote' },
  { value: 'blockquote', label: 'Quote' },
  { value: 'list', label: 'List' },
  { value: 'figure', label: 'Figure' },
]

export default function PostEditor({ post, onCancel, onSave }) {
  const { content, addPost, updatePost } = useContent()
  const [draft, setDraft] = useState({ ...post, blocks: post.blocks.map(b => ({ ...b, items: b.items ? [...b.items] : [] })) })
  const [saved, setSaved] = useState(false)

  const set = (key, val) => setDraft(prev => ({ ...prev, [key]: val }))

  const updateBlock = (i, patch) =>
    setDraft(prev => ({ ...prev, blocks: prev.blocks.map((b, idx) => (idx === i ? { ...b, ...patch } : b)) }))

  const addBlock = type => {
    const block = { type }
    if (type === 'heading') block.title = ''
    else if (type === 'list') block.items = ['']
    else if (type === 'figure') block.caption = ''
    else block.text = ''
    setDraft(prev => ({ ...prev, blocks: [...prev.blocks, block] }))
  }

  const removeBlock = i => setDraft(prev => ({ ...prev, blocks: prev.blocks.filter((_, idx) => idx !== i) }))
  const moveBlock = (i, dir) =>
    setDraft(prev => {
      const blocks = [...prev.blocks]
      const j = i + dir
      if (j < 0 || j >= blocks.length) return prev
      ;[blocks[i], blocks[j]] = [blocks[j], blocks[i]]
      return { ...prev, blocks }
    })

  const save = () => {
    const existing = content.posts.some(p => p.id === draft.id)
    const finalId = draft.id || makeIdFromTitle(draft.title)
    const final = { ...draft, id: finalId }
    if (!final.author) final.author = content.site.author || 'Mara Ellison'
    if (existing) updatePost(finalId, final)
    else addPost(final)
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onSave(finalId)
    }, 900)
  }

  return (
    <div className="min-h-screen bg-cream px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <button onClick={onCancel} className="text-sm text-ink/50 transition hover:text-ink">← back to dashboard</button>
            <h1 className="mt-2 text-3xl font-semibold text-pine">{content.posts.some(p => p.id === draft.id) ? 'Edit Note' : 'New Note'}</h1>
            <ShinyText text="every note needs drafting, then a horizon" speed={3} color="#8a8a78" shineColor="#b5643a" className="mt-1 text-sm" />
          </div>
          <button
            onClick={save}
            className={`rounded-full px-6 py-3 text-sm font-medium text-cream transition ${saved ? 'bg-fern' : 'bg-pine hover:brightness-110'}`}
          >
            {saved ? 'Saved ✓' : 'Save note'}
          </button>
        </div>

        <div className="mt-8 grid gap-5 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm sm:grid-cols-2">
          <Field label="Title">
            <input value={draft.title} onChange={e => set('title', e.target.value)} className={inputCls} />
          </Field>
          <Field label="Link slug (auto)"><input value={draft.id || makeIdFromTitle(draft.title)} onChange={e => set('id', e.target.value)} className={inputCls} disabled /></Field>
          <Field label="Date"><input value={draft.date} onChange={e => set('date', e.target.value)} className={inputCls} /></Field>
          <Field label="Read time"><input value={draft.readTime} onChange={e => set('readTime', e.target.value)} className={inputCls} /></Field>
          <Field label="Author"><input value={draft.author || ''} onChange={e => set('author', e.target.value)} className={inputCls} /></Field>
          <Field label="Art palette">
            <select value={draft.palette} onChange={e => set('palette', e.target.value)} className={inputCls}>
              {PALETTES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </Field>
          <Field label="Tags (space separated)" wide>
            <input value={(draft.tags || []).join(' ')} onChange={e => set('tags', e.target.value.split(/\s+/).filter(Boolean))} className={inputCls} placeholder="#hiking #landscape" />
          </Field>
          <Field label="Excerpt" wide>
            <textarea value={draft.excerpt} onChange={e => set('excerpt', e.target.value)} rows={2} className={inputCls} />
          </Field>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-xl text-pine">Content blocks ({draft.blocks.length})</h2>
          <div className="flex flex-wrap justify-end gap-2">
            {BLOCK_TYPES.map(bt => (
              <button key={bt.value} onClick={() => addBlock(bt.value)} className="rounded-full border border-ink/15 px-3 py-1.5 text-sm text-ink/70 transition hover:bg-ink/5">
                + {bt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-4 pb-28">
          {draft.blocks.map((block, i) => (
            <BlockCard key={i} block={block} i={i} total={draft.blocks.length} update={updateBlock} remove={removeBlock} move={moveBlock} />
          ))}
          {draft.blocks.length === 0 && (
            <p className="rounded-2xl border border-dashed border-ink/20 p-8 text-center text-ink/50">Add a block above to start the story.</p>
          )}
        </div>
      </div>
    </div>
  )
}

const inputCls =
  'w-full rounded-xl border border-ink/15 bg-cream/40 px-3 py-2.5 text-sm text-pine outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20'

function Field({ label, children, wide }) {
  return (
    <label className={`block ${wide ? 'sm:col-span-2' : ''}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-ink/50">{label}</span>
      {children}
    </label>
  )
}

function BlockCard({ block, i, total, update, remove, move }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider ${typeBadge(block.type)}`}>{block.type}</span>
        <div className="flex gap-1.5">
          <button onClick={() => move(i, -1)} disabled={i === 0} className="rounded-lg border border-ink/10 px-2 py-1 text-xs disabled:opacity-30">↑</button>
          <button onClick={() => move(i, 1)} disabled={i === total - 1} className="rounded-lg border border-ink/10 px-2 py-1 text-xs disabled:opacity-30">↓</button>
          <button onClick={() => remove(i)} className="rounded-lg border border-clay/25 px-2 py-1 text-xs text-clay hover:bg-clay/10">✕</button>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {(block.type === 'lead' || block.type === 'paragraph' || block.type === 'pullquote' || block.type === 'blockquote') && (
          <textarea value={block.text || ''} onChange={e => update(i, { text: e.target.value })} rows={block.type === 'paragraph' ? 4 : 2} className={inputCls} placeholder={block.type === 'lead' ? 'Opening line…' : 'Write here…'} />
        )}
        {block.type === 'heading' && (
          <input value={block.title || ''} onChange={e => update(i, { title: e.target.value })} className={inputCls} placeholder="Section heading…" />
        )}
        {block.type === 'figure' && (
          <input value={block.caption || ''} onChange={e => update(i, { caption: e.target.value })} className={inputCls} placeholder="Caption (art renders automatically)…" />
        )}
        {block.type === 'list' && (
          <div className="space-y-2">
            {(block.items || []).map((item, j) => (
              <div key={j} className="flex items-center gap-2">
                <input value={item} onChange={e => update(i, { items: block.items.map((it, idx) => (idx === j ? e.target.value : it)) })} className={inputCls} placeholder="List item…" />
                <button
                  onClick={() => update(i, { items: block.items.filter((_, idx) => idx !== j) })}
                  className="rounded-lg border border-clay/25 px-2 py-1 text-xs text-clay"
                >✕</button>
              </div>
            ))}
            <button onClick={() => update(i, { items: [...(block.items || []), ''] })} className="text-sm text-clay hover:underline">
              + add item
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function typeBadge(type) {
  const map = {
    lead: 'bg-clay/10 text-clay',
    paragraph: 'bg-pine/10 text-pine',
    heading: 'bg-fern/15 text-moss',
    pullquote: 'bg-sun/15 text-[#8a6a1f]',
    blockquote: 'bg-[#f1eee1] text-moss',
    list: 'bg-sage/25 text-pine',
    figure: 'bg-[#9ec8e2]/20 text-[#2d5a7a]',
  }
  return map[type] || 'bg-ink/10 text-ink/70'
}