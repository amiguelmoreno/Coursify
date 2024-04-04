"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter, Course } from "@prisma/client";
import axios from "axios";
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import ChapterList from "./ChapterList";

interface ChapterFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

const ChaptersForm = ({ initialData, courseId }: ChapterFormProps) => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => {
    setIsCreating((curr) => !curr);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });
      toast.success("Chapters reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className=' relative mt-6 border bg-slate-100 rounded-md p-4 '>
      {isUpdating && (
        <div className='absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center'>
          <Loader2 className='animate-spin h-6 w-6 text-purple-500'></Loader2>
        </div>
      )}
      <div className='font-medium flex items-center justify-between'>
        Course chapters
        <Button variant={"ghost"} onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className='h-4 w-4 mr-2'></PlusCircle>
              Add a chapter
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course...'"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
            <Button disabled={!isValid || isSubmitting} type='submit'>
              Create
            </Button>
          </form>
        </Form>
      )}

      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic"
          )}
        >
          {!initialData.chapters.length && "No chapters"}
          <ChapterList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters || []}
          ></ChapterList>
        </div>
      )}

      {!isCreating && (
        <div className='text-xs text-muted-foreground mt-4'>
          Drag and drop to reorder the chapters
        </div>
      )}
    </div>
  );
};

export default ChaptersForm;
