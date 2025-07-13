"use client";

import { buttonVariants } from "@/components/ui/button";
import { options } from "@/lib/options";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export default function TasksLoadMore({ count }: { count: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(false);

  const limit = parseInt(searchParams.get("limit") || "") || options.tasks.pagination;
  const hasMore = limit < count;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const queryString = pathname + "?" + createQueryString("limit", String(limit + options.tasks.pagination));

  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  return (
    <Link
      href={queryString}
      scroll={false}
      onClick={() => hasMore && setIsLoading(true)}
      className={cn(buttonVariants({ variant: "default" }), {
        "pointer-events-none opacity-50": isLoading || !hasMore,
      })}
    >
      {isLoading && <Loader2Icon className="animate-spin" />}
      {!hasMore ? "No More Entries to Load" : "Load More"}
    </Link>
  );
}
