'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { addTask } from '../db/actions';

export default function TaskForm() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', description: '', dueDate: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.dueDate) return;
    await addTask(form);
    router.push('/');
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full border p-2"
        required
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full border p-2"
      />
      <input
        type="date"
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        className="w-full border p-2"
        required
      />
      <button type="submit" className="rounded bg-blue-500 p-2 text-white">
        Save Task
      </button>
    </form>
  );
}
