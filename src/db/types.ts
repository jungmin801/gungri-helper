import type { ExprId, PartnerId, PlaceId } from "@/types";

export type GungRiEntry = {
  id: string;          
  content: string;     
  createdAt: number;

  placeId: PlaceId;
  partnerId: PartnerId;

  exprId1: ExprId;
  exprId2: ExprId;
};
