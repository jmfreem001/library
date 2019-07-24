
function addBookToLibrary(){
    // TODO
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

function readStatusHandler(e){
    let card = e.target.parentNode;
    let id = card.dataset.id;
    let obj = {"id": id}

    fetch('/read', {
        method: 'POST', 
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json"}
    })
    .then(response => {
        if (response.ok) {
          console.log(`event triggered:`);  
          return;
        }
        throw new Error(`Request failed. ${response.statusText} sent ${obj.id}`);
    })
     .catch(error => console.log(error));

    
}

function removeHandler(e){
    let card = e.target.parentNode;
    let id = card.dataset.id;
    let obj = {"id": id}
    card.parentNode.removeChild(card);
    fetch('/delete', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json"}
    })
      .then(response => {
          if (response.ok) {
            console.log(`event triggered:`);  
            return;
          }
          throw new Error(`Request failed. ${response.statusText}`);
      })
       .catch(error => console.log(error));
}


function popupHandler(e){
    let form = document.getElementById('popup');
    // let elements = document.querySelectorAll('.form-element')
    let display = (form.style.display === "none")? "block": "none";
    form.style.display = display;
    // let display = (form.getAttribute('visibility') === "visible")? "hidden":"visible";
    // form.setAttribute('visibility', display);
    // elements.forEach(element => element.setAttribute('visibility', display));
}
