export interface Message {
  id: string
  content: string
  byUser?: boolean
}

export interface ChatProps {
  messages: Message[]
  delay?: number
}
