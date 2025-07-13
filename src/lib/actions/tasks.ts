"use server";

import { TableQueryOptions } from "@/types/supabase-utils";

import { insertTask, queryDeleteTask, queryTask, queryTasks, queryUpdateTask } from "../queries/tasks";
import { createClient } from "../supabase/server";
import {
  QueryTasksDeleteResponse,
  QueryTasksInsertResponse,
  QueryTasksResponse,
  QueryTasksSingleResponse,
  QueryTasksUpdateResponse,
  TaskInsert,
  TaskUpdate,
} from "@/types/tasks";
import { revalidatePath } from "next/cache";

export async function getTasks(options: TableQueryOptions): Promise<QueryTasksResponse> {
  const supabase = await createClient();
  const { data, count, error } = await queryTasks(supabase, options);

  if (error) {
    console.log("Supabase Error: ", error);
  }

  return { data, count, error };
}

export async function getTask(options: TableQueryOptions, id: string): Promise<QueryTasksSingleResponse> {
  const supabase = await createClient();
  const response = await queryTask(supabase, options, id);

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  return response;
}

export async function createTask(payload: TaskInsert): Promise<QueryTasksInsertResponse> {
  const supabase = await createClient();
  const response = await insertTask(supabase, payload);

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  revalidatePath("/tasks");
  return response;
}

export async function updateTask(payload: TaskUpdate, id: string): Promise<QueryTasksUpdateResponse> {
  const supabase = await createClient();
  const response = await queryUpdateTask(supabase, payload, id);

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  revalidatePath("/tasks");
  revalidatePath("/tasks/" + id);
  return response;
}

export async function deleteTask(id: string): Promise<QueryTasksDeleteResponse> {
  const supabase = await createClient();
  const response = await queryDeleteTask(supabase, id);

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  revalidatePath("/tasks");
  revalidatePath("/tasks/" + id);
  return response;
}
