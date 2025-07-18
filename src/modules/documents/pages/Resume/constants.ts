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

interface Education {
  year: number | string
  degree: string
  school: string
}

export const EDUCATION: Education[] = [
  {
    year: '2013 - 2017',
    degree:
      'Bachelor of Engineering - BE, Electrical and Electronics Engineering',
    school: "King Mongkut's University of Technology North Bangkok, Thailand",
  },
]

interface StackItem {
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
