import {
  IconBrandNextjs,
  IconBrandReact,
  IconBrandReactNative,
  IconBrandSvelte,
  IconBrandThreejs,
  IconBrandTypescript,
} from '@tabler/icons-svelte'

import type { IconsProps } from '@tabler/icons-svelte/icons/icons'
import type { Component } from 'svelte'

export interface ExperienceItem {
  id: 'captain' | 'datawow' | 'magicbox' | 'freelance'
  company: string
  year: string
  role: string
  paragraph: string
  techStack: string[]
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'captain',
    company: 'Captain AI Technologies., Ltd.',
    year: '2022 - 2025',
    role: 'Front-end developer',
    paragraph:
      'Built and maintained multiple applications across all products; developed a graphical interface builder for a delivery-tracking app; enhanced UI/UX across projects; integrated a headless CMS (Directus) via GraphQL; besides company API, also work with third-party services such as Firebase, GraphHopper, and MapBox; and modernized legacy systems by rewriting them with hook and typed.',
    techStack: ['react', 'next.js', 'react-native', 'expo', 'mapbox'],
  },
  {
    id: 'datawow',
    company: 'Data Wow Co., Ltd.',
    year: '2021 - 2022',
    role: 'Front-end developer',
    paragraph:
      'Worked on products related to PDPA compliance; built design systems using CSS-in-JS solutions (like Emotion and Chakra UI) and Storybook; implemented an audio visualizer leveraging the Audio/MediaRecorder API; integrated LMS platforms; crafted prototypes and mockups for product and sales teams; and managed build/deployment workflows via GitHub Actions, CircleCI, and Kubernetes.',
    techStack: ['react', 'next.js', 'chakra-ui', 'storybook'],
  },
  {
    id: 'magicbox',
    company: 'Magic Box Solutions Co., Ltd.',
    year: '2019 - 2020',
    role: 'Back-end Developer',
    paragraph:
      'Developed a meeting room management system; incorporated room detection based on floor plans using OpenCV; and set up CI/CD pipelines using GitLab Runner.',
    techStack: ['express.js', 'echo', 'react', 'react-native', 'open-cv'],
  },
  {
    id: 'freelance',
    company: 'Freelancing',
    year: '2020 - Present',
    role: 'Developer',
    paragraph:
      'Created 360°/3D spatial experiences for exhibitions using Three.js; implemented RESTful APIs for content and questionnaire management with NestJS and PostgreSQL;',
    techStack: ['react', 'react-native', 'three-js'],
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
