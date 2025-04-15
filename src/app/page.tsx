'use server';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { FC } from 'react';
import { getTasks } from '../db/actions';

const TaskListPage: FC = async () => {
  const taskList = await getTasks();

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="py-2 text-xl font-bold">Task List</h1>
      <ul>
        {taskList.map((task) => (
          <li key={task.id} className="mb-4">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>{task.title}</CardTitle>
                <CardDescription>Due Date : {task.dueDate}</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Link className="text-green-400" href={`/${task.id}`}>
                        View Details
                      </Link>
                    </div>
                    <div className="flex flex-col space-y-1.5 text-blue-400">
                      <Link href={`/${task.id}/edit`}>Edit</Link>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
      <Link href="/add" className="mt-4 rounded bg-blue-500 p-2 text-white">
        Add New Task
      </Link>
    </div>
  );
};

export default TaskListPage;
