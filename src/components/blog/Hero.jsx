import React from 'react'
import { useContent } from '../../store/content'
import { useNavigate } from 'react-router-dom'
import {
  Aurora,
  TextPressure,
  TextLoop,
  ShinyText,
  CountUp,
  Magnet,
  StarBorder,
  FadeContent,
} from '../reactbits'

export default function Hero() {
  const { site, posts } = useContent()
  const navigate = useNavigate()
  const firstPost = posts[0]

  return (
    <section className="relative overflow-hidden" style={{ minHeight: '100vh' }}>
      <div className="aurora-wrap absolute inset-0">
        <Aurora colorStops={['#1f3d2b', '#4a7c59', '#a8bfa0']} amplitude={1.1} blend={0.6} speed={1} />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pb-16 pt-28 text-center text-cream">
        <FadeContent blur duration={1200} threshold={0}>
          <ShinyText
            text={site.hero.eyebrow}
            speed={4}
            color="rgba(250,246,236,0.55)"
            shineColor="#e6b566"
            className="mb-8 text-sm uppercase tracking-[0.35em]"
          />
        </FadeContent>

        <TextPressure
          text={site.hero.title}
          fontFamily="Georgia, 'Times New Roman', serif"
          fontUrl=""
          width={false}
          italic={false}
          weight={false}
          flex={true}
          minFontSize={28}
          className="mb-2 max-w-5xl"
          textColor="#faf6ec"
        />

        <FadeContent blur duration={1400} delay={400} threshold={0}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-cream/80">
            {site.hero.subtitle}
          </p>
        </FadeContent>

        <FadeContent blur duration={1000} delay={700} threshold={0}>
          <Magnet padding={90} magnetStrength={3}>
            <StarBorder
              as="button"
              onClick={() => firstPost && navigate('/post/' + firstPost.id)}
              color="#e6b566"
              speed="4s"
              className="mt-10"
            >
              {site.hero.ctaLabel}
            </StarBorder>
          </Magnet>
        </FadeContent>

        <FadeContent blur duration={1200} delay={900} threshold={0} className="mt-20 w-full">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {site.stats.map((s, i) => (
              <div key={i} className="rounded-2xl border border-cream/15 bg-cream/5 px-4 py-6 backdrop-blur-sm">
                <div className="text-3xl font-semibold text-cream">
                  <CountUp to={s.value} duration={2.4} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-cream/60">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeContent>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <TextLoop
          text="Trail Notes ✦ Take the long way ✦ Camp near water ✦ Alpine starts at the pass "
          shape="wave"
          speed={220}
          curviness={40}
          fontSize={22}
          fontWeight={600}
          color="rgba(250,246,236,0.5)"
          ribbonColor="rgba(166,208,180,0.12)"
          ribbonWidth={46}
          separator=""
          className="opacity-90"
        />
      </div>
    </section>
  )
}