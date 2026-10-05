#!/usr/bin/env python3
"""
Retratos de pilotos (busto) — Sprint 06.

Entrada : PNGs recortados (corpo inteiro, fundo transparente) enviados pelo time em
          assets/Imagens/pilotos-premium/.
Saída   : JPEG 1200x1560 (3:3.9, igual ao card) do BUSTO PARA CIMA com fundo de estúdio
          desenhado por código (gradientes/luz/grão — sem IA, sem retocar rosto ou roupa),
          em assets/Imagens/pilotos-premium/busto/<slug>.jpg — fonte dos slugs piloto-* no
          build-media.py.

Enquadramento: medido pela cabeça de cada piloto (topo e queixo, em px do PNG original),
para os quatro terem a mesma escala de rosto/ombros mesmo com PNGs de tamanhos diferentes.

Uso: python scripts/build-pilotos.py
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter, ImageChops

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "Imagens" / "pilotos-premium"
OUT = SRC / "busto"
W, H = 1200, 1560  # 3:3.9

# (arquivo, topo da cabeça, queixo, centro x da cabeça) em px do PNG original.
PILOTOS = {
    "atila":     ("Átila Abreu.png",          2, 861, 1533),
    "christian": ("Christian fittipaldi.png", 34, 466,  573),
    "ingo":      ("Ingo Hoffmann.png",        21, 448,  600),
    "nelson":    ("Nelson Piquet Jr.png",     17, 557, 1184),
}
HEAD_TO_FRAME = 3.05   # altura do quadro / altura da cabeça
HEADROOM = 0.28        # respiro acima da cabeça (× altura da cabeça)
FACE_X = 0.50          # cabeça centrada


def backdrop(seed: int, accent=(255, 71, 71)) -> Image.Image:
    """Fundo de estúdio escuro: luz suave atrás da cabeça, vinheta, toque vermelho da marca, grão."""
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    # base grafite
    base = np.zeros((H, W, 3), np.float32) + np.array([18, 18, 19], np.float32)
    # luz principal (atrás da cabeça, ~30% da altura)
    d = np.sqrt(((xx - W * 0.5) / (W * 0.62)) ** 2 + ((yy - H * 0.30) / (H * 0.52)) ** 2)
    glow = np.clip(1 - d, 0, 1) ** 1.8
    base += glow[..., None] * np.array([46, 46, 50], np.float32)
    # rim vermelho discreto no canto inferior (assinatura da marca), posição varia por piloto
    cx = W * (0.16 if seed % 2 == 0 else 0.84)
    d2 = np.sqrt(((xx - cx) / (W * 0.55)) ** 2 + ((yy - H * 0.92) / (H * 0.40)) ** 2)
    rim = np.clip(1 - d2, 0, 1) ** 2.2
    base += rim[..., None] * (np.array(accent, np.float32) * 0.22)
    # vinheta
    dv = np.sqrt(((xx - W / 2) / (W * 0.75)) ** 2 + ((yy - H * 0.45) / (H * 0.80)) ** 2)
    base *= (1 - np.clip(dv - 0.55, 0, 1) ** 1.4 * 0.55)[..., None]
    # grão fino (evita banding)
    rng = np.random.default_rng(seed)
    base += rng.normal(0, 1.6, (H, W, 1)).astype(np.float32)
    return Image.fromarray(np.clip(base, 0, 255).astype(np.uint8), "RGB")


def compose(slug: str, idx: int) -> Image.Image:
    fname, top, chin, cx = PILOTOS[slug]
    im = Image.open(SRC / fname).convert("RGBA")
    head = chin - top
    fh = head * HEAD_TO_FRAME
    fw = fh * W / H
    x0 = cx - fw * FACE_X
    y0 = top - head * HEADROOM
    box = (x0, y0, x0 + fw, y0 + fh)
    # recorta com coordenadas possivelmente fora da imagem (transparente preenche)
    crop = im.transform((W, H), Image.Transform.EXTENT, box, resample=Image.Resampling.BICUBIC)
    # halo branco do recorte: erode 1px o alfa
    a = crop.getchannel("A").filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.6))
    crop.putalpha(a)
    bg = backdrop(idx).convert("RGBA")
    # sombra de contato suave sob o recorte (separa do fundo)
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    shadow.putalpha(a.filter(ImageFilter.GaussianBlur(28)).point(lambda v: int(v * 0.35)))
    bg = Image.alpha_composite(bg, shadow)
    bg = Image.alpha_composite(bg, crop)
    return bg.convert("RGB")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for i, slug in enumerate(PILOTOS):
        img = compose(slug, i)
        dest = OUT / f"{slug}.jpg"
        img.save(dest, quality=90, optimize=True, progressive=True)
        print(f"{dest.name}: {img.size}, {dest.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
