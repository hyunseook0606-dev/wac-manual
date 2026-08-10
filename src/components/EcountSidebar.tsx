import { ComputerDesktopIcon, HomeIcon } from "@heroicons/react/24/outline";
import type { EcountChapterId } from "../types";
import { ECOUNT_PAGES } from "./EcountChapter";

type Props = {
  chapter: EcountChapterId;
  pageIndex: number;
  onSelectPage: (idx: number) => void;
  onHome: () => void;
  open: boolean;
};

export function EcountSidebar({
  chapter,
  pageIndex,
  onSelectPage,
  onHome,
  open,
}: Props) {
  return (
    <aside className={`sidebar sidebar-ecount ${open ? "open" : ""}`}>
      <div className="brand">
        <p className="brand-kicker">ECOUNT Manual</p>
        <h1>ECOUNT 메뉴얼</h1>
        <p>판매입력 · 인보이스 · 출력</p>
      </div>

      <button type="button" className="toc-home" onClick={onHome}>
        <HomeIcon />
        인턴 WMART 홈
      </button>

      <nav className="toc" aria-label="ECOUNT 목차">
        <p className="toc-label">Contents</p>
        {ECOUNT_PAGES.map((page, idx) => (
          <button
            key={page.id}
            type="button"
            className={`toc-btn ${chapter === "sales-entry" && pageIndex === idx ? "active" : ""}`}
            onClick={() => onSelectPage(idx)}
          >
            <ComputerDesktopIcon />
            <span>
              <strong>
                {String(idx + 1).padStart(2, "0")}. {page.title}
              </strong>
              <em>{page.sub}</em>
            </span>
          </button>
        ))}
      </nav>

      <div className="sidebar-foot">
        창고 메뉴얼과 별도
        <br />
        캡처 기준 · 순서대로 따라하기
      </div>
    </aside>
  );
}

export const ECOUNT_CHAPTER_TITLE: Record<EcountChapterId, string> = {
  "sales-entry": "판매입력",
};
