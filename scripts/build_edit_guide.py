# -*- coding: utf-8 -*-
"""다음 인턴용 — 메뉴얼 수정 가이드 Word 생성 (단순 버전)."""
from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

ROOT = Path(r"C:\Users\82103\Desktop\wac 메뉴얼 만들기")
OUT = ROOT / "메뉴얼_수정_가이드_인턴용.docx"
DOCS = ROOT / "wac-manual-app" / "docs" / "메뉴얼_수정_가이드_인턴용.docx"

DARK = RGBColor(28, 28, 28)
MUTED = RGBColor(100, 100, 100)


def font(run, size=11, bold=False, color=None):
    run.font.name = "맑은 고딕"
    run._element.rPr.rFonts.set(qn("w:eastAsia"), "맑은 고딕")
    run.font.size = Pt(size)
    run.bold = bold
    if color:
        run.font.color.rgb = color


def P(doc, text, size=11, bold=False, after=6, color=None, align=None):
    p = doc.add_paragraph()
    if align is not None:
        p.alignment = align
    p.paragraph_format.space_after = Pt(after)
    p.paragraph_format.line_spacing = 1.4
    r = p.add_run(text)
    font(r, size=size, bold=bold, color=color or DARK)
    return p


def H(doc, text, size=15):
    P(doc, text, size=size, bold=True, after=8)


def bullet(doc, text, size=11):
    p = doc.add_paragraph(style="List Bullet")
    p.clear()
    p.paragraph_format.space_after = Pt(4)
    r = p.add_run(text)
    font(r, size=size)


def numbered(doc, text, size=11):
    p = doc.add_paragraph(style="List Number")
    p.clear()
    p.paragraph_format.space_after = Pt(5)
    r = p.add_run(text)
    font(r, size=size)


def build():
    doc = Document()
    sec = doc.sections[0]
    sec.top_margin = Cm(2.0)
    sec.bottom_margin = Cm(1.8)
    sec.left_margin = Cm(2.2)
    sec.right_margin = Cm(2.2)

    P(
        doc,
        "WAC 창고 메뉴얼 — 수정 가이드",
        size=20,
        bold=True,
        align=WD_ALIGN_PARAGRAPH.CENTER,
        after=6,
    )
    P(
        doc,
        "인턴용 · 복잡하게 안 해도 됩니다",
        size=12,
        color=MUTED,
        align=WD_ALIGN_PARAGRAPH.CENTER,
        after=18,
    )

    H(doc, "한 줄 요약")
    P(
        doc,
        "GitHub에서 파일 받고 → Cursor / Claude Code 같은 AI한테 "
        "『이거 고쳐줘』라고 말하면 됩니다.",
        bold=True,
        after=14,
    )

    H(doc, "1. 파일 받기")
    P(doc, "메뉴얼 원본은 여기 있습니다.", after=4)
    P(doc, "https://github.com/hyunseook0606-dev/wac-manual", size=11, bold=True, after=8)
    numbered(doc, "위 주소 들어가기")
    numbered(doc, "초록 Code 버튼 → Download ZIP (또는 Clone)")
    numbered(doc, "압축 풀고 폴더를 연다")
    P(doc, "", after=4)

    H(doc, "2. AI한테 시키기")
    P(
        doc,
        "Cursor든 Claude Code든 VS Code + AI든, 익숙한 걸로 폴더를 연 다음 "
        "원하는 말을 하면 됩니다. 예:",
        after=8,
    )
    bullet(doc, "수칙 05에 박스 예시 문장 추가해줘")
    bullet(doc, "이 사진으로 가벼운 박스 예시 바꿔줘")
    bullet(doc, "워드 메뉴얼도 웹이랑 맞게 다시 만들어줘")
    P(
        doc,
        "어디 파일을 고칠지 외울 필요 없습니다. AI가 찾아서 고칩니다.",
        size=10,
        color=MUTED,
        after=14,
    )

    H(doc, "3. 결과물 어디에 올리나? (편한 걸로)")
    P(doc, "공식 사이트에 꼭 올릴 필요 없습니다. 아래 중 하나면 됩니다.", after=8)
    bullet(
        doc,
        "지금 쓰는 공식 웹: https://wac-warehouse-manual.vercel.app "
        "(권한 있으면 GitHub에 올린 뒤 반영)",
    )
    bullet(doc, "본인 Vercel에 따로 배포해도 됨")
    bullet(doc, "고친 파일·Word만 구글 드라이브 / 카톡으로 공유해도 됨")
    P(
        doc,
        "배포·권한 설정이 어렵면 드라이브로 넘기면 됩니다.",
        size=10,
        color=MUTED,
        after=14,
    )

    H(doc, "4. 참고 (필요할 때만)")
    bullet(doc, "웹 주소: https://wac-warehouse-manual.vercel.app")
    bullet(doc, "인쇄용 Word: 보통 WAC_창고_업무_메뉴얼.docx")
    bullet(doc, "로컬로 화면만 보려면: npm install → npm run dev")
    P(doc, "", after=10)

    P(
        doc,
        "핵심: 다운받기 → AI에게 말하기 → 드라이브든 본인 배포든 편한 방식으로 공유.",
        size=12,
        bold=True,
        after=4,
    )

    doc.save(OUT)
    DOCS.parent.mkdir(parents=True, exist_ok=True)
    doc.save(DOCS)
    print("saved", OUT)
    print("saved", DOCS)


if __name__ == "__main__":
    build()
