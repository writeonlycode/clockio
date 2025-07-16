import { Loader2Icon } from "lucide-react";

export default async function SignUpLoading() {
  return (
    <div className="flex items-center justify-center">
      <Loader2Icon className="animate-spin text-destructive-foreground" />
    </div>
  );
}
