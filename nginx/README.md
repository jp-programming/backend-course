# Ejemplos 

Para levantar el servidor con nodemon en modo fork o cluster:
```
$ nodemon server.js -p [PORT] --mode [FORK || CLUSTER]
```

Con forever:
```
$ forever start server.js -p [PORT] --mode [FORK || CLUSTER] -w
```

Con PM2 (FORK):
```
$ pm2 start server.js --name="SERVER_NAME" --watch -- -p [PORT]  
```

Con PM2 (CLUSTER):
```
$ pm2 start server.js --name="SERVER_NAME" --watch -i max -- -p [PORT] 
```