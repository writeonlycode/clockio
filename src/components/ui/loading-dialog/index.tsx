import { Suspense } from "react";
import LoadingDialogInner from "./inner";

export default function LoadingDialog({ onCloseRedirect }: { onCloseRedirect?: string }) {
  return (
    <Suspense fallback={<div />}>
      <LoadingDialogInner onCloseRedirect={onCloseRedirect} />;
    </Suspense>
  );
}
