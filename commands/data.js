const randomPuppy = require("random-puppy");

module.exports.run = async (bot, message, args) => {

    var reddit = [
        "dataisbeautiful"
    ]

    var subreddit = reddit[Math.floor(Math.random() * reddit.length)];

    message.channel.startTyping();

    randomPuppy(subreddit).then(async url => {
        await message.channel.send({
            files: [{
                attachment: url,
                name: "data.png"
            }]
        }).then(() => message.channel.stopTyping());
    }).catch(err => console.error(err));

};

module.exports.help = {
    name: "data",
    description: "Laat een random data plaatje zien"
}