type Props = {
  onOpenWmart: () => void;
};

export function HubPage({ onOpenWmart }: Props) {
  return (
    <div className="hub">
      <header className="hub-hero">
        <div className="hub-title-row hub-animate hub-animate-1">
          <img
            className="hub-logo hub-logo-wac"
            src="/wac-logo.png"
            alt="WAC Logistics"
          />
          <div className="hub-title-text">
            <p className="hub-kicker">Intern Manual</p>
            <h1>WAC 인턴 메뉴얼</h1>
          </div>
        </div>
        <p className="hub-lead hub-animate hub-animate-2">
          W Express와 W MART 메뉴얼을 나눠 두었습니다. 사업장을 골라 주세요.
        </p>
      </header>

      <div className="hub-cards">
        <button
          type="button"
          className="hub-card hub-card-express hub-animate hub-animate-3"
          disabled
          aria-disabled="true"
          title="곧 추가됩니다"
        >
          <span className="hub-card-no">01</span>
          <img
            className="hub-card-logo hub-card-logo-express"
            src="/w-express-logo.png"
            alt="W Express"
          />
          <strong>W Express 메뉴얼</strong>
          <em>준비 중 · 곧 추가됩니다</em>
          <span className="hub-card-cta">Coming soon</span>
        </button>

        <button
          type="button"
          className="hub-card hub-card-wmart hub-animate hub-animate-4"
          onClick={onOpenWmart}
        >
          <span className="hub-card-no">02</span>
          <img
            className="hub-card-logo"
            src="/wmart-logo.png"
            alt="W MART"
          />
          <strong>W MART 메뉴얼</strong>
          <em>창고 · ECOUNT</em>
          <span className="hub-card-cta">열기 →</span>
        </button>
      </div>
    </div>
  );
}
