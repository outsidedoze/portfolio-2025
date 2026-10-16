import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Gardening 2022–2025',
  description: 'Four years of growing, from a raised bed in the baking Denver sun to a 25x25 community plot in Burlington, VT. Squirrels suck. The chaos is too pretty.',
  path: '/garden',
})

export default function GardenLayout({ children }) {
  return (
    <>
      <h1 className="sr-only">Zach Ardente: gardening 2022–2025</h1>
      {children}
    </>
  )
}
