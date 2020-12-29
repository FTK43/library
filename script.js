let myLibrary = [];

//for tests of display
addBookToLibrary(new Book('Bible', 'Jews', '9000',false));
addBookToLibrary(new Book('Quran', 'Arabs','8500',false));

//constructor of the Book object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return  this.title + " by " + this.author + "," + this.pages + "," + this.read;
    }
}

function addBookToLibrary(input) {
  myLibrary.push(input);
}

//Write a function that loops through the array and displays each book on the page
function loopThroughALibrary(){

    //block showing second library
    var open = document.getElementById("open");

    var form = document.querySelector("inputForm");
    if(typeof(form)!='undefined' && form != null){
        form.remove();
    }

    if(typeof(open)!='undefined' && open!=null){
        var table = document.querySelector("table");
        if(typeof(table)!= 'undefined' && table != null){
            table.remove();       
        }
    };
    
    //parent element of the table    
    var showLibrary = document.createElement("table");
    
    //caption for a table (library)
    var caption = document.createElement("caption");
    caption.innerHTML = "Library";

    showLibrary.appendChild(caption);

    const tableHeader = document.createElement("tr");
    const headerTitle = document.createElement("th");
    const headerAuthor = document.createElement("th");
    const headerPages = document.createElement("th");
    const headerRead = document.createElement("th");

    headerTitle.innerHTML = "Title";
    headerAuthor.innerHTML = "Author";
    headerPages.innerHTML = "Pages";
    headerRead.innerHTML = "Have you read this?";

    tableHeader.appendChild(headerTitle);
    tableHeader.appendChild(headerAuthor);
    tableHeader.appendChild(headerPages);
    tableHeader.appendChild(headerRead);

    showLibrary.appendChild(tableHeader);
    var i = 0;

    if(myLibrary.length === 0){
        document.body.append(showLibrary);
        return;
    }

    myLibrary.forEach(book => {
        //create a row
        const bookRow = document.createElement("tr");
        bookRow.id = i;
        //fill a row
        //create each cell
        const bookTitle = document.createElement("th");
        const bookAuthor = document.createElement("th");
        const bookPages = document.createElement("th");
        const bookRead = document.createElement("th");
        const removeButton = document.createElement("button");
        const changeStatus = document.createElement("button");
        //fill each cell with values
        bookTitle.innerHTML  = book.title;
        bookAuthor.innerHTML = book.author;
        bookPages.innerHTML  = book.pages;
        if(book.read){
            bookRead.innerHTML = "yes";
        }else{
            bookRead.innerHTML = "no";
        }
        removeButton.innerHTML = "Remove From Library";
        removeButton.id = i;
        changeStatus.innerHTML = "Change Status";
        changeStatus.id = i;

        removeButton.addEventListener('click', removeFromLibrary);
        changeStatus.addEventListener('click', statusButton);
        //append cells to a row
        bookRow.appendChild(bookTitle);
        bookRow.appendChild(bookAuthor);
        bookRow.appendChild(bookPages);
        bookRow.appendChild(bookRead);
        bookRow.appendChild(removeButton);
        bookRow.appendChild(changeStatus);

        //append row to table
        showLibrary.appendChild(bookRow);
        //append table to body
        document.body.append(showLibrary);
        i++;
    });

    //block 'show the library' button
    var element = document.getElementById('showAllBooks');

    if(typeof(element) != 'undefined' && element !=null){
        element.id = 'open';
    }
}

function hideTheGallery(){
    //unblock 'show the library' button
    var element = document.getElementById('open');
    if(typeof(element) != 'undefined' && element !=null){
        document.getElementById('open').id = 'showAllBooks';
    }
    //close the form
    element = document.querySelector("table");
    if(typeof(element) != 'undefined' && element !=null){
        document.querySelector("table").remove();
    }
}

function removeFromLibrary(e){
    
    myLibrary = myLibrary.filter(function(book) {
        return myLibrary.indexOf(book) != parseInt(e.target.id);
    });

    loopThroughALibrary();
}

function statusButton(e){
    
    if(myLibrary[e.target.id].read) {
       myLibrary[e.target.id].read = false;
    } else {
       myLibrary[e.target.id].read = true;
    } 
    loopThroughALibrary();
}

function closeForm(){
    //unblock the 'addBook' button
    var element =  document.getElementById('blocked');
    if(typeof(element) !='undefined' && element !=null){
        document.getElementById('blocked').id = 'addBook';
    }   
    
    //get values from the form and push them into the array 
    const inputValues = Array.from(document.querySelectorAll("input"));
    //return a value of text input and property checked if checkbox input
    const submitValues = inputValues.map(function(inputValue) {
        return (inputValue.type === "checkbox") ?inputValue.checked :inputValue.value;
    });

    addBookToLibrary(new Book(submitValues[0], submitValues[1], submitValues[2], submitValues[3]));
    
    //close the form
    document.querySelector("inputForm").remove();

    //to refresh a library
    loopThroughALibrary();
}

function openForm(){
    //block the addBook button from getting clicked while form is opened
    var inputOpen = document.querySelector("inputForm");
    if(typeof(inputOpen) !='undefined' && inputOpen != null){
        
        var addBook = document.getElementById('addBook')
        if(typeof(addBook) !='undefined' && table != null){
            addBook.id = 'blocked';
        }
        return;
    }

    if(document.getElementById('addBook').id === 'blocked'){
        return;
    }
    //hide the table
    var table = document.querySelector('table');
    if(typeof(table) !='undefined' && table != null){
        table.style.display = "none";
    }
    //document.querySelector('table').style.display = "none";

    const inputForm = document.createElement("inputForm");
    inputForm.innerHTML = formHTML;
    inputForm.style.cssText = formCSS;
    document.body.append(inputForm);

    const submitBook = document.getElementById('submitBook');
    submitBook.addEventListener('click',closeForm);
    
}

var formHTML = "<form name=\"book\">\n<p><b><i>Title of the book</i></b><br>\n" +
               "<input type=\"text\" size=\"40\"><br>" +
               "<b><i>Author of the book</i></b><br>\n" +
			   "<input type=\"text\" size=\"40\"><br>\n" +
			   "<b><i>Number of pages</i></b><br>\n" +
			   "<input type=\"text\" size=\"20\"><br>\n" +
			   "<b><i>Have you read this book?</i></b><br>\n" +
			   "<input type=\"checkbox\">\n" +
               "</p>\n"+
               "<button id=\"submitBook\" type=\"button\">submit Book</button>"+
               "</form>"
var formCSS =   "position: fixed;" +
                "top: 50%;" +
                "left: 50%;" +
                "transform: translate(-50%, -50%);" +
                "padding: 3px;" +
                "border: 4px solid black;"           
               
const form = document.getElementById('addBook');
form.addEventListener('click', openForm);

const showAllBooks = document.getElementById('showAllBooks');
showAllBooks.addEventListener('click', loopThroughALibrary);

const hideLibrary = document.getElementById('hideLibrary');
hideLibrary.addEventListener('click', hideTheGallery);