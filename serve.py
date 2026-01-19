import http.server
import socketserver
import os
import json
from pathlib import Path

PORT = 3000
HANDLER = http.server.SimpleHTTPRequestHandler

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("", PORT), HANDLER) as httpd:
    print(f"Server running at http://localhost:{PORT}/")
    print(f"Press Ctrl+C to stop the server")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
