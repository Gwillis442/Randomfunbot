const { rng } = require('./functions.js');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function messageCountdown(channel, delay, countdown) {
    const countdownMessage = await channel.send(`...${countdown}`);

    const countdownInterval = setInterval(async () => {
        countdown--;
        await countdownMessage.edit(`...${countdown}`);
        if(countdown === 0) {
            clearInterval(countdownInterval);
            await countdownMessage.delete();
        }

    }, delay);
}


async function handleRound1(channel, gameParticipants, scores){

    for(let i = 0; i < gameParticipants.length * 2; i++) {

        let player1 = gameParticipants[0];
        gameParticipants.shift();
        gameParticipants.push(player1);
        let player2 = gameParticipants[0];
        
        
        const message = await channel.send(`<@${player1}> 1️⃣, <@${player2}> 2️⃣ Reply to this link: \n${images[rng(0, images.length - 1)]}` );
        await message.react('1️⃣');
        await message.react('2️⃣');
        messageCountdown(channel, 1000, 30);



        // Collect reactions for a certain period (e.g., 30 seconds)
        const filter = (reaction, user) => {
            console.log(`Reaction: ${reaction.emoji.name}, User: ${user.username}, Bot: ${user.bot}`);
            return ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && !user.bot;
        };

        const collector = message.createReactionCollector({ filter, time: 30000 }); // 30 seconds

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
                channel.send(`<@${player1}> wins!\n___________________________`);
            } else if(redVotes > greenVotes) {
                scores[player2]++;
                channel.send(`<@${player2}> wins!\n___________________________`);
            } else {
                channel.send('Tie!\n___________________________');
            }

        });

        await sleep(33000); // Wait for 30 seconds before moving to the next round
    }
}

async function gifLash(gameParticipants, channel) {
    let scores = {};

    gameParticipants.forEach(player => {
        scores[player] = 0
    });

    console.log(scores);

    await channel.send(`Giflash is starting with ${Object.keys(scores).length} players!`);

    await handleRound1(channel, gameParticipants, scores);

    // Sort the scores and display them
        scores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        channel.send('Final scores:\n___________________________');
        scores.forEach(([player, points]) => {
            channel.send(`<@${player}>: ${points} points`);
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
    'http://i.imgur.com/C0WuZCv.jpg',
    'http://i.imgur.com/ASnbyzf.jpg',
    'https://i.imgur.com/jOTnQ8g.jpeg',
    'https://i.imgur.com/foqELps.jpg',
    'https://i.redd.it/dugs2sf891ky.jpg',
    'https://imgur.com/NBJRuUx',
    'https://imgur.com/qZP9H7X',
    'https://preview.redd.it/8uphubtmpd261.jpg?auto=webp&s=e36e2c026314d403218e822e150490c83bd521b7',
    'https://preview.redd.it/q6mq3nw1ru341.jpg?auto=webp&s=892cf41537c842968bfb9619209ab768fa4c0bf5',
    'https://i.imgur.com/HXrp7rO.jpg',
    'https://preview.redd.it/rx7wuj52b7f41.jpg?auto=webp&s=ad1f5c191a47ff98b3e3ecc2aababe86feb4ebd3',
    'https://preview.redd.it/yy1fiblj14r31.jpg?auto=webp&s=fb2f01e83509b2367efe257569d31b0316aba7c1',
    'https://preview.redd.it/rvvtau248ti61.jpg?auto=webp&s=25125af45d5728a7ac2d7e4bd361829966f9b604',
    'https://preview.redd.it/vu0xmmpj7ts61.jpg?auto=webp&s=9c2eefcf5c128e49f0632eee506a48c24e137ef8',
    'https://preview.redd.it/qofv7ebl17b41.jpg?auto=webp&s=61042fae8c22d9f839ba52f217e27231021baf4e',




]

const videos = [

]

const memes =[

]

module.exports = {
    gifLash,
} 