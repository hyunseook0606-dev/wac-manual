# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import math

src = Path(r"C:\Users\82103\Desktop\wac 메뉴얼 만들기\wac-manual-app\public\labels\cart-raw.png")
out = Path(r"C:\Users\82103\Desktop\wac 메뉴얼 만들기\wac-manual-app\public\labels\cart-annotated.png")

img = Image.open(src).convert("RGBA")
w, h = img.size
overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
draw = ImageDraw.Draw(overlay)

try:
    font_sm = ImageFont.truetype("C:/Windows/Fonts/malgunbd.ttf", 22)
    font_en = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 24)
except Exception:
    font_sm = ImageFont.load_default()
    font_en = font_sm


def ring(cx, cy, rx, ry, color=(220, 30, 30, 235), width=5):
    for i in range(width):
        draw.ellipse(
            [cx - rx - i, cy - ry - i, cx + rx + i, cy + ry + i],
            outline=color,
        )


def badge(n, x, y, fill=(220, 30, 30, 245)):
    r = 18
    draw.ellipse([x, y, x + 2 * r, y + 2 * r], fill=fill)
    text = str(n)
    bb = draw.textbbox((0, 0), text, font=font_en)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    draw.text((x + r - tw / 2, y + r - th / 2 - 1), text, fill="white", font=font_en)


def label_box(text, x, y, bg=(220, 30, 30, 230)):
    pad_x, pad_y = 10, 6
    bb = draw.textbbox((0, 0), text, font=font_sm)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    box = [x, y, x + tw + pad_x * 2, y + th + pad_y * 2]
    draw.rounded_rectangle(box, radius=8, fill=bg)
    draw.text((x + pad_x, y + pad_y - 1), text, fill="white", font=font_sm)


def arrow(points, color=(220, 30, 30, 240), width=6):
    draw.line(points, fill=color, width=width)
    x0, y0 = points[-2]
    x1, y1 = points[-1]
    ang = math.atan2(y1 - y0, x1 - x0)
    size = 16
    left = (x1 - size * math.cos(ang - 0.5), y1 - size * math.sin(ang - 0.5))
    right = (x1 - size * math.cos(ang + 0.5), y1 - size * math.sin(ang + 0.5))
    draw.polygon([points[-1], left, right], fill=color)


# Cart platform is lower in frame; handle left, front right on the bed
# 뒤(손잡이쪽 바닥)
ring(250, 640, 110, 70)
badge(1, 120, 560)
label_box("뒤 · 손잡이", 95, 520)

# 앞(손잡이 반대쪽 바닥) — lower onto the metal bed, not background racks
ring(560, 650, 105, 65, color=(29, 79, 124, 235))
badge(2, 640, 575, fill=(29, 79, 124, 245))
label_box("앞", 630, 535, bg=(29, 79, 124, 235))

# 피킹: 앞부터 쌓기 — arrow along the bed toward the front
arrow([(380, 640), (500, 645)], color=(29, 79, 124, 240), width=7)
label_box("피킹: 앞부터 쌓기", 300, 560, bg=(29, 79, 124, 235))

# 패킹: 뒤부터 내리기 — arrow from back/handle area downward to floor
arrow([(250, 700), (250, 790)], color=(220, 30, 30, 240), width=7)
label_box("패킹: 뒤부터 내리기", 140, 800)

bar_h = 78
draw.rectangle([0, h - bar_h, w, h], fill=(22, 22, 22, 220))
caption = "① 손잡이쪽=뒤  ② 반대쪽=앞   ·  피킹은 앞부터 / 내릴 때는 뒤부터"
bb = draw.textbbox((0, 0), caption, font=font_sm)
tw = bb[2] - bb[0]
draw.text(((w - tw) / 2, h - bar_h + 24), caption, fill="white", font=font_sm)

out_img = Image.alpha_composite(img, overlay).convert("RGB")
out_img.save(out)
print("saved", out, out_img.size)
