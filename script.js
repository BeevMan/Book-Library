let bookLibrary = [];


function Book( title, author, pages, read ) {
    // the constructor
    this.title = title
    this.author = author
    this.pageCount = pages
    this.isRead = read
}


Book.prototype.toggleIsRead = function() {
    this.isRead ? this.isRead = false : this.isRead = true
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
        appendBookToTable( bookLibrary[ bookLibrary.length - 1 ] );
        toggleNewBook( "Cancel" )
    }
}


function displayAllBooks() { // used for displaying the initial default example books
    for ( let i=0; i<bookLibrary.length; i++ ) {
        appendBookToTable( bookLibrary[ i ] )
    }
}


function appendBookToTable ( objBook ) {
    const elTable = document.getElementById( "book-table" );
    const elTH = document.createElement( "th" );
    elTH.scope = "row";
    
    const elBook = elTable.insertRow(-1);// insert a new row for current book
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
    appendBtnToRow( elBook, "Edit", editBookDetails );
    appendBtnToRow( elBook, "Delete", deleteBook );

    // ??? set data attribute of elBook to i (index of the loop) will be used for removal/editing ???
    
}


function appendCheckbox ( tableRow, isRead ) {
    let tableData = tableRow.insertCell( -1 );
    let elInput = document.createElement( "input" );
    elInput.type = "checkbox";
    if ( isRead === true || isRead === "true"  ) {
        elInput.checked = true;
    }

    // !!! NEED TO ADD AN EVENT LISTENER !!! for when checked is toggled, should be able to use my prototype function toggleIsRead
    // elInput.addEventListener( "change",  ); // need to make a function that can decide what index of bookLibrary[ index ] is needed

    tableData.appendChild( elInput );
}


function appendBtnToRow ( tableRow, text, funct ) {
    let tableData = tableRow.insertCell( -1 );
        
    let editButton = document.createElement( "button" );
    editButton.innerText = text;
    editButton.addEventListener( "click", funct );
    tableData.appendChild( editButton );
}


function editBookDetails (  ) {

}


function deleteBook (  ) {

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