# -*- coding: utf-8 -*-
"""렉 단 높이(1/3·1/2·1/1) 설명용 다이어그램 + 실제 사진 주석."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(r"C:\Users\82103\Desktop\wac 메뉴얼 만들기\wac-manual-app\public\labels")
PHOTO = OUT / "rack-levels.png"
DIAG = OUT / "rack-levels-diagram.png"
ANNOT = OUT / "rack-levels-annotated.png"

try:
    font = ImageFont.truetype("C:/Windows/Fonts/malgunbd.ttf", 28)
    font_sm = ImageFont.truetype("C:/Windows/Fonts/malgun.ttf", 22)
    font_lg = ImageFont.truetype("C:/Windows/Fonts/malgunbd.ttf", 36)
except Exception:
    font = ImageFont.load_default()
    font_sm = font
    font_lg = font

# --- clean diagram ---
W, H = 900, 720
img = Image.new("RGB", (W, H), (255, 252, 247))
d = ImageDraw.Draw(img)

# title
d.text((40, 24), "렉 단(높이) 읽는 법 — 위에서 아래로", fill=(22, 22, 22), font=font_lg)

# rack frame
left, right = 120, 560
top = 100
# heights proportional: 1/3, 1/2, 1/1 of a unit - use relative visual
# total stack visual: top band smaller, mid medium, bottom largest
h3, h2, h1 = 110, 170, 260
y0 = top
bands = [
    (y0, y0 + h3, "상단 · 1/3", "작은 박스·가벼운 짐", "#E8F3EE", "#1F5C45", "-1 또는 맨 위 단"),
    (y0 + h3, y0 + h3 + h2, "중단 · 1/2", "중간 크기 박스", "#E8F0F7", "#1D4F7C", "-2 또는 가운데 단"),
    (y0 + h3 + h2, y0 + h3 + h2 + h1, "하단 · 1/1", "바닥 팔레트·큰 짐", "#F6EEE4", "#8A4B16", "바닥 / 가장 큰 칸"),
]

d.rectangle([left, top, right, top + h3 + h2 + h1], outline=(22, 22, 22), width=4)
for y1, y2, title, desc, bg, accent, note in bands:
    d.rectangle([left + 3, y1 + 2, right - 3, y2 - 2], fill=bg)
    d.line([left, y2, right, y2], fill=(22, 22, 22), width=3)
    d.rectangle([left, y1, left + 14, y2], fill=accent)
    d.text((left + 36, y1 + 18), title, fill=(22, 22, 22), font=font)
    d.text((left + 36, y1 + 58), desc, fill=(80, 80, 80), font=font_sm)
    d.text((left + 36, y1 + 92), note, fill=accent, font=font_sm)

# side callouts
d.text((600, 130), "↑ 천장 쪽", fill=(90, 90, 90), font=font_sm)
d.text((600, 560), "↓ 바닥 쪽", fill=(90, 90, 90), font=font_sm)
d.multiline_text(
    (600, 220),
    "위치코드 예)\nA 4/1-1\n\nA = 구역\n4 = 렉 번호\n/1 = 칸\n-1 = 단(높이)",
    fill=(22, 22, 22),
    font=font_sm,
    spacing=6,
)

d.text(
    (40, H - 48),
    "한 렉 면을 보면 위→아래가 1/3 → 1/2 → 1/1 순입니다.",
    fill=(22, 22, 22),
    font=font_sm,
)
img.save(DIAG)
print("diagram", DIAG)

# --- annotate photo if exists ---
if PHOTO.exists():
    photo = Image.open(PHOTO).convert("RGBA")
    pw, ph = photo.size
    ov = Image.new("RGBA", photo.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(ov)

    def badge(text, xy, fill=(220, 30, 30, 235)):
        x, y = xy
        try:
            f = ImageFont.truetype("C:/Windows/Fonts/malgunbd.ttf", max(22, pw // 40))
        except Exception:
            f = font
        bb = od.textbbox((0, 0), text, font=f)
        tw, th = bb[2] - bb[0], bb[3] - bb[1]
        pad = 10
        od.rounded_rectangle(
            [x, y, x + tw + pad * 2, y + th + pad * 2], radius=8, fill=fill
        )
        od.text((x + pad, y + pad - 1), text, fill="white", font=f)

    # approximate bands on photo (portrait warehouse rack)
    badge("상단 1/3", (pw * 0.02, ph * 0.08))
    badge("중단 1/2", (pw * 0.02, ph * 0.38), fill=(29, 79, 124, 235))
    badge("하단 1/1", (pw * 0.02, ph * 0.68), fill=(138, 75, 22, 235))
    out = Image.alpha_composite(photo, ov).convert("RGB")
    # resize if huge
    if out.width > 1400:
        ratio = 1400 / out.width
        out = out.resize((1400, int(out.height * ratio)))
    out.save(ANNOT, quality=92)
    print("annotated", ANNOT, out.size)
else:
    print("photo missing", PHOTO)
