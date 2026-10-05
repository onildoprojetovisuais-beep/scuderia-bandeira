#!/usr/bin/env python3
"""
Capa de compartilhamento (Open Graph / Twitter Card) — Sprint 05.

Deriva 1200x630 JPEG do arquivo APROVADO e já publicado do complexo
(assets/Imagens/complexo/imagem-scuderia-complexo.png — slug eco-espaco-scuderia). É só
um recorte 1,905:1 + redimensionamento: sem texto, sem logo, sem edição de conteúdo.
Redes sociais não leem AVIF/WebP de forma confiável, por isso JPEG.

Pendência humana: a foto mostra o mural de pilotos e patrocinadores; o Will/Caio precisa
aprovar este recorte como capa social (GAP VISUAL parcial — não existe capa dedicada).

Uso: python scripts/build-og.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "Imagens" / "complexo" / "imagem-scuderia-complexo.png"
OUT = ROOT / "assets-build" / "img" / "og-scuderia-bandeiras-1200x630.jpg"
CROP = (0, 250, 5000, 2875)  # x0, y0, x1, y1 sobre 5000x3333 -> 5000x2625 (1.905:1)


def main() -> None:
    im = Image.open(SRC).convert("RGB")
    assert im.size == (5000, 3333), im.size
    out = im.crop(CROP).resize((1200, 630), Image.LANCZOS)
    out.save(OUT, format="JPEG", quality=86, optimize=True, progressive=True)
    print(f"{OUT.name}: {out.size}, {OUT.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
