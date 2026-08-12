import {
  ClipboardDocumentCheckIcon,
  HomeIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import { RULE_PAGES } from "./RulesChapter";

export type WarehouseNavPage = {
  id: string;
  title: string;
  sub: string;
  kind: "rules" | "map";
  rulePage?: number;
};

export const WAREHOUSE_NAV: WarehouseNavPage[] = [
  ...RULE_PAGES.map((rule, i) => ({
    id: `rules-${i}`,
    title: rule.title,
    sub: rule.sub,
    kind: "rules" as const,
    rulePage: i,
  })),
  {
    id: "map",
    title: "창고 도면",
    sub: "본사창고 · 아래 패킹하는 곳 · 왼 A / 오 B",
    kind: "map" as const,
  },
];

type Props = {
  pageIndex: number;
  onSelectPage: (idx: number) => void;
  onHome: () => void;
  open: boolean;
};

export function Sidebar({ pageIndex, onSelectPage, onHome, open }: Props) {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="brand">
        <p className="brand-kicker">Warehouse Manual</p>
        <h1>창고 메뉴얼</h1>
        <p>피킹·패킹 수칙과 본사창고 도면</p>
      </div>

      <button type="button" className="toc-home" onClick={onHome}>
        <HomeIcon />
        인턴 W MART 홈
      </button>

      <nav className="toc" aria-label="목차">
        <p className="toc-label">Contents</p>
        {WAREHOUSE_NAV.map((item, idx) => {
          const Icon =
            item.kind === "map" ? MapIcon : ClipboardDocumentCheckIcon;
          return (
            <button
              key={item.id}
              type="button"
              className={`toc-btn ${pageIndex === idx ? "active" : ""}`}
              onClick={() => onSelectPage(idx)}
            >
              <Icon />
              <span>
                <strong>
                  {String(idx + 1).padStart(2, "0")}. {item.title}
                </strong>
                <em>{item.sub}</em>
              </span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-foot">
        본사창고 기준 · F(냉동) 구역 제외
        <br />
        ECOUNT와 별도 메뉴얼
      </div>
    </aside>
  );
}
