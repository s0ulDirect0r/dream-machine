import { openai } from '@ai-sdk/openai'
import { streamText, type UIMessage, convertToModelMessages } from 'ai'
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function loader({ request }: LoaderFunctionArgs) {
  return
}

export async function action({ request }: ActionFunctionArgs) {
  const { messages }: { messages: UIMessage[] } = await request.json()
  console.log('hitting the ai action!')
  const result = streamText({
    model: openai('gpt-4o'),
    messages: convertToModelMessages(messages)
  })

  return result.toUIMessageStreamResponse()
}

