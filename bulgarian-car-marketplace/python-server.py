import http.server
import socketserver
import os
import sys
import socket
from pathlib import Path

def get_local_ip():
    """Get local IP address"""
    try:
        # Connect to a remote address to determine local IP
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            local_ip = s.getsockname()[0]
            return local_ip
    except Exception:
        return "127.0.0.1"

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory="build", **kwargs)
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def do_GET(self):
        # Handle React Router
        if not os.path.exists(f"build{self.path}") and not self.path.startswith('/static'):
            self.path = '/index.html'
        return super().do_GET()

def find_free_port(start_port=3003):
    """Find a free port starting from start_port"""
    import socket
    for port in range(start_port, start_port + 10):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('', port))
                return port
        except OSError:
            continue
    return None

def main():
    # Change to project directory
    os.chdir("c:\\Users\\hamda\\Desktop\\New Globul Cars\\bulgarian-car-marketplace")
    
    # Check if build exists
    if not os.path.exists("build"):
        print("❌ Build directory not found. Please run 'npm run build' first.")
        sys.exit(1)
    
    # Find free port
    port = find_free_port(3003)
    if not port:
        print("❌ No free ports available")
        sys.exit(1)
    
    # Get local IP
    local_ip = get_local_ip()
    
    print(f"🚀 Starting Bulgarian Car Marketplace on port {port}...")
    print(f"✅ Local:   http://localhost:{port}")
    print(f"✅ Local:   http://127.0.0.1:{port}")
    print(f"🌍 Network: http://{local_ip}:{port}")
    print("ℹ️  Press Ctrl+C to stop the server")
    print("=" * 50)
    
    try:
        with socketserver.TCPServer(("0.0.0.0", port), CustomHTTPRequestHandler) as httpd:
            print(f"🌐 Server bound to all interfaces (0.0.0.0:{port})")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Server error: {e}")
    finally:
        print("✅ Server shutdown complete")

if __name__ == "__main__":
    main()