export type Item = {
  code: string;
  name: string;
  brand: string | null;
  spec: string | null;
  group1: string | null;
  group2: string | null;
  barcode: string;
  location: string;
  zone: string;
  rack: number | null;
  bay: number | null;
  level: number | null;
};

export type LocationData = {
  source: string;
  note: string;
  stats: {
    locations: number;
    items: number;
    skipped_f: number;
    empty_location: number;
  };
  byLocation: Record<string, Item[]>;
  byRack: Record<string, Item[]>;
};

/** Sidebar chapters (검색 제외) */
export type ChapterId = "cover" | "rules" | "map";

/** Flat page flow for prev/next + print-friendly rule splits */
export type ManualPage =
  | { id: "cover"; chapter: "cover"; title: string; sub: string }
  | {
      id: string;
      chapter: "rules";
      rulePage: number;
      title: string;
      sub: string;
    }
  | { id: "map"; chapter: "map"; title: string; sub: string };
