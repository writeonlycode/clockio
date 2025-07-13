import { queryTasks } from "@/lib/queries/tasks";
import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/types/supabase";
import { TableQueryOptions } from "@/types/supabase-utils";
import { useEffect, useState } from "react";

export function useTasks(
  initialData: Tables<"tasks">[],
  initialCount: number,
  { limit, includeCount, order }: TableQueryOptions,
) {
  const [data, setData] = useState(initialData);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const supabase = createClient();
      const { data, count } = await queryTasks(supabase, { limit, includeCount, order });

      setData(data || []);
      setCount(count || 0);
      setLoading(false);
    };

    if (initialRender) {
      setInitialRender(false);
    } else {
      fetch();
    }
  }, [initialData, includeCount, limit]);

  return { data, count, loading };
}
