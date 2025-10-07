import LoadingDialog from "@/components/ui/loading-dialog";

export default async function PageTodos() {
  return <LoadingDialog onCloseRedirect="/tasks" />;
}
