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
        url = "isbnResults.php?isbn=" + isbn;
        xhr.open("GET", url, true);
        xhr.send();
    });
    
    xhr.addEventListener("load", function() {
        var response = JSON.parse(xhr.responseText);

        if(response.error) {
            bookMessage.innerHTML = response.error;
        } else {
            var titleInput, lastNameInput, firstNameInput, classInput, ratingInput, pubInput, myEdInput;
            titleInput = document.getElementById('titleInput');
            lastNameInput = document.getElementById('lastNameInput');
            firstNameInput = document.getElementById('firstNameInput');
            classInput = document.getElementById('classInput');
            ratingInput = document.getElementById('ratingInput');
            pubInput = document.getElementById('pubInput');
            myEdInput = document.getElementById('myEdInput');
            bookMessage.innerHTML = "<p>Results found.</p>";
            titleInput.value = response.data.title;
            lastNameInput.value = response.data.authorLast;
            firstNameInput.value = response.data.authorFirst;
            classInput.value = response.data.class_id;
            ratingInput.value = response.data.rating_id;
            pubInput.value = response.data.orig_pub_date;
            myEdInput.value = response.data.curr_ed_date;
        }
    });
});