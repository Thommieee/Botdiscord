const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    return message.channel.send("Dat is cool!");

}

module.exports.help = {
    name: "wow",
    description: "De bot zegt iets leuks"
}