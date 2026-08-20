import { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import locationData from "./data/locations.json";
import type {
  LocationData,
  ManualId,
  WarehouseChapterId,
  WarehousePage,
} from "./types";
import { CHAPTER_TITLE, Sidebar } from "./components/Sidebar";
import { EcountSidebar } from "./components/EcountSidebar";
import { RulesChapter, RULE_PAGES } from "./components/RulesChapter";
import { MapChapter } from "./components/MapChapter";
import { HubPage } from "./components/HubPage";
import { WmartHubPage } from "./components/WmartHubPage";
import { EcountChapter, ECOUNT_PAGES } from "./components/EcountChapter";
import "./chapters.css";

const DATA = locationData as LocationData;

const WAREHOUSE_PAGES: WarehousePage[] = [
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
    sub: "본사창고 · 아래 패킹하는 곳 · 왼 A / 오 B",
  },
];

function parseHash(): { manual: ManualId; page: number } {
  const raw = window.location.hash.replace(/^#\/?/, "");
  if (!raw || raw === "hub") return { manual: "hub", page: 0 };
  if (raw === "wmart" || raw.startsWith("wmart/")) {
    return { manual: "wmart", page: 0 };
  }
  if (raw.startsWith("warehouse")) {
    const n = Number(raw.split("/")[1] ?? 0);
    return {
      manual: "warehouse",
      page: Number.isFinite(n) ? Math.max(0, n) : 0,
    };
  }
  if (raw.startsWith("ecount")) {
    const n = Number(raw.split("/")[1] ?? 0);
    return {
      manual: "ecount",
      page: Number.isFinite(n) ? Math.max(0, n) : 0,
    };
  }
  return { manual: "hub", page: 0 };
}

function setHash(manual: ManualId, page = 0) {
  if (manual === "hub") {
    window.location.hash = "#/";
    return;
  }
  if (manual === "wmart") {
    window.location.hash = "#/wmart";
    return;
  }
  window.location.hash = `#/${manual}/${page}`;
}

function firstWarehousePage(chapter: WarehouseChapterId): number {
  return WAREHOUSE_PAGES.findIndex((p) => p.chapter === chapter);
}

export default function App() {
  const initial = parseHash();
  const [manual, setManual] = useState<ManualId>(initial.manual);
  const [pageIdx, setPageIdx] = useState(initial.page);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onHash = () => {
      const next = parseHash();
      setManual(next.manual);
      setPageIdx(next.page);
      setNavOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const goHub = () => setHash("hub");
  const goWmartHub = () => setHash("wmart");
  const openWarehouse = () => setHash("warehouse", 0);
  const openEcount = () => setHash("ecount", 0);

  const goWarehousePage = (idx: number) => {
    const clamped = Math.max(0, Math.min(WAREHOUSE_PAGES.length - 1, idx));
    setHash("warehouse", clamped);
  };

  const goEcountPage = (idx: number) => {
    const clamped = Math.max(0, Math.min(ECOUNT_PAGES.length - 1, idx));
    setHash("ecount", clamped);
  };

  const goWarehouseChapter = (id: WarehouseChapterId) => {
    goWarehousePage(firstWarehousePage(id));
  };

  if (manual === "hub") {
    return <HubPage onOpenWmart={goWmartHub} />;
  }

  if (manual === "wmart") {
    return (
      <div className="hub-shell hub-shell-light">
        <WmartHubPage
          onBack={goHub}
          onOpenWarehouse={openWarehouse}
          onOpenEcount={openEcount}
        />
      </div>
    );
  }

  if (manual === "ecount") {
    const safeEcountIdx = Math.min(pageIdx, ECOUNT_PAGES.length - 1);
    const currentEcount = ECOUNT_PAGES[safeEcountIdx] ?? ECOUNT_PAGES[0];
    return (
      <div className="app-shell">
        <EcountSidebar
          pageIndex={safeEcountIdx}
          onSelectPage={goEcountPage}
          onHome={goWmartHub}
          open={navOpen}
        />
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
            <strong>ECOUNT 메뉴얼</strong>
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
                  <h2>{currentEcount.title}</h2>
                  <p>{currentEcount.sub}</p>
                </div>
                <div className="page-meta mono">
                  {String(safeEcountIdx + 1).padStart(2, "0")} /{" "}
                  {String(ECOUNT_PAGES.length).padStart(2, "0")}
                </div>
              </header>
              <EcountChapter pageIndex={safeEcountIdx} />
              <nav className="pager" aria-label="페이지 이동">
                <button
                  type="button"
                  disabled={safeEcountIdx <= 0}
                  onClick={() => goEcountPage(safeEcountIdx - 1)}
                >
                  <ArrowLeftIcon />
                  이전
                </button>
                <button type="button" onClick={goWmartHub}>
                  W MART 홈
                </button>
                <button
                  type="button"
                  disabled={safeEcountIdx >= ECOUNT_PAGES.length - 1}
                  onClick={() => goEcountPage(safeEcountIdx + 1)}
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

  const safeIdx = Math.min(pageIdx, WAREHOUSE_PAGES.length - 1);
  const warehousePage = WAREHOUSE_PAGES[safeIdx] ?? WAREHOUSE_PAGES[0];
  const chapter = warehousePage.chapter;

  return (
    <div className="app-shell">
      <Sidebar
        chapter={chapter}
        onSelect={goWarehouseChapter}
        onHome={goWmartHub}
        open={navOpen}
      />

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
          <strong>창고 메뉴얼</strong>
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
                <p>{warehousePage.sub}</p>
              </div>
              <div className="page-meta mono">
                {String(safeIdx + 1).padStart(2, "0")} /{" "}
                {String(WAREHOUSE_PAGES.length).padStart(2, "0")}
              </div>
            </header>

            {chapter === "map" ? (
              <MapChapter data={DATA} />
            ) : (
              <RulesChapter pageIndex={warehousePage.rulePage ?? 0} />
            )}

            <nav className="pager" aria-label="페이지 이동">
              <button
                type="button"
                disabled={safeIdx <= 0}
                onClick={() => goWarehousePage(safeIdx - 1)}
              >
                <ArrowLeftIcon />
                이전
              </button>
              <button type="button" onClick={goWmartHub}>
                W MART 홈
              </button>
              <button
                type="button"
                disabled={safeIdx >= WAREHOUSE_PAGES.length - 1}
                onClick={() => goWarehousePage(safeIdx + 1)}
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
