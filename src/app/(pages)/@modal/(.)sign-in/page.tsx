import { SignInDialog } from "@/components/auth/sign-in-dialog";
import { sleep } from "@/lib/utils";

export default async function SignInPage() {
  await sleep(3000);
  return <SignInDialog />;
}
