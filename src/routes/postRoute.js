const express = require('express');
const postController = require("../controllers/postController");
const upload = require('../middlewares/upload');
const authenticate = require('../middlewares/authenticate')

const router = express.Router();

// router.get('/', postController.getAll);

// router.get('/:id', postController.getById);

router.post("/",
    authenticate,
    upload.fields([
        { name: 'postImage' },
    ]),
    postController.createPost);



module.exports = router;