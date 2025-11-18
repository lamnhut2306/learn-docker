1. Static sites
- build: podman build -t my-static-sites -f ./static-sites/Dockerfile ./static-sites
- run: podman run -p 8080:80 my-static-sites

2. Live sites
- build: podman build -t my-live-sites -f ./live-sites/Dockerfile ./live-sites
- run: podman run -p 8181:81 -v ${PWD}:/app my-live-sites