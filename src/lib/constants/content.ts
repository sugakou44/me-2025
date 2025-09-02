import {
  IconBrandNextjs,
  IconBrandReact,
  IconBrandReactNative,
  IconBrandSvelte,
  IconBrandThreejs,
  IconBrandTypescript,
} from '@tabler/icons-svelte'

import { WORK_ROUTES } from '@/lib/constants/routes'

import {
  captainParagraph,
  datawowParagraph,
  magicBoxParagraph,
  otherParagraph,
} from './experienceContent.svelte'

import type { IconsProps } from '@tabler/icons-svelte/icons/icons'
import type { Component, Snippet } from 'svelte'

export type CompanyKey = 'captain' | 'datawow' | 'magicbox' | 'other'

export interface ExperienceItem {
  id: CompanyKey
  company: string
  year: string
  role: string
  paragraph: string | Snippet
  techStack: string[]
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'captain',
    company: 'Captain AI Technologies., Ltd.',
    year: '2022 - 2025',
    role: 'Front-end developer',
    paragraph: captainParagraph,
    techStack: ['react', 'next.js', 'react-native', 'expo', 'mapbox'],
  },
  {
    id: 'datawow',
    company: 'Data Wow Co., Ltd.',
    year: '2021 - 2022',
    role: 'Front-end developer',
    paragraph: datawowParagraph,
    techStack: ['react', 'next.js', 'chakra-ui', 'storybook'],
  },
  {
    id: 'magicbox',
    company: 'Magic Box Solutions Co., Ltd.',
    year: '2019 - 2020',
    role: 'Back-end Developer',
    paragraph: magicBoxParagraph,
    techStack: ['express.js', 'echo', 'react', 'react-native', 'open-cv'],
  },
  {
    id: 'other',
    company: 'Other',
    year: '2020 - Present',
    role: 'Developer',
    paragraph: otherParagraph,
    techStack: ['react', 'react-native', 'three.js', 'nest.js'],
  },
]

export interface EducationItem {
  year: number | string
  degree: string
  school: string
}

export const EDUCATION: EducationItem[] = [
  {
    year: '2013 - 2017',
    degree:
      'Bachelor of Engineering - BE, Electrical and Electronics Engineering',
    school: "King Mongkut's University of Technology North Bangkok, Thailand",
  },
]

export interface StackItem {
  Icon: Component<IconsProps, Dict>
  name: string
  shouldHighlight?: boolean
}

export const STACK: StackItem[] = [
  {
    Icon: IconBrandTypescript as unknown as StackItem['Icon'],
    name: 'Typescript',
    shouldHighlight: true,
  },
  {
    Icon: IconBrandNextjs as unknown as StackItem['Icon'],
    name: 'Next.js',
    shouldHighlight: true,
  },
  {
    Icon: IconBrandReact as unknown as StackItem['Icon'],
    name: 'React',
    shouldHighlight: true,
  },
  {
    Icon: IconBrandReactNative as unknown as StackItem['Icon'],
    name: 'React Native',
  },
  {
    Icon: IconBrandSvelte as unknown as StackItem['Icon'],
    name: 'Svelte',
  },
  {
    Icon: IconBrandThreejs as unknown as StackItem['Icon'],
    name: 'Three.js',
  },
]

export interface Project {
  title: string
  description?: string
  year: string
  companyKey?: CompanyKey
  company?: string
  techStacks: string[]
  href?: string
}

export const PROJECTS: Project[] = [
  // datawow
  {
    title: 'PDPA Core',
    year: '2021',
    companyKey: 'datawow',
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
    companyKey: 'datawow',
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
    companyKey: 'datawow',
    company: 'Datawow',
    techStacks: ['next.js', 'emotion', 'stripe', 'typescript'],
    href: WORK_ROUTES.accurately.pathname,
  },

  // captain
  {
    title: 'Tracking App',
    year: '2022',
    companyKey: 'captain',
    company: 'Captain',
    techStacks: ['next.js', 'tailwind css', 'react-map-gl', 'typescript'],
    href: WORK_ROUTES.captainTracking.pathname,
  },
  {
    title: 'Kitchen App',
    year: '2022',
    companyKey: 'captain',
    company: 'Captain',
    techStacks: ['react native', 'expo', 'typescript'],
    href: WORK_ROUTES.captainKitchen.pathname,
  },
  {
    title: 'Dispatch App',
    year: '2023',
    companyKey: 'captain',
    company: 'Captain',
    techStacks: ['react native', 'expo', 'typescript'],
    href: WORK_ROUTES.captainDispatch.pathname,
  },
  {
    title: 'Driver App',
    year: '2023',
    companyKey: 'captain',
    company: 'Captain',
    techStacks: ['react native', 'expo', 'typescript'],
    href: WORK_ROUTES.captainDriver.pathname,
  },
  {
    title: 'Captain Site',
    year: '2022',
    companyKey: 'captain',
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
    companyKey: 'other',
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
    companyKey: 'other',
    year: '2020',
    techStacks: ['react.js', 'three.js', 'typescript', 'blender'],
    href: WORK_ROUTES['2020'].pathname,
  },
  {
    title: 'Me @2020v2',
    companyKey: 'other',
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

export const CAPTAIN_PROJECTS = SORTED_PROJECTS.filter(
  (project) => project.companyKey === 'captain',
)
export const DATAWOW_PROJECTS = SORTED_PROJECTS.filter(
  (project) => project.companyKey === 'datawow',
)
export const MAGICBOX_PROJECTS = SORTED_PROJECTS.filter(
  (project) => project.companyKey === 'magicbox',
)
export const OTHER_PROJECTS = SORTED_PROJECTS.filter(
  (project) => project.companyKey === 'other',
)
