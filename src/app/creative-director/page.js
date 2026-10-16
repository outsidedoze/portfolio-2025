import CreativePage from './CreativePage'
import { SITE, PROJECTS, pageMetadata } from '@/lib/seo'

const BASE = {
  title: 'Creative & Art Direction',
  description: 'Branding, web design, packaging and price books for Landmade, Crosswater, The Gas Station, Omi Health, ThriftCon and more. Click around my desk.',
}

const findProject = (slug) => Object.values(PROJECTS).find((p) => p.slug === slug)

export async function generateMetadata({ searchParams }) {
  const project = findProject((await searchParams).project)
  if (!project) return pageMetadata({ ...BASE, path: '/creative-director' })
  return pageMetadata({ ...project, path: `/creative-director?project=${project.slug}` })
}

export default async function Page({ searchParams }) {
  const project = findProject((await searchParams).project)
  const workLd = project && {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `${SITE}/creative-director?project=${project.slug}`,
    image: SITE + project.image,
    creator: { '@id': `${SITE}/#person` },
  }
  return (
    <>
      {/* Server-rendered text mirror of the collage for crawlers and screen readers; shows as a list when a keyboard user tabs into it */}
      <div className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:inset-4 focus-within:z-[2000] focus-within:overflow-auto focus-within:bg-white focus-within:p-6 focus-within:text-black">
        <h1>Zach Ardente: creative & art direction</h1>
        <p>{BASE.description}</p>
        <ul>
          {Object.values(PROJECTS).map((p) => (
            <li key={p.slug}>
              <a href={`/creative-director?project=${p.slug}`} className="underline">{p.title}</a>: {p.description}
            </li>
          ))}
        </ul>
      </div>
      {workLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(workLd) }} />}
      <CreativePage />
    </>
  )
}
