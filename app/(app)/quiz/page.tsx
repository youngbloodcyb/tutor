import { Quiz } from "./quiz";

export default async function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Pre-Quiz</h1>
      <Quiz />
    </div>
  );
}
