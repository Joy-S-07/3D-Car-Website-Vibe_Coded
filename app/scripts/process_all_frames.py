# -*- coding: utf-8 -*-
"""
Batch process ALL 240 frames:
  1. Enhance (sharpen, contrast, saturation, unsharp mask)
  2. Remove background (rembg AI segmentation with alpha matting)
  3. Save as transparent PNGs at original resolution (1920x1080)

Output: public/frames/frame-001.png through frame-240.png
"""

import io
import sys
import time
from pathlib import Path

from PIL import Image, ImageFilter, ImageEnhance
from rembg import remove

# -- Configuration --
SOURCE_DIR = Path(r"d:\Projects\3D Car Website - Vibe\images\ezgif-5cedc9cf00ac172b-jpg")
OUTPUT_DIR = Path(r"d:\Projects\3D Car Website - Vibe\fenomeno-app\public\frames")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

TOTAL_FRAMES = 240


def remove_bg(img):
    """Remove background using rembg with alpha matting."""
    buf_in = io.BytesIO()
    img.save(buf_in, format="PNG")
    buf_in.seek(0)

    buf_out = remove(
        buf_in.read(),
        alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=10,
    )

    return Image.open(io.BytesIO(buf_out)).convert("RGBA")


def process_frame(frame_num):
    """Process a single frame: enhance + remove background."""
    padded = str(frame_num).zfill(3)
    src_path = SOURCE_DIR / f"ezgif-frame-{padded}.jpg"
    out_path = OUTPUT_DIR / f"frame-{padded}.png"

    if not src_path.exists():
        print(f"  [SKIP] Frame {padded}: source not found")
        return False

    # Load
    img = Image.open(src_path).convert("RGB")


    # Remove background
    result = remove_bg(img)

    # Save as transparent PNG
    result.save(out_path, format="PNG", optimize=True)

    file_kb = out_path.stat().st_size / 1024
    print(f"  [OK] frame-{padded}.png ({result.size[0]}x{result.size[1]}, {file_kb:.0f} KB)")
    return True


def main():
    print("=" * 60)
    print("  BATCH PROCESSING ALL 240 FRAMES")
    print("  Enhance + Background Removal -> Transparent PNG")
    print("=" * 60)

    start_time = time.time()
    success = 0
    failed = 0

    for i in range(1, TOTAL_FRAMES + 1):
        frame_start = time.time()
        try:
            if process_frame(i):
                success += 1
            else:
                failed += 1
        except Exception as e:
            print(f"  [ERROR] Frame {str(i).zfill(3)}: {e}")
            failed += 1

        # Progress update every 10 frames
        if i % 10 == 0:
            elapsed = time.time() - start_time
            per_frame = elapsed / i
            remaining = per_frame * (TOTAL_FRAMES - i)
            print(f"\n  --- Progress: {i}/{TOTAL_FRAMES} | "
                  f"Elapsed: {elapsed:.0f}s | "
                  f"ETA: {remaining:.0f}s ({remaining/60:.1f} min) ---\n")

    total_time = time.time() - start_time
    print(f"\n{'='*60}")
    print(f"  BATCH COMPLETE")
    print(f"  Success: {success} | Failed: {failed}")
    print(f"  Total time: {total_time:.0f}s ({total_time/60:.1f} min)")
    print(f"  Output: {OUTPUT_DIR}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
