import React from 'react'
import { useContent } from '../../store/content'
import { ScrollReveal, FadeContent, SplitText } from '../reactbits'

export default function About() {
  const { site } = useContent()

  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <ScrollReveal enableBlur baseRotation={2} containerClassName="[&_.scroll-reveal-text]:text-pine">
          {site.about.heading}
        </ScrollReveal>
        <FadeContent blur duration={1200} threshold={0.2}>
          <SplitText
            text={site.about.lead}
            splitType="words"
            className="mt-2 text-lg italic text-clay"
            textAlign="center"
          />
        </FadeContent>
        <FadeContent blur duration={1200} delay={200} threshold={0.2}>
          <p className="mt-6 leading-relaxed text-ink/75">{site.about.body}</p>
        </FadeContent>

        <FadeContent blur duration={1200} delay={300} threshold={0.2} className="mt-12">
          <div className="mx-auto flex max-w-md items-center justify-center gap-5 rounded-2xl bg-sand/70 px-6 py-5">
            <span className="h-16 w-16 rounded-full bg-gradient-to-br from-[#d9a05b] to-[#7a4f2d] ring-2 ring-cream" />
            <div className="text-left">
              <p className="font-semibold text-pine">{site.author || 'Mara Ellison'}</p>
              <p className="text-sm text-ink/60">{site.authorBio || 'Writer and weekend wanderer · Field notes from wherever the dirt ends'}</p>
            </div>
          </div>
        </FadeContent>
      </div>
    </section>
  )
}