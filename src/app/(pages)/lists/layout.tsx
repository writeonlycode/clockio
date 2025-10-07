type Props = Readonly<{ children: React.ReactNode; lists: React.ReactNode }>;

export default function Layout({ children, lists }: Props) {
  return (
    <>
      {lists}
      {children}
    </>
  );
}
