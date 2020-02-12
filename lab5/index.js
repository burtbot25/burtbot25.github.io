let express = require('express')
let path = require('path');
let app = express();
let bodyParser = require('body-parser');
let fs = require('fs');
let util = require('util');
const readFile = util.promisify(fs.readFile);

// allows encoding of url
app.use(bodyParser.urlencoded({ extended: false }))

// allows to parse a request's json object (e.g., req.body.name from a POST fetch req)
app.use(bodyParser.json())

// serving the path allows you to use the files in that path
app.use(express.static(path.join(__dirname,'public')));

// index.js page.  Uses lab5.html to display the page
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'public','lab5.html'));
})

// artist get endpoint.  Returns list of artists
app.get('/artists', (req,res) => {
    readFile("artist_list.json","utf-8").
    then(data => {
        res.json(JSON.parse(data));
    }).
    catch(error => console.log("ERROR " + error))
})

// add post endpoint.  Adds a new artist to the artist_list json file
app.post('/add', async (req, res) =>{
    var artist_list;

    // get list of json objects from file
    await readFile("artist_list.json","utf-8").
    then(data => {
        artist_list = JSON.parse(data)
    }).
    catch(error => console.log("ERROR " + error))

    // create new artist entry
    const artist_data = {
        name: req.body.artist_name_input,
        about: req.body.artist_about_input,
        img: req.body.artist_img_input
    }
    // append artist to artist_list
    artist_list.push(artist_data);

    // overwrites data to the file. if the txt file does not exist, it will create it
    fs.writeFile('artist_list.json', JSON.stringify(artist_list), function(err){
        if (err) throw err;
        console.log('Saved Artist: ' + artist_data.name);
    });

    res.redirect(301, '/'); // Redirects to the main page again
})

// Saves newly added artist in artist_list.json file
app.post('/save', (req,res) => {
    // req.body is the artist_list json array
    console.log("SAVE REQ: " + req.body);
    var artist_list = req.body

    fs.writeFile('artist_list.json', JSON.stringify(artist_list), function(err){
        if (err) throw err;
    });
    res.redirect(301, '/'); // Redirects to the main page again
})

// Allows app to run on http://localhost:8000
app.listen(8000);