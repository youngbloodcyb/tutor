"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { updateGoalSchema as formSchema } from "@/lib/data/validation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/lib/hooks/use-toast";
import { updateGoal } from "@/lib/data/goal";
import { useAction } from "next-safe-action/hooks";
import { parseActionError } from "@/lib/data/safe";
import { goal } from "@/lib/db/schema";
import { Switch } from "@/components/ui/switch";

type Values = z.infer<typeof formSchema>;
type Goal = typeof goal.$inferSelect;

export function EditForm({ id, goal }: { id: string; goal: Goal }) {
  const defaultValues: Partial<Values> = {
    id: id,
    description: goal.description ?? "",
    completed: goal.completed,
  };

  const { toast } = useToast();

  const { execute, isExecuting } = useAction(updateGoal, {
    onSuccess() {
      toast({
        title: "Success",
        description: "Goal updated successfully",
      });
    },
    onError({ error }) {
      toast({
        title: "Error",
        description: parseActionError(error),
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Edit Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => execute(values))}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Learn basic algebra in 2 weeks"
                      {...field}
                      className="bg-secondary"
                    />
                  </FormControl>
                  <FormDescription>
                    What would you like to achieve?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Mark as Completed</FormLabel>
                    <FormDescription>
                      Have you achieved this goal?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="submit" disabled={isExecuting}>
                Update Goal
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
