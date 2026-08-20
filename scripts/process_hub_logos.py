"""Process hub logos: remove backgrounds and normalize for card layout."""
from collections import deque
from pathlib import Path

from PIL import Image

PUBLIC = Path(__file__).resolve().parents[1] / "public"


def flood_transparent(im: Image.Image, match, limit: int = 48) -> Image.Image:
    rgba = im.convert("RGBA")
    px = rgba.load()
    w, h = rgba.size
    seen = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    def push(x: int, y: int) -> None:
        if 0 <= x < w and 0 <= y < h and not seen[y][x]:
            seen[y][x] = True
            q.append((x, y))

    for x in range(w):
        push(x, 0)
        push(x, h - 1)
    for y in range(h):
        push(0, y)
        push(w - 1, y)

    while q:
        x, y = q.popleft()
        r, g, b, a = px[x, y]
        if match(r, g, b, a, limit):
            px[x, y] = (r, g, b, 0)
            for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                if 0 <= nx < w and 0 <= ny < h and not seen[ny][nx]:
                    seen[ny][nx] = True
                    q.append((nx, ny))

    return rgba


def match_light(r: int, g: int, b: int, a: int, limit: int) -> bool:
    if a < 20:
        return True
    if r > 235 and g > 235 and b > 230:
        return True
    if r > 170 and g > 145 and b > 125 and abs(r - g) < 40:
        return True
    return max(abs(r - g), abs(g - b), abs(r - b)) < limit and min(r, g, b) > 120


def match_dark(r: int, g: int, b: int, a: int, limit: int) -> bool:
    if a < 20:
        return True
    return max(r, g, b) < 55


def crop_alpha(im: Image.Image, pad: int = 6) -> Image.Image:
    bbox = im.getbbox()
    if not bbox:
        return im
    x0, y0, x1, y1 = bbox
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(im.width, x1 + pad)
    y1 = min(im.height, y1 + pad)
    return im.crop((x0, y0, x1, y1))


def purge_non_foreground(im: Image.Image, is_fg) -> Image.Image:
    rgba = im.convert("RGBA")
    px = rgba.load()
    w, h = rgba.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a > 0 and not is_fg(r, g, b, a):
                px[x, y] = (r, g, b, 0)
    return rgba


def is_wac_fg(r: int, g: int, b: int, a: int) -> bool:
    if a < 40:
        return False
    if r > 145 and g < 165 and b < 130:
        return True
    if r < 115 and g < 115 and b > 45:
        return True
    return False


def is_express_fg(r: int, g: int, b: int, a: int) -> bool:
    if a < 40:
        return False
    if max(r, g, b) < 25:
        return False
    if r > 145 and g < 165 and b < 130:
        return True
    if 55 < min(r, g, b) < 165 and max(r, g, b) - min(r, g, b) < 35:
        return True
    return False


def process_wac_logo() -> None:
    src = PUBLIC / "wac-logo.png"
    im = Image.open(src)
    out = crop_alpha(purge_non_foreground(flood_transparent(im, match_light), is_wac_fg))
    out.save(PUBLIC / "wac-logo.png", optimize=True)
    print("wac-logo", out.size)


def process_wmart_logo() -> None:
    src = PUBLIC / "wmart-logo.png"
    im = Image.open(src)
    out = crop_alpha(flood_transparent(im, match_light))
    out.save(PUBLIC / "wmart-logo.png", optimize=True)
    bbox = out.getbbox()
    if bbox:
        x0, y0, x1, y1 = bbox
        card_h = int((y1 - y0) * 0.68)
        card = out.crop((x0, y0, x1, y0 + card_h))
        card.save(PUBLIC / "wmart-card-logo.png", optimize=True)
        print("wmart-card-logo", card.size)
    print("wmart-logo", out.size)


def process_express_logo() -> None:
    src = PUBLIC / "w-express-logo.png"
    im = Image.open(src)
    out = crop_alpha(purge_non_foreground(flood_transparent(im, match_dark), is_express_fg))
    out.save(PUBLIC / "w-express-logo.png", optimize=True)
    print("w-express-logo", out.size)


if __name__ == "__main__":
    process_wac_logo()
    process_express_logo()
    process_wmart_logo()
