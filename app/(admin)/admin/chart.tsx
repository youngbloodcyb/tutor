"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Props = {
  users: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    role: string | null;
  }[];
};

export function Chart({ users }: Props) {
  // Process users data to create chart data
  const usersByDate = users.reduce((acc, user) => {
    const date = new Date(user.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Create cumulative data for total users over time
  const sortedDates = Object.keys(usersByDate).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  type ChartDataPoint = {
    date: string;
    newUsers: number;
    total: number;
  };

  const chartData: ChartDataPoint[] = sortedDates.reduce<ChartDataPoint[]>(
    (acc, date) => {
      const previousTotal = acc.length > 0 ? acc[acc.length - 1].total : 0;
      acc.push({
        date,
        newUsers: usersByDate[date],
        total: previousTotal + usersByDate[date],
      });
      return acc;
    },
    []
  );

  const chartConfig = {
    total: {
      label: "Total Users",
      color: "hsl(var(--chart-1))",
    },
    newUsers: {
      label: "New Users",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  // Calculate percentage growth
  const totalUsers = users.length;
  const lastMonthUsers = users.filter((user) => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return new Date(user.createdAt) > oneMonthAgo;
  }).length;
  const growthPercentage = ((lastMonthUsers / totalUsers) * 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>
          Showing total and new user registrations over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="total"
              type="monotone"
              fill="var(--color-total)"
              fillOpacity={0.4}
              stroke="var(--color-total)"
            />
            <Area
              dataKey="newUsers"
              type="monotone"
              fill="var(--color-newUsers)"
              fillOpacity={0.4}
              stroke="var(--color-newUsers)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {growthPercentage}% of users joined in the last month{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Total Users: {totalUsers}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
