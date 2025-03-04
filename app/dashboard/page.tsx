import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

const tips = [
  {
    title: "Tip 1",
    description: "Tip 1 description",
  },
  {
    title: "Tip 2",
    description: "Tip 2 description",
  },
  {
    title: "Tip 3",
    description: "Tip 3 description",
  },
];

export default function Page() {
  return (
    <main className="p-4 h-full">
      <div className="grid grid-cols-4 gap-4 h-full">
        <div className="col-span-3 flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            {cards.map((card) => (
              <Card className="w-full bg-bg">
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
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice} className="bg-bg">
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
        <div className="col-span-1 h-full">
          <Card className="w-full h-full bg-bg">
            <CardHeader>
              <CardTitle>Tips</CardTitle>
              <CardDescription>
                View your progress in the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold">100%</h3>
              {tips.map((tip) => (
                <div
                  key={tip.title}
                  className="border-border border-2 p-2 shadow-shadow"
                >
                  <h4 className="text-lg font-bold">{tip.title}</h4>
                  <p className="text-sm">{tip.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
