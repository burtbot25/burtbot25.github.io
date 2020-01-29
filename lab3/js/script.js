function showAddArtistForm(event){
    var addArtistForm = document.getElementById("add_artist_forms");
    addArtistForm.style.display = "block";
}

function createEntry(event){

    // Get form info
    var inputinfo = document.getElementsByClassName("artist_input_form");
    var name = inputinfo[0].value;
    var about = inputinfo[1].value;
    var img_url = inputinfo[2].value;

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

    clearForms();
    hideForm();

}

function deleteElement(node){
    node.parentElement.parentElement.removeChild(node.parentElement);
}

function clearForms(){
    var input_fields = document.getElementsByClassName("artist_input_form");
    for (let i = 0; i < input_fields.length; i++){
        input_fields[i].value = "";
    }
}

function hideForm(){
    var addArtistForm = document.getElementById("add_artist_forms");
    addArtistForm.style.display = "none";
}