// import { directive } from "babel-types";

function Book(title, author, pages, read){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
    this.info = function(){
        // readString = read? 'has been read': 'not read yet';
        return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.readString()}`)
    }
    this.readString = function(){
        return this.read? 'has been read': 'not been read yet';
    }
  }
  

Book.prototype.changeReadStatus = function() {
    // toggle read status to its opposite whenever called. 
    this.read = !this.read;
}

// resetLibrary()
let myLibrary = []

// render library items on page. 
render()




function addBookToLibrary(e){

    e.preventDefault()
    let title = document.getElementById('title')
    let author = document.getElementById('author')
    let pages = document.getElementById('pages')
    let read = document.getElementById('read')
    let readStatus = (read === "read")? true: false;
    // Add info into object
    let book = new Book(title.value, author.value, pages.value, readStatus)
    // return with error if not all fields populated
    if (title.value === '' || author.value === '' || pages.value === '' ){
        alert('Please complete all fields.')
        return;
    }

    myLibrary.push(book);

    // Store values on client cpu.
    localStorage.setItem('library', JSON.stringify(myLibrary));
    // Reset values after update
    title.value = '';
    author.value = '';
    pages.value = '';
    // Hide form after submission
    popupHandler()
    // Render the container with the nre book. 
    render()
}

function render() {

    // Get object back from local storage
    let library = JSON.parse(localStorage.getItem('library') || "[]" );
    // rebuild each object into the library
    myLibrary = []
    for (let item of library){
        let book = new Book(item.title, item.author, item.pages, item.read)
        myLibrary.push(book);
    }
    console.log(myLibrary);

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

    // New book button

    let newButton = document.getElementById('new-book');
    newButton.addEventListener('click', popupHandler);

    //  change read status button

    let readButtons = document.querySelectorAll('.change-read');
    readButtons.forEach(button => button.addEventListener('click', readStatusHandler));

    // Handle remove button
    let removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach(button => button.addEventListener('click', removeHandler));
}

let submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', addBookToLibrary);

function fillSampleData(){
    let SoS = new Book('Storm of Swords', 'George R.R. Martin', 933, true);
    let WaP = new Book('War and Peace', 'Leo Tolstoy', 1225, false);
    let DQ = new Book('Don Quixote', 'Miguel Cervantes', 863, true);
    let MD = new Book('Moby Dick', 'Herman Melville', 585, false);

    myLibrary = [SoS, WaP, DQ, MD];
    localStorage.setItem('library', JSON.stringify(myLibrary));
    render()
}

let sampleButton = document.getElementById('sample');
sampleButton.addEventListener('click', fillSampleData);


function readStatusHandler(e){
    // Change the read status of the book. 
    let card = e.target.parentNode;
    let id = card.dataset.id;
    let obj = myLibrary[id];
    console.log(obj)
    obj.changeReadStatus();
    myLibrary.splice(id, 1, obj)
    localStorage.setItem('library', JSON.stringify(myLibrary));


    render()
    
}

function resetContainer(){
    let container = document.querySelector('.container');
    while(container.children.length > 0){
        container.removeChild(container.children[0]);
    }
}

function removeHandler(e){
    // Removes a card from the list
    let card = e.target.parentNode;
    let id = card.dataset.id;
    card.parentNode.removeChild(card);
    myLibrary.splice(id, 1)
    console.log(myLibrary);
    localStorage.setItem('library', JSON.stringify(myLibrary));
    render()
}


function popupHandler(e){
    // Opens and closes the form. 
    let form = document.getElementById('popup');
    let display = (form.style.display === "none")? "block": "none";
    form.style.display = display;
}
