// Shared SEO data: page metadata, sitemap and the /creative-director share links all read from here.
export const SITE = 'https://zachardente.com'

export const OG_IMAGE = '/images/og-image.jpg'

// Keyed by the creative-director overlay id; slug is what appears in ?project=<slug>
export const PROJECTS = {
  sorette: {
    slug: 'sorette',
    title: 'Sorette Web Design',
    description: 'Web design for Sorette, an online shop for pregnancy, mom and baby safe products. No template cookie-cutter woes. Initial mockups inside.',
    image: '/images/creative/sorette/sorette-1.jpg',
  },
  nitro: {
    slug: 'nitro-bar',
    title: 'Nitro Bar Merch Concepts',
    description: "Hoodies, hats and crewnecks for Nitro Bar, Providence's locally famous coffee. Pitched for Head of Merch, didn't land it. Still some of my best work.",
    image: '/images/creative/nitro-bar/crewneck-03.webp',
  },
  thriftcon: {
    slug: 'thriftcon',
    title: 'ThriftCon x ComplexCon Posters',
    description: "Posters for ThriftCon's areas at ComplexCon 2026, so well received they're being used as the event signage too. Look mom! Clout!!",
    image: '/images/creative/thriftcon/complexcon-1.webp',
  },
  gas: {
    slug: 'gas',
    title: 'The Gas Station Branding, Rutland VT',
    description: 'Branding for a dispensary in an old 50s Texaco station in Rutland, VT. Retro gas-station vibe, modern and fresh. Super proud of where this one landed.',
    image: '/images/creative/gasstation/final-logo.webp',
  },
  omi: {
    slug: 'omi',
    title: 'Omi Health Branding & Website',
    description: "Modernizing pet healthcare: a quick wordmark, a textured gradient palette, posters and a website that grew up with the brand. I'm a sucker for my dog.",
    image: '/images/creative/omi/omi-branding.webp',
  },
  chambord: {
    slug: 'chambord',
    title: 'Chambord Logo Refresh',
    description: 'Modernizing a seriously dated logo for Chambord fireclay farm sinks at Forte Brands. No, not the booze. The sinks. Still recognizable. Done.',
    image: '/images/creative/chambord/chambord-1.webp',
  },
  landmade: {
    slug: 'landmade',
    title: 'Landmade Branding & Price Book',
    description: "Branding, photoshoot, price book, website and finishes box for Landmade's 100% recyclable bathtubs at Forte Brands. One of my proudest designs.",
    image: '/images/creative/landmade/landmade-1.jpg',
  },
  colorblock: {
    slug: 'colorblock',
    title: 'Colorblock Logo & Branding',
    description: 'Branding for Colorblock, a creative coworking startup: where creatives go to turn nothing into something. Sometimes simplicity is the only way.',
    image: '/images/creative/colorblock/colorblock-1.jpg',
  },
  them: {
    slug: 'them',
    title: 'Them Logo Process',
    description: 'A peek into my process: logo explorations for Them, a genderless clothing line my partner and I started with a pair of jeans. Which do you prefer?',
    image: OG_IMAGE,
  },
  crosswater: {
    slug: 'crosswater',
    title: 'Crosswater Photoshoot & Price Book',
    description: 'A $500 DIY faucet photo studio, a pitched brand refresh and a cleaner 400-page price book for Crosswater at Forte Brands. Pretty good ROI, right?',
    image: '/images/creative/crosswater/crosswater-1.webp',
  },
  benttree: {
    slug: 'bent-tree',
    title: 'Bent Tree Logo & Packaging',
    description: "Pot + 90s skate nostalgia + Vermont nature: a logo and pre-roll packaging for a friend's grow, built around his favorite tree. I'd buy this pre-roll.",
    image: '/images/creative/benttree/benttree-1.webp',
  },
}

export const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE}/#person`,
      name: 'Zach Ardente',
      url: SITE,
      image: SITE + OG_IMAGE,
      jobTitle: ['Designer', 'Creative Director', 'Musician'],
      description: 'One man, many hats: designer, creative and art director, and musician.',
      knowsAbout: ['Branding', 'Web design', 'Art direction', 'Logo design', 'Packaging design', 'Price book design', 'Album cover design', 'Music videos', 'Screen printing', 'Gardening'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: SITE,
      name: 'Zach Ardente',
      alternateName: 'One Man. Many Hats',
      publisher: { '@id': `${SITE}/#person` },
    },
    {
      '@type': 'ProfilePage',
      url: `${SITE}/`,
      mainEntity: { '@id': `${SITE}/#person` },
    },
  ],
}

// Next replaces a child's openGraph/twitter objects wholesale, so each page rebuilds them here.
export function pageMetadata({ title, description, path, image = OG_IMAGE }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | Zach Ardente`, description, url: path, type: 'website', images: [{ url: image }] },
    twitter: { card: 'summary_large_image', title: `${title} | Zach Ardente`, description, images: [image] },
  }
}
