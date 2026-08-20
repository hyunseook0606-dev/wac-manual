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

/** Top-level manuals (separate from each other) */
export type ManualId = "hub" | "wmart" | "warehouse" | "ecount";

/** Warehouse sidebar chapters */
export type WarehouseChapterId = "rules" | "map";

/** ECOUNT sidebar chapters */
export type EcountChapterId = "sales-entry";

export type WarehousePage =
  | {
      id: string;
      chapter: "rules";
      rulePage: number;
      title: string;
      sub: string;
    }
  | { id: "map"; chapter: "map"; title: string; sub: string };
