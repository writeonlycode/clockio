import { SignInForm } from "@/components/auth/sign-in-form";

export default function Page() {
  return (
    <main className="flex grow flex-col justify-center">
      <div className="mx-auto w-full max-w-sm">
        <SignInForm redirectPath="/tasks" />
      </div>
    </main>
  );
}
