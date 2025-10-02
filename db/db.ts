import { drizzle } from "drizzle-orm/postgres-js";
import postgres from 'postgres'
import { chat } from "./schema";
import { eq } from "drizzle-orm";

export const db = drizzle(postgres(process.env.DATABASE_URL!))

type Chat = {
  id: string;
  userId: string;
}

export const createChat = async (chatData: Chat) => {
  // create a new chat in the table
  return await db.insert(chat).values({
    id: crypto.randomUUID(),
    userId: chatData.userId
  }).returning()

}

export const updateChat = async (chatData: Chat) => {
  // update a chat on the database
  return await db.update(chat).set(chatData).where(eq(chat.id, chatData.id))
}

export const deleteChat = async (chatId: string) => {
  // delete a chat on the database
  return await db.delete(chat).where(eq(chat.id, chatId))
}

export const getChat = async (chatId: string) => {
  // get a chat from the database
  return await db.select().from(chat).where(eq(chat.id, chatId))
}