const express = require('express');
const artistController = require('../controllers/artistController');
const loginController = require('../controllers/loginController');
const router = express.Router();

router.get('/', artistController.logout);

router.post('/login', loginController.login);

router.post('/logout', artistController.logout)

router.get('/artists', loginController.getAllArtists);

router.post('/add', artistController.postAddArtist);

router.post('/delete', artistController.postDeleteArtist);

router.post('/search', artistController.postSearchArtist);

module.exports = router;