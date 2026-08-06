# -*- coding: utf-8 -*-
import fitz
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

pdf = r"c:\Users\82103\Documents\카카오톡 받은 파일\86ED4HRHKPP2KUC.PDF"
out_dir = Path(r"C:\Users\82103\Desktop\wac 메뉴얼 만들기\wac-manual-app\public\labels")
scale = 2.5

doc = fitz.open(pdf)
page = doc[0]
pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale), alpha=False)
raw = out_dir / "packing-list-raw.png"
pix.save(str(raw))

img = Image.open(raw).convert("RGBA")
overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
draw = ImageDraw.Draw(overlay)

try:
    font = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 22)
    font_sm = ImageFont.truetype("C:/Windows/Fonts/malgunbd.ttf", 20)
except Exception:
    font = ImageFont.load_default()
    font_sm = font


def pdf_box(x0, y0, x1, y1, pad=6):
    return [
        x0 * scale - pad,
        y0 * scale - pad,
        x1 * scale + pad,
        y1 * scale + pad,
    ]


def circle_box(box, width=5):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    rx = max((x1 - x0) / 2 + 12, 30)
    ry = max((y1 - y0) / 2 + 12, 26)
    if (x1 - x0) > 90:
        bbox = [cx - rx, cy - ry, cx + rx, cy + ry]
    else:
        r = max(rx, ry)
        bbox = [cx - r, cy - r, cx + r, cy + r]
    for i in range(width):
        draw.ellipse(
            [bbox[0] - i, bbox[1] - i, bbox[2] + i, bbox[3] + i],
            outline=(220, 30, 30, 235),
        )
    return bbox


def badge(num, near_bbox, place="top"):
    x0, y0, x1, y1 = near_bbox
    r = 17
    if place == "top":
        bx = (x0 + x1) / 2 - r
        by = y0 - 2 * r - 6
    elif place == "right":
        bx = x1 + 8
        by = (y0 + y1) / 2 - r
    elif place == "left":
        bx = x0 - 2 * r - 8
        by = (y0 + y1) / 2 - r
    else:  # bottom
        bx = (x0 + x1) / 2 - r
        by = y1 + 6

    bx = max(4, min(bx, img.width - 2 * r - 4))
    by = max(4, min(by, img.height - 2 * r - 4))

    draw.ellipse([bx, by, bx + r * 2, by + r * 2], fill=(220, 30, 30, 245))
    text = str(num)
    bb = draw.textbbox((0, 0), text, font=font)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    draw.text((bx + r - tw / 2, by + r - th / 2 - 1), text, fill="white", font=font)


# 1 Picked by
b1 = circle_box(pdf_box(28, 28, 98, 90, pad=2))
badge(1, b1, "left")

# 2 위치 A 5/6
b2 = circle_box(pdf_box(300, 355, 338, 385, pad=4))
badge(2, b2, "top")

# 3 수량 10PK
b3 = circle_box(pdf_box(338, 355, 375, 385, pad=4))
badge(3, b3, "top")

# 4 박스수량
b4 = circle_box(pdf_box(505, 28, 575, 90, pad=1))
badge(4, b4, "left")

# 5 거래처코드 222-02
b5 = circle_box(pdf_box(498, 100, 536, 122, pad=7))
badge(5, b5, "right")

out = Image.alpha_composite(img, overlay).convert("RGB")
full = out_dir / "packing-list-annotated.png"
out.save(full)
print("saved", full)

# legend strip image for UI
legend = Image.new("RGB", (900, 220), (255, 252, 247))
ld = ImageDraw.Draw(legend)
lines = [
    "① Picked by — 본인 영어 이니셜 (예: OK)",
    "② 위치 — 피킹할 렉 위치",
    "③ 수량 — 피킹할 개수",
    "④ 박스수량 — 패킹 후 총 박스 개수",
    "⑤ 거래처코드 숫자 — 박스 라벨 (예: 222-02×3)",
]
y = 18
for line in lines:
    ld.text((20, y), line, fill=(22, 22, 22), font=font_sm)
    y += 38
legend.save(out_dir / "packing-list-legend.png")
print("legend ok")
