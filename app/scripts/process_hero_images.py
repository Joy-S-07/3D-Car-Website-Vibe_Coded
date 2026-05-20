# -*- coding: utf-8 -*-
"""
Lamborghini Fenomeno Roadster - Image Processing Pipeline
=========================================================
Step 1: Upscale source frames (2x Lanczos to ~4K)
Step 2: Enhance sharpness and clarity
Step 3: Remove background (rembg AI segmentation to transparent PNG)
Step 4: QA - verify alpha channel and output

Processes 3 hero frames:
  - Frame 001: Hero shot (car closed)
  - Frame 150: Doors + hood open
  - Frame 240: Full reveal (engine exposed)
"""

import os
import sys
import io
import time
from pathlib import Path
from collections import Counter

from PIL import Image, ImageFilter, ImageEnhance
from rembg import remove

# -- Configuration --
SOURCE_DIR = Path(r"d:\Projects\3D Car Website - Vibe\images\ezgif-5cedc9cf00ac172b-jpg")
OUTPUT_DIR = Path(r"d:\Projects\3D Car Website - Vibe\fenomeno-app\public\hero-assets")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

HERO_FRAMES = {
    "hero_closed": "ezgif-frame-001.jpg",
    "hero_doors_open": "ezgif-frame-150.jpg",
    "hero_engine_reveal": "ezgif-frame-240.jpg",
}

UPSCALE_FACTOR = 2  # 2x upscale via Lanczos
SHARPEN_PASSES = 1  # Light sharpening to preserve detail without artifacts


def step1_upscale(img, name):
    """Step 1: Upscale using Lanczos resampling for maximum quality."""
    original_size = img.size
    new_size = (img.width * UPSCALE_FACTOR, img.height * UPSCALE_FACTOR)
    upscaled = img.resize(new_size, Image.LANCZOS)
    print(f"  [UPSCALE] {name}: {original_size} -> {upscaled.size}")
    return upscaled


def step2_enhance(img, name):
    """Step 2: Enhance sharpness, contrast, and color vibrancy."""
    # Sharpness boost
    enhancer = ImageEnhance.Sharpness(img)
    img = enhancer.enhance(1.3)  # Moderate sharpening

    # Contrast boost (subtle)
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.08)

    # Color saturation boost (subtle)
    enhancer = ImageEnhance.Color(img)
    img = enhancer.enhance(1.05)

    # One pass of unsharp mask for texture clarity
    for _ in range(SHARPEN_PASSES):
        img = img.filter(ImageFilter.UnsharpMask(radius=2, percent=100, threshold=3))

    print(f"  [ENHANCE] {name}: Sharpness 1.3x | Contrast 1.08x | Saturation 1.05x | UnsharpMask applied")
    return img


def step3_remove_background(img, name):
    """Step 3: Remove background using rembg AI segmentation."""
    print(f"  [REMBG] {name}: Running AI background removal...")
    start = time.time()

    # rembg works on bytes, so we convert
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

    result = Image.open(io.BytesIO(buf_out)).convert("RGBA")
    elapsed = time.time() - start
    print(f"  [REMBG] {name}: Done in {elapsed:.1f}s - Mode: {result.mode}, Size: {result.size}")
    return result


def step4_qa_and_save(img, name, output_path):
    """Step 4: QA - verify alpha channel, check for artifacts, save."""
    assert img.mode == "RGBA", f"Expected RGBA, got {img.mode}"

    # Check alpha channel statistics
    alpha = img.getchannel("A")
    alpha_data = list(alpha.getdata())
    fully_transparent = alpha_data.count(0)
    fully_opaque = alpha_data.count(255)
    semi_transparent = len(alpha_data) - fully_transparent - fully_opaque
    total = len(alpha_data)

    print(f"  [QA] {name}:")
    print(f"       Fully transparent pixels: {fully_transparent:,} ({fully_transparent/total*100:.1f}%)")
    print(f"       Fully opaque pixels:      {fully_opaque:,} ({fully_opaque/total*100:.1f}%)")
    print(f"       Semi-transparent (edge):  {semi_transparent:,} ({semi_transparent/total*100:.1f}%)")
    print(f"       Canvas size: {img.size[0]}x{img.size[1]}")

    # Save as PNG with full alpha
    img.save(output_path, format="PNG", optimize=True)
    file_size_mb = output_path.stat().st_size / (1024 * 1024)
    print(f"  [SAVE] {output_path.name} - {file_size_mb:.1f} MB")

    return True


def process_frame(name, filename):
    """Full pipeline for a single frame."""
    print(f"\n{'='*60}")
    print(f"PROCESSING: {name} ({filename})")
    print(f"{'='*60}")

    source_path = SOURCE_DIR / filename
    if not source_path.exists():
        print(f"  [ERROR] Source file not found: {source_path}")
        return False

    # Load source
    img = Image.open(source_path).convert("RGB")
    print(f"  [LOAD] Source: {img.size[0]}x{img.size[1]}, Mode: {img.mode}")

    # Step 1: Upscale
    img = step1_upscale(img, name)

    # Step 2: Enhance
    img = step2_enhance(img, name)

    # Save enhanced version (with background, for reference)
    enhanced_path = OUTPUT_DIR / f"{name}_enhanced.jpg"
    img.save(enhanced_path, format="JPEG", quality=95)
    print(f"  [SAVE] Enhanced with BG: {enhanced_path.name}")

    # Step 3: Remove background
    img_nobg = step3_remove_background(img, name)

    # Step 4: QA and save final
    output_path = OUTPUT_DIR / f"{name}_transparent.png"
    step4_qa_and_save(img_nobg, name, output_path)

    return True


def main():
    print("=" * 60)
    print("  LAMBORGHINI FENOMENO - IMAGE PROCESSING PIPELINE")
    print("  Upscale > Enhance > Background Removal > QA")
    print("=" * 60)

    results = {}
    for name, filename in HERO_FRAMES.items():
        try:
            success = process_frame(name, filename)
            results[name] = "[OK] SUCCESS" if success else "[FAIL] FAILED"
        except Exception as e:
            print(f"  [ERROR] {name}: {e}")
            import traceback
            traceback.print_exc()
            results[name] = f"[FAIL] ERROR: {e}"

    # Summary
    print(f"\n{'='*60}")
    print("PIPELINE COMPLETE - RESULTS:")
    print(f"{'='*60}")
    for name, status in results.items():
        print(f"  {name}: {status}")

    print(f"\nOutput directory: {OUTPUT_DIR}")
    print(f"Files generated:")
    for f in sorted(OUTPUT_DIR.iterdir()):
        size_mb = f.stat().st_size / (1024 * 1024)
        print(f"  {f.name} - {size_mb:.1f} MB")


if __name__ == "__main__":
    main()
