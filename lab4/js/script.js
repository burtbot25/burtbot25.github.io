function load(){
    // Creates the list of artist boxes if existing data is present
    var array = JSON.parse(localStorage.getItem('array'));
    if (array != null){
        for (var i = 0; i < array.length; i++){
            createEntry(array[i].name, array[i].about, array[i].img);
        }
    }
}

function showAddArtistForm(event){
    // Shows the add artist form
    var addArtistForm = document.getElementById("add_artist_forms");
    addArtistForm.style.display = "block";
}

function addArtist(event){
    // Add a new artist to the list and saves artist to local storage

    var inputinfo = document.getElementsByClassName("artist_input_form");
    var artist_name = inputinfo[0].value;
    var artist_about = inputinfo[1].value;
    var artist_img = inputinfo[2].value;

    // Creates a new artist entry and appends to the end of the list
    createEntry(artist_name, artist_about, artist_img);

    // Create new artist object
    const artist = {
        name: artist_name,
        about: artist_about,
        img: artist_img
    }

    saveArtist(artist);
    clearForms();
    hideForm();
}

function saveArtist(artist){
    // Saves the artist to an array of objects
    var array = JSON.parse(localStorage.getItem('array'));
    if (array != null){
        // if array exists, append to existing array and set array
        array.push(artist);
        localStorage.setItem('array', JSON.stringify(array));
    } else {
        // if array doesnt exist, create a new array, append to new array and set array
        new_array = new Array();
        new_array.push(artist);
        localStorage.setItem('array', JSON.stringify(new_array));
    }
}

function searchArtist(event) {
    // Clears current artist list and populates the list with artist(s) with the search text in their name
    var artist_list = document.getElementById("artist_list");
    var array = JSON.parse(localStorage.getItem('array'));
    if (array != null){
        clearChildren(artist_list);
        array.forEach(artist => {
            var text = document.getElementById("search_form").value;
            // if search form text in artist name create entry into list
            if (artist.name.toLowerCase().includes(text)){
                createEntry(artist.name, artist.about, artist.img);
            }
        });
    }
}

function clearChildren(artist_list){
    // Remove all children from the DOM
    var child = artist_list.lastElementChild;
    while(child){
        artist_list.removeChild(child);
        child = artist_list.lastElementChild;
    }
}

function createEntry(artist_name, artist_about, artist_img){
    // Create a new artist box entry and appends to the artist_list.

    var name = artist_name;
    var about = artist_about; 
    var img_url = artist_img;

    // Create div 1
    var div_node = document.createElement("DIV");
    div_node.className = "artist_box";

    // Create div 2
    var div_node2 = document.createElement("DIV");
    
    // Create img
    var img_node = document.createElement("img");
    img_node.className = "headshot";
    img_node.src = img_url;

    // Create div 3
    var div_node3 = document.createElement("DIV");
    div_node3.className = "artist_info";

    // Create h3
    var h3_node = document.createElement("H3");
    h3_node.name = name;
    var name_text = document.createTextNode(name);
    h3_node.appendChild(name_text);

    // Create p
    var p_node = document.createElement("P");
    var about_text = document.createTextNode(about);
    p_node.appendChild(about_text);

    // Create button (Delete)
    var delete_button_node = document.createElement("button");
    delete_button_node.className = "delete_button";
    var delete_text = document.createTextNode("Delete");
    delete_button_node.appendChild(delete_text);
    delete_button_node.setAttribute("onclick", "deleteElement(this)");

    // Append nodes
    div_node.appendChild(div_node2);
    div_node2.appendChild(img_node);
    div_node2.appendChild(div_node3);
    div_node3.appendChild(h3_node);
    div_node3.appendChild(p_node);
    div_node.appendChild(delete_button_node);

    // Append new entry to artist_list container div
    var artist_list = document.getElementById("artist_list");
    artist_list.appendChild(div_node);
}

function deleteElement(node){
    // Delete element based off of the delete button

    // Removes element from DOM
    node.parentElement.parentElement.removeChild(node.parentElement);
    
    h3_value = node.parentElement.firstChild.lastElementChild.firstChild.name;
    var array = JSON.parse(localStorage.getItem('array'));
    
    // Remove artist from artist_array in localstorage
    if (array != null){
        // Find artist_array element which matches the h3_value of this artist and delete it
        array.forEach(artist => {
            if (artist.name.includes(h3_value)){
                var index = array.indexOf(h3_value);
                array.splice(index, 1)
                console.log(h3_value + " removed from local storage");
            }
        });
        localStorage.setItem('array', JSON.stringify(array));
    }
}

function clearForms(){
    // Clear add artist form values
    var input_fields = document.getElementsByClassName("artist_input_form");
    for (let i = 0; i < input_fields.length; i++){
        input_fields[i].value = "";
    }
}

function hideForm(){
    // Hides add artist form
    var addArtistForm = document.getElementById("add_artist_forms");
    addArtistForm.style.display = "none";
}