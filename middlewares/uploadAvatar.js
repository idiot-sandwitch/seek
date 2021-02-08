const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/avatars');
    },
    filename: function(req, file, cb){
        cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
});


const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)){
        file.db_url = `${process.env.BASE_URL}avatars/${file.originalname}`;
        cb(null, true);
    } else {
        cb(new Error('only files of type jpeg, jpg and png are allowed.'), false);
    }
};

module.exports = multer({
    storage,
    limits: { fileSize: parseInt(process.env.MAX_AVATAR_SIZE_MB)*1024*1024}, 
    fileFilter
});