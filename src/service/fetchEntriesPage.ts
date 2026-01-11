// entryRepo.ts (서비스/레포)
import { gungri } from "@/db/gungriDb";
import type { GungRiEntry } from "@/db/types";


export type EntryCursor = { createdAt: number; id: string } | null;

export async function fetchEntriesPage(params: {
  limit: number;
  cursor: EntryCursor;
}): Promise<{ items: GungRiEntry[]; nextCursor: EntryCursor }> {
  const { limit, cursor } = params;

  let q = gungri.entries.orderBy("[createdAt+id]").reverse();

  // cursor가 있으면 그 "이전" 것들만
  if (cursor) {
    q = gungri.entries
      .where("[createdAt+id]")
      .below([cursor.createdAt, cursor.id])
      .reverse();
  }

  const items = await q.limit(limit).toArray();
  const last = items.length > 0 ? items[items.length - 1] : null;
  const nextCursor = last ? { createdAt: last.createdAt, id: last.id } : null;

  return { items, nextCursor };
}
