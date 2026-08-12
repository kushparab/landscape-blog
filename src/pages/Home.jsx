import React from 'react'
import Navbar from '../components/blog/Navbar'
import Hero from '../components/blog/Hero'
import About from '../components/blog/About'
import Footer from '../components/blog/Footer'
import PostCard from '../components/blog/PostCard'
import { useContent } from '../store/content'
import { ShinyText, FadeContent } from '../components/reactbits'

export default function Home() {
  const { posts } = useContent()

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      <main id="trails" className="mx-auto max-w-6xl px-6 pb-24">
        <FadeContent blur duration={1000} threshold={0.1}>
          <div className="mt-24 flex items-center gap-4">
            <h2 className="text-3xl text-pine sm:text-4xl">Field Notes</h2>
            <ShinyText text="— the archives" speed={3} color="#8a8a78" shineColor="#b5643a" className="text-lg" />
          </div>
        </FadeContent>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </main>

      <About />
      <Footer />
    </div>
  )
}