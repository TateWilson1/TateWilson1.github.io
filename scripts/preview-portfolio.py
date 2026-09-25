"""Local portfolio preview. Serve only public frontend files from permanent source."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit, parse_qs
from io import BytesIO
import argparse
import re

ROOT = Path(__file__).resolve().parents[1]
PAGES = {p.name for p in ROOT.glob('*.html')}
PUBLIC = PAGES | {'styles.css', 'lab.css', 'case-studies.css', 'script.js', 'scene.js', 'scene-model.mjs', 'robots.txt', 'sitemap.xml'}

class PortfolioHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_head(self):
        parsed = urlsplit(self.path)
        route = unquote(parsed.path).lstrip('/') or 'index.html'
        target = (ROOT / route).resolve()
        permitted = route in PUBLIC or route.startswith('assets/')
        if not permitted or not target.is_relative_to(ROOT) or not target.is_file():
            self.send_error(404)
            return
        if 'nojs' in parse_qs(parsed.query) and target.suffix == '.html':
            body = re.sub(r'<script\b[^>]*>.*?</script>', '', target.read_text(encoding='utf-8'), flags=re.S).encode()
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            return BytesIO(body)
        return super().send_head()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8765)
    args = parser.parse_args()
    print(f'Portfolio source: {ROOT}\nPreview: http://127.0.0.1:{args.port}', flush=True)
    ThreadingHTTPServer(('127.0.0.1', args.port), PortfolioHandler).serve_forever()
