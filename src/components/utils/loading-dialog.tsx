import { Suspense } from "react";
import LoadingDialogInner from "./loading-dialog-inner";

export default function LoadingDialog({ onCloseRedirect }: { onCloseRedirect?: string }) {
  return (
    <Suspense fallback={<div></div>}>
      <LoadingDialogInner onCloseRedirect={onCloseRedirect} />;
    </Suspense>
  );
}
