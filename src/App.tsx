import { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import locationData from "./data/locations.json";
import type { LocationData, ManualId } from "./types";
import { Sidebar, WAREHOUSE_NAV } from "./components/Sidebar";
import { EcountSidebar } from "./components/EcountSidebar";
import { RulesChapter } from "./components/RulesChapter";
import { MapChapter } from "./components/MapChapter";
import { HubPage } from "./components/HubPage";
import { EcountChapter, ECOUNT_PAGES } from "./components/EcountChapter";
import "./chapters.css";

const DATA = locationData as LocationData;

function parseHash(): { manual: ManualId; page: number } {
  const raw = window.location.hash.replace(/^#\/?/, "");
  if (!raw || raw === "hub") return { manual: "hub", page: 0 };
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
  window.location.hash = `#/${manual}/${page}`;
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
  const openWarehouse = () => setHash("warehouse", 0);
  const openEcount = () => setHash("ecount", 0);

  const goWarehousePage = (idx: number) => {
    const clamped = Math.max(0, Math.min(WAREHOUSE_NAV.length - 1, idx));
    setHash("warehouse", clamped);
  };

  const goEcountPage = (idx: number) => {
    const clamped = Math.max(0, Math.min(ECOUNT_PAGES.length - 1, idx));
    setHash("ecount", clamped);
  };

  if (manual === "hub") {
    return (
      <div className="hub-shell">
        <HubPage onOpenWarehouse={openWarehouse} onOpenEcount={openEcount} />
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
          onHome={goHub}
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
                <button type="button" onClick={goHub}>
                  홈
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

  const safeIdx = Math.min(pageIdx, WAREHOUSE_NAV.length - 1);
  const current = WAREHOUSE_NAV[safeIdx] ?? WAREHOUSE_NAV[0];

  return (
    <div className="app-shell">
      <Sidebar
        pageIndex={safeIdx}
        onSelectPage={goWarehousePage}
        onHome={goHub}
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
                <h2>{current.title}</h2>
                <p>{current.sub}</p>
              </div>
              <div className="page-meta mono">
                {String(safeIdx + 1).padStart(2, "0")} /{" "}
                {String(WAREHOUSE_NAV.length).padStart(2, "0")}
              </div>
            </header>

            {current.kind === "map" ? (
              <MapChapter data={DATA} />
            ) : (
              <RulesChapter pageIndex={current.rulePage ?? 0} />
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
              <button type="button" onClick={goHub}>
                홈
              </button>
              <button
                type="button"
                disabled={safeIdx >= WAREHOUSE_NAV.length - 1}
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
