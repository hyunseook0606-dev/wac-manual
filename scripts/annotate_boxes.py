# -*- coding: utf-8 -*-
"""박스 두면/한면 사진에 빨간 원 표시."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

LABELS = Path(__file__).resolve().parents[1] / "public" / "labels"


def load_font(size: int) -> ImageFont.ImageFont:
    for p in [
        r"C:/Windows/Fonts/malgunbd.ttf",
        r"C:/Windows/Fonts/malgun.ttf",
    ]:
        try:
            return ImageFont.truetype(p, size)
        except OSError:
            pass
    return ImageFont.load_default()


def annotate(
    src: Path,
    dst: Path,
    title: str,
    sub: str,
    cx: int,
    cy: int,
    rx: int,
    ry: int,
) -> None:
    img = Image.open(src).convert("RGBA")
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.rectangle([0, 0, img.width, 78], fill=(32, 32, 32, 210))
    d.text((16, 12), title, fill=(255, 255, 255, 255), font=load_font(26))
    d.text((16, 44), sub, fill=(230, 230, 230, 255), font=load_font(18))
    for i in range(7):
        d.ellipse(
            [cx - rx - i, cy - ry - i, cx + rx + i, cy + ry + i],
            outline=(220, 30, 30, 245),
        )
    Image.alpha_composite(img, overlay).convert("RGB").save(dst, quality=95)
    print("saved", dst.name, "circle", cx, cy)


def main() -> None:
    # 무거운: 열린 박스 좌측 세로 단면(물결 두 줄) 아래쪽
    annotate(
        LABELS / "box-heavy-raw.png",
        LABELS / "box-double-wall.png",
        "무거운 박스 → 두면(두 줄)",
        "단면이 물결 두 줄인 박스 사용",
        cx=330,
        cy=520,
        rx=48,
        ry=62,
    )
    # 가벼운: 앞면 뚜껑 단면 한가운데(물결 한 줄이 제일 잘 보임)
    annotate(
        LABELS / "box-light-raw.png",
        LABELS / "box-single-wall.png",
        "가벼운 박스 → 한면(한 줄)",
        "단면이 물결 한 줄인 박스 사용",
        cx=450,
        cy=348,
        rx=120,
        ry=55,
    )


if __name__ == "__main__":
    main()
