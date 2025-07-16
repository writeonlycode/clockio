import { SignInForm } from "@/components/auth/sign-in-form";
import { sleep } from "@/lib/utils";

export default async function SignUpPage() {
  await sleep(3000);
  return <SignInForm />;
}
