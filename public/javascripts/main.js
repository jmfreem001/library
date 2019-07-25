// import { directive } from "babel-types";



function Book(title, author, pages, read){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
    this.info = () => {
        // readString = read? 'has been read': 'not read yet';
        return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.readString()}`)
    }
    this.readString = () => {
        return this.read? 'has been read': 'not been read yet';
    }
  }
  
const book = new Book()

Book.prototype.changeReadStatus = function() {
    // toggle read status to its opposite whenever called. 
    this.read = !this.read;
}
let SoS = new Book('Storm of Swords', 'George R.R. Martin', 933, true);
let WaP = new Book('War and Peace', 'Leo Tolstoy', 1225, false);
let DQ = new Book('Don Quixote', 'Miguel Cervantes', 863, true);
let MD = new Book('Moby Dick', 'Herman Melville', 585, false);

let myLibrary = [SoS, WaP, DQ, MD];

// render library items on page. 
render()


function addBookToLibrary(){
    // TODO get form data into object and 
    let form = document.querySelector('form')
    let formData = new FormData(form);
    // console.log(formData)
    // for(var [key, value] of formData.entries()) {
    //     console.log(key, value); 
    // }
    console.log(...formData);
    // let title = document.getElementById('title').textContent
    // let author = document.getElementById('author').textContent
    // let pages = document.getElementById('pages').textContent
    // let read = document.getElementById('read').textContent
    let readStatus = (formData.read === "read")? true: false;
    let book = new Book(formData.title, formData.author, formData.pages, readStatus)
    myLibrary.push(book);
    console.log(myLibrary);
    render()

}

function render() {
    // Loop through array of library and appendChild to divContatiner.
    let container = document.querySelector('.container');
    // Clear container before rendering. 
    resetContainer()
    for (let book of myLibrary){
        // Add card
        let card = document.createElement('div');
        card.setAttribute('class', 'card')
        card.setAttribute('data-id', myLibrary.indexOf(book))
        container.appendChild(card);
        // Add title
        let title = document.createElement('h3');
        title.textContent = book.title;
        card.appendChild(title);
        // Add book info
        let info = document.createElement('p');
        info.textContent = book.info();
        card.appendChild(info);
        let hr = document.createElement('hr');
        card.appendChild(hr);
        // Add remove button
        let remove = document.createElement('button');
        remove.setAttribute('class', "remove")
        remove.textContent = 'Remove Book'
        card.appendChild(remove);
        // Add read/unread button
        let readText = (book.read)? 'Mark as unread': 'Mark as read';
        let read = document.createElement('button');
        read.setAttribute('class','change-read');
        read.textContent = readText;
        card.appendChild(read);
    }
    // Button listeners

    // New book button

    let newButton = document.getElementById('new-book');
    newButton.addEventListener('click', popupHandler);

    //  change read status button

    let readButtons = document.querySelectorAll('.change-read');
    readButtons.forEach(button => button.addEventListener('click', readStatusHandler));


    let removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach(button => button.addEventListener('click', removeHandler));
}

let submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', addBookToLibrary);


function readStatusHandler(e){

    let card = e.target.parentNode;
    let id = card.dataset.id;
    let obj = myLibrary[id];
    console.log(obj)
    obj.changeReadStatus();
    myLibrary.splice(id, 1, obj)

    console.log(myLibrary);

    render()
    
}

function resetContainer(){
    let container = document.querySelector('.container');
    while(container.children.length > 0){
        container.removeChild(container.children[0]);
    }
}

function removeHandler(e){
    // TODO rewrite as client side only
    // brinf the called funcitons in the routes over here
    let card = e.target.parentNode;
    let id = card.dataset.id;
    // let obj = {"id": id}
    card.parentNode.removeChild(card);
    myLibrary.splice(id, 1)
    console.log(myLibrary);
    render()
}


function popupHandler(e){
    let form = document.getElementById('popup');
    let display = (form.style.display === "none")? "block": "none";
    form.style.display = display;
}
