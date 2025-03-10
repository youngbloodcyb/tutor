"use client";

import { signIn } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message || "An unexpected error occurred");
        return;
      }

      router.push("/dashboard"); // Redirect on success
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="p-4 h-full">
      <div className="flex items-center justify-center min-h-[calc(100vh-2rem)]">
        <Card className="w-[500px] bg-bg">
          <CardHeader className="pb-2 mb-[10px]">
            <CardTitle className="text-center text-4xl font-bold p-4">Sign in to your account</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 flex justify-center">
            <div className="w-[350px] space-y-4">
              {error && (
                <div className="bg-red-50 text-red-500 p-3 text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="appearance-none relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="appearance-none relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-black text-sm font-medium text-black bg-main bg-bw text-text border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:bg-secondary/50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
