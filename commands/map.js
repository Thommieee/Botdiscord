const randomPuppy = require("random-puppy");

module.exports.run = async (bot, message, args) => {

    var reddit = [
        "MapPorn"
    ]

    var subreddit = reddit[Math.floor(Math.random() * reddit.length)];

    message.channel.startTyping();

    randomPuppy(subreddit).then(async url => {
        await message.channel.send({
            files: [{
                attachment: url,
                name: "map.png"
            }]
        }).then(() => message.channel.stopTyping());
    }).catch(err => console.error(err));

};

module.exports.help = {
    name: "map",
    description: "Laat een random map plaatje zien"
}