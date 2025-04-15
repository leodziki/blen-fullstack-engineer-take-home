'use client';

import { updateTask } from '@/db/actions';
import { Task } from '@/db/schema';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import { Card, CardContent } from './ui/card';

interface EditTaskFormProps {
  task: Task;
}

const formSchema = z.object({
  taskTitle: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  taskDescription: z.string().min(2, {
    message: 'Description must be at least 5 characters.',
  }),
  taskDate: z.date(),
});

export function EditTaskForm({ task }: EditTaskFormProps) {
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date(task.dueDate));
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskTitle: title,
      taskDescription: description,
      taskDate: dueDate,
    },
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = form.getValues('taskTitle');
    const description = form.getValues('taskDescription');
    const date = dueDate?.toDateString();

    const res = await updateTask(task.id, {
      title: title,
      description: description,
      dueDate: date ?? '',
    });
    if (res) {
      router.push(`/${task.id}`);
    } else {
      alert('Failed to update task');
    }
  };
  return (
    <Card className="w-[350px]">
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="taskTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title : </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taskDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description : </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taskDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] justify-start text-left font-normal',
                            !dueDate && 'text-muted-foreground'
                          )}>
                          <CalendarIcon />
                          {dueDate ? format(dueDate, 'PPP') : <span>{dueDate}</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dueDate}
                          onSelect={setDueDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
