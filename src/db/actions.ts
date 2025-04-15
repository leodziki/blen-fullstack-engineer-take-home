"use server";

import { db } from "./client";
import { NewTask, tasks } from "./schema";

import { eq } from "drizzle-orm";

export async function getTasks() {
  return db.select().from(tasks);
}

export async function getTaskById(id: number) {
  const result = await db.select().from(tasks).where(eq(tasks.id, id));
  return result[0];
}

export async function addTask(data: NewTask) {
  return db.insert(tasks).values(data);
}

export async function updateTask(id: number, data: Partial<NewTask>) {
  return db.update(tasks).set(data).where(eq(tasks.id, id));
}

export async function deleteTask(id: number) {
  return db.delete(tasks).where(eq(tasks.id, id));
}