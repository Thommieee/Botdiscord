const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    return message.channel.send("Houd je arrogante bek dicht!");

}

module.exports.help = {
    name: "maar",
    description: "De bot zegt iets leuks"
}