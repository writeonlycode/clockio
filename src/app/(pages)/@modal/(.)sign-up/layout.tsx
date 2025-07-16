import { InterceptingDialog } from "@/components/utils/intercepting-dialog";

type Props = Readonly<{ children: React.ReactNode }>;

export default function SignUpLayout({ children }: Props) {
  return (
    <InterceptingDialog title="Sign Up" description="Sign up for a new account!" onCloseRedirect="/">
      {children}
    </InterceptingDialog>
  );
}
