import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatResponse(payload: object): object {
  return Object.fromEntries(Object.entries(payload).map(([key, value]) => [key, value === null ? undefined : value]));
}

export function formatStatus(status: "todo" | "in_progress" | "backlog" | "cancelled" | "done") {
  switch (status) {
    case "todo":
      return "Todo";
    case "in_progress":
      return "In Progress";
    case "backlog":
      return "Backlog";
    case "cancelled":
      return "Cancelled";
    case "done":
      return "Done";
  }
}

export const sleep = async (delay: number) => await new Promise((resolve) => setTimeout(resolve, delay));
