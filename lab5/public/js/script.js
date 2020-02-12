async function load(){
    // loads artist list from artist_list.json file on body load
    var array;
    // get artist_list
    await fetch('http://localhost:8000/artists').then(res => {return res.json()
    }).then(data => {
        console.log("GOT JSON " + data[0].name);
        array = data;
    });

    // Creates the list of artist boxes if existing data is present
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

function clearHide(event){
    // Clears and hides add_artist_forms element
    clearForms();
    hideForm();
}

async function searchArtist(event) {
    // Clears current artist list and populates the list with artist(s) with the search text in their name
    var artist_list = document.getElementById("artist_list");
    
    var array;
    // get artist_list
    await fetch('http://localhost:8000/artists').then(res => {return res.json()
    }).then(data => {
        console.log("searching " + data[0].name);
        array = data;
    });

    if (array != null){
        console.log("CLEARING CHILDREN");
        clearChildren(artist_list);
        var text = document.getElementById("search_form").value;
        console.log("searching all values containing: " + text);
        array.forEach(artist => {
            // if search form text in artist name create entry into list
            if (artist.name.toLowerCase().includes(text.toLowerCase())){
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

async function deleteElement(node){
    // Delete element based off of the delete button

    // Removes element from DOM
    node.parentElement.parentElement.removeChild(node.parentElement);
    
    h3_value = node.parentElement.firstChild.lastElementChild.firstChild.name;

    // get artist_list
    var array;
    await fetch('http://localhost:8000/artists').then(res => {return res.json()
    }).then(data => {
        console.log("GOT JSON " + data[0].name);
        array = data;
    });
    
    // Remove artist from artist_array in localstorage
    if (array != null){
        // Find artist_array element which matches the h3_value of this artist and delete it
        array.forEach(artist => {
            if (artist.name.includes(h3_value)){
                var index = array.indexOf(h3_value);
                array.splice(index, 1)
                console.log(h3_value + " removed from artist_list");
            }
        });
        fetch('http://localhost:8000/save', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(array),
          })
          .catch((error) => {
            console.error('Error:', error);
          });
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