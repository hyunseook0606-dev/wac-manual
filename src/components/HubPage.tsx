import { motion } from "framer-motion";

const EXPRESS_SLIDES =
  "https://docs.google.com/presentation/d/1mSytr6-bSl01gl0j8bExCryC9Bd-9cIj/edit?usp=sharing&ouid=106832286164196570873&rtpof=true&sd=true";

type Props = {
  onOpenWmart: () => void;
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 + i * 0.08,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function HubPage({ onOpenWmart }: Props) {
  return (
    <div className="hub-shell">
      <div className="hub hub-premium">
        <section className="hub-stage">
          <motion.div
            className="hub-hero"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <img className="hub-brand" src="/wac-logo.png" alt="WAC Logistics" />

            <p className="hub-kicker">Intern Manual</p>

            <h1 className="hub-headline">
              WAC 인턴 메뉴얼
              <span>사업별 온보딩을 한곳에서</span>
            </h1>

            <p className="hub-lead">
              W MART와 W Express의 실무 가이드를 선택해 바로 시작하세요.
            </p>
          </motion.div>

          <motion.div
            className="hub-units"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <button type="button" className="hub-unit" onClick={onOpenWmart}>
              <span className="hub-unit-meta">
                <span className="hub-unit-no">01</span>
                <span className="hub-unit-tag">Warehouse</span>
              </span>
              <div className="hub-unit-logo-wrap">
                <img
                  className="hub-unit-logo hub-unit-logo-mart"
                  src="/wmart-card-logo.png"
                  alt="W MART"
                />
              </div>
              <strong className="hub-unit-title">W MART 메뉴얼</strong>
              <em className="hub-unit-desc">창고 피킹·패킹 · ECOUNT</em>
              <span className="hub-unit-cta">
                메뉴얼 열기
                <span aria-hidden="true">→</span>
              </span>
            </button>

            <a
              className="hub-unit"
              href={EXPRESS_SLIDES}
              target="_blank"
              rel="noreferrer"
            >
              <span className="hub-unit-meta">
                <span className="hub-unit-no">02</span>
                <span className="hub-unit-tag">Fulfillment</span>
              </span>
              <div className="hub-unit-logo-wrap">
                <img
                  className="hub-unit-logo hub-unit-logo-express"
                  src="/w-express-logo.png"
                  alt="W Express"
                />
              </div>
              <strong className="hub-unit-title">W Express 메뉴얼</strong>
              <em className="hub-unit-desc">검수·보관·출고·반품 · 재고관리</em>
              <span className="hub-unit-cta">
                Google Slides 열기
                <span aria-hidden="true">↗</span>
              </span>
            </a>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
