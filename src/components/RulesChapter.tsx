import type { ReactNode } from "react";

export const RULE_PAGE_COUNT = 6;

type RulePage = {
  no: string;
  title: string;
  sub: string;
  body: ReactNode;
  wide?: boolean;
};

export const RULE_PAGES: RulePage[] = [
  {
    no: "01",
    title: "패킹리스트 분류 · 피킹 순서",
    sub: "출력 후 → 보고 나누기 → 순서대로 피킹",
    wide: true,
    body: (
      <>
        <div className="rule-callout">
          <p>
            <strong>패킹리스트 출력 후, 인턴이 할 일</strong>
          </p>
          <p className="rule-callout-next">
            거래처코드 맨 앞 글자(K / N / H)와 거래처명을 보고 아래 순서로
            분류합니다.
          </p>
        </div>

        <h4 className="example-heading">K · N · H가 뭔가요?</h4>
        <p className="example-lead">
          거래처코드 맨 앞 글자는 <strong>배송 지역</strong>입니다.
        </p>
        <div className="knh-meaning">
          <div className="knh-card">
            <strong>K</strong>
            <span>Kowloon · 구룡</span>
          </div>
          <div className="knh-card">
            <strong>N</strong>
            <span>New Territories · 신계</span>
          </div>
          <div className="knh-card">
            <strong>H</strong>
            <span>Hong Kong Island · 홍콩섬</span>
          </div>
        </div>

        <div className="howto-grid">
          <div className="howto-card">
            <span className="howto-step">보는 법 1</span>
            <strong>거래처코드 맨 앞</strong>
            <p>
              <em>K</em> / <em>N</em> / <em>H</em> 중 하나
            </p>
          </div>
          <div className="howto-card">
            <span className="howto-step">보는 법 2</span>
            <strong>K이면 거래처명 확인</strong>
            <p>
              <em>침사추이</em>가 있으면 따로 빼기
            </p>
          </div>
        </div>

        <h4 className="example-heading">예시 ① — K + 침사추이 (가장 먼저 피킹)</h4>
        <p className="example-lead">
          코드가 K이고 거래처명에 침사추이가 있으면 →{" "}
          <strong>맨 먼저 분류</strong>
        </p>
        <div className="label-frame example-hero">
          <img
            src="/labels/example-K-chimsa.png"
            alt="K 침사추이 패킹리스트 예시"
          />
          <p className="label-cap">실제 예시 · ①K + ①침사추이</p>
        </div>

        <h4 className="example-heading">예시 ② — N</h4>
        <p className="example-lead">
          맨 앞이 N이면 → <strong>N으로 분류</strong> (H는 H로 분류)
        </p>
        <div className="label-frame example-side">
          <img src="/labels/example-N.png" alt="N 패킹리스트 예시" />
          <p className="label-cap">N 예시 · 거래처코드 맨 앞 글자만 보면 됨</p>
        </div>

        <h4 className="example-heading">피킹 시작 순서</h4>
        <ol className="pick-order pick-order-row">
          <li>
            <span className="pick-badge">1</span>
            <div>
              <strong>K · 침사추이</strong>
              <em>위 예시 ①</em>
            </div>
          </li>
          <li>
            <span className="pick-badge">2</span>
            <div>
              <strong>K (나머지)</strong>
              <em>K인데 침사추이 아님</em>
            </div>
          </li>
          <li>
            <span className="pick-badge">3</span>
            <div>
              <strong>N</strong>
              <em>위 예시 ②</em>
            </div>
          </li>
          <li>
            <span className="pick-badge">4</span>
            <div>
              <strong>H</strong>
              <em>끝나면 패킹</em>
            </div>
          </li>
        </ol>
        <p className="rule-note rule-note-strong">
          한 줄: <strong>K 침사추이 → K → N → H → 패킹</strong>
        </p>
      </>
    ),
  },
  {
    no: "02",
    title: "패킹리스트로 피킹 · 패킹하기",
    sub: "이니셜 · 위치 · 수량 · 박스 라벨",
    wide: true,
    body: (
      <>
        <p>분류한 리스트를 들고 창고로 가서, 빨간 번호 순서대로 하면 됩니다.</p>
        <div className="plist-layout">
          <div className="label-frame plist-frame">
            <img
              src="/labels/packing-list-annotated.png"
              alt="패킹리스트 예시 - 빨간 번호로 작업 위치 표시"
            />
            <p className="label-cap">예시 · 빨간 원 = 작업 포인트</p>
          </div>
          <ol className="plist-steps">
            <li>
              <strong>① Picked by</strong>
              <span>
                영어 이니셜 (예: 옥현서 → <em>OK</em>)
              </span>
            </li>
            <li>
              <strong>② 위치</strong>
              <span>
                렉에서 찾기 (예: <em>A 5/6</em>)
              </span>
            </li>
            <li>
              <strong>③ 수량</strong>
              <span>
                적힌 수량만큼 피킹 (예: <em>10PK</em>)
              </span>
            </li>
            <li>
              <strong>패킹하는 곳</strong>
              <span>손수레로 가져와 바닥에 내려놓고 패킹</span>
            </li>
            <li>
              <strong>④ 박스수량</strong>
              <span>
                실제 개수 기입 (예: <em>3</em>)
              </span>
            </li>
            <li>
              <strong>⑤ 거래처코드</strong>
              <span>
                숫자로 라벨 — 예: <em>222-02×3</em>
              </span>
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    no: "03",
    title: "파란 손수레 쌓기 · 내리기",
    sub: "앞부터 쌓기 / 뒤부터 내리기",
    body: (
      <>
        <p>
          손잡이 기준으로 <strong>앞/뒤가 반대</strong>입니다.
        </p>
        <ul>
          <li>
            <strong>피킹(쌓기)</strong> — 손잡이에서 먼 <strong>앞쪽</strong>
            부터
          </li>
          <li>
            <strong>패킹 전(내리기)</strong> — 손잡이 쪽 <strong>뒤쪽</strong>
            부터
          </li>
        </ul>
        <div className="label-frame cart-frame">
          <img
            src="/labels/cart-annotated.png"
            alt="파란 손수레 - 앞부터 쌓기, 뒤부터 내리기"
          />
          <p className="label-cap">①뒤(손잡이) / ②앞</p>
        </div>
      </>
    ),
  },
  {
    no: "04",
    title: "박스에 넣을 때 (패킹)",
    sub: "더블체크 확인 → 온도대 · 칸막이 · 분말 · 깻잎/청양고추",
    wide: true,
    body: (
      <>
        <div className="rule-callout">
          <p>
            피킹이 끝나면 <strong>패킹하는 곳</strong>에서 박스에 담습니다.
          </p>
          <p className="rule-callout-next">
            단, <strong>Checked by</strong>에 영어 이니셜이 있는 리스트만
            패킹합니다. (더블체크 완료)
          </p>
        </div>

        <h4 className="example-heading">더블체크 확인 (패킹 전에 꼭)</h4>
        <p className="example-lead">
          <strong>Picked by</strong> 옆 <strong>Checked by</strong>에 이니셜이
          있으면 → 더블체크된 리스트 → 패킹 가능
        </p>
        <div className="label-frame example-side">
          <img
            src="/labels/packing-list-doublecheck.png"
            alt="Checked by에 영어 이니셜이 있으면 더블체크 완료"
          />
          <p className="label-cap">
            예시 · Checked by에 HS처럼 이니셜이 있으면 패킹
          </p>
        </div>

        <h4 className="example-heading">박스에 넣는 규칙</h4>
        <div className="pack-rules">
          <article className="pack-rule">
            <span className="pack-rule-no">1</span>
            <div>
              <span className="pack-rule-title">온도대별 분리 포장</span>
              <p>
                <em>상온</em>과 <em>냉장·냉동</em>은 원칙적으로{" "}
                <strong>다른 박스</strong>에 넣습니다.
              </p>
            </div>
          </article>

          <article className="pack-rule">
            <span className="pack-rule-no">2</span>
            <div>
              <span className="pack-rule-title">합포장(혼재)할 때</span>
              <p>
                어쩔 수 없이 한 박스에 섞어야 하면{" "}
                <strong>종이 칸막이(파티션)</strong>을 넣어 제품이 서로 닿지
                않게 합니다.
              </p>
            </div>
          </article>

          <article className="pack-rule">
            <span className="pack-rule-no">3</span>
            <div>
              <span className="pack-rule-title">분말류 방습</span>
              <p>
                분말형 제품은 습기·결로를 막기 위해{" "}
                <strong>가급적 단독으로 밀봉</strong> 포장합니다.
              </p>
            </div>
          </article>

          <article className="pack-rule pack-rule-warn">
            <span className="pack-rule-no">4</span>
            <div>
              <span className="pack-rule-title">깻잎 · 청양고추 — 혼합 금지</span>
              <p>
                <em>깻잎</em>, <em>청양고추</em>는 냉장·냉동 제품과{" "}
                <strong>같은 박스에 넣지 않습니다.</strong>
              </p>
            </div>
          </article>
        </div>

        <p className="rule-note rule-note-strong">
          기억:{" "}
          <strong>
            더블체크 확인 → 온도 분리 → (섞으면) 칸막이 → 분말은 단독 →
            깻잎·청양고추는 냉장·냉동과 금지
          </strong>
        </p>
      </>
    ),
  },
  {
    no: "05",
    title: "박스 고르기 — 무게별",
    sub: "무거우면 두면(두 줄) · 가벼우면 한면(한 줄)",
    wide: true,
    body: (
      <>
        <div className="rule-callout">
          <p>
            패킹할 때 박스가 <strong>무거워질 것 같으면</strong> 단면이{" "}
            <strong>물결 두 줄(두면)</strong>인 박스를 씁니다.
          </p>
          <p className="rule-callout-next">
            가벼운 짐이면 단면이 <strong>물결 한 줄(한면)</strong>인 박스면
            됩니다. 박스 모서리 단면을 보고 고르면 됩니다.
          </p>
        </div>

        <div className="box-type-grid">
          <div className="box-type-card">
            <h4>무거운 짐 → 두면 (두 줄)</h4>
            <p>
              박스가 무거워질 것 같으면 (대략 <strong>10kg 초과</strong>) 단면이
              물결 <strong>두 줄</strong>인 박스를 씁니다.
            </p>
            <div className="box-ex">
              <span className="box-ex-label">이런 박스 쓰기</span>
              <ul>
                <li>삼계탕 박스</li>
                <li>물결가루(치킨파우더) 박스</li>
                <li>W 자체 박스</li>
              </ul>
            </div>
            <div className="label-frame">
              <img
                src="/labels/box-double-wall.png"
                alt="무거운 박스 - 단면 물결 두 줄"
              />
              <p className="label-cap">빨간 원 = 단면 물결이 두 줄</p>
            </div>
          </div>
          <div className="box-type-card">
            <h4>가벼운 짐 → 한면 (한 줄)</h4>
            <p>
              가벼운 짐이면 단면이 물결 <strong>한 줄</strong>인 박스면 됩니다.
            </p>
            <div className="box-ex">
              <span className="box-ex-label">이런 박스 쓰기</span>
              <ul>
                <li>김가루 박스 (예: 해농 넘버원)</li>
                <li>떡볶이(떡) 박스</li>
              </ul>
            </div>
            <div className="label-frame">
              <img
                src="/labels/box-single-wall.png"
                alt="가벼운 박스 - 단면 물결 한 줄"
              />
              <p className="label-cap">빨간 원 = 단면 물결이 한 줄</p>
            </div>
          </div>
        </div>

        <p className="rule-note rule-note-strong">
          한 줄: <strong>무거우면 두면 · 가벼우면 한면</strong> (모서리 단면
          확인)
        </p>
      </>
    ),
  },
  {
    no: "06",
    title: "라벨 붙이기 — 주의 · HEAVY",
    sub: "터짐 주의 / 10kg 초과",
    wide: true,
    body: (
      <>
        <div className="label-duo">
          <div className="label-duo-card">
            <h4>주의 (FRAGILE)</h4>
            <p>
              단무지, 마요네즈, 깐메추리알, 케찹팩 등 터질 수 있는 물품은
              비닐로 감싼 뒤 <strong>주의</strong> 라벨을 붙입니다.
            </p>
            <div className="label-frame">
              <img src="/labels/caution.png" alt="주의 FRAGILE 라벨" />
            </div>
          </div>
          <div className="label-duo-card">
            <h4>HEAVY</h4>
            <p>
              패킹 후 박스가 무거우면 <strong>HEAVY</strong> 라벨을 붙입니다.
              (대략 <strong>10kg 초과</strong>)
            </p>
            <div className="label-frame">
              <img src="/labels/heavy.png" alt="HEAVY 라벨" />
            </div>
          </div>
        </div>
      </>
    ),
  },
];

type Props = {
  pageIndex: number;
};

export function RulesChapter({ pageIndex }: Props) {
  const page = RULE_PAGES[pageIndex] ?? RULE_PAGES[0];

  return (
    <div className="rules-list">
      <div className="rule-page-meta mono">
        수칙 {pageIndex + 1} / {RULE_PAGES.length}
      </div>
      <article className={`rule ${page.wide ? "rule-wide" : ""}`}>
        <div className="rule-no">{page.no}</div>
        <div>
          <h3>{page.title}</h3>
          {page.body}
        </div>
      </article>
    </div>
  );
}
