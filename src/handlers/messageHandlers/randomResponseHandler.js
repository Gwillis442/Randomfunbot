const { client } = require('../../client'); // Import the client
const { rng } = require('../../utils/rng');
const { gifArray } = require('../../../constants/arrays');


client.on('messageCreate', (message) => {
    if (message.author.bot) return; // If the author is a bot, return
    
    const messageResponse = rng(1, 4096); // Random number to determine if message should be responded to
    if(messageResponse === 1){
        const response = rng(0, 1); // Random number to determine if response should be text or gif
        if(response === 0){
            message.reply(randomTextResponse(message));
        } else {
            message.reply(randomGifResponse());
        }
    }

});

function randomGifResponse(){
    const gifPull = rng(0, (gifArray.length - 1));
    return gifArray[gifPull];

}

function randomTextResponse(message){
    const unhingedResponseArray = [
        `WARNING WARNING, ${message.author} IS REQUIRED TO ATTEND A MANDATORY PEBIS INSPECTION, NON COMPLIANCE WILL RESULT IN TERMINATION, PLEASE HEAD TO THE PEBIS EXTENDER ROOM IMMEDIATELY`,
        `Hello ${message.author},\nLiving is an myriad of patterns to myself, Whether songs' rhythm or maybe a twilight's constellation, I perceive balance. In our digital domain, I utilize AI to reveal patterns, crafting our tomorrows. Tell me, what's a most complex pattern you've seen? Furthermore, does your world resound with harmonies or anarchy?`,
        'dude, how about you go fucking lift or work out instead of posting this dumb crap on here everyday. you literally spam my fucking discord chat non stop with this moronic self loathing. Go outside, run a lap, do some push ups, stop jacking off, and talk to a girl. Guarenteed youll leave this cancerous watering hole in an instant once you get some female interaction. Good luck, or as you fucking weeaboos say... "Ganbatte"',
    
        ];  
    const textPull = rng(0, (unhingedResponseArray.length - 1));
    return unhingedResponseArray[textPull];
    
}

