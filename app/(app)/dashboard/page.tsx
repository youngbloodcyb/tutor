import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, ArrowUpRight } from "lucide-react";

import { getSession } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const cards = [
  {
    title: "Active Courses",
    description: "View all of your active courses",
    amount: 10,
  },
  {
    title: "Hours spent",
    description: "View all of your hours spent",
    amount: 20,
  },
  {
    title: "Goals achieved",
    description: "View all of your goals achieved",
    amount: 30,
  },
];

const evaluations = [
  {
    courseName: "Pre-algebra",
    proficiency: 0.8,
    style: "w-10 h-10 rounded-full bg-green-600",
  },
  {
    courseName: "Graphing",
    proficiency: 0.55,
    style: "w-10 h-10 rounded-full bg-orange-300"
  },
  {
    courseName: "Solving equations",
    proficiency: 0.67,
    style: "w-10 h-10 rounded-full bg-yellow-200",
  },
];

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="p-4 h-full">
      <div className="grid grid-cols-4 gap-4 h-full">
        <div className="col-span-3 flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            {cards.map((card, index) => (
              <Card key={index} className="w-full bg-bg">
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="text-2xl font-bold">{card.amount}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="w-full h-full bg-bg">
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>
                Continue learning with the following courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption className="text-text">
                  A list of your recent invoices.
                </TableCaption>
                <TableHeader>
                  <TableRow className="bg-bg">
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice, index) => (
                    <TableRow key={index} className="bg-bg">
                      <TableCell className="font-base">
                        {invoice.invoice}
                      </TableCell>
                      <TableCell>{invoice.paymentStatus}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">
                        {invoice.totalAmount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow className="bg-bg">
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1 h-full min-w-min">
          <Card className="w-full h-full bg-bg">
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle>Evaluation</CardTitle>
                  <CardDescription>Recent evalution</CardDescription>
                </div>
                <div>
                  <Button className="flex items-center gap-1">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col justify-between">
                <div className="flex justify-between ml-3 mr-3">
                  <h4 className="text-lg font-bold">Topic</h4>
                  <h4 className="text-lg font-bold">Proficiency</h4>
                </div>
                {evaluations.map((evaluation) => (
                  <div
                    key={evaluation.courseName}
                    className="border-border border-t p-4 flex justify-between"
                  >
                    <div className={evaluation.style}></div>
                    <h4 className=" flex items-center text-md w-8/12">
                      {evaluation.courseName}
                    </h4>
                    <h4 className="text-lg">
                      {(evaluation.proficiency * 100).toFixed(0)}%
                    </h4>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
