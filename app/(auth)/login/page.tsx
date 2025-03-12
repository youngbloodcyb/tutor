import { LoginForm } from "@/components/auth/login-form";

export default function Page() {
  return (
    <main className="p-20 flex justify-center items-center w-full">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] antialiased" />
      <LoginForm />
    </main>
  );
}
