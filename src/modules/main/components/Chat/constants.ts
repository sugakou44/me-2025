import { messages as experience } from './messages/experience.svelte'
import { messages as greeting } from './messages/greeting.svelte'
import { messages as techStack } from './messages/techStack.svelte'

import type { Message } from '@/components/Chat'

type MessageWithoutID = Omit<Message, 'id'>

export const HELLO_MESSAGES: MessageWithoutID[] = [
  {
    content: greeting.hello,
    byUser: true,
  },
  {
    content: greeting.helloMe,
  },
  {
    content: 'Welcome',
  },
  {
    delay: 10_000,
    content: greeting.gameInvite,
  },
  {
    delay: 10,
    content: 'how to play: left click to reveal, right click to mark as 🍪',
  },
]

export const TECHSTACK_MESSAGES: MessageWithoutID[] = [
  {
    content: 'Tell me more',
    byUser: true,
  },
  {
    content: 'Sure!',
  },
  {
    content: 'I am actively using',
  },
  {
    content: techStack.currentStack,
  },
  {
    content: 'I also use these in lesser degrees',
  },
  {
    content: techStack.pastStack,
  },
]

export const EXPERIENCE_MESSAGES: MessageWithoutID[] = [
  {
    content: 'Can you show me some of your works?',
    byUser: true,
  },
  {
    content:
      "Unfortunately I haven't come up with ideas to incorporate screenshots with the current aesthetic of the site.",
  },
  {
    content: 'In the mean time, please check out the projects list',
  },
  {
    content: experience.projectArchiveLink,
  },
]
