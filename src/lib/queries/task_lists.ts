import { TableQueryOptions } from "@/types/supabase-utils";
import {
  QueryTaskListsSingleResponse,
  QueryTaskListsResponse,
  TaskListInsert,
  QueryTaskListsInsertResponse,
  TaskListUpdate,
  QueryTaskListsUpdateResponse,
  QueryTaskListsDeleteResponse,
} from "@/types/task_lists";
import { SupabaseClient } from "@supabase/supabase-js";

export async function queryTaskLists(
  supabase: SupabaseClient,
  options: TableQueryOptions,
): Promise<QueryTaskListsResponse> {
  const query = supabase.from("task_lists").select("*, tasks (id, title)", { count: options.includeCount });

  if (options.order) {
    const { column, ascending, nullsFirst } = options.order;
    query.order(column, { ascending, nullsFirst });
  }

  if (options.limit) {
    query.limit(options.limit);
  }

  if (options.range) {
    const { from, to } = options.range;
    query.range(from, to);
  }

  const response = await query;

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  const data = response.data ? response.data : undefined;
  const error = response.error ? Error(response.error.message) : undefined;
  const count = response.count ? response.count : undefined;

  return { data, count, error };
}

export async function queryTaskList(
  supabase: SupabaseClient,
  options: TableQueryOptions,
  id: string,
): Promise<QueryTaskListsSingleResponse> {
  const response = await supabase.from("task_lists").select("*", { count: options.includeCount }).eq("id", id).single();

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  const data = response.data ? response.data : undefined;
  const error = response.error ? Error(response.error.message) : undefined;
  const count = response.count ? response.count : undefined;

  return { data, count, error };
}

export async function insertTaskList(
  supabase: SupabaseClient,
  payload: TaskListInsert,
): Promise<QueryTaskListsInsertResponse> {
  const response = await supabase.from("task_lists").insert(payload).select().single();

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  const data = response.data ? response.data : undefined;
  const error = response.error ? Error(response.error.message) : undefined;
  const count = response.count ? response.count : undefined;

  return { data, count, error };
}

export async function queryUpdateTaskList(
  supabase: SupabaseClient,
  payload: TaskListUpdate,
  id: string,
): Promise<QueryTaskListsUpdateResponse> {
  const response = await supabase.from("task_lists").update(payload).eq("id", id).select().single();

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  const data = response.data ? response.data : undefined;
  const error = response.error ? Error(response.error.message) : undefined;
  const count = response.count ? response.count : undefined;

  return { data, count, error };
}

export async function queryDeleteTaskList(supabase: SupabaseClient, id: string): Promise<QueryTaskListsDeleteResponse> {
  const response = await supabase.from("task_lists").delete().eq("id", id).select().single();

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  const data = response.data ? response.data : undefined;
  const error = response.error ? Error(response.error.message) : undefined;
  const count = response.count ? response.count : undefined;

  return { data: data, count, error };
}
