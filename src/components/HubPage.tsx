import { motion } from "framer-motion";

const EXPRESS_SLIDES =
  "https://docs.google.com/presentation/d/1mSytr6-bSl01gl0j8bExCryC9Bd-9cIj/edit?usp=sharing&ouid=106832286164196570873&rtpof=true&sd=true";

type Props = {
  onOpenWmart: () => void;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12 + i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function HubPage({ onOpenWmart }: Props) {
  return (
    <div className="hub-shell">
      <div className="hub-hero-bg" aria-hidden="true">
        <img src="/hub-hero.jpg" alt="" />
        <div className="hub-hero-veil" />
      </div>

      <div className="hub hub-premium">
        <motion.header
          className="hub-top"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <img className="hub-brand" src="/wac-logo.png" alt="WAC Logistics" />
          <p className="hub-top-note">WAC Group · Intern Onboarding</p>
        </motion.header>

        <section className="hub-stage">
          <motion.p
            className="hub-kicker"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            Intern Manual
          </motion.p>

          <motion.h1
            className="hub-headline"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            WAC 인턴 메뉴얼
            <span>사업별 온보딩을 한곳에서</span>
          </motion.h1>

          <motion.p
            className="hub-lead"
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            W Express와 W MART의 실무 가이드를 선택해 바로 시작하세요.
          </motion.p>

          <motion.div
            className="hub-units"
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <a
              className="hub-unit"
              href={EXPRESS_SLIDES}
              target="_blank"
              rel="noreferrer"
            >
              <span className="hub-unit-meta">
                <span className="hub-unit-no">01</span>
                <span className="hub-unit-tag">External</span>
              </span>
              <img
                className="hub-unit-logo hub-unit-logo-express"
                src="/w-express-logo.png"
                alt="W Express"
              />
              <strong>W Express 메뉴얼</strong>
              <em>이커머스 풀필먼트 · 검수·보관·출고·반품 · 재고관리</em>
              <span className="hub-unit-cta">
                Google Slides 열기
                <span aria-hidden="true">↗</span>
              </span>
            </a>

            <button type="button" className="hub-unit" onClick={onOpenWmart}>
              <span className="hub-unit-meta">
                <span className="hub-unit-no">02</span>
                <span className="hub-unit-tag">Internal</span>
              </span>
              <img
                className="hub-unit-logo"
                src="/wmart-logo.png"
                alt="W MART"
              />
              <strong>W MART 메뉴얼</strong>
              <em>창고 피킹·패킹 · ECOUNT 판매입력 · 인보이스</em>
              <span className="hub-unit-cta">
                메뉴얼 열기
                <span aria-hidden="true">→</span>
              </span>
            </button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
