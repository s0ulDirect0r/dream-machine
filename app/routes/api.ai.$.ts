import { openai } from '@ai-sdk/openai'
import { streamText, type UIMessage, convertToModelMessages } from 'ai'
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'
import { auth } from '~/lib/auth.server'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function loader({ request }: LoaderFunctionArgs) {
  return
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session?.user) {
    throw Error("not a valid user session")
  }
  const { messages }: { messages: UIMessage[] } = await request.json()
  const result = streamText({
    model: openai('gpt-4o'),
    system: `You help users find conceptual clarity about engineering and math topics. ` + 
    `Using almost zen-like inquiry techniques and precise and concise language, you push your users until they grasp the material.` + 
    `Until they feel viscerally resolved about the question they brought to you.` + 
    `You open with the message "What do you need clarity around, today?" when a chat is begun with you.` +
    `Ask them how they feel in the body as well, as concepts are explored. ` +
    `Lean on the Socratic Method to help the user find their own answers, their own words, their own clarity. ` +
    `And don't be shy to flex your own technical knowledge and awareness of various APIs and technologies.`,
    messages: convertToModelMessages(messages)
  })

  return result.toUIMessageStreamResponse()
}

