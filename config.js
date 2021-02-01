if(process.env.NODE_ENV){
    require("dotenv").config({
        path: `${__dirname}/.env.${process.env.NODE_ENV}`,
    })
} else {
    require('dotenv').config()
}

if(process.env.NODE_ENV)
    console.log(`ENV: ${NODE_ENV}`);

module.exports = function(){
    if(!process.env.JWT_PRIVATE_KEY){
        console.error('FATAL ERROR: JWT_PRIVATE_KEY not defined');
        process.exit(1);
    }

    if(!process.env.BASE_URL){
        console.error('FATAL ERROR: BASE_URL not defined');
        process.exit(1);
    }

    if(!process.env.MAX_AVATAR_SIZE_MB){
        console.error('FATAL ERROR: MAX_AVATAR_SIZE_MB not defined');
        process.exit(1);
    }

    if(!process.env.JWT_HEADER){
        console.error('FATAL ERROR: JWT_HEADER not defined');
        process.exit(1);
    }
}