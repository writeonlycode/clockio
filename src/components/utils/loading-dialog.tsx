import { Suspense } from "react";

export default function LoadingDialog({ onCloseRedirect }: { onCloseRedirect?: string }) {
  return (
    <Suspense fallback={<div></div>}>
      <LoadingDialog onCloseRedirect={onCloseRedirect} />;
    </Suspense>
  );
}
