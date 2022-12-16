const ImagesRepository = require('../models/imagesRepository');
const TokenManager = require('../tokenManager');

module.exports =
    class ImagesController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext, new ImagesRepository(), false, true); // todo pas d'acces anonyme
        }
    }



