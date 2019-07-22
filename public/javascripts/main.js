
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
    // TODO;
    alert(`Parent node says ${e.target.parentNode.children[3].textContent}`);
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
      .then(function(response) {
          if (response.ok) {
            console.log(`event triggered:`);  
            return;
          }
          throw new Error(`Request failed. ${response.statusText} - sent ${obj.id}`);
      })
       .catch(function(error) {
           console.log(error);
       });
}




function popupHandler(e){
// TODO
}
