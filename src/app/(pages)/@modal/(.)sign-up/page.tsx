import { SignUpDialog } from "@/components/auth/sign-up-dialog";

export default async function SignUpPage() {
  return <SignUpDialog onSubmitRedirect="/tasks" />;
}
