import React, { useState } from 'react'
import { useContent } from '../../store/content'
import { ShinyText, FadeContent } from '../reactbits'

export default function SiteSettings({ onBack }) {
  const { site, updateSite } = useContent()
  const [draft, setDraft] = useState({
    name: site.name,
    tagline: site.tagline,
    footer: site.footer,
    author: site.author || 'Mara Ellison',
    authorBio: site.authorBio || '',
    heroTitle: site.hero.title,
    heroEyebrow: site.hero.eyebrow,
    heroSubtitle: site.hero.subtitle,
    ctaLabel: site.hero.ctaLabel,
    aboutHeading: site.about.heading,
    aboutLead: site.about.lead,
    aboutBody: site.about.body,
    stats: site.stats.map(s => ({ ...s })),
  })

  const set = (key, val) => setDraft(prev => ({ ...prev, [key]: val }))

  const setStat = (i, key, val) =>
    setDraft(prev => ({ ...prev, stats: prev.stats.map((s, idx) => (idx === i ? { ...s, [key]: key === 'value' ? Number(val) || 0 : val } : s)) }))

  const save = () => {
    updateSite({
      name: draft.name,
      tagline: draft.tagline,
      footer: draft.footer,
      author: draft.author,
      authorBio: draft.authorBio,
      hero: {
        title: draft.heroTitle,
        eyebrow: draft.heroEyebrow,
        subtitle: draft.heroSubtitle,
        ctaLabel: draft.ctaLabel,
      },
      about: {
        heading: draft.aboutHeading,
        lead: draft.aboutLead,
        body: draft.aboutBody,
      },
      stats: draft.stats,
    })
    onBack()
  }

  return (
    <div className="min-h-screen bg-cream px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <button onClick={onBack} className="text-sm text-ink/50 transition hover:text-ink">← back to dashboard</button>
            <h1 className="mt-2 text-3xl font-semibold text-pine">Site settings</h1>
            <ShinyText text="the front page, tuned by hand" speed={3} color="#8a8a78" shineColor="#b5643a" className="mt-1 text-sm" />
          </div>
          <button onClick={save} className="rounded-full bg-pine px-6 py-3 text-sm font-medium text-cream transition hover:brightness-110">
            Save settings
          </button>
        </div>

        <FadeContent blur duration={900} threshold={0}>
          <div className="mt-8 grid gap-5 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm sm:grid-cols-2">
            <Field label="Site name"><input value={draft.name} onChange={e => set('name', e.target.value)} className={inputCls} /></Field>
            <Field label="Tagline"><input value={draft.tagline} onChange={e => set('tagline', e.target.value)} className={inputCls} /></Field>
            <Field label="Author"><input value={draft.author} onChange={e => set('author', e.target.value)} className={inputCls} /></Field>
            <Field label="Author bio"><input value={draft.authorBio} onChange={e => set('authorBio', e.target.value)} className={inputCls} /></Field>

            <Field label="Hero title" wide>
              <input value={draft.heroTitle} onChange={e => set('heroTitle', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Hero eyebrow"><input value={draft.heroEyebrow} onChange={e => set('heroEyebrow', e.target.value)} className={inputCls} /></Field>
            <Field label="CTA label"><input value={draft.ctaLabel} onChange={e => set('ctaLabel', e.target.value)} className={inputCls} /></Field>
            <Field label="Hero subtitle" wide>
              <textarea value={draft.heroSubtitle} onChange={e => set('heroSubtitle', e.target.value)} rows={2} className={inputCls} />
            </Field>

            <Field label="About heading"><input value={draft.aboutHeading} onChange={e => set('aboutHeading', e.target.value)} className={inputCls} /></Field>
            <Field label="About lead"><input value={draft.aboutLead} onChange={e => set('aboutLead', e.target.value)} className={inputCls} /></Field>
            <Field label="About body" wide>
              <textarea value={draft.aboutBody} onChange={e => set('aboutBody', e.target.value)} rows={3} className={inputCls} />
            </Field>
            <Field label="Footer" wide>
              <textarea value={draft.footer} onChange={e => set('footer', e.target.value)} rows={2} className={inputCls} />
            </Field>
          </div>
        </FadeContent>

        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-xl text-pine">Hero stats</h2>
          <button onClick={() => set('stats', [...draft.stats, { label: 'New stat', value: 0 }])} className="rounded-full border border-ink/15 px-3 py-1.5 text-sm text-ink/70 hover:bg-ink/5">
            + Stat
          </button>
        </div>

        <FadeContent blur duration={900} threshold={0}>
          <div className="mt-4 space-y-3 pb-28">
            {draft.stats.map((s, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white p-3 shadow-sm">
                <input value={s.label} onChange={e => setStat(i, 'label', e.target.value)} className={`${inputCls} flex-1`} placeholder="Label" />
                <input value={s.value} type="number" onChange={e => setStat(i, 'value', e.target.value)} className={`${inputCls} w-24`} placeholder="0" />
                <button onClick={() => set('stats', draft.stats.filter((_, idx) => idx !== i))} className="rounded-lg border border-clay/25 px-2 py-1 text-xs text-clay">✕</button>
              </div>
            ))}
          </div>
        </FadeContent>
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