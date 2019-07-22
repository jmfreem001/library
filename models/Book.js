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
  
  Book.prototype.changeReadStatus = () =>{
    // toggle read status to its opposite whenever called. 
    this.read = !this.read;
  }

  module.exports = Book;