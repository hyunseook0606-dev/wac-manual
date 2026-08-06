# -*- coding: utf-8 -*-
"""창고 도면 PNG — 웹 MapChapter와 동일 배치 (B7=벽 높이)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parents[1] / "public" / "labels"
OUT.mkdir(parents=True, exist_ok=True)

FONT = "C:/Windows/Fonts/malgun.ttf"
FONT_B = "C:/Windows/Fonts/malgunbd.ttf"


def font(size, bold=False):
    try:
        return ImageFont.truetype(FONT_B if bold else FONT, size)
    except Exception:
        return ImageFont.load_default()


def rounded(d, box, fill, outline=None, width=2, radius=12):
    d.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def rack_card(d, x0, y0, x1, y1, text, fill, accent, title_font):
    rounded(d, [x0, y0, x1, y1], fill=fill, outline=(210, 210, 205), width=1, radius=10)
    d.rectangle([x0, y0, x0 + 8, y1], fill=accent)
    bb = d.textbbox((0, 0), text, font=title_font)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    d.text(((x0 + x1 - tw) / 2 + 3, (y0 + y1 - th) / 2 - 1), text, fill=(28, 28, 28), font=title_font)


def build_map():
    """
    웹 도면과 동일:
      위: R|미사용 / A8 / 벽(=B7 높이)
      A: A7, (A6/A5), (A4/A3), (A2/A1)
      B: (B6/B5), (B4/B3), (B2/B1), 반칸 여백
    """
    W, H = 1100, 1520
    bg = (250, 248, 244)
    img = Image.new("RGB", (W, H), bg)
    d = ImageDraw.Draw(img)

    f_title = font(34, True)
    f_sub = font(18)
    f_rack = font(22, True)
    f_sm = font(15)
    f_aisle = font(16, True)

    d.text((48, 32), "창고 도면", fill=(22, 22, 22), font=f_title)
    d.text((48, 76), "패킹하는 곳(아래) → 안쪽 · 왼쪽 A / 오른쪽 B · B는 반 칸 위", fill=(95, 95, 95), font=f_sub)

    legends = [
        ((31, 92, 69), (232, 243, 238), "A"),
        ((29, 79, 124), (232, 240, 247), "B (반 칸 위)"),
        ((138, 75, 22), (246, 238, 228), "R"),
        ((70, 70, 70), (220, 220, 215), "벽"),
    ]
    lx, ly = 48, 110
    for accent, fill, name in legends:
        rounded(d, [lx, ly, lx + 18, ly + 18], fill=fill, outline=accent, width=2, radius=5)
        d.rectangle([lx, ly, lx + 6, ly + 18], fill=accent)
        d.text((lx + 26, ly - 1), name, fill=(55, 55, 55), font=f_sm)
        lx += 170

    LA, RA = 56, 430
    LB, RB = 670, 1044
    AX0, AX1 = 460, 640

    A, Af = (31, 92, 69), (232, 243, 238)
    B, Bf = (29, 79, 124), (232, 240, 247)
    R, Rf = (138, 75, 22), (246, 238, 228)

    row_h = 52
    pair_gap = 4
    block_gap = 10

    y = 150
    # --- zone top: cold / A8 / wall+B7 ---
    mid = LA + (RA - LA) // 2
    # cold row — B side empty
    rack_card(d, LA, y, mid - 5, y + 48, "R 사용", Rf, R, f_rack)
    rack_card(d, mid + 5, y, RA, y + 48, "냉장 미사용", (236, 236, 232), (130, 130, 130), font(16, True))
    rounded(d, [LB, y, RB, y + 48], fill=(242, 240, 235), outline=(220, 220, 215), width=1, radius=10)
    y += 48 + block_gap

    # A8 — B empty
    rack_card(d, LA, y, RA, y + 48, "A8", Af, A, f_rack)
    rounded(d, [LB, y, RB, y + 48], fill=(242, 240, 235), outline=(220, 220, 215), width=1, radius=10)
    y += 48 + block_gap

    # wall + B7 (same height)  ← 핵심
    rounded(d, [LA, y, RA, y + 48], fill=(55, 55, 55), outline=(30, 30, 30), width=1, radius=8)
    for i in range(0, RA - LA - 20, 14):
        d.line([LA + 10 + i, y + 8, LA + 2 + i, y + 40], fill=(120, 120, 120), width=2)
    bb = d.textbbox((0, 0), "벽 (A7 뒤)", font=font(16, True))
    tw = bb[2] - bb[0]
    d.text(((LA + RA - tw) / 2, y + 14), "벽 (A7 뒤)", fill=(245, 245, 245), font=font(16, True))
    rack_card(d, LB, y, RB, y + 48, "B7", Bf, B, f_rack)
    y += 48 + block_gap + 4

    aisle_top = y

    def pair_block(x0, x1, top, bottom, fill, accent):
        nonlocal y
        h = row_h
        rack_card(d, x0, y, x1, y + h, f"{top} (위)", fill, accent, f_rack)
        rack_card(d, x0, y + h + pair_gap, x1, y + 2 * h + pair_gap, f"{bottom} (아래)", fill, accent, f_rack)
        return 2 * h + pair_gap

    # A7 alone | start of B pairs (B6/B5)
    rack_card(d, LA, y, RA, y + row_h, "A7", Af, A, f_rack)
    # B pair starts slightly higher conceptually — draw B6/B5 aligned from A7 top
    bh = pair_block(LB, RB, "B6", "B5", Bf, B)
    # A7 only one row; pad remaining B height on A? keep A7 single then continue
    y_a = y + row_h + block_gap
    y_b = y + bh + block_gap
    y = max(y_a, y_b)

    # Remaining pairs — A pairs and B pairs side by side
    # After A7 and B6/B5: A6/A5 with B4/B3, A4/A3 with B2/B1, A2/A1 with half
    blocks = [
        (("A6", "A5"), ("B4", "B3")),
        (("A4", "A3"), ("B2", "B1")),
        (("A2", "A1"), None),
    ]

    for a_pair, b_pair in blocks:
        y0 = y
        ah = pair_block(LA, RA, a_pair[0], a_pair[1], Af, A)
        y = y0  # reset for B column
        if b_pair:
            bh = pair_block(LB, RB, b_pair[0], b_pair[1], Bf, B)
        else:
            # half empty under B1
            rounded(d, [LB, y, RB, y + ah], fill=(242, 240, 235), outline=(220, 220, 215), width=1, radius=10)
            bb = d.textbbox((0, 0), "B는 반 칸 위 시작", font=f_sm)
            tw = bb[2] - bb[0]
            d.text(((LB + RB - tw) / 2, y + ah / 2 - 8), "B는 반 칸 위 시작", fill=(140, 140, 140), font=f_sm)
            bh = ah
        y = y0 + max(ah, bh) + block_gap

    aisle_bot = y - block_gap

    # Fix A7 row: we drew A7 then jumped — redraw issue with y tracking.
    # Actually looking at the code flow again - first A7 + B6/B5, then loops.
    # But pair_block for A7 section used nonlocal y incorrectly for A7 alone.
    # Let me rewrite more carefully in a cleaner version below.

    # center aisle
    rounded(d, [AX0, aisle_top, AX1, aisle_bot], fill=(236, 234, 228), outline=(200, 200, 195), width=1, radius=14)
    cx = (AX0 + AX1) / 2
    d.polygon([(cx, aisle_top + 28), (cx - 14, aisle_top + 50), (cx + 14, aisle_top + 50)], fill=(120, 120, 115))
    chars = list("중앙통로")
    start = (aisle_top + aisle_bot - len(chars) * 26) / 2
    for i, ch in enumerate(chars):
        bb = d.textbbox((0, 0), ch, font=f_aisle)
        tw = bb[2] - bb[0]
        d.text((cx - tw / 2, start + i * 26), ch, fill=(90, 90, 90), font=f_aisle)

    # packing
    rounded(d, [LA, y, RB, y + 88], fill=(255, 244, 214), outline=(40, 40, 40), width=3, radius=14)
    bb = d.textbbox((0, 0), "패킹하는 곳", font=font(28, True))
    tw = bb[2] - bb[0]
    d.text(((LA + RB - tw) / 2, y + 18), "패킹하는 곳", fill=(28, 28, 28), font=font(28, True))
    bb2 = d.textbbox((0, 0), "손수레 물품을 바닥에 내려놓고 패킹", font=f_sub)
    tw2 = bb2[2] - bb2[0]
    d.text(((LA + RB - tw2) / 2, y + 54), "손수레 물품을 바닥에 내려놓고 패킹", fill=(80, 80, 80), font=f_sub)

    y += 100
    notes = [
        "한 렉 = 아래 작은번호 / 위 큰번호 (예: A1 아래 · A2 위)",
        "B7은 A7 뒤 벽과 같은 높이 · B는 A보다 반 칸 위",
        "위치코드 예: A 1/4-1 → A구역 · 1번면 · 칸4 · 단1",
    ]
    for line in notes:
        d.ellipse([52, y + 5, 62, y + 15], fill=A)
        d.text((72, y), line, fill=(55, 55, 55), font=f_sm)
        y += 28

    path = OUT / "warehouse-map.png"
    img.save(path, optimize=True)
    print("saved", path)
    return path


def build_map_v2():
    """Cleaner redraw matching MapChapter exactly."""
    W, H = 1100, 1480
    img = Image.new("RGB", (W, H), (250, 248, 244))
    d = ImageDraw.Draw(img)
    f_title = font(34, True)
    f_sub = font(17)
    f_rack = font(21, True)
    f_sm = font(15)
    f_aisle = font(16, True)

    d.text((48, 28), "창고 도면", fill=(22, 22, 22), font=f_title)
    d.text((48, 72), "아래=패킹하는 곳 · 왼쪽 A · 오른쪽 B · B7은 벽 높이", fill=(95, 95, 95), font=f_sub)

    legends = [
        ((31, 92, 69), (232, 243, 238), "A"),
        ((29, 79, 124), (232, 240, 247), "B"),
        ((138, 75, 22), (246, 238, 228), "R"),
        ((70, 70, 70), (55, 55, 55), "벽"),
    ]
    lx = 48
    for accent, fill, name in legends:
        rounded(d, [lx, 108, lx + 16, 124], fill=fill, outline=accent, width=2, radius=4)
        d.text((lx + 22, 106), name, fill=(55, 55, 55), font=f_sm)
        lx += 90

    LA, RA = 56, 430
    LB, RB = 670, 1044
    AX0, AX1 = 455, 645
    A, Af = (31, 92, 69), (232, 243, 238)
    B, Bf = (29, 79, 124), (232, 240, 247)
    R, Rf = (138, 75, 22), (246, 238, 228)

    def card(x0, y0, x1, y1, text, fill, accent, fnt=None):
        rack_card(d, x0, y0, x1, y1, text, fill, accent, fnt or f_rack)

    def empty(x0, y0, x1, y1):
        rounded(d, [x0, y0, x1, y1], fill=(242, 240, 235), outline=(220, 220, 215), width=1, radius=10)

    h = 50
    g = 8
    y = 140

    # cold
    mid = (LA + RA) // 2
    card(LA, y, mid - 4, y + h, "R 사용", Rf, R)
    card(mid + 4, y, RA, y + h, "냉장 미사용", (236, 236, 232), (130, 130, 130), font(15, True))
    empty(LB, y, RB, y + h)
    y += h + g

    # A8
    card(LA, y, RA, y + h, "A8", Af, A)
    empty(LB, y, RB, y + h)
    y += h + g

    # wall + B7
    rounded(d, [LA, y, RA, y + h], fill=(55, 55, 55), outline=(30, 30, 30), width=1, radius=8)
    for i in range(0, RA - LA - 16, 12):
        d.line([LA + 8 + i, y + 8, LA + i, y + h - 8], fill=(120, 120, 120), width=2)
    bb = d.textbbox((0, 0), "벽", font=font(18, True))
    tw = bb[2] - bb[0]
    d.text(((LA + RA - tw) / 2, y + 14), "벽", fill=(245, 245, 245), font=font(18, True))
    card(LB, y, RB, y + h, "B7", Bf, B)
    y += h + g + 6

    aisle_top = y

    # A7 | B6
    # then continue with pairs visually as two stacked rows
    # Row structure matching web yard:
    # A7          | B6
    #             | B5
    # A6          | B4
    # A5          | B3
    # A4          | B2
    # A3          | B1
    # A2          | (empty half)
    # A1          |

    # Simpler row list aligned to MapChapter:
    # After wall/B7:
    rows = [
        ("A7", "B6"),
        (None, "B5"),  # B5 is bottom of pair with B6 — actually in web Pair stacks them
    ]
    # Better: draw pairs as units

    # A column sequence of faces top→bottom: A7, A6, A5, A4, A3, A2, A1
    # B column: B6, B5, B4, B3, B2, B1, empty
    # But pair visual groups them. For clarity use sequential faces matching height:

    a_faces = ["A7", "A6", "A5", "A4", "A3", "A2", "A1"]
    b_faces = ["B6", "B5", "B4", "B3", "B2", "B1", None]

    for a, b in zip(a_faces, b_faces):
        if a:
            card(LA, y, RA, y + h, a, Af, A)
        else:
            empty(LA, y, RA, y + h)
        if b:
            card(LB, y, RB, y + h, b, Bf, B)
        else:
            empty(LB, y, RB, y + h)
            t = d.textbbox((0, 0), "(반 칸)", font=f_sm)
            tw = t[2] - t[0]
            d.text(((LB + RB - tw) / 2, y + 16), "(반 칸)", fill=(150, 150, 150), font=f_sm)
        y += h + g

    aisle_bot = y - g

    rounded(d, [AX0, aisle_top, AX1, aisle_bot], fill=(236, 234, 228), outline=(200, 200, 195), width=1, radius=14)
    cx = (AX0 + AX1) / 2
    d.polygon([(cx, aisle_top + 24), (cx - 12, aisle_top + 44), (cx + 12, aisle_top + 44)], fill=(120, 120, 115))
    for i, ch in enumerate("중앙통로"):
        bb = d.textbbox((0, 0), ch, font=f_aisle)
        tw = bb[2] - bb[0]
        d.text((cx - tw / 2, aisle_top + 80 + i * 26), ch, fill=(90, 90, 90), font=f_aisle)

    y += 4
    rounded(d, [LA, y, RB, y + 84], fill=(255, 244, 214), outline=(40, 40, 40), width=3, radius=14)
    bb = d.textbbox((0, 0), "패킹하는 곳", font=font(28, True))
    tw = bb[2] - bb[0]
    d.text(((LA + RB - tw) / 2, y + 16), "패킹하는 곳", fill=(28, 28, 28), font=font(28, True))
    bb2 = d.textbbox((0, 0), "손수레 물품을 바닥에 내려놓고 패킹", font=f_sub)
    tw2 = bb2[2] - bb2[0]
    d.text(((LA + RB - tw2) / 2, y + 52), "손수레 물품을 바닥에 내려놓고 패킹", fill=(80, 80, 80), font=f_sub)

    y += 96
    for line in [
        "한 렉 = 아래 작은번호 / 위 큰번호 (A1·A2, B1·B2 …)",
        "B7 = A7 뒤 벽과 같은 줄 · B는 A보다 반 칸 위",
        "위치코드 예: A 1/4-1 → A구역 · 1번면 · 칸4 · 단1",
    ]:
        d.ellipse([52, y + 5, 62, y + 15], fill=A)
        d.text((72, y), line, fill=(55, 55, 55), font=f_sm)
        y += 28

    path = OUT / "warehouse-map.png"
    img.save(path, optimize=True)
    print("saved", path)
    return path


if __name__ == "__main__":
    build_map_v2()
