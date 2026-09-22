#!/usr/bin/env python3
"""
Ícone da marca — gera o símbolo isolado em tamanhos fixos, a partir do
"r" vermelho (Brand/1124_Bandeiras_RGB_S-R.png), pensado para uso pequeno.
Corta no bounding box do glifo, centraliza num canvas quadrado transparente
com respiro e exporta nos tamanhos padrão.

Usado como favicon/apple-touch-icon (16/32/48/180) e como marca inline em
pontos do layout (ex.: eyebrow do hero), reaproveitando o mesmo recorte.

Uso:
    python scripts/build-favicon.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "Brand" / "1124_Bandeiras_RGB_S-R.png"
OUT_DIR = ROOT / "assets-build" / "favicon"
SIZES = (16, 32, 48, 64, 180, 512)
PADDING_RATIO = 0.22  # respiro ao redor do glifo dentro do canvas quadrado


def main() -> None:
    src = Image.open(SOURCE)
    bbox = src.getbbox()
    if not bbox:
        raise SystemExit(f"Sem pixels visíveis em {SOURCE}")

    glyph = src.crop(bbox)
    w, h = glyph.size
    side = max(w, h)
    pad = int(side * PADDING_RATIO)
    canvas_side = side + pad * 2

    canvas = Image.new("RGBA", (canvas_side, canvas_side), (0, 0, 0, 0))
    canvas.paste(glyph, ((canvas_side - w) // 2, (canvas_side - h) // 2), glyph)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for size in SIZES:
        resized = canvas.resize((size, size), Image.LANCZOS)
        resized.save(OUT_DIR / f"favicon-{size}.png")

    print(f"{len(SIZES)} favicons gerados -> {OUT_DIR}")


if __name__ == "__main__":
    main()
