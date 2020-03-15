const randomPuppy = require("random-puppy");

module.exports.run = async (bot, message, args) => {

    var reddit = [
        "carporn",
        "AlfaRomeo",
        "AstonMartin",
        "Audi",
        "Autos",
        "AwesomeCarMods",
        "BMW",
        "cars",
        "Cartalk",
        "Chevy",
        "Ferrari",
        "Ford",
        "mclaren",
        "mercedes_benz",
        "Nissan",
        "Porsche",
        "projectcar",
        "subaru",
        "teslamotors",
        "Corvette",
        "Datsun",
        "camaro",
        "FocusST",
        "Dodge"
    ]

    var subreddit = reddit[Math.floor(Math.random() * reddit.length)];

    message.channel.startTyping();

    randomPuppy(subreddit).then(async url => {
        await message.channel.send({
            files: [{
                attachment: url,
                name: "car.png"
            }]
        }).then(() => message.channel.stopTyping());
    }).catch(err => console.error(err));

};

module.exports.help = {
    name: "car",
    description: "Laat een random auto plaatje zien"
}