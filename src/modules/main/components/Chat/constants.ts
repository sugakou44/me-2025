import { messages as contact } from './messages/contact.svelte'
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
    content: 'Absolutely!',
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

export const CONTACT_MESSAGES: MessageWithoutID[] = [
  {
    content: "Let's chat",
    byUser: true,
  },
  {
    content: 'Sure!',
  },
  {
    content: contact.sendMeAnEmail,
  },
  {
    content: 'And I will get back to you as soon as I can. 🤗',
  },
]
