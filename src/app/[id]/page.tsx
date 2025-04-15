'use server';

import DeleteButton from '@/components/delete-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTaskById } from '@/db/actions';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FC } from 'react';

interface TaskDetailProps {
  params: { id: string };
}

const TaskDetailPage: FC<TaskDetailProps> = async ({ params }) => {
  const task = await getTaskById(Number(params.id));

  if (!task) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Title : {task.title}</CardTitle>
          <CardDescription>Description : {task.description}</CardDescription>
          <CardDescription>Due Date : {task.dueDate}</CardDescription>
          <CardDescription>Status : {task.isCompleted ? 'Completed' : 'Pending'}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="mt-4 flex gap-4">
                <Link className="text-yellow-500" href={`/${task.id}/edit`}>
                  Edit
                </Link>
                <DeleteButton taskId={task.id}></DeleteButton>
                <Link href={`/`}>Back</Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDetailPage;
