const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    return message.channel.send("Jullie hebben allemaal een voldoende, behalve iedereen, hahahahaha.");

}

module.exports.help = {
    name: "mop",
    description: "De bot zegt iets leuks"
}