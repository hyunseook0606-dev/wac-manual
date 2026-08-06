# -*- coding: utf-8 -*-
"""규칙1 예시 이미지 생성 (판매조회=침사추이, 메뉴얼=N)."""
from pathlib import Path

import fitz
from PIL import Image, ImageDraw, ImageFont

LABELS = Path(__file__).resolve().parents[1] / "public" / "labels"
SCALE = 2.5


def fonts():
    try:
        return (
            ImageFont.truetype("C:/Windows/Fonts/malgunbd.ttf", 26),
            ImageFont.truetype("C:/Windows/Fonts/malgun.ttf", 20),
        )
    except Exception:
        d = ImageFont.load_default()
        return d, d


def render(pdf: Path):
    page = fitz.open(pdf)[0]
    pix = page.get_pixmap(matrix=fitz.Matrix(SCALE, SCALE))
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    return page, img


def first_char_center(page, startswith: str):
    data = page.get_text("rawdict")
    for block in data["blocks"]:
        if block.get("type") != 0:
            continue
        for line in block.get("lines", []):
            for span in line.get("spans", []):
                chars = span.get("chars") or []
                text = "".join(c.get("c", "") for c in chars) if chars else span.get("text", "")
                if text.startswith(startswith) and chars:
                    bb = chars[0]["bbox"]
                    return (
                        (bb[0] + bb[2]) / 2 * SCALE,
                        (bb[1] + bb[3]) / 2 * SCALE,
                    )
    return None


def circle(d, cx, cy, r=28):
    for i in range(5):
        d.ellipse(
            [cx - r - i, cy - r - i, cx + r + i, cy + r + i],
            outline=(210, 30, 30, 255),
        )


def badge(d, x, y, text, fill=(210, 30, 30, 235), max_w=None):
    """한 줄 뱃지 — 잘림 없이 읽히게."""
    f, _ = fonts()
    bb = d.textbbox((0, 0), text, font=f)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    pad_x, pad_y = 14, 10
    w = tw + pad_x * 2
    h = th + pad_y * 2
    if max_w is not None and x + w > max_w - 8:
        x = max(8, max_w - w - 8)
    d.rounded_rectangle([x, y, x + w, y + h], radius=9, fill=fill)
    d.text((x + pad_x, y + pad_y - 2), text, fill=(255, 255, 255, 255), font=f)
    return w, h


def make_chimsa():
    pdf = Path(r"C:\Users\82103\Downloads\판매조회.pdf")
    page, base = render(pdf)
    center = first_char_center(page, "K-YTM")
    # 아래 여유를 넉넉히 — 뱃지가 잘리지 않게
    crop = (280, 20, base.width - 20, 520)
    c = base.crop(crop).convert("RGBA")
    ov = Image.new("RGBA", c.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    ox, oy = crop[0], crop[1]

    hits = page.search_for("침사이추이-원풍원")
    if hits:
        h0 = hits[0]
        x0 = h0.x0 * SCALE - ox - 6
        y0 = h0.y0 * SCALE - oy - 5
        x1 = h0.x1 * SCALE - ox + 6
        y1 = h0.y1 * SCALE - oy + 5
        d.rounded_rectangle(
            [x0, y0, x1, y1],
            radius=6,
            outline=(210, 30, 30, 255),
            width=4,
            fill=(255, 220, 70, 100),
        )
        badge(
            d,
            x0,
            y1 + 12,
            "① 침사추이 · 거래처명",
            fill=(180, 70, 20, 240),
            max_w=c.size[0],
        )

    if center:
        cx, cy = center[0] - ox, center[1] - oy
        circle(d, cx, cy, r=28)
        badge(d, cx + 34, cy - 48, "① K · 거래처코드 맨 앞", max_w=c.size[0])

    out = Image.alpha_composite(c, ov).convert("RGB")
    path = LABELS / "example-K-chimsa.png"
    out.save(path, quality=95)
    print("saved", path, out.size)


def make_n():
    pdf = Path(r"C:\Users\82103\Downloads\메뉴얼.pdf")
    page, base = render(pdf)
    center = first_char_center(page, "N-KT")
    crop = (280, 20, base.width - 20, 460)
    c = base.crop(crop).convert("RGBA")
    ov = Image.new("RGBA", c.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    ox, oy = crop[0], crop[1]
    if center:
        cx, cy = center[0] - ox, center[1] - oy
        circle(d, cx, cy, r=28)
        badge(d, cx + 34, cy - 48, "N · 거래처코드 맨 앞", max_w=c.size[0])
    out = Image.alpha_composite(c, ov).convert("RGB")
    path = LABELS / "example-N.png"
    out.save(path, quality=95)
    print("saved", path, out.size)


if __name__ == "__main__":
    make_chimsa()
    make_n()
