import { SITE, PROJECTS } from '@/lib/seo'

export default function sitemap() {
  const pages = ['', '/creative-director', '/music', '/garden'].map((path) => ({ url: SITE + path }))
  const projects = Object.values(PROJECTS).map((p) => ({ url: `${SITE}/creative-director?project=${p.slug}` }))
  return [...pages, ...projects]
}
