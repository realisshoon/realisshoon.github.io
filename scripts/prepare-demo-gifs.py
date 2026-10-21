"""Rebuild recorded demo GIFs from downloaded originals using FFmpeg.

python3 scripts/prepare-demo-gifs.py --source-dir /path/to/originals --ffmpeg ffmpeg
Original files are intentionally kept outside the website repository.
"""
import argparse
import json
from pathlib import Path
import subprocess

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--source-dir', type=Path, required=True)
parser.add_argument('--ffmpeg', default='ffmpeg')
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
recipe_path = root / 'src/content/demo-sources.json'
recipes = json.loads(recipe_path.read_text())
projects_path = root / 'src/content/projects.json'
projects = json.loads(projects_path.read_text())
output = root / 'public/assets/demos'
output.mkdir(parents=True, exist_ok=True)
for clip in recipes:
    source = args.source_dir / clip['source']
    if not source.is_file():
        raise SystemExit(f'Missing original {source}; source URL: {clip["sourceUrl"]}')
    slug = clip['slug']
    gif, poster = output / f'{slug}.gif', output / f'{slug}.jpg'
    crop = ''
    scale = f'{crop}scale={clip["width"]}:-2:flags=lanczos'
    # Keep original time: only sampling, scaling, palette reduction, and loop encoding.
    graph = f'fps={clip["fps"]},{scale},split[a][b];[a]palettegen=max_colors=96:stats_mode=diff[p];[b][p]paletteuse=dither=none:diff_mode=rectangle'
    common = [args.ffmpeg, '-y', '-v', 'error', '-ss', str(clip['start']), '-i', str(source)]
    subprocess.run(common + ['-t', str(clip['duration']), '-filter_complex', graph, '-loop', '0', str(gif)], check=True)
    subprocess.run(common + ['-frames:v', '1', '-vf', scale, '-q:v', '3', str(poster)], check=True)
    clip['bytes'], clip['posterBytes'] = gif.stat().st_size, poster.stat().st_size
    for project in projects:
        for demo in project['demos']:
            if demo['src'] == f'demos/{slug}.gif':
                demo['bytes'] = clip['bytes']
    print(f'{slug}: {clip["bytes"] / 1024 / 1024:.2f} MiB')
recipe_path.write_text(json.dumps(recipes, ensure_ascii=False, indent=2) + '\n')
projects_path.write_text(json.dumps(projects, ensure_ascii=False, indent=2) + '\n')
