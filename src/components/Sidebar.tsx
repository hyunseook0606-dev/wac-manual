import {
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import type { ChapterId } from "../types";

const TOC: {
  id: ChapterId;
  title: string;
  desc: string;
  icon: typeof BookOpenIcon;
}[] = [
  {
    id: "cover",
    title: "시작하기",
    desc: "메뉴얼 소개",
    icon: BookOpenIcon,
  },
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
  chapter: ChapterId;
  onSelect: (id: ChapterId) => void;
  open: boolean;
};

export function Sidebar({ chapter, onSelect, open }: Props) {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="brand">
        <p className="brand-kicker">WAC Intern Manual</p>
        <h1>창고 업무 전자 메뉴얼</h1>
        <p>작업 수칙과 위치 도면을 한곳에서 확인합니다.</p>
      </div>

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
        F(냉동) 구역 제외 · ESA009M 기준
        <br />
        라벨 이미지 · 실제 부착 스티커
      </div>
    </aside>
  );
}

export const CHAPTER_TITLE: Record<ChapterId, string> = {
  cover: "시작하기",
  rules: "창고 작업 수칙",
  map: "창고 도면",
};
