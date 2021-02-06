if(process.env.NODE_ENV){
    require("dotenv").config({
        path: `${__dirname}/.env.${process.env.NODE_ENV}`,
    })
} else {
    require('dotenv').config()
}
const { User } = require('./models/user');

if(process.env.NODE_ENV)
    console.log(`ENV: ${NODE_ENV}`);

const anon = new User ({
    name: "Anonymous",
    email: "Null",
    password: "Null",
    avatar: `${process.env.BASE_URL}avatars/anonymous.jpg`,
});

module.exports.createAnonymousUser = async function(){
    const user = await User.findOne({email: "Null"});
    if(user) console.log("Anonymous user already exists.");
    else{
        anon.save()
        .catch(err => {
            console.log(err);
            process.exit(1);
        });
        console.log("Anonymous user created.");
    }
};
module.exports.anonymousId = async function(){
    const user = await User.findOne({ email: "Null" });
    if(!user){
        console.error("Could not find anonymous user");
        process.exit(1);
    }
    return user.id;
};

module.exports.checkEnvVars = function(){
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