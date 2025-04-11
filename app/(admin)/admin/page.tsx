import { getAllUsers } from "@/lib/data/admin";
import { Chart } from "./chart";
export default async function Page() {
  const users = await getAllUsers();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin</h1>
      <div className="w-full md:w-2/3 lg:w-1/2">
        <Chart users={users} />
      </div>
    </div>
  );
}
