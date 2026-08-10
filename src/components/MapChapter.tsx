/**
 * 창고 도면 — 전체도면 이미지 + 렉 사진 중심.
 */
import type { LocationData } from "../types";

type Props = {
  data: LocationData;
  initialRack?: string | null;
};

export function MapChapter({ data: _data }: Props) {
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
    </div>
  );
}
