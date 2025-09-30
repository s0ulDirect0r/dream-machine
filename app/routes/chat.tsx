import { useChat } from '@ai-sdk/react'
import { useState } from 'react'
import type { Route } from './+types/chat'
import { DefaultChatTransport } from 'ai'


export default function Chat() {
  const [input, setInput] = useState('')
  const { messages, sendMessage } = useChat({ transport: new DefaultChatTransport({
    api: '/api/ai'
  })})

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch bg-white">
      {messages.map(message => (
        <div key={message.id} className="bg-white whitespace-pre-wrap">
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`}>{part.text}</div>
              case 'tool-weather':
                return (
                  <pre key={`${message.id}-${i}`}>
                    {JSON.stringify(part, null, 2)}
                  </pre>
                )
            }
          })}
        </div>
      ))}
      <form
        onSubmit={e => {
          e.preventDefault()
          sendMessage({ text: input })
          setInput('')
        }}
      >
        <input 
          className='fixed dark:bg-white bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl'
          value={input}
          placeholder='Say something...'
          onChange={e => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  )
}