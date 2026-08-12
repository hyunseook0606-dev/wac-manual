import {
  ClipboardDocumentCheckIcon,
  HomeIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import type { WarehouseChapterId } from "../types";

const TOC: {
  id: WarehouseChapterId;
  title: string;
  desc: string;
  icon: typeof ClipboardDocumentCheckIcon;
}[] = [
  {
    id: "rules",
    title: "창고 작업 수칙",
    desc: "분류 · 피킹 · 패킹 · 라벨",
    icon: ClipboardDocumentCheckIcon,
  },
  {
    id: "map",
    title: "창고 도면",
    desc: "전체 도면 · 렉 사진",
    icon: MapIcon,
  },
];

type Props = {
  chapter: WarehouseChapterId;
  onSelect: (id: WarehouseChapterId) => void;
  onHome: () => void;
  open: boolean;
};

export function Sidebar({ chapter, onSelect, onHome, open }: Props) {
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
        {TOC.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              className={`toc-btn ${chapter === item.id ? "active" : ""}`}
              onClick={() => onSelect(item.id)}
            >
              <Icon />
              <span>
                <strong>
                  {String(idx + 1).padStart(2, "0")}. {item.title}
                </strong>
                <em>{item.desc}</em>
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

export const CHAPTER_TITLE: Record<WarehouseChapterId, string> = {
  rules: "창고 작업 수칙",
  map: "창고 도면",
};
