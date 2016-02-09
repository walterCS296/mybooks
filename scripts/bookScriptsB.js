//bookScripts.js

"use strict";

window.addEventListener("load", function() {
    var bookMessage, fetchButton, isbnInput, xhr, isbn;
    bookMessage = document.getElementById('bookMessage');
    fetchButton = document.getElementById('fetchButton');
    isbnInput = document.getElementById('isbnInput');
    xhr = new window.XMLHttpRequest();
    
    fetchButton.addEventListener("click", function() {
        var url;
        isbn = isbnInput.value;
        url = "https://isbndb.com/api/v2/json/LH108WKZ/book/" + isbn;
        xhr.open("GET", url, true);
        xhr.send();
    });
    
    xhr.addEventListener("load", function() {
        var response;
        response = JSON.parse(xhr.responseText);
        if(!response.success) {
            bookMessage.innerHTML = "<p>No results found for ISBN " + isbnInput.value 
                                    + ". Enter a 10 or 13 digit ISBN and fetch title and author.</p>";
        } else {
            var titleInput, lastNameInput, firstNameInput, name, nameArray;
            titleInput = document.getElementById('titleInput');
            lastNameInput = document.getElementById('lastNameInput');
            firstNameInput = document.getElementById('firstNameInput');
            bookMessage.innerHTML = "<p>Results found.</p>";
            titleInput.value = response.data.title;
            name = response.data.author_data.name;
            nameArray = name.split(", ");
            lastNameInput.value = nameArray[0];
            firstNameInput.value = nameArray[1];
        }
    });
});
