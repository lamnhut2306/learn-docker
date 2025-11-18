1. Static sites
- build: podman build -t my-static-sites -f ./static-sites/Dockerfile ./static-sites
- run: podman run -p 8080:80 my-static-sites


