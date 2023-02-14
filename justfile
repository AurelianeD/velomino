build:
  docker build . -t registry.peauc.dev/aurelianed/velonimo --platform linux/amd64

push: build
  docker push registry.peauc.dev/aurelianed/velonimo

start:
	react-scripts start