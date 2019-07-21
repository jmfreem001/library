let SoS = new Book('Storm of Swords', 'George R.R. Martin', 933, true);
let WaP = new Book('War and Peace', 'Leo Tolstoy', 1225, false);
let DQ = new Book('Don Quixote', 'Miguel Cervantes', 863, true);
let MD = new Book('Mody Dick', 'Herman Melville', 585, false);

let myLibrary = [SoS, WaP, DQ, MD];

function Book(title, author, pages, read){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
    this.info = () => {
        // readString = read? 'has been read': 'not read yet';
        return (`${this.title} by ${self.author}, ${pages} pages, ${this.readString()}`)
    }
    this.readString = () => {
        return this.read? 'has been read': 'not been read yet';
    }
}

const book = new Book()

function addBookToLibrary(){
    // TODO
}


module.exports = myLibrary