import { utils } from 'animejs'
import { nanoid } from 'nanoid'

import { HELLO_MESSAGES, TECHSTACK_MESSAGES } from './constants'

import type { Message } from '@/components/Chat'

class MainChat {
  timer = $state<NodeJS.Timeout>()
  isOpen = $state(false)
  isLoading = $state(false)
  messages: Message[] = $state([])

  addMessage(message: Message) {
    this.isOpen = true
    this.messages.unshift(message)
  }

  clearMessage() {
    this.messages.length = 0
  }

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = undefined
    }
  }

  addMessageRecursive(messages: Omit<Message, 'id'>[], index = 0) {
    const message = messages[index]

    if (!message || this.timer) {
      this.clearTimer()
      return
    }

    this.addMessage({
      ...message,
      id: nanoid(),
    })

    const nextMessage = messages[index + 1]

    if (!nextMessage) {
      this.clearTimer()
      return
    }

    this.timer = setTimeout(
      () => {
        this.clearTimer()
        this.addMessageRecursive(messages, index + 1)
      },
      nextMessage.delay || utils.clamp(nextMessage.content.length, 15, 30) * 66,
    )
  }

  askQuestion(
    questionKey: 'hello' | 'tech-stack' | 'experience' | 'testimonial',
  ) {
    this.clearTimer()

    switch (questionKey) {
      case 'hello':
        this.addMessageRecursive(HELLO_MESSAGES)
        break
      case 'tech-stack':
        this.addMessageRecursive(TECHSTACK_MESSAGES)
        break
    }
  }
}

export const mainChatContext = new MainChat()
