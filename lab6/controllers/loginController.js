let artistModel = require('../models/artistData');
let express = require('express')
let path = require('path');
let app = express();
app.use(express.static(path.join(__dirname,'public')));

exports.login = (req, res, next) => {
    var username = "A01029698";
    var password = "password";
    
    var entered_username = req.body.username_input;
    var entered_password = req.body.password_input;

    if (username == entered_username && password == entered_password){
        res.redirect(301, "/artists")
    } else {
        res.render('login', { loginFailed: true });
    }

}

exports.getAllArtists = (req,res,next) => {
    let Artists = artistModel.getall();
    Artists.then( ([rows, fieldData]) => {
        // artists is artists.js in routes folder
         res.render('artists', { artist: rows });
    });
    
 };