let db = require('../util/database');

function addArtist(data){
    let sql = "INSERT into artists (name, about, img, id) values ('" + data.name + "','" + data.about + "','" + data.img + "','" + data.id + "')";
    return db.execute(sql);
}

function getAllArtists(){
    return db.execute('SELECT * FROM artists');
}

function searchArtist(searched_name){
    return db.execute("SELECT * FROM artists WHERE name LIKE '%" + searched_name + "%'");
}

function deleteArtist(id){
    return db.execute("DELETE FROM artists WHERE id='" + id + "'")
}

module.exports = {
    add : addArtist,
    getall : getAllArtists,
    searchartist : searchArtist,
    deleteartist: deleteArtist
}