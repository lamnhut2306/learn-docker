# Docker learning with small projects

## Static sites
```
podman build -t my-static-sites -f ./static-sites/Dockerfile ./static-sites
podman run -p 8080:80 my-static-sites
```

## Live sites
```
podman build -t my-live-sites -f ./live-sites/Dockerfile ./live-sites
run: podman run -p 8181:81 -v ${PWD}:/app my-live-sites
```

## Todo app - single page application
```
cd todo-SPA
podman build -t todo-spa .
podman run -p 8080:80 localhost/todo-spa

```
## Todo app - 3 tier application
```
cd todo-app
podman compose up
```