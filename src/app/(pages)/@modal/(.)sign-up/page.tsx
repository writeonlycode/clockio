import { SignUpDialog } from "@/components/auth/sign-up-dialog";
import { sleep } from "@/lib/utils";

export default async function SignUpPage() {
  await sleep(3000);
  return <SignUpDialog />;
}
