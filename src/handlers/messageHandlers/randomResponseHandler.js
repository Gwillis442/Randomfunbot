const { client } = require('../../client'); // Import the client
const { rng } = require('../../utils/rng');
const { gifArray } = require('../../../constants/arrays');

// Random response handler
/*
When a message is sent in chat a random number is chosen and if it is 1, a random response is sent to the message author.
The response can be either a text response or a gif response.
*/

client.on('messageCreate', (message) => {
    if (message.author.bot) return; // If the author is a bot, return
    
    const messageResponse = rng(1, 2096); // Random number to determine if message should be responded to
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
        'You’re seriously telling me you still believe the official story? You actually buy into the idea that Lee Harvey "I swear I’m a patsy" Oswald, a dude who couldn’t hit the broad side of a barn with a scoped rifle on a clear day, pulled off a 3-shot combo on a moving target from a sixth-story window with a bolt-action mail-order rifle while the Secret Service was too busy tailgating to notice? You believe in the magic bullet? The one that apparently went on a scenic tour through JFK and Connally like it was trying to finish a side quest? And don’t even get me started on the grassy knoll, the umbrella man, the babushka lady, the fact that Jack Ruby just waltzed in and capped Oswald on live TV like it was a Grand Theft Auto mission. I’ve seen less suspicious plots in a telenovela. But here’s the real kicker—after all the documentaries, conspiracy theories, Zapruder film frame-by-frame breakdowns, and late-night Reddit threads deep enough to reach the hollow Earth… turns out his head could just do that.',
        'nothing says “case closed” like a magic bullet with a PhD in acrobatics and a lone gunman who couldn’t outshoot a stormtrooper. And let’s not forget the Secret Service’s flawless strategy of “let’s just vibe” while the president’s head performs its own independent reenactment of Scanners. Clearly, the only logical explanation is that Oswald, a man who couldn’t organize a two-man conspiracy to get lunch, pulled off the crime of the century with a rifle that might as well have been a Nerf gun. And Jack Ruby? Just a concerned citizen with impeccable timing and zero ties to anything shady—totally normal for a nightclub owner to play freelance executioner on live TV.',
        'You will never be Japanese, you will never find the love of your life in Japan, who looks like this and is a cutie pie Japanese girl. You will never be the protagonist in an anime, you will never have superpowers that allow you to overcome your most greatest tribulations, you will always be a loser.',
        ];  
    const textPull = rng(0, (unhingedResponseArray.length - 1));
    return unhingedResponseArray[textPull];
    
}

