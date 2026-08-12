import React, { useState } from 'react'
import { useAuth } from '../../store/content'
import { Aurora, Magnet, GradientText, StarBorder, DecryptedText, ShinyText, BlurText } from '../reactbits'

export default function AdminLogin({ onSuccess }) {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = e => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      if (login(username, password)) {
        onSuccess()
      } else {
        setError('Incorrect username or password.')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="aurora-wrap absolute inset-0">
        <Aurora colorStops={['#b5643a', '#4a7c59', '#1f3d2b']} amplitude={1} blend={0.6} speed={1} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <GradientText
          colors={['#e6b566', '#4a7c59', '#b5643a']}
          animationSpeed={6}
          className="justify-center text-5xl font-semibold text-cream"
          showBorder={false}
        >
          Trail Notes
        </GradientText>
        <ShinyText
          text="content studio"
          speed={4}
          color="rgba(250,246,236,0.5)"
          shineColor="#e6b566"
          className="mt-2 block text-center text-xs uppercase tracking-[0.4em]"
        />
        <BlurText
          text="Editor's Hut"
          animateBy="words"
          delay={60}
          className="mt-6 text-center text-2xl text-cream"
        />

        <form onSubmit={submit} className="mt-8 rounded-3xl border border-cream/10 bg-white/95 p-8 shadow-2xl backdrop-blur">
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-ink/50">Username</label>
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full rounded-xl border border-ink/15 bg-cream/50 px-4 py-3 text-pine outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20"
                placeholder="kushblog"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-ink/50">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-xl border border-ink/15 bg-cream/50 px-4 py-3 text-pine outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            {error && (
              <p className="rounded-lg bg-clay/10 px-4 py-2 text-sm text-clay">{error}</p>
            )}
            <Magnet padding={60} magnetStrength={4} className="w-full">
              <StarBorder as="button" type="submit" color="#b5643a" speed="5s" className="w-full">
                {loading ? 'Checking locks…' : 'Enter the journal'}
              </StarBorder>
            </Magnet>
          </div>
        </form>

        <p className="mt-6 text-center">
          <DecryptedText
            text="kushblog  ·  yokush18"
            animateOn="inViewHover"
            characters="✦·"
            className="font-mono text-xs tracking-widest text-cream/70"
          />
        </p>
      </div>
    </div>
  )
}