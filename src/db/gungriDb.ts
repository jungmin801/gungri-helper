import Dexie, { type Table } from "dexie";
import type { GungRiEntry } from "./types";


export class GungRiDB extends Dexie {
  entries!: Table<GungRiEntry, string>; // PK 타입 string

  constructor() {
    super("gungri-db");
    // v1: 기본 + 리스트/필터 가능한 인덱스들
    this.version(1).stores({
      entries:
        "id, createdAt, placeId, partnerId, exprId1, exprId2, [createdAt+id], [placeId+createdAt], [partnerId+createdAt]"
    });
  }
}

export const gungri = new GungRiDB();
