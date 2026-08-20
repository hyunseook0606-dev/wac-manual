type Props = {
  onOpenWmart: () => void;
};

export function HubPage({ onOpenWmart }: Props) {
  return (
    <div className="hub">
      <header className="hub-hero hub-animate hub-animate-1">
        <div className="hub-title-row">
          <img
            className="hub-logo hub-logo-wac"
            src="/wac-logo.png"
            alt="WAC Logistics"
          />
          <div className="hub-title-text">
            <p className="hub-kicker">Intern Manual</p>
            <h1>WAC 인턴 메뉴얼</h1>
            <p className="hub-lead">
              각 사업별 온보딩 메뉴얼을 한곳에 모아 두었습니다. 아래에서 사업장을
              선택해 바로 들어가세요.
            </p>
          </div>
        </div>

        <div className="hub-badges hub-animate hub-animate-2">
          <span className="hub-badge">W Express Fulfillment & E-commerce Logistics</span>
          <span className="hub-badge">W MART Warehouse & ECOUNT</span>
        </div>
      </header>

      <div className="hub-cards">
        <a
          className="hub-card hub-card-express hub-animate hub-animate-3"
          href="https://docs.google.com/presentation/d/1mSytr6-bSl01gl0j8bExCryC9Bd-9cIj/edit?usp=sharing&ouid=106832286164196570873&rtpof=true&sd=true"
          target="_blank"
          rel="noreferrer"
        >
          <span className="hub-card-no">01</span>
          <img
            className="hub-card-logo hub-card-logo-express"
            src="/w-express-logo.png"
            alt="W Express"
          />
          <strong>W Express 메뉴얼</strong>
          <em>검수·보관·출고·반품 · 재고관리(풀필먼트)</em>
          <span className="hub-card-cta">Google Slides 열기 ↗</span>
        </a>

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
