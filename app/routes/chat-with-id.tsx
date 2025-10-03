import { useChat } from '@ai-sdk/react'
import { useState } from 'react'
import type { Route } from './+types/chat-with-id'
import { DefaultChatTransport } from 'ai'
import { Form, redirect, useNavigate, type ActionFunction, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { Button } from '~/components/ui/button'
import { ScrollArea } from '~/components/ui/scroll-area'
import { auth } from '~/lib/auth.server'
import { authClient } from '~/lib/auth-client'
import axios from 'axios'
import { getChat } from 'db/db'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (session?.user) {
    if(!params.id) {
      return redirect("/")
    }
    const chatData = await getChat(params.id)
    return { user: session.user, chatData: chatData[0] }
  } else {
    throw new Error("no valid session")
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await auth.api.getSession({ headers: request.headers })
  const body = await request.json()
  const { chatId, message } = body
  if (session?.user) {

  } else {
    throw Error("not a valid user session")
  }
}


export default function ChatWithId({ loaderData }: Route.ComponentProps) {
  const [input, setInput] = useState('')
  const { user, chatData } = loaderData
  const { messages, sendMessage } = useChat({ 
    id: chatData.id,
    onFinish: async (options) => {
      await axios.post(`/chat/${chatData.id}`, { message: options.message, chatId: chatData.id })
      console.log('message posted!')
    },
    transport: new DefaultChatTransport({
      api: '/api/ai',
    })
  })

  const navigator = useNavigate()

  const signOut = async () => {
    await authClient.signOut()
    console.log('signing out!')
    navigator('/')
  }

  return (
    <div className='flex flex-col justify-center m-6 gap-8'>
      <h1 className='text-white font-[Faculty_Glyphic] font-extrabold my-9 text-center text-5xl md:text-6xl'>CLEARCHAT</h1>
      <div className="flex flex-col justify-center font-[Faculty_Glyphic] gap-4 rounded-lg p-10 h-130 md:h-[40rem] w-full md:w-[50rem]  max-w-5xl py-24 mx-auto bg-yellow-500">
        <ScrollArea className='h-full'>
          {messages.map(message => (
          <div key={message.id} className="bg-yellow-500 font-bold text-white whitespace-pre-wrap">
            {message.role === 'user' ? 'User: ' : 'AI: '}
            {message.parts.map((part, i) => {
              switch (part.type) {
                case 'text':
                  return <div className="bg-yellow-500 text-md md:text-xl font-light text-white" key={`${message.id}-${i}`}>{part.text}</div>
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
          className='flex items-center mt-4 w-full gap-5 justify-center'
          onSubmit={e => {
            e.preventDefault()
            sendMessage({ text: input })
            setInput('')
          }}
        >
          <input 
            className='bg-white dark:bg-white w-full max-w-md p-2 border border-zinc-300 rounded shadow-xl'
            value={input}
            placeholder='Say something...'
            onChange={e => setInput(e.currentTarget.value)}
          />
          <Button className='bg-blue-400 self-center'>Chat!</Button>
        </Form>
      </div>
      <Button onClick={signOut} className="bg-blue-600 max-w-md text-white self-center border-blue-600">Sign Out</Button>
      <Form method="post" action="/api/chat">
          <Button className="bg-blue-600 max-w-md text-white self-center border-blue-600"
            type="submit">
              Create New Chat
          </Button>
      </Form>
    </div>
    
  )
}