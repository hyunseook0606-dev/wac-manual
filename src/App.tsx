import { useMemo, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import locationData from "./data/locations.json";
import type { ChapterId, LocationData, ManualPage } from "./types";
import { CHAPTER_TITLE, Sidebar } from "./components/Sidebar";
import { CoverChapter } from "./components/CoverChapter";
import { RulesChapter, RULE_PAGES } from "./components/RulesChapter";
import { MapChapter } from "./components/MapChapter";
import "./chapters.css";

const DATA = locationData as LocationData;

/** 전체 페이지 흐름: 시작 → 수칙(쪽 나눔) → 도면 */
const PAGES: ManualPage[] = [
  {
    id: "cover",
    chapter: "cover",
    title: "시작하기",
    sub: "피킹 · 패킹 가이드",
  },
  ...RULE_PAGES.map((rule, i) => ({
    id: `rules-${i}`,
    chapter: "rules" as const,
    rulePage: i,
    title: "창고 작업 수칙",
    sub: `${rule.no}. ${rule.title}`,
  })),
  {
    id: "map",
    chapter: "map",
    title: "창고 도면",
    sub: "아래 · 패킹하는 곳 · 왼 A / 오 B",
  },
];

function firstPageOf(chapter: ChapterId): number {
  return PAGES.findIndex((p) => p.chapter === chapter);
}

export default function App() {
  const [pageIdx, setPageIdx] = useState(0);
  const [navOpen, setNavOpen] = useState(false);

  const page = PAGES[pageIdx];
  const chapter = page.chapter;

  const goPage = (idx: number) => {
    setPageIdx(Math.max(0, Math.min(PAGES.length - 1, idx)));
    setNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goChapter = (id: ChapterId) => {
    goPage(firstPageOf(id));
  };

  const body = useMemo(() => {
    switch (page.chapter) {
      case "cover":
        return <CoverChapter />;
      case "rules":
        return <RulesChapter pageIndex={page.rulePage} />;
      case "map":
        return <MapChapter data={DATA} initialRack={null} />;
    }
  }, [page]);

  return (
    <div className="app-shell">
      <Sidebar chapter={chapter} onSelect={goChapter} open={navOpen} />

      <main className="main">
        <div className="mobile-bar">
          <button
            type="button"
            onClick={() => setNavOpen((v) => !v)}
            aria-label="목차"
          >
            {navOpen ? <XMarkIcon /> : <Bars3Icon />}
            목차
          </button>
          <strong>WAC 창고 메뉴얼</strong>
        </div>

        {navOpen ? (
          <button
            type="button"
            className="nav-backdrop"
            aria-label="목차 닫기"
            onClick={() => setNavOpen(false)}
          />
        ) : null}

        <article className="page">
          <div className="page-inner">
            <header className="page-head">
              <div>
                <h2>{CHAPTER_TITLE[chapter]}</h2>
                <p>{page.sub}</p>
              </div>
              <div className="page-meta mono">
                {String(pageIdx + 1).padStart(2, "0")} /{" "}
                {String(PAGES.length).padStart(2, "0")}
              </div>
            </header>

            {body}

            <nav className="pager" aria-label="페이지 이동">
              <button
                type="button"
                disabled={pageIdx <= 0}
                onClick={() => goPage(pageIdx - 1)}
              >
                <ArrowLeftIcon />
                이전
              </button>
              <button
                type="button"
                disabled={pageIdx >= PAGES.length - 1}
                onClick={() => goPage(pageIdx + 1)}
              >
                다음
                <ArrowRightIcon />
              </button>
            </nav>
          </div>
        </article>
      </main>
    </div>
  );
}
