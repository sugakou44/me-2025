import type { Snippet } from 'svelte'

export interface Message {
  id: string
  content: Snippet | string
  byUser?: boolean
  delay?: number
}

export interface ChatProps {
  messages: Message[]
  delay?: number
  isLoading?: boolean
}
