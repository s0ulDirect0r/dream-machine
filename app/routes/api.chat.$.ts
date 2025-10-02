import { createChat, deleteChat, updateChat } from "db/db";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { auth } from "~/lib/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {

}

export async function action({ request }: ActionFunctionArgs) {
    const session = await auth.api.getSession({ headers: request.headers })
    const { body } = await request.json()
    if (!session?.user) {
      throw Error("not a valid user session")
    }

    if (request.method === 'POST') {
      return await createChat(body)
    } else if (request.method === 'DELETE') {
      return await deleteChat(body)
    } else if (request.method === 'PUT') {
      return await updateChat(body)
    }
}