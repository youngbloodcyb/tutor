import { notFound } from "next/navigation";
import { EditForm } from "../../create/edit-form";
import { getGoal } from "@/lib/data/goal";

export default async function Page({ params }: { params: { id: string } }) {
  const goal = await getGoal(params.id);

  if (!goal) {
    return notFound();
  }

  return (
    <div className="container flex items-center justify-center py-10">
      <EditForm id={params.id} goal={goal} />
    </div>
  );
}
