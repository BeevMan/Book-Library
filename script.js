let bookLibrary = [];


class Book {
    constructor( title, author, pages, read ) {
        this.title = title
        this.author = author
        this.pageCount = pages
        this.isRead = read
    }

    toggleIsRead() {
        this.isRead ? this.isRead = false : this.isRead = true
    }
}


function addBookToLibrary() {
    const title = document.getElementById("title-input").value;
    const author = document.getElementById( "author-input" ).value;
    const pages = document.getElementById( "pages-input" ).value;
    const read = document.getElementById( "read-input" ).checked;
    if ( title === "" || author === "" || pages === "" ) {
        alert( "Please fill in all details." )
    } else if ( isNaN( Number( pages ) ) ) {
        alert( "Please use a number for pages." )
    } else {
        bookLibrary.push( new Book( title, author, pages, read ) );
        appendBookToTable( bookLibrary[ bookLibrary.length - 1 ], bookLibrary.length );
        toggleNewBook( "Cancel" )
    }
}


function displayAllBooks() { // NEED TO CHANGE TO wipe the table body and then add each book
    const elTableBody = document.getElementById( "table-body" );
    while (elTableBody.firstChild) {
        elTableBody.removeChild(elTableBody.firstChild);
      }

    for ( let i=0; i<bookLibrary.length; i++ ) {
        appendBookToTable( bookLibrary[ i ], i )
    }
}


function appendBookToTable ( objBook, index ) {
    const elTableBody = document.getElementById( "table-body" );
    const elTH = document.createElement( "th" );
    elTH.scope = "row";
    
    const elBook = elTableBody.insertRow(-1);// insert a new row for current book
    elBook.setAttribute( "data-library-index", index );// set data attribute of elBook, will be used for removal/editing
    const bookDetails = Object.entries( objBook ); // !!! STILL NEED TO SORT !!! as the order is not guaranteed

    // loop through and insert details into cells
    for ( let j=0; j<bookDetails.length; j++ ) {
        if ( j === 0 ) {
            elTH.innerText = bookDetails[j][1];
            elBook.appendChild( elTH.cloneNode( true ) );
        } else if ( bookDetails[j][0] === "isRead" ) {
            appendCheckbox( elBook, bookDetails[j][1] );
        } else {
            let tableData = elBook.insertCell( -1 );
            tableData.innerText = bookDetails[j][1];
        }
    }
    appendBtnToRow( elBook, "Delete", deleteBook );
    
}


function appendCheckbox ( tableRow, isRead ) {
    let tableData = tableRow.insertCell( -1 );
    let elInput = document.createElement( "input" );
    elInput.type = "checkbox";
    
    if ( isRead === true || isRead === "true"  ) {
        elInput.checked = true;
    }

    elInput.addEventListener( "change", readToggled );
    tableData.appendChild( elInput );
}


function readToggled( e ) {
    bookLibrary[ getIndex( e ) ].toggleIsRead()
}


function appendBtnToRow ( tableRow, text, funct ) {
    let tableData = tableRow.insertCell( -1 );
        
    let button = document.createElement( "button" );
    button.innerText = text;
    button.addEventListener( "click", funct );
    tableData.appendChild( button );
}


function deleteBook ( e ) {
    bookLibrary.splice( getIndex( e ), 1 );
    displayAllBooks();
}


function getIndex( e ) {
    return e.currentTarget.parentNode.parentNode.dataset.libraryIndex // returns data-library-index when button is pressed
}


function toggleNewBook ( pressedBtn ) { // toggles hidden attribute to true between NEW BOOK and Cancel button's containers.
    const elNewBookBtnContainer = document.getElementById( "new-book-btn-container" );
    const elFormContainer = document.getElementById( "form-container" );
    if ( pressedBtn === "NEW BOOK" ) {
        elNewBookBtnContainer.hidden = true;
        elFormContainer.hidden = false
    } else if ( pressedBtn === "Cancel" ) {
        elNewBookBtnContainer.hidden = false;
        elFormContainer.hidden = true;
        clearBookForm()
    }
}


function clearBookForm () {
    document.getElementById("title-input").value = "";
    document.getElementById( "author-input" ).value = "";
    document.getElementById( "pages-input" ).value = "";
    document.getElementById( "read-input" ).checked = false;
}






// default example books
bookLibrary.push( new Book( "I need more $", "Mr $", "291", true ) );

bookLibrary.push( new Book( "Get lucky,  get rich", "Mr $", "777", "true" ) );

bookLibrary.push( new Book( "Money making saga", "E. Z. Pay", "679", "false" ) );

displayAllBooks();


/*

Assignment
If you haven’t already, set up your project with skeleton HTML/CSS and JS files.
All of your book objects are going to be stored in a simple array, so add a function to the script (not the constructor) that can take user’s input and store the new book objects into an array. Your code should look something like this:

let myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}
Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on their own “card”. It might help for now to manually add a few books to your array so you can see the display.
Add a “NEW BOOK” button that brings up a form allowing users to input the details for the new book: author, title, number of pages, whether it’s been read and anything else you might want.
Add a button on each book’s display to remove the book from the library.
You will need to associate your DOM elements with the actual book objects in some way. One easy solution is giving them a data-attribute that corresponds to the index of the library array.
Add a button on each book’s display to change its read status.
To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.
Optional -we haven’t learned any techniques for actually storing our data anywhere, so when the user refreshes the page all of their books will disappear! If you want, you are capable of adding some persistence to this library app using one of the following techniques:
localStorage (docs here) allows you to save data on the user’s computer. The downside here is that the data is ONLY accessible on the computer that it was created on. Even so, it’s pretty handy! Set up a function that saves the whole library array to localStorage every time a new book is created, and another function that looks for that array in localStorage when your app is first loaded. (make sure your app doesn’t crash if the array isn’t there!)
Firebase (check it out!) is an online database that can be set up relatively easily, allowing you to save your data to a server in the cloud! Teaching you how to use it is beyond the scope of this tutorial, but it is almost definitely within your skill set. If you’re interested, check out this video to see what it’s all about.

*/