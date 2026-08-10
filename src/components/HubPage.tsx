type Props = {
  onOpenWarehouse: () => void;
  onOpenEcount: () => void;
};

export function HubPage({ onOpenWarehouse, onOpenEcount }: Props) {
  return (
    <div className="hub">
      <header className="hub-hero">
        <div className="hub-logo-wrap">
          <img
            className="hub-logo"
            src="/wmart-logo.png"
            alt="WMART — A Member of WAC"
          />
        </div>
        <p className="hub-kicker hub-animate hub-animate-1">Intern Manual</p>
        <h1 className="hub-animate hub-animate-2">인턴 WMART 메뉴얼</h1>
        <p className="hub-lead hub-animate hub-animate-3">
          창고 피킹·패킹과 ECOUNT 입력을 나눠 두었습니다. 필요한 메뉴얼을
          골라 보세요.
        </p>
      </header>

      <div className="hub-cards">
        <button
          type="button"
          className="hub-card hub-animate hub-animate-4"
          onClick={onOpenWarehouse}
        >
          <span className="hub-card-no">01</span>
          <strong>창고 메뉴얼</strong>
          <em>피킹 · 패킹 · 도면 · 라벨</em>
          <span className="hub-card-cta">열기 →</span>
        </button>

        <button
          type="button"
          className="hub-card hub-card-ecount hub-animate hub-animate-5"
          onClick={onOpenEcount}
        >
          <span className="hub-card-no">02</span>
          <strong>ECOUNT 메뉴얼</strong>
          <em>판매입력 · 인보이스 · 패킹리스트</em>
          <span className="hub-card-cta">열기 →</span>
        </button>
      </div>
    </div>
  );
}
