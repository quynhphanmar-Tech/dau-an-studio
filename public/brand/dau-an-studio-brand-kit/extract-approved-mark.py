from __future__ import annotations

import base64
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parent
BOARD = ROOT / "imprint-cocoon-moodboard.png"


def extract_mark() -> Image.Image:
    board = Image.open(BOARD).convert("RGB")
    # Exact approved artwork from the large lockup on the master board.
    crop = board.crop((72, 70, 340, 332))
    gray = crop.convert("L")

    # Convert the off-white paper background to transparency while retaining
    # the approved antialiased ridge geometry.
    alpha = ImageChops.invert(gray)
    alpha = alpha.point(lambda p: 0 if p < 14 else min(255, int((p - 14) * 1.34)))
    bbox = alpha.getbbox()
    if bbox is None:
        raise RuntimeError("Approved mark could not be isolated")
    alpha = alpha.crop(bbox)

    pad = 24
    mark = Image.new("RGBA", (alpha.width + pad * 2, alpha.height + pad * 2), (0, 0, 0, 0))
    ink = Image.new("RGBA", alpha.size, (17, 17, 17, 255))
    ink.putalpha(alpha)
    mark.alpha_composite(ink, (pad, pad))

    canvas = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
    scale = min(880 / mark.width, 880 / mark.height)
    fitted = mark.resize((round(mark.width * scale), round(mark.height * scale)), Image.Resampling.LANCZOS)
    canvas.alpha_composite(fitted, ((1024 - fitted.width) // 2, (1024 - fitted.height) // 2))
    return canvas


def write_svg_mask(png: Image.Image, path: Path, title: str) -> None:
    buff = BytesIO()
    png.save(buff, "PNG", optimize=True)
    encoded = base64.b64encode(buff.getvalue()).decode("ascii")
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" role="img" aria-label="{title}">
  <mask id="approved-mark" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024">
    <image href="data:image/png;base64,{encoded}" width="1024" height="1024"/>
  </mask>
  <rect width="1024" height="1024" fill="currentColor" mask="url(#approved-mark)"/>
</svg>
'''
    path.write_text(svg, encoding="utf-8")


def write_app_icons(mark: Image.Image) -> None:
    alpha = mark.getchannel("A")
    white = Image.new("RGBA", mark.size, (247, 247, 245, 255))
    white.putalpha(alpha)

    icon = Image.new("RGBA", (1024, 1024), (49, 92, 255, 255))
    mask = Image.new("L", icon.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, 1023, 1023), radius=225, fill=255)
    icon.putalpha(mask)

    scaled = white.resize((780, 780), Image.Resampling.LANCZOS)
    icon.alpha_composite(scaled, (122, 122))
    icon.save(ROOT / "app-icon-1024.png", optimize=True)
    for size in (512, 192, 180, 64, 32):
        icon.resize((size, size), Image.Resampling.LANCZOS).save(ROOT / f"app-icon-{size}.png", optimize=True)

    buff = BytesIO()
    icon.save(buff, "PNG", optimize=True)
    encoded = base64.b64encode(buff.getvalue()).decode("ascii")
    (ROOT / "app-icon.svg").write_text(
        f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" role="img" aria-label="Dấu Ấn Studio app icon">
  <image href="data:image/png;base64,{encoded}" width="1024" height="1024"/>
</svg>
''',
        encoding="utf-8",
    )


def extract_lockup() -> Image.Image:
    board = Image.open(BOARD).convert("RGB")
    crop = board.crop((65, 65, 735, 325))
    gray = crop.convert("L")
    alpha = gray.point(lambda g: 0 if g > 225 else min(255, (225 - g) * 5))
    bbox = alpha.getbbox()
    if bbox is None:
        raise RuntimeError("Approved lockup could not be isolated")
    alpha = alpha.crop(bbox)
    crop = Image.new("RGBA", alpha.size, (17, 17, 17, 255))
    crop.putalpha(alpha)
    scale = 1600 / crop.width
    return crop.resize((1600, round(crop.height * scale)), Image.Resampling.LANCZOS)


def write_embedded_svg(png: Image.Image, path: Path, title: str) -> None:
    buff = BytesIO()
    png.save(buff, "PNG", optimize=True)
    encoded = base64.b64encode(buff.getvalue()).decode("ascii")
    path.write_text(
        f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {png.width} {png.height}" role="img" aria-label="{title}">
  <image href="data:image/png;base64,{encoded}" width="{png.width}" height="{png.height}"/>
</svg>
''',
        encoding="utf-8",
    )


def main() -> None:
    mark = extract_mark()
    mark.save(ROOT / "logo-mark-approved-1024.png", optimize=True)
    mark.resize((512, 512), Image.Resampling.LANCZOS).save(ROOT / "logo-mark-primary-preview.png", optimize=True)
    write_svg_mask(mark, ROOT / "logo-mark-primary.svg", "Dấu Ấn Studio approved fingerprint cocoon mark")
    write_svg_mask(mark, ROOT / "logo-mark-compact.svg", "Dấu Ấn Studio approved compact mark")
    write_app_icons(mark)
    lockup = extract_lockup()
    lockup.save(ROOT / "logo-lockup-approved.png", optimize=True)
    write_embedded_svg(lockup, ROOT / "logo-lockup-horizontal.svg", "Dấu Ấn Studio approved horizontal lockup")
    board = Image.open(BOARD).convert("RGB")
    write_embedded_svg(board, ROOT / "logo-system-board.svg", "Dấu Ấn Studio approved brand system board")


if __name__ == "__main__":
    main()
