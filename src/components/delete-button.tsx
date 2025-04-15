'use client';
import { deleteTask } from '@/db/actions';
import { redirect } from 'next/navigation';

type Props = {
  taskId: number;
};

export default function DeleteButton({ taskId }: Props) {
  return (
    <button
      className="text-red-500"
      onClick={async () => {
        await deleteTask(taskId);
        redirect('/');
      }}>
      Delete
    </button>
  );
}
