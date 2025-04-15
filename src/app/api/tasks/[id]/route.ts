import { db } from '@/db/client';
import { tasks } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest, res: NextApiResponse, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const { title, description, dueDate } = await req.json();

  await db.update(tasks).set({
    title,
    description,
    dueDate,
  }).where(eq(tasks.id, id));

  return res.status(200).json({ success: true });
}