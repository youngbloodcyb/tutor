import { getSession } from "@/lib/auth/server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getGoals } from "@/lib/data/goal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { DeleteGoal } from "./delete-goal";

export default async function Page() {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  const goals = await getGoals();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Goals</h1>
        <Link href="/goals/create">
          <Button>Add Goal</Button>
        </Link>
      </div>
      <Table>
        <TableCaption>A list of all your learning goals.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {goals?.map((goal) => (
            <TableRow key={goal.id}>
              <TableCell className="font-medium">{goal.description}</TableCell>
              <TableCell>
                {goal.completed ? "Completed" : "In Progress"}
              </TableCell>
              <TableCell>
                {new Date(goal.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(goal.updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Link href={`/goals/${goal.id}/edit`}>
                    <Button size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DeleteGoal goalId={goal.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
