let express = require('express')
let path = require('path');
let app = express();
let bodyParser = require('body-parser');
let fs = require('fs');
let utility = require('util');
let util = require('./util/database');
const readFile = utility.promisify(fs.readFile);
const expressHbs = require('express-handlebars');
const artistRoutes = require('./routes/artists');

app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views');


// allows encoding of url
app.use(bodyParser.urlencoded({ extended: false }))

// allows to parse a request's json object (e.g., req.body.name from a POST fetch req)
app.use(bodyParser.json())

// serving the path allows you to use the files in that path
app.use(express.static(path.join(__dirname,'public')));

app.use(artistRoutes);
app.listen(process.env.PORT || 5000, () => console.log('Server Ready'));



