import { Loader2Icon } from "lucide-react";

export default async function PageTodos() {
  return (
    <div className="mx-auto my-8 flex w-full max-w-prose grow flex-col items-center justify-center px-4">
      <Loader2Icon className="animate-spin text-destructive-foreground" />
    </div>
  );
}
