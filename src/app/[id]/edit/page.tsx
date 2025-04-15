import { EditTaskForm } from '@/components/edit-task-form';
import { db } from '@/db/client';
import { tasks } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

interface EditPageProps {
  params: { id: string };
}

export default async function EditPage({ params }: EditPageProps) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const task = await db.select().from(tasks).where(eq(tasks.id, id));

  if (task.length == 0) return notFound();

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Edit Task</h1>
      <EditTaskForm task={task[0]} />
    </div>
  );
}
