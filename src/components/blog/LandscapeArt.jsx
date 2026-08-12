import React from 'react'

const VERSIONS = {
  peak: { id: 'peak', name: 'Peak & lake' },
  pines: { id: 'pines', name: 'Ridge & pines' },
  dunes: { id: 'dunes', name: 'Desert dunes' },
  meadow: { id: 'meadow', name: 'Alpine meadow' },
}

export function artOptions() {
  return Object.values(VERSIONS)
}

/* Deterministic, palette-driven landscape art generated as inline SVG. */
export default function LandscapeArt({ palette, variant = 'peak', className = '' }) {
  const stops = palette
    ? palette.stops
    : ['#9ec8e2', '#f2e2c3', '#3e6447']
  const uid = React.useId()

  const scenes = {
    peak: (
      <>
        <polygon points="0,220 90,60 200,200 260,120 380,230" fill="rgba(255,255,255,0.28)" />
        <polygon points="0,220 90,60 200,200 260,120 380,230" fill={stops[2]} opacity="0.9" transform="translate(0,14) scale(0.97)" />
        <rect x="0" y="230" width="380" height="70" fill={withAlpha(stops[1], 0.45)} />
      </>
    ),
    pines: (
      <>
        <polygon points="0,240 40,140 90,240 130,120 190,240 250,180 300,240 340,150 380,240" fill={stops[2]} opacity="0.85" />
        {[50, 120, 200, 280, 330].map((x, i) => (
          <polygon key={i} points={`${x},${190 - (i % 3) * 12} ${x + 18},240 ${x - 18},240`} fill="#1e3a28" />
        ))}
        <rect x="0" y="240" width="380" height="60" fill={withAlpha(stops[1], 0.4)} />
      </>
    ),
    dunes: (
      <>
        {[0, 60, 120].map((o, i) => (
          <path key={i} d={`M0,260 C80,${170 - i * 26} 200,${240 - i * 10} 380,${190 - i * 18} L380,300 L0,300 Z`} fill={i === 0 ? stops[2] : i === 1 ? withAlpha(stops[2], 0.72) : '#d8b98a'} />
        ))}
        <circle cx="300" cy="80" r="26" fill={stops[1]} />
      </>
    ),
    meadow: (
      <>
        <path d="M0,260 C100,200 200,150 380,220 L380,300 L0,300 Z" fill={stops[2]} opacity="0.85" />
        <ellipse cx="150" cy="270" rx="90" ry="18" fill={withAlpha(stops[1], 0.6)} />
        <circle cx="80" cy="70" r="24" fill="#fff" opacity="0.9" />
        <polygon points="0,220 60,120 130,220" fill={withAlpha(stops[2], 0.6)} />
      </>
    ),
  }

  return (
    <svg
      viewBox="0 0 380 300"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stops[0]} />
          <stop offset="60%" stopColor={stops[1]} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="380" height="300" fill={`url(#sky-${uid})`} />
      <circle cx="290" cy="66" r="30" fill="#fff7dc" opacity="0.95" />
      <circle cx="290" cy="66" r="42" fill="#fff7dc" opacity="0.25" />
      {scenes[variant] || scenes.peak}
    </svg>
  )
}

function withAlpha(hex, alpha) {
  const n = hex.replace('#', '')
  const r = parseInt(n.slice(0, 2), 16)
  const g = parseInt(n.slice(2, 4), 16)
  const b = parseInt(n.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}