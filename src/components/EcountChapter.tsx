export type EcountStep = {
  no: string;
  title: string;
  body: string[];
  tip?: string;
  warn?: string;
  example?: { label: string; text: string }[];
  img?: string;
  imgCap?: string;
};

export const ECOUNT_PAGES: {
  id: string;
  title: string;
  sub: string;
  steps: EcountStep[];
}[] = [
  {
    id: "sales-entry-basics",
    title: "판매입력 — 기본 입력",
    sub: "메뉴 이동 · 거래처 · 담당자 · 창고 · 특이사항 · 품목",
    steps: [
      {
        no: "01",
        title: "판매입력 열기",
        body: [
          "주문이 들어오면 ECOUNT에서 판매입력을 엽니다.",
          "경로: **재고 I → 영업관리 → 판매 → 판매입력**",
          "일자는 보통 **금일(오늘)**로 둡니다.",
        ],
        img: "/ecount/01-sales-entry.png",
        imgCap: "판매입력 화면 (Wmart)",
      },
      {
        no: "02",
        title: "거래처 검색",
        body: [
          "거래처 칸에서 상호 **일부**만 검색합니다.",
          "예: 몽콕 아웃닭 → 「**아웃닭**」만 쳐도 됩니다.",
          "몽콕·침사추이처럼 지점이 같이 뜨면, **주문 지점**에 맞는 줄을 고릅니다.",
        ],
        tip: "풀네임을 다 칠 필요 없습니다. 핵심 단어만 쳐도 됩니다.",
        img: "/ecount/02-customer-search.png",
        imgCap: "거래처검색 — 「아웃닭」 검색 예시",
      },
      {
        no: "03",
        title: "담당자(사원) — 온라인",
        body: [
          "담당자(사원검색)에서는 인턴용 **온라인**을 고릅니다.",
          "코드 예: **00005 · 온라인**",
        ],
        tip: "인턴 입력은 기본적으로 온라인으로 맞춥니다.",
        img: "/ecount/03-employee-search.png",
        imgCap: "사원검색 — 온라인(인턴용)",
      },
      {
        no: "04",
        title: "출하창고 — 본사창고",
        body: [
          "출하창고는 **본사창고**로 둡니다.",
          "우리가 피킹하는 곳이 본사창고입니다.",
          "창고 메뉴얼의 도면(A/B/R)도 **이 본사창고**입니다.",
        ],
        warn: "「팝업」은 사무실 데스크 재고입니다. 피킹용으로 쓰지 마세요.",
        tip: "클럽 / 본사창고 / 팝업 중 → 피킹은 본사창고",
        img: "/ecount/04-warehouse-search.png",
        imgCap: "창고검색 — 본사창고 선택",
      },
      {
        no: "05",
        title: "특이사항 두 칸",
        body: [
          "특이사항은 **배송용 / 창고용**이 따로 있습니다.",
          "누구에게 보이는지가 다릅니다.",
        ],
        example: [
          {
            label: "특이사항(배송)",
            text: "기사님·다른 사람도 볼 수 있음 · 예: 풀필먼트 2박스",
          },
          {
            label: "특이사항(창고)",
            text: "창고 피킹하는 사람만 · 예: 단무지상태 체크후 피킹하세요",
          },
        ],
        img: "/ecount/05-item-search.png",
        imgCap: "특이사항(배송·창고) 입력 예시",
      },
      {
        no: "06",
        title: "품목 넣고 수량만",
        body: [
          "품목코드 칸에 **핵심 단어**만 쳐도 됩니다.",
          "예: 고추가루김치용 → 「**김치**」 검색 → 굵은고추가루(김치용) 선택",
          "선택되면 품목·단가가 들어가고, **수량만** 적으면 됩니다.",
        ],
        tip: "정확한 품목명을 전부 외울 필요 없습니다. 키워드로 찾고 클릭하세요.",
        img: "/ecount/06-item-filled.png",
        imgCap: "품목 선택 후 수량만 입력",
      },
    ],
  },
];

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

type Props = {
  pageIndex: number;
};

export function EcountChapter({ pageIndex }: Props) {
  const page = ECOUNT_PAGES[pageIndex];
  if (!page) return null;

  return (
    <div className="ecount-page">
      <div className="rule-callout">
        <p>
          주문 들어온 품목을 보고{" "}
          <strong>재고 I → 판매 → 판매입력</strong>에서 입력합니다.
        </p>
        <p className="rule-callout-next">아래 번호 순서대로 따라가면 됩니다.</p>
      </div>

      {page.steps.map((step) => (
        <article key={step.no} className="ecount-step">
          <div className="ecount-step-head">
            <span className="ecount-step-no">{step.no}</span>
            <h3>{step.title}</h3>
          </div>

          <ul className="ecount-step-list">
            {step.body.map((line) => (
              <li key={line}>{renderBold(line)}</li>
            ))}
          </ul>

          {step.warn ? (
            <div className="callout callout-warn">
              <span className="callout-icon">!</span>
              <div className="callout-body">
                <span className="callout-label">주의</span>
                <p>{step.warn}</p>
              </div>
            </div>
          ) : null}

          {step.tip ? (
            <div className="callout callout-tip">
              <span className="callout-icon">TIP</span>
              <div className="callout-body">
                <span className="callout-label">Tip</span>
                <p>{step.tip}</p>
              </div>
            </div>
          ) : null}

          {step.example ? (
            <div className="ecount-examples">
              {step.example.map((ex) => (
                <div key={ex.label} className="ecount-ex">
                  <strong>{ex.label}</strong>
                  <span>{ex.text}</span>
                </div>
              ))}
            </div>
          ) : null}

          {step.img ? (
            <div className="label-frame ecount-frame">
              <img src={step.img} alt={step.imgCap ?? step.title} />
              {step.imgCap ? <p className="label-cap">{step.imgCap}</p> : null}
            </div>
          ) : null}
        </article>
      ))}

      <div className="callout callout-key">
        <span className="callout-icon">✓</span>
        <div className="callout-body">
          <span className="callout-label">여기까지 핵심</span>
          <ul>
            <li>판매입력 열기</li>
            <li>거래처 · 온라인 · 본사창고 · 특이사항</li>
            <li>품목 검색 후 수량 입력</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
