import {
  IconBrandNextjs,
  IconBrandReact,
  IconBrandReactNative,
  IconBrandSvelte,
  IconBrandThreejs,
  IconBrandTypescript,
} from '@tabler/icons-svelte'
import { asset } from '$app/paths'

import { WORK_ROUTES } from '@/lib/constants/routes'

import {
  ascendDescription,
  captainDescription,
  datawowDescription,
  magicBoxDescription,
  otherDescription,
} from './experienceContent.svelte'
import {
  captainDispatchDescription,
  captainDriverDescription,
  captainKitchenDescription,
  captainSiteDescription,
  captainTrackingDescription,
  cookiewowDescription,
  oldSiteDescription,
  pdpacoreDescription,
  pdpaproDescription,
  pdpaprokitDescription,
  worldRabiesDescription,
} from './projectContent.svelte'

import type { IconsProps } from '@tabler/icons-svelte/icons/icons'
import type { Component, Snippet } from 'svelte'

export type CompanyKey = 'captain' | 'datawow' | 'magicbox' | 'other' | 'ascend'

export interface ExperienceItem {
  id: CompanyKey
  company: string
  year: string
  role: string
  description: string | Snippet
  techStack: string[]
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'ascend',
    company: 'Ascend Group Co., Ltd.',
    year: '2025 - 2026',
    role: 'Senoir front-end developer',
    description: ascendDescription,
    techStack: ['react-native', 'expo'],
  },
  {
    id: 'captain',
    company: 'Captain AI Technologies., Ltd.',
    year: '2022 - 2025',
    role: 'Front-end developer',
    description: captainDescription,
    techStack: ['react', 'next.js', 'react-native', 'expo', 'mapbox'],
  },
  {
    id: 'datawow',
    company: 'Data Wow Co., Ltd.',
    year: '2021 - 2022',
    role: 'Front-end developer',
    description: datawowDescription,
    techStack: ['react', 'next.js', 'chakra-ui', 'storybook'],
  },
  {
    id: 'magicbox',
    company: 'Magic Box Solutions Co., Ltd.',
    year: '2019 - 2020',
    role: 'Back-end Developer',
    description: magicBoxDescription,
    techStack: ['express.js', 'echo', 'react', 'react-native', 'open-cv'],
  },
  {
    id: 'other',
    company: 'Other',
    year: '2020 - Present',
    role: 'Developer',
    description: otherDescription,
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

export type StackId =
  | 'typescript'
  | 'next'
  | 'react'
  | 'react-native'
  | 'svelte'
  | 'three'
  | 'tailwind'

export interface StackItem {
  Icon: Component<IconsProps, Dict>
  name: string
  shouldHighlight?: boolean
}

export const TECHSTACK: Partial<Record<StackId, StackItem>> = {
  typescript: {
    Icon: IconBrandTypescript as unknown as StackItem['Icon'],
    name: 'Typescript',
    shouldHighlight: true,
  },
  next: {
    Icon: IconBrandNextjs as unknown as StackItem['Icon'],
    name: 'Next.js',
    shouldHighlight: true,
  },
  react: {
    Icon: IconBrandReact as unknown as StackItem['Icon'],
    name: 'React',
    shouldHighlight: true,
  },
  'react-native': {
    Icon: IconBrandReactNative as unknown as StackItem['Icon'],
    name: 'React Native',
  },
  svelte: {
    Icon: IconBrandSvelte as unknown as StackItem['Icon'],
    name: 'Svelte',
  },
  three: {
    Icon: IconBrandThreejs as unknown as StackItem['Icon'],
    name: 'Three.js',
  },
} as const

export const TECHSTACK_AS_ARRAY: StackItem[] = Object.entries(TECHSTACK).map(
  ([key, value]) => {
    return {
      ...value,
      id: key,
    }
  },
)

export interface CommonProject {
  title: string
  year: string
  techStacks: string[]
  description?: string | Snippet<[boolean | undefined]>
  companyKey?: CompanyKey
  company?: string
  href?: string
  role?: string
  isFeatured?: false
  image?: {
    width: number
    height: number
    imageUrl: string
    color?: string | number
    inverseColor?: boolean
  }
}

export interface FeaturedProject extends Omit<CommonProject, 'isFeatured'> {
  isFeatured: true
  image: Exclude<CommonProject['image'], undefined>
}

export type Project = FeaturedProject | CommonProject

export const PROJECTS: Project[] = [
  // datawow
  {
    title: 'PDPA Core',
    year: '2021',
    companyKey: 'datawow',
    company: 'Datawow',
    techStacks: ['next.js', 'chakra-ui', 'typescript'],
    href: WORK_ROUTES.pdpacore.pathname,
    role: 'Frontend developer',
    description: pdpacoreDescription,
    isFeatured: true,
    image: {
      width: 1000,
      height: 525,
      inverseColor: true,
      imageUrl: asset('/images/projects/pdpacore.jpg'),
    },
  },
  {
    title: 'Learn PDPA',
    year: '2021',
    company: 'Datawow',
    techStacks: ['next.js', 'chakra-ui', 'Thinkific', 'typescript'],
    href: WORK_ROUTES.learnpdpa.pathname,
    role: 'Frontend developer',
  },
  {
    title: 'PDPA.Pro',
    year: '2021',
    company: 'Datawow',
    techStacks: ['next.js', 'chakra-ui', 'stripe', 'typescript'],
    href: WORK_ROUTES.pdpaPro.pathname,
    role: 'Frontend developer',
    description: pdpaproDescription,
    isFeatured: true,
    image: {
      width: 1000,
      height: 525,
      imageUrl: asset('/images/projects/pdpapro.jpg'),
    },
  },
  {
    title: 'PDPA Prokit',
    year: '2021',
    company: 'Datawow',
    techStacks: ['next.js', 'chakra-ui', 'stripe', 'typescript'],
    href: WORK_ROUTES.pdpaProkit.pathname,
    description: pdpaprokitDescription,
    role: 'Frontend developer',
    image: {
      width: 1000,
      height: 525,
      imageUrl: asset('/images/projects/prokit.jpg'),
    },
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
      'wordpress',
    ],
    href: WORK_ROUTES.cookieWow.pathname,
    role: 'Frontend developer',
    description: cookiewowDescription,
    isFeatured: true,
    image: {
      width: 1000,
      height: 525,
      imageUrl: asset('/images/projects/cookiewow.jpg'),
    },
  },
  {
    title: 'Consent Wow',
    year: '2022',
    company: 'Datawow',
    techStacks: ['next.js', 'chakra-ui', 'emotion', 'stripe', 'typescript'],
    href: WORK_ROUTES.consentWow.pathname,
    role: 'Frontend developer',
  },
  {
    title: 'Accurately',
    year: '2022',
    companyKey: 'datawow',
    company: 'Datawow',
    techStacks: ['next.js', 'emotion', 'stripe', 'typescript'],
    href: WORK_ROUTES.accurately.pathname,
    role: 'Frontend developer',
  },

  // captain
  {
    title: 'Tracking App',
    year: '2022',
    companyKey: 'captain',
    company: 'Captain',
    techStacks: ['next.js', 'tailwind css', 'react-map-gl', 'typescript'],
    href: WORK_ROUTES.captainTracking.pathname,
    role: 'Frontend developer',
    description: captainTrackingDescription,
    isFeatured: true,
    image: {
      width: 479,
      height: 1000,
      imageUrl: asset('/images/projects/captain-tracking.jpg'),
    },
  },
  {
    title: 'Kitchen App',
    year: '2022',
    companyKey: 'captain',
    company: 'Captain',
    techStacks: ['react native', 'expo', 'typescript'],
    href: WORK_ROUTES.captainKitchen.pathname,
    role: 'Frontend developer',
    description: captainKitchenDescription,
    isFeatured: true,
    image: {
      width: 1000,
      height: 535,
      inverseColor: true,
      imageUrl: asset('/images/projects/captain-kitchen.jpg'),
    },
  },
  {
    title: 'Dispatch App',
    year: '2022',
    companyKey: 'captain',
    company: 'Captain',
    techStacks: ['react native', 'expo', 'typescript'],
    href: WORK_ROUTES.captainDispatch.pathname,
    role: 'Frontend developer',
    description: captainDispatchDescription,
    isFeatured: true,
    image: {
      width: 1000,
      height: 758,
      imageUrl: asset('/images/projects/captain-dispatch.jpg'),
    },
  },
  {
    title: 'Driver App',
    year: '2022',
    companyKey: 'captain',
    company: 'Captain',
    techStacks: ['react native', 'expo', 'typescript'],
    href: WORK_ROUTES.captainDriver.pathname,
    role: 'Frontend developer',
    description: captainDriverDescription,
  },
  {
    title: 'Captain Site',
    year: '2022',
    companyKey: 'captain',
    company: 'Captain',
    techStacks: ['next.js', 'tailwind css', 'typescript', 'directus'],
    href: WORK_ROUTES.captainSite.pathname,
    role: 'Frontend developer',
    description: captainSiteDescription,
    isFeatured: true,
    image: {
      width: 1000,
      height: 541,
      inverseColor: true,
      imageUrl: asset('/images/projects/captain-site.jpg'),
    },
  },
  // freelance
  {
    title: 'Vich.ai',
    year: '2019',
    company: 'Magic Box',
    techStacks: ['express.js', 'react', 'react-native', 'open-cv'],
    href: WORK_ROUTES.vishai.pathname,
    role: 'Frontend developer',
  },

  // freelance
  {
    title: '2020 World Rabies - Virtual Exhibition',
    companyKey: 'other',
    year: '2020',
    techStacks: ['react', 'three.js', 'express.js', 'typescript'],
    role: 'Developer',
    description: worldRabiesDescription,
    isFeatured: true,
    image: {
      width: 1000,
      height: 539,
      imageUrl: asset('/images/projects/world-rabies-2020-thailand.jpg'),
    },
  },
  {
    title: 'Rabies 101',
    year: '2020',
    techStacks: ['react native', 'nest.js', 'web socket', 'typescript'],
    role: 'Developer',
  },
  {
    title: 'Tour Sakol',
    year: '2021',
    techStacks: ['next.js', 'three.js', 'typescript'],
    role: 'Developer',
  },

  // resume
  {
    title: 'Me @2020',
    companyKey: 'other',
    year: '2020',
    techStacks: ['react', 'three.js', 'typescript', 'blender'],
    href: WORK_ROUTES['2020'].pathname,
  },
  {
    title: 'Me @2020v2',
    companyKey: 'other',
    year: '2020',
    techStacks: ['react', 'three.js', 'typescript'],
    href: WORK_ROUTES['2020v2'].pathname,
    description: oldSiteDescription,
    isFeatured: true,
    image: {
      width: 1000,
      height: 535,
      inverseColor: true,
      imageUrl: asset('/images/projects/2020v2.jpg'),
    },
  },
]

export const SORTED_PROJECTS = PROJECTS.sort((a, b) =>
  a.title.localeCompare(b.title),
)
  .sort((a, b) => (a.company ?? '').localeCompare(b.company ?? ''))
  .sort((a, b) => b.year.localeCompare(a.year))

export const FEATURE_PROJECTS = SORTED_PROJECTS.filter(
  ({ isFeatured }) => !!isFeatured,
) as FeaturedProject[]

// export const CAPTAIN_PROJECTS = SORTED_PROJECTS.filter(
//   (project) => project.companyKey === 'captain',
// )
// export const DATAWOW_PROJECTS = SORTED_PROJECTS.filter(
//   (project) => project.companyKey === 'datawow',
// )
// export const MAGICBOX_PROJECTS = SORTED_PROJECTS.filter(
//   (project) => project.companyKey === 'magicbox',
// )
// export const OTHER_PROJECTS = SORTED_PROJECTS.filter(
//   (project) => project.companyKey === 'other',
// )
