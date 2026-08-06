/**
 * 창고 도면 — 전체도면 이미지 + 렉 사진 중심.
 * 인터랙티브 렉 선택은 보조로 아래에 유지.
 */
import { useMemo, useState } from "react";
import type { Item, LocationData } from "../types";

type Props = {
  data: LocationData;
  initialRack?: string | null;
};

function RackBtn({
  rack,
  zone,
  count,
  selected,
  onClick,
}: {
  rack: string;
  zone: "a" | "b" | "r";
  count: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`rack ${zone} ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <span className="id">{rack}</span>
      <span className="cnt">{count}품목</span>
    </button>
  );
}

function Pair({
  bottom,
  top,
  zone,
  byRack,
  selected,
  onSelect,
}: {
  bottom: string;
  top: string;
  zone: "a" | "b";
  byRack: Record<string, Item[]>;
  selected: string | null;
  onSelect: (r: string) => void;
}) {
  return (
    <div className="pair">
      <RackBtn
        rack={top}
        zone={zone}
        count={(byRack[top] || []).length}
        selected={selected === top}
        onClick={() => onSelect(top)}
      />
      <RackBtn
        rack={bottom}
        zone={zone}
        count={(byRack[bottom] || []).length}
        selected={selected === bottom}
        onClick={() => onSelect(bottom)}
      />
    </div>
  );
}

export function MapChapter({ data, initialRack = null }: Props) {
  const byRack = data.byRack;
  const [selected, setSelected] = useState<string | null>(initialRack);
  const [slot, setSlot] = useState<string | null>(null);

  const items = useMemo(() => {
    if (!selected) return [];
    const all = byRack[selected] || [];
    if (!slot) return all;
    return all.filter((x) => x.location === slot);
  }, [byRack, selected, slot]);

  const locs = useMemo(() => {
    if (!selected) return [];
    return [...new Set((byRack[selected] || []).map((x) => x.location))].sort(
      (a, b) => a.localeCompare(b, "ko", { numeric: true }),
    );
  }, [byRack, selected]);

  const select = (rack: string) => {
    setSelected(rack);
    setSlot(null);
  };

  const pad = (key: string) => (
    <div key={key} className="rack empty" aria-hidden>
      {" "}
    </div>
  );

  return (
    <div className="map-chapter">
      <section className="map-visual">
        <h3 className="map-visual-title">전체 도면</h3>
        <p className="map-visual-lead">
          아래가 패킹하는 곳 · 왼쪽 A · 오른쪽 B · 가운데 통로
        </p>
        <div className="map-photo-frame">
          <img
            src="/labels/warehouse-map.png"
            alt="창고 전체 도면 - A/B 구역과 패킹하는 곳"
          />
        </div>
      </section>

      <section className="map-visual">
        <h3 className="map-visual-title">렉 단(높이)</h3>
        <p className="map-visual-lead">
          위→아래 · <strong>1/3</strong>(상단) → <strong>1/2</strong>(중단) →{" "}
          <strong>1/1</strong>(하단·팔레트)
        </p>
        <div className="map-photo-frame map-photo-rack">
          <img
            src="/labels/rack-levels-annotated.png"
            alt="실제 렉 사진 - 상단 1/3, 중단 1/2, 하단 1/1"
          />
        </div>
        <ul className="map-tier-list">
          <li>
            <strong>1/3</strong> 상단 — 작은 박스 · 가벼운 짐
          </li>
          <li>
            <strong>1/2</strong> 중단 — 중간 크기 · 오픈픽
          </li>
          <li>
            <strong>1/1</strong> 하단 — 바닥 팔레트 · 큰/무거운 짐
          </li>
        </ul>
      </section>

      <details className="map-interactive">
        <summary>렉별 품목 찾아보기 (선택)</summary>
        <div className="map-layout">
          <div>
            <div className="legend">
              <span>
                <i className="lg-a" />A
              </span>
              <span>
                <i className="lg-b" />B (반 칸 위)
              </span>
              <span>
                <i className="lg-r" />R
              </span>
            </div>

            <div className="zone-top">
              <div className="col">
                <div className="cold-duo">
                  <RackBtn
                    rack="R"
                    zone="r"
                    count={(byRack.R || []).length}
                    selected={selected === "R"}
                    onClick={() => select("R")}
                  />
                  <div className="rack cold-unused">
                    <span className="id">냉장</span>
                    <span className="cnt">미사용</span>
                  </div>
                </div>
                <RackBtn
                  rack="A8"
                  zone="a"
                  count={(byRack.A8 || []).length}
                  selected={selected === "A8"}
                  onClick={() => select("A8")}
                />
                <div className="wall-block">벽</div>
              </div>
              <div />
              <div className="col">
                {pad("p1")}
                {pad("p2")}
                <RackBtn
                  rack="B7"
                  zone="b"
                  count={(byRack.B7 || []).length}
                  selected={selected === "B7"}
                  onClick={() => select("B7")}
                />
              </div>
            </div>

            <div className="yard">
              <div className="col">
                <RackBtn
                  rack="A7"
                  zone="a"
                  count={(byRack.A7 || []).length}
                  selected={selected === "A7"}
                  onClick={() => select("A7")}
                />
                <Pair
                  bottom="A5"
                  top="A6"
                  zone="a"
                  byRack={byRack}
                  selected={selected}
                  onSelect={select}
                />
                <Pair
                  bottom="A3"
                  top="A4"
                  zone="a"
                  byRack={byRack}
                  selected={selected}
                  onSelect={select}
                />
                <Pair
                  bottom="A1"
                  top="A2"
                  zone="a"
                  byRack={byRack}
                  selected={selected}
                  onSelect={select}
                />
              </div>
              <div className="aisle" aria-label="중앙통로">
                <span>중앙통로</span>
              </div>
              <div className="col">
                <Pair
                  bottom="B5"
                  top="B6"
                  zone="b"
                  byRack={byRack}
                  selected={selected}
                  onSelect={select}
                />
                <Pair
                  bottom="B3"
                  top="B4"
                  zone="b"
                  byRack={byRack}
                  selected={selected}
                  onSelect={select}
                />
                <Pair
                  bottom="B1"
                  top="B2"
                  zone="b"
                  byRack={byRack}
                  selected={selected}
                  onSelect={select}
                />
                <div className="rack empty half" aria-hidden />
              </div>
            </div>
            <div className="packing-zone">패킹하는 곳</div>
          </div>

          <div className="detail-panel">
            <div className="detail-head">
              <h3>{selected || "—"}</h3>
              <span className="item-sub">
                {selected ? `${items.length}개 품목` : "렉을 선택하세요"}
              </span>
            </div>
            <div className="detail-body">
              {!selected ? (
                <p className="empty">렉을 누르면 품목이 나옵니다.</p>
              ) : (
                <>
                  <div className="slots">
                    <button
                      type="button"
                      className={`slot ${!slot ? "on" : ""}`}
                      onClick={() => setSlot(null)}
                    >
                      전체
                    </button>
                    {locs.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        className={`slot ${slot === loc ? "on" : ""}`}
                        onClick={() => setSlot(loc)}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                  <table className="items">
                    <thead>
                      <tr>
                        <th>위치</th>
                        <th>품목</th>
                        <th>코드</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...items]
                        .sort(
                          (a, b) =>
                            a.location.localeCompare(b.location, "ko", {
                              numeric: true,
                            }) || a.name.localeCompare(b.name, "ko"),
                        )
                        .map((it) => (
                          <tr key={`${it.code}-${it.location}`}>
                            <td className="mono">{it.location}</td>
                            <td>
                              <div className="item-name">{it.name}</div>
                            </td>
                            <td className="mono">{it.code}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}
