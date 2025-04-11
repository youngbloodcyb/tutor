import { getResources } from "@/lib/data/resource";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const resources = await getResources();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Resources</h1>
        {/* upload button */}
      </div>
      <Table>
        <TableCaption>A list of all resources.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Link</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="font-medium">{resource.link}</TableCell>
              <TableCell>
                {new Date(resource.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(resource.updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Link href={resource.link} target="_blank">
                  <Button size="sm">
                    View Resource
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
