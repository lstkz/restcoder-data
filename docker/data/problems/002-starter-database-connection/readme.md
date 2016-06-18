

start container in terminal:
```
docker run -it --rm -p 5432:5432 restcoder/postgres_starter
```

start container in background:
```
docker run -d -p 5432:5432 --name postgres restcoder/postgres_starter
```

remove background container
```
docker rm -f postgres
```