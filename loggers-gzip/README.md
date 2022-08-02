# Levantar app

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

## Comandos para el desarrollo
Node profiling:
```
$ node --prof server.js
$ node --prof-process isolate-v8.log > result_prof.txt
```
Artillery:
```	
$ artillery quick -c 50 -n 20 "http://localhost:8080/info" > result_artillery.text
```
Autocannon y 0X:
```
$ npm start // 0x server.js
$ npm test // node autocannon.js
```

