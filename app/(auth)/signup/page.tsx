"use client";

import { signUp } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignUpPage() {
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
    const name = formData.get("name") as string;

    try {
      const { data, error } = await signUp.email({
        email,
        password,
        name,
        callbackURL: "/dashboard", // Redirect after email verification if required
      });

      if (error) {
        setError(error.message || "An unexpected error occurred");
        return;
      }

      router.push("/dashboard"); // Redirect on success (if autoSignIn is true)
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[500px] bg-bg flex flex-col items-center justify-center">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold">Create your account</CardTitle>
          <CardDescription className="text-center text-sm text-gray-600">
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                already have an account?
              </Link>
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
        <div className="w-[400px] flex flex-col items-center justify-center space-y-8 p-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="w-[350px] space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none  relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  minLength={8}
                  className="appearance-none  relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password (min 8 characters)"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-main mb-[10px] group relative w-full flex justify-center py-2 px-4  border border-black text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
              >
                {isLoading ? "Creating account..." : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </CardContent>
      </Card>
    </div>
  );
}
