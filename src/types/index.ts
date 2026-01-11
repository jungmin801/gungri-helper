export type PlaceId = `place_${string}`;     // 예: place_001
export type PartnerId = `partner_${string}`; // 예: partner_001
export type ExprId = `expr_${string}`;       // 예: expr_001

export type Place =  {
    id: PlaceId;
    ko: string;
    en: string;
}

export type Partner =  {
    id: PartnerId;
    ko: string;
    en: string;
}

export type Expression = {
    id: ExprId;
    en: string;
    ko: string;
    ref: {
        chapter : number;
        type: string;
    }
}