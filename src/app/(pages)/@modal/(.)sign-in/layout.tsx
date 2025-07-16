import { InterceptingDialog } from "@/components/utils/intercepting-dialog";

type Props = Readonly<{ children: React.ReactNode }>;

export default function SignInLayout({ children }: Props) {
  return (
    <InterceptingDialog title="Sign In" description="Sign in to your account!" onCloseRedirect="/">
      {children}
    </InterceptingDialog>
  );
}
