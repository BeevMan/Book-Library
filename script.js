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

/*
function addBookToLibrary() {
    // will need to fill the below variables with values from the addBook button's form
    const title = ;
    const author = ;
    const pages = ;
    const read = ;
    bookLibrary.push( new Book( title, author, pages, read ) );
    addBookToTable( bookLibrary[ bookLibrary.length - 1 ] );
}
*/

// default example books
bookLibrary.push( new Book( "I need more $", "Mr $", "291", true ) );

bookLibrary.push( new Book( "Get lucky,  get rich", "Mr $", "777", "true" ) );

bookLibrary.push( new Book( "Money making saga", "E. Z. Pay", "679", "false" ) );


function displayAllBooks() { // used for displaying the initial default example books
    const elTable = document.getElementById( "book-table" );
    const elTH = document.createElement( "th" );
    elTH.scope = "row";
    
    for ( let i=0; i<bookLibrary.length; i++ ) {

        // ??? put the below into it's own function so I can use it later to add individual books ??? 
            // would require elTable & elTH be defined inside of it or atleast passed into it
        const elBook = elTable.insertRow(-1);// insert a new row for current book
        const bookDetails = Object.entries( bookLibrary[ i ] ); // !!! STILL NEED TO SORT !!! as the order is not guaranteed
        const bookToPush = [];

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

        // set data attribute of elBook to i (index of the loop) will be used for removal???

    }
}


function appendCheckbox ( tableRow, isRead ) {
    let tableData = tableRow.insertCell( -1 );
    let elInput = document.createElement( "input" );
    elInput.type = "checkbox";
    if ( isRead === true || isRead === "true"  ) {
        elInput.checked = true;
    }

    // !!! NEED TO ADD AN EVENT LISTENER !!! for when checked is toggled, should be able to use my prototype function toggleIsRead

    tableData.appendChild( elInput );
}


function appendBtnToRow ( tableRow, text, funct ) {
    let tableData = tableRow.insertCell( -1 );
        
    let editButton = document.createElement( "button" );
    editButton.innerText = text;
    editButton.addEventListener( "click", funct );
    tableData.appendChild( editButton );
}


function addBookToTable ( book ) {

}


function editBookDetails (  ) {

}


function deleteBook (  ) {

}


