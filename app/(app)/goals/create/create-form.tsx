"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { createGoalSchema as formSchema } from "@/lib/data/validation";

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
import { createGoal } from "@/lib/data/goal";
import { useAction } from "next-safe-action/hooks";
import { parseActionError } from "@/lib/data/safe";

type Values = z.infer<typeof formSchema>;

const defaultValues: Partial<Values> = {
  description: "",
};

export function CreateForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  const { execute, isExecuting } = useAction(createGoal, {
    onSuccess() {
      toast({
        title: "Goal created",
      });
    },
    onError({ error }) {
      toast({
        title: "Error",
        description: parseActionError(error),
      });
    },
  });

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Create a New Goal</CardTitle>
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
                    />
                  </FormControl>
                  <FormDescription>
                    What would you like to achieve?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4">
              <Button type="submit" disabled={isExecuting}>
                Create Goal
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
