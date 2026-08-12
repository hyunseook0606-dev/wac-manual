import { useMemo, useState } from "react";
import type { Item, LocationData } from "../types";

type Props = {
  data: LocationData;
  onGoMap: (rack: string) => void;
};

export function SearchChapter({ data, onGoMap }: Props) {
  const [q, setQ] = useState("");

  const hits = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [] as (Item & { rackKey: string })[];
    const out: (Item & { rackKey: string })[] = [];
    for (const [rackKey, items] of Object.entries(data.byRack)) {
      for (const it of items) {
        const blob = [
          it.name,
          it.code,
          it.barcode,
          it.location,
          it.brand ?? "",
          it.group1 ?? "",
        ]
          .join(" ")
          .toLowerCase();
        if (blob.includes(query)) out.push({ ...it, rackKey });
      }
    }
    return out.sort((a, b) =>
      a.location.localeCompare(b.location, "ko", { numeric: true }),
    );
  }, [data.byRack, q]);

  return (
    <div>
      <div className="search-box">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="품목명 · 바코드 · 위치코드 (예: 참이슬, A 1/4-1)"
          autoFocus
        />
      </div>

      {!q.trim() ? (
        <p className="empty">검색어를 입력하면 결과가 여기에 표시됩니다.</p>
      ) : hits.length === 0 ? (
        <p className="empty">“{q}” 검색 결과가 없습니다.</p>
      ) : (
        <>
          <p className="item-sub" style={{ marginBottom: 10 }}>
            {hits.length}건{hits.length > 80 ? " · 상위 80건 표시" : ""}
          </p>
          <div className="hit-list">
            {hits.slice(0, 80).map((it) => (
              <button
                key={`${it.code}-${it.location}`}
                type="button"
                className="hit"
                onClick={() => onGoMap(it.rackKey)}
              >
                <div className="mono">
                  {it.location} · {it.rackKey}
                </div>
                <div className="item-name">{it.name}</div>
                <div className="mono">
                  {it.code} · {it.barcode}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export type GoMapHandler = (rack: string) => void;
