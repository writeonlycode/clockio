import OverlayDialog from "@/components/utils/overlay-dialog";

type Props = Readonly<{ children: React.ReactNode }>;

export default function Layout({ children }: Props) {
  return (
    <>
      <OverlayDialog />
      {children}
    </>
  );
}
