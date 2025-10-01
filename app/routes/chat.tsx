import { useChat } from '@ai-sdk/react'
import { useState } from 'react'
import type { Route } from './+types/chat'
import { DefaultChatTransport } from 'ai'
import { Form } from 'react-router'
import { Button } from '~/components/ui/button'
import { ScrollArea } from '~/components/ui/scroll-area'


export default function Chat() {
  const [input, setInput] = useState('')
  const { messages, sendMessage } = useChat({ transport: new DefaultChatTransport({
    api: '/api/ai'
  })})

  return (
    <div className='flex flex-col justify-center gap-8'>
      <h1 className='text-white font-extrabold text-center mt-12 text-6xl'>CLEARCHAT</h1>
      <div className="flex flex-col gap-4 rounded-lg p-8 h-[45rem] max-w-3xl py-24 mx-auto overflow-y-auto bg-yellow-500">
        <ScrollArea className='h-full'>
          {messages.map(message => (
          <div key={message.id} className="bg-yellow-500 font-bold text-white whitespace-pre-wrap">
            {message.role === 'user' ? 'User: ' : 'AI: '}
            {message.parts.map((part, i) => {
              switch (part.type) {
                case 'text':
                  return <div className="bg-yellow-500 text-xl font-light text-white" key={`${message.id}-${i}`}>{part.text}</div>
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
        </ScrollArea>
        <Form
          className='flex w-full gap-5 justify-center self-center'
          onSubmit={e => {
            e.preventDefault()
            sendMessage({ text: input })
            setInput('')
          }}
        >
          <input 
            className='bg-white dark:bg-white w-full max-w-md p-2 mt-12 border border-zinc-300 rounded shadow-xl'
            value={input}
            placeholder='Say something...'
            onChange={e => setInput(e.currentTarget.value)}
          />
          <Button className='bg-blue-400 self-center mt-12'>Chat!</Button>
        </Form>
      </div>
    </div>
    
  )
}