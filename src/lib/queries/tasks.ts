import { TableQueryOptions } from "@/types/supabase-utils";
import {
  QueryTasksSingleResponse,
  QueryTasksResponse,
  TaskInsert,
  QueryTasksInsertResponse,
  TaskUpdate,
  QueryTasksUpdateResponse,
  QueryTasksDeleteResponse,
} from "@/types/tasks";
import { SupabaseClient } from "@supabase/supabase-js";
import { mapTask } from "../adapters/tasks";
import { revalidateTasks } from "../actions/tasks";

export async function queryTasks(supabase: SupabaseClient, options: TableQueryOptions): Promise<QueryTasksResponse> {
  const query = supabase.from("tasks").select("*", { count: options.includeCount });

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

  const data = response.data ? response.data?.map(mapTask) : undefined;
  const error = response.error ? Error(response.error.message) : undefined;
  const count = response.count ? response.count : undefined;

  return { data, count, error };
}

export async function queryOrphanTasks(
  supabase: SupabaseClient,
  options: TableQueryOptions,
): Promise<QueryTasksResponse> {
  const query = supabase.from("tasks").select("*", { count: options.includeCount });

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

  query.is("task_list_id", null);

  const response = await query;

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  const data = response.data ? response.data?.map(mapTask) : undefined;
  const error = response.error ? Error(response.error.message) : undefined;
  const count = response.count ? response.count : undefined;

  return { data, count, error };
}

export async function queryTask(
  supabase: SupabaseClient,
  options: TableQueryOptions,
  id: string,
): Promise<QueryTasksSingleResponse> {
  const response = await supabase.from("tasks").select("*", { count: options.includeCount }).eq("id", id).single();

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  const data = response.data ? mapTask(response.data) : undefined;
  const error = response.error ? Error(response.error.message) : undefined;
  const count = response.count ? response.count : undefined;

  return { data, count, error };
}

export async function insertTask(supabase: SupabaseClient, payload: TaskInsert): Promise<QueryTasksInsertResponse> {
  console.log("Inserting task...");
  const response = await supabase.from("tasks").insert(payload).select().single();

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  const data = response.data ? mapTask(response.data) : undefined;
  const error = response.error ? Error(response.error.message) : undefined;
  const count = response.count ? response.count : undefined;

  revalidateTasks();

  return { data, count, error };
}

export async function queryUpdateTask(
  supabase: SupabaseClient,
  payload: TaskUpdate,
  id: string,
): Promise<QueryTasksUpdateResponse> {
  const response = await supabase.from("tasks").update(payload).eq("id", id).select().single();

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  const data = response.data ? mapTask(response.data) : undefined;
  const error = response.error ? Error(response.error.message) : undefined;
  const count = response.count ? response.count : undefined;

  revalidateTasks();

  return { data, count, error };
}

export async function queryDeleteTask(supabase: SupabaseClient, id: string): Promise<QueryTasksDeleteResponse> {
  const response = await supabase.from("tasks").delete().eq("id", id).select().single();

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  const data = response.data ? mapTask(response.data) : undefined;
  const error = response.error ? Error(response.error.message) : undefined;
  const count = response.count ? response.count : undefined;

  revalidateTasks();

  return { data: data, count, error };
}
