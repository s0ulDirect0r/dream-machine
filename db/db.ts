import { drizzle } from "drizzle-orm/postgres-js";
import postgres from 'postgres'
import { chat } from "./schema";
import { eq } from "drizzle-orm";
import type { UIMessage } from "ai";

export const db = drizzle(postgres(process.env.DATABASE_URL!))

export type Chat = {
  id: string;
  userId: string;
  updatedAt: Date | undefined;
  createdAt: Date | undefined;
}

export type Message = {
  id: string;
  userId: string;
  chatId: string;
  content: string;
  role: string;
  updatedAt: Date | undefined;
  createdAt: Date | undefined;
}

export const createChat = async (userId: string, messages: UIMessage[]) => {
  // create a new chat in the table
  return await db.insert(chat).values({
    id: crypto.randomUUID(),
    userId,
    messages: JSON.stringify(messages)
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

export const getUserChats = async (userId: string) => {
  return await db.select().from(chat).where(eq(chat.userId, userId))
}