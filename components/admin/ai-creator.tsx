"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useAction } from "next-safe-action/hooks";
import { createAICourse } from "@/lib/data/course";
import { toast } from "@/lib/hooks/use-toast";
import { createAICourseSchema } from "@/lib/data/validation";
import { useBlockStore } from "@/lib/stores/block-store";
import { Sparkles } from "lucide-react";

const formSchema = createAICourseSchema;

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {
  content: "",
};

export function AICreator() {
  const setBlocks = useBlockStore((state) => state.setBlocks);
  const [open, setOpen] = React.useState(false);

  const { execute, isExecuting } = useAction(createAICourse, {
    onSuccess: (result) => {
      toast({
        title: "Course draft generated successfully",
      });
      setBlocks(result.data || []);
      setOpen(false);
    },
    onError: () => {
      toast({
        title: "Error creating course",
      });
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <Sparkles className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create AI Course</DialogTitle>
          <DialogDescription>
            Enter the course content below. The AI will generate a structured
            course based on your input.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => execute(values))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your course content here..."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isExecuting}>
                Create Course
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
