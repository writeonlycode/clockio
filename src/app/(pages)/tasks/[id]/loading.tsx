import LoadingDialog from "@/components/utils/loading-dialog";

export default async function TodoLoading() {
  return <LoadingDialog onCloseRedirect="/tasks" />;
}
