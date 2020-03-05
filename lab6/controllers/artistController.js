let artistModel = require('../models/artistData');
let express = require('express')
let path = require('path');
let app = express();
app.use(express.static(path.join(__dirname,'public')));

exports.logout = (req, res, next) => {
    res.render('login', { loginFailed: false });
}

exports.postAddArtist = (req, res, next) => {
    const artist_data = {
        name: req.body.artist_name_input,
        about: req.body.artist_about_input,
        img: req.body.artist_img_input,
        id: new Date(),
    }
    artistModel.add(artist_data).then(d => res.redirect(301, '/artists'));
 };

 exports.postDeleteArtist = (req, res, next) => {
     var id = req.body.artist_id_input;
     artistModel.deleteartist(id).then(d => res.redirect(301, '/artists'));
 };

 exports.postSearchArtist = (req,res,next) => {
    var search_text = req.body.directory_input;
    let Artists = artistModel.searchartist(search_text);
    Artists.then( ([rows, fieldData]) => {
        // artists is artists.js in routes folder
         res.render('artists', { artist: rows });
    });
 };