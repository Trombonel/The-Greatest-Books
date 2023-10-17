import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase , ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
 databaseURL: "https://the-greatest-books-176d3-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const bookReviewsInDB = ref (database, "reviews" )

const textEl = document.getElementById("text-el")
const buttonEl = document.getElementById("button-el")
const ulEl = document.getElementById("ul-el")

buttonEl.addEventListener("click", function() {
    let inputValue = textEl.value
    push(bookReviewsInDB, inputValue)
    clearTextEL() 
})


onValue(bookReviewsInDB, function(snapshot) {
    
    if(snapshot.exists()) {
            let booksArray = Object.entries(snapshot.val())
        clearulEL()
        for(let i = 0; i < booksArray.length; i++) {
            let currentBook = booksArray[i]
            let currentBookId = currentBook[0]
            let currentBookValue = currentBook[1]
        appendBookToBooksListEl(currentBook)
        } 
    } else {
        ulEl.innerHTML = "Be the first to write a review!"
    }
})

function appendBookToBooksListEl(book) {
    let bookId = book[0]
    let bookValue = book[1]
    let newEl = document.createElement("li")
    newEl.textContent = bookValue
    newEl.addEventListener("click", function(){
        let locationOfCurrentBookInDB = ref (database, `reviews/${bookId}`)
        remove(locationOfCurrentBookInDB)
    })       
    ulEl.append(newEl)
}

function clearTextEL() {
    textEl.value = ""
}
function clearulEL() {
    ulEl.innerHTML = ""
}
