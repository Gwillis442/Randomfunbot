const { rng } = require('./functions.js');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let scores = {};
async function gifLash(gameParticipants, channel) {

    let round = 1;

    gameParticipants.forEach(player => {
        scores[player] = 0
    });
    console.log(scores);

    await channel.send(`Giflash is starting with ${Object.keys(scores).length} players!`);

        for(let i = 0; i < gameParticipants.length * 2; i++) {

            let player1 = gameParticipants[0];
            gameParticipants.shift();
            gameParticipants.push(player1);
            let player2 = gameParticipants[0];
            let link;

            const message = await channel.send(`<@${player1}> 1️⃣, <@${player2}> 2️⃣ Reply to this link: \n${images[rng(0, images.length - 1)]}` );
            await message.react('1️⃣');
            await message.react('2️⃣');

            // Collect reactions for a certain period (e.g., 30 seconds)
            const filter = (reaction, user) => {
                console.log(`Reaction: ${reaction.emoji.name}, User: ${user.username}, Bot: ${user.bot}`);
                return ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && !user.bot;
            };

            const collector = message.createReactionCollector({ filter, time: 30000 }); // 10 seconds

            collector.on( 'collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name}`);
            });

            collector.on('end', collected => {
                let greenVotes = 0;
                let redVotes = 0;
                
                collected.forEach(reaction => {
                    console.log(`Reaction: ${reaction.emoji.name}, Count: ${reaction.count}`);
                    if(reaction.emoji.name === '1️⃣') {
                        greenVotes++;
                    } else if(reaction.emoji.name === '2️⃣') {
                        redVotes++;
                    }
                });

                console.log(`Green votes: ${greenVotes} \nRed votes: ${redVotes}`);

                if(greenVotes > redVotes) {
                    scores[player1]++;
                    channel.send(`<@${player1}> wins!`);
                } else if(redVotes > greenVotes) {
                    scores[player2]++;
                    channel.send(`<@${player2}> wins!`);
                } else {
                    channel.send('Tie!');
                }

            });

            await sleep(30000); // Wait for 10 seconds before moving to the next round
        }

        scores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        scores.forEach(([player, points]) => {
            channel.send(`<@${player}> has ${points} points!`);
        });

}

const images =[
    'https://cdn.discordapp.com/attachments/1198080221874757653/1235775415553888266/image.png',
    'https://cdn.discordapp.com/attachments/281708575770804234/852397419390828574/image0.jpg',
    'https://i.imgur.com/BbkS6ls.png',
    'https://i.imgur.com/uPztDjB.png',
    'https://cdn.discordapp.com/attachments/944641447263625278/1114044395377926254/PXL_20230602_041429435.jpg',
    'https://i.imgur.com/nNsqvpR.png',
    'https://i.imgur.com/EbQvVFl.png',
    'https://i.imgur.com/7F3Zoda.png',
    'https://i.imgur.com/J1Awys2.png',
    'https://i.imgur.com/7PAM5qa.png',
    'https://i.imgur.com/ZDEoykZ.png',



]

const videos = [

]

const memes =[

]

module.exports = {
    gifLash,
} 