type Props = Readonly<{ children: React.ReactNode; tasks: React.ReactNode }>;

export default function Layout({ children, tasks }: Props) {
  return (
    <>
      {tasks}
      {children}
    </>
  );
}
