type Props = Readonly<{ children: React.ReactNode; modal: React.ReactNode }>;

export default function Layout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
