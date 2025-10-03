"use server";

import { TableQueryOptions } from "@/types/supabase-utils";

import {
  insertTaskList,
  queryDeleteTaskList,
  queryTaskList,
  queryTaskLists,
  queryUpdateTaskList,
} from "../queries/task_lists";
import { createClient } from "../supabase/server";
import {
  QueryTaskListsDeleteResponse,
  QueryTaskListsInsertResponse,
  QueryTaskListsResponse,
  QueryTaskListsSingleResponse,
  QueryTaskListsUpdateResponse,
  TaskListInsert,
  TaskListUpdate,
} from "@/types/task_lists";
import { revalidatePath } from "next/cache";

export async function getTaskLists(options: TableQueryOptions): Promise<QueryTaskListsResponse> {
  const supabase = await createClient();
  const { data, count, error } = await queryTaskLists(supabase, options);

  if (error) {
    console.log("Supabase Error: ", error);
  }

  return { data, count, error };
}

export async function getTaskList(options: TableQueryOptions, id: string): Promise<QueryTaskListsSingleResponse> {
  const supabase = await createClient();
  const response = await queryTaskList(supabase, options, id);

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  return response;
}

export async function createTaskList(payload: TaskListInsert): Promise<QueryTaskListsInsertResponse> {
  const supabase = await createClient();
  const response = await insertTaskList(supabase, payload);

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  revalidatePath("/lists");
  return response;
}

export async function updateTaskList(payload: TaskListUpdate, id: string): Promise<QueryTaskListsUpdateResponse> {
  const supabase = await createClient();
  const response = await queryUpdateTaskList(supabase, payload, id);

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  revalidatePath("/lists");
  revalidatePath("/lists/" + id);
  return response;
}

export async function deleteTaskList(id: string): Promise<QueryTaskListsDeleteResponse> {
  const supabase = await createClient();
  const response = await queryDeleteTaskList(supabase, id);

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  revalidatePath("/lists");
  revalidatePath("/lists/" + id);
  return response;
}
