import { nanoid } from 'nanoid'

import type { Message } from '@/components/Chat'

export const MESSAGES: Message[] = [
  {
    id: nanoid(),
    content: 'In consequat incididunt qui ea.',
  },
  {
    id: nanoid(),
    content: 'Deserunt aliqua elit amet.',
    byUser: true,
  },
  {
    id: nanoid(),
    content: 'Duis aliquip.',
  },
  {
    id: nanoid(),
    content: 'Nisi minim.',
    byUser: true,
  },
  {
    id: nanoid(),
    content: 'Culpa proident irure amet consequat.',
    byUser: true,
  },
  {
    id: nanoid(),
    content: 'Lorem ipsum adipisicing irure cillum ad proident.',
  },
]
