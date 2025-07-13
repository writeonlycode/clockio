import { Database } from "./supabase";

export type PublicSchema = Database[Extract<keyof Database, "public">];
export type TableRowTypes = {
  [TableName in keyof PublicSchema["Tables"]]: PublicSchema["Tables"][TableName]["Row"];
}[keyof PublicSchema["Tables"]];

export interface TableQueryOptions {
  initialCount?: number | null;
  includeCount?: "exact" | "planned" | "estimated";
  order?: { column: string; ascending?: boolean; nullsFirst?: boolean };
  limit?: number;
  range?: { from: number; to: number };
}
