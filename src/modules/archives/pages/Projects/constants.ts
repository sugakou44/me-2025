import { WORK_ROUTES } from '@/lib/constants/routes'

export interface Project {
  title: string
  description?: string
  year: string
  company?: string
  techStacks: string[]
  href?: string
}

export const PROJECTS: Project[] = [
  // datawow
  {
    title: 'PDPA Core',
    year: '2021',
    company: 'Datawow',
    techStacks: ['next.js', 'chakra-ui', 'typescript'],
    href: WORK_ROUTES.pdpacore.pathname,
  },
  {
    title: 'Learn PDPA',
    year: '2021',
    company: 'Datawow',
    techStacks: ['next.js', 'chakra-ui', 'Thinkific', 'typescript'],
    href: WORK_ROUTES.learnpdpa.pathname,
  },
  {
    title: 'PDPA.Pro',
    year: '2021',
    company: 'Datawow',
    techStacks: ['next.js', 'chakra-ui', 'stripe', 'typescript'],
    href: WORK_ROUTES.pdpaPro.pathname,
  },
  {
    title: 'PDPA Prokit',
    year: '2021',
    company: 'Datawow',
    techStacks: ['next.js', 'chakra-ui', 'stripe', 'typescript'],
    href: WORK_ROUTES.pdpaProkit.pathname,
  },
  {
    title: 'Cookie Wow',
    year: '2021',
    company: 'Datawow',
    techStacks: [
      'next.js',
      'chakra-ui',
      'preact',
      'stripe',
      'typescript',
      'ruby on rails',
    ],
    href: WORK_ROUTES.cookieWow.pathname,
  },
  {
    title: 'Consent Wow',
    year: '2022',
    company: 'Datawow',
    techStacks: ['next.js', 'chakra-ui', 'emotion', 'stripe', 'typescript'],
    href: WORK_ROUTES.consentWow.pathname,
  },
  {
    title: 'Accurately',
    year: '2022',
    company: 'Datawow',
    techStacks: ['next.js', 'emotion', 'stripe', 'typescript'],
    href: WORK_ROUTES.accurately.pathname,
  },

  // captain
  {
    title: 'Tracking App',
    year: '2022',
    company: 'Captain',
    techStacks: ['next.js', 'tailwind css', 'react-map-gl', 'typescript'],
    href: WORK_ROUTES.captainTracking.pathname,
  },
  {
    title: 'Kitchen App',
    year: '2022',
    company: 'Captain',
    techStacks: ['react native', 'expo', 'typescript'],
    href: WORK_ROUTES.captainKitchen.pathname,
  },
  {
    title: 'Dispatch App',
    year: '2023',
    company: 'Captain',
    techStacks: ['react native', 'expo', 'typescript'],
    href: WORK_ROUTES.captainDispatch.pathname,
  },
  {
    title: 'Driver App',
    year: '2023',
    company: 'Captain',
    techStacks: ['react native', 'expo', 'typescript'],
    href: WORK_ROUTES.captainDriver.pathname,
  },
  {
    title: 'Captain Site',
    year: '2022',
    company: 'Captain',
    techStacks: ['next.js', 'tailwind css', 'typescript', 'directus'],
    href: WORK_ROUTES.captainSite.pathname,
  },
  // freelance
  {
    title: 'Vich.ai',
    year: '2019',
    company: 'Magic Box',
    techStacks: ['express.js', 'react', 'react-native', 'open-cv'],
    href: WORK_ROUTES.vishai.pathname,
  },

  // freelance
  {
    title: '2020 World Rabies - Virtual Exhibition',
    year: '2020',
    techStacks: ['react.js', 'three.js', 'express.js', 'typescript'],
  },
  {
    title: 'Rabies 101',
    year: '2020',
    techStacks: ['react native', 'nest.js', 'web socket', 'typescript'],
  },
  {
    title: 'Tour Sakol',
    year: '2021',
    techStacks: ['next.js', 'three.js', 'typescript'],
  },

  // resume
  {
    title: 'Me @2020',
    year: '2020',
    techStacks: ['react.js', 'three.js', 'typescript', 'blender'],
    href: WORK_ROUTES['2020'].pathname,
  },
  {
    title: 'Me @2020v2',
    year: '2020',
    techStacks: ['react.js', 'three.js', 'typescript'],
    href: WORK_ROUTES['2020v2'].pathname,
  },
]

export const SORTED_PROJECTS = PROJECTS.sort((a, b) =>
  a.title.localeCompare(b.title),
)
  .sort((a, b) => (a.company ?? '').localeCompare(b.company ?? ''))
  .sort((a, b) => b.year.localeCompare(a.year))
