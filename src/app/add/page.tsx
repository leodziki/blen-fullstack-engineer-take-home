'use client';
import { FC, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { addTask } from '@/db/actions';

const formSchema = z.object({
  taskTitle: z.string().min(1, {
    message: 'Title can not be empty.',
  }),
  taskDescription: z.string().min(1, {
    message: 'Description can not be empty.',
  }),
  taskDueDate: z.date(),
});

const AddTaskPage: FC = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskTitle: '',
      taskDescription: '',
    },
  });

  const [dueDate, setDueDate] = useState<Date>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = form.getValues('taskTitle');
    const description = form.getValues('taskDescription');
    const date = dueDate?.toDateString();
    const taskData = { title: title, description: description, dueDate: date ?? '' };
    addTask(taskData);
    router.push('/');
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <Card className="w-[350px]">
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="taskTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the task title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}></FormField>
              <FormField
                control={form.control}
                name="taskDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the task description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}></FormField>
              <FormField
                control={form.control}
                name="taskDueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
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
                )}></FormField>
              <Button type="submit" className="mt-4 rounded bg-blue-500 p-2 text-white">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTaskPage;
