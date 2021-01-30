const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/images');
    },
    filename: function(req, file, cb){
        cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
});

const filefilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(new error('only files of type jpeg, jpg and png are allowed.'), false);
    }
};

module.exports = multer({
    storage,
    limits: { fileSize: parseInt(process.env.MAX_AVATAR_SIZE_MB)*1000000}, 
    filefilter
});