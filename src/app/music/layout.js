import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Music & Personal Projects',
  description: 'The Outside EP, one-shot music videos with my friend Joe, a hand-built album cover and avocado-dyed merch. Take a listen and let me know.',
  path: '/music',
  image: '/images/outside-cover.jpg',
})

export default function MusicLayout({ children }) {
  return (
    <>
      <h1 className="sr-only">Zach Ardente: music & personal projects</h1>
      {children}
    </>
  )
}
