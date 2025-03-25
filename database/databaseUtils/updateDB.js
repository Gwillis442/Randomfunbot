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
    try{
        const updatedUser = await User.findOneAndUpdate(
            { userId },
            { $inc: {rabbits: 1} },
            { new: true }
        );
        //console.log('rabbits updated for:', updatedUser);
    } catch(err){
        console.error('Error updating user: ', err);
    }

}

async function updateUserTurtles(userId){
    try{
        const updatedUser = await User.findOneAndUpdate(
            { userId },
            { $inc: {turtles: 1} },
            { new: true }
        );
        //console.log('turtles updated for:', updatedUser);
    } catch(err){
        console.error('Error updating user: ', err);
    }

}


module.exports = { updateUserLinks, updateUserRabbits, updateUserTurtles };
