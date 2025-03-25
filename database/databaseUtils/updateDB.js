const User = require('../botDatabase');

async function updateUserLinks(userId){
    try{
        const updatedUser = await User.findOneAndUpdate(
            { userId },
            { $inc: {linksPosted: 1} },
            { new: true }
        );
        //console.log('LinksPosted updated for:', updatedUser);
    } catch(err){
        console.error('Error updating user: ', err);
    }

}

async function updateUserRabbits(userId){

}

async function updateUserTurtles(userId){

}


module.exports = { updateUserLinks };
