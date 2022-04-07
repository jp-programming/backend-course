class User {
    constructor(name, surname, books, pets){
        this.name = name;
        this.surname = surname;
        this.books = books;
        this.pets = pets;
    }

    getFullName(){
        return `${this.name} ${this.surname}`;
    }

    addPet(pet){
        this.pets.push(pet);
    }

    countPets(){
        return this.pets.length;
    }

    addBook(name, author){
        this.books.push({name, author});
    }

    getBookNames(){
        return this.books.map(book => book.name);
    }
}

const user = new User('Josué', 'Peña', [], []);

user.addPet('dog');
user.addPet('cat');

user.addBook('Harry Potter', 'J.K. Rowling');
user.addBook('Lord of the Rings', 'J.R.R. Tolkien');

console.log('Usuario: ', user.getFullName());
console.log('Cantidad de mascotas: ', user.countPets());
console.log('Libros: ', user.getBookNames());
