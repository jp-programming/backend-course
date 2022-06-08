# MongoDB - CRUD

Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos:
```	
> mongod --dbpath ./ecommerce
> mongo
> use ecommerce
```

Agrega 10 documentos con valores distintos a las colecciones mensajes y productos:

```	
> db.messages.insertMany([
    {email: "juan@email.com", text: "Hola", date: ISODate()},
    {email: "pedro@email.com", text: "Hi", date: ISODate()},
    {email: "lucas@email.com", text: "Hello", date: ISODate()},
    {email: "antonio@email.com", text: "Bonjour", date: ISODate()},
    {email: "luis@email.com", text: "Ciao", date: ISODate()},
    {email: "carlo@email.com", text: "Hola", date: ISODate()},
    {email: "jose@email.com", text: "Hi", date: ISODate()},
    {email: "anabel@email.com", text: "Hello", date: ISODate()},
    {email: "greica@email.com", text: "Bonjour", date: ISODate()},
    {email: "felipe@email.com", text: "Ciao", date: ISODate()}
])
```
```
> db.products.insertMany([
    {title: "Laptop", price: 4800, thumbnail: "https://picsum.photos/200/300?image=10"},
    {title: "Mouse", price: 120, thumbnail: "https://picsum.photos/200/300?image=11"},
    {title: "Keyboard", price: 180, thumbnail: "https://picsum.photos/200/300?image=12"},
    {title: "Monitor", price: 1200, thumbnail: "https://picsum.photos/200/300?image=13"},
    {title: "Printer", price: 750, thumbnail: "https://picsum.photos/200/300?image=14"},
    {title: "Speaker", price: 400, thumbnail: "https://picsum.photos/200/300?image=15"},
    {title: "Tablet", price: 600, thumbnail: "https://picsum.photos/200/300?image=16"},
    {title: "Camera", price: 825, thumbnail: "https://picsum.photos/200/300?image=17"},
    {title: "PC", price: 4850, thumbnail: "https://picsum.photos/200/300?image=10"},
    {title: "Chair", price: 3400, thumbnail: "https://picsum.photos/200/300?image=11"},
])	
```	

Lista todos los documentos en cada colección:
```	
> db.messages.find()
> db.products.find()
```	

Muestra la cantidad de documentos almacenados en cada una de ellas:
```
> db.messages.count()
> db.products.count()
```

## CRUD de la colección de productos:

Agrega un producto más en la colección de productos:
```	
> db.products.insertOne({title: "Desk", price: 4200, thumbnail: "https://picsum.photos/200/300?image=10"})
```

Productos con precio menor a 1000 pesos:
```
> db.products.find({price: {$lt: 1000}})
```

Productos con precio entre los 1000 a 3000 pesos:
```
> db.products.find({price: {$gt: 1000, $lt: 3000}})
```

Productos con precio mayor a 3000 pesos:
```
> db.products.find({price: {$gt: 3000}})
```

Trae el nombre del tercer producto más barato:
```
> db.products.find({}, {title: 1, _id: 0}).limit(1).skip(2).sort({price: 1})
```

Agrega el campo stock a todos los productos con un valor de 100:
```
> db.products.updateMany({}, {$set: {stock: 100}})
```

Cambia el stock a cero de los productos con precios mayores a 4000 pesos:
```
> db.products.updateMany({price: {$gt: 4000}}, {$set: {stock: 0}})
```

Borra los productos con precio menor a 1000 pesos:
```
> db.products.deleteMany({price: {$lt: 1000}})
```

## Usuario con permisos de lectura

Crea un usuario que sólo puede leer la base de datos ecommerce.
```	
> use admin
> db.createUser({
    user: "ecommerce-reader",
    pwd: "ecommerce123",
    roles: [
        {
            role: "read",
            db: "ecommerce"
        }
    ]
})
```

Comprueba que ecommerce-reader puede leer la base de datos ecommerce:
```
> mongod --dbpath ./ecommerce --auth
> mongo -u ecommerce-reader -p ecommerce123
> use ecommerce
> db.products.find()
```