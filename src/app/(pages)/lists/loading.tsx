import LoadingDialog from "@/components/ui/loading-dialog";

export default async function TodoLoading() {
  return <LoadingDialog onCloseRedirect="/lists" />;
}
