import { Loader2Icon } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default async function LoadingDialog() {
  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle className="text-center">Loaging Content</DialogTitle>
          </VisuallyHidden>
          <VisuallyHidden>
            <DialogDescription className="text-center">Await until we load the content!</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <Loader2Icon className="animate-spin text-destructive-foreground" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
