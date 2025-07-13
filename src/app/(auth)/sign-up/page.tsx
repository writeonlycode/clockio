import { SignUpForm } from "@/components/auth/sign-up-form";

export default function Page() {
  return (
    <main className="flex grow flex-col justify-center">
      <div className="mx-auto w-full max-w-sm">
        <SignUpForm redirectPath="/" />
      </div>
    </main>
  );
}
